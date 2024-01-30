import { MigrationInterface, QueryRunner } from "typeorm";

export class AddInsertMatchPlayerRestrictionTrigger1706549382905 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        CREATE OR REPLACE FUNCTION check_match_player_insert() RETURNS TRIGGER AS $$
        DECLARE
            player_team_id INT;
            matchplayer_count INT;
            max_players_per_team_in_match INT := 11;
        BEGIN
            SELECT team_id INTO player_team_id FROM "player" WHERE id = NEW.player_id;

            IF NOT EXISTS (
                SELECT 1 FROM "match_teams_team"
                WHERE match_id = NEW.match_id AND team_id = player_team_id
            ) THEN
                RAISE EXCEPTION 'Player''s team does not belong to the match';
            END IF;

    
            SELECT COUNT(*) INTO matchplayer_count
            FROM "match_players_player" MP
            INNER JOIN "player" P ON P.id = MP.player_id
            WHERE P.team_id = player_team_id AND MP.match_id = NEW.match_id;
            
            IF matchplayer_count >= max_players_per_team_in_match THEN
                RAISE EXCEPTION 'Player count from the team cannot be greater or equal than 11';
            END IF;

            RETURN NEW;
        END;
        $$ LANGUAGE plpgsql;
        
        CREATE TRIGGER match_player_insert_trigger
        BEFORE INSERT ON "match_players_player"
        FOR EACH ROW
        EXECUTE FUNCTION check_match_player_insert()
    `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DROP TRIGGER IF EXISTS match_player_insert_trigger ON "match_players_player";');
        await queryRunner.query('DROP FUNCTION IF EXISTS check_match_player_insert();');
    }
}
