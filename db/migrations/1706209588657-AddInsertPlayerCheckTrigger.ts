import { MigrationInterface, QueryRunner } from "typeorm";

export class AddInsertPlayerCheckTrigger1706209588657 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        CREATE OR REPLACE FUNCTION check_player_limit() RETURNS TRIGGER AS $$
        DECLARE
            player_count INTEGER;
            max_players INTEGER := 20;
        BEGIN
            SELECT COUNT(*) INTO player_count FROM "player" WHERE "team_id" = NEW."team_id";

            IF player_count >= max_players THEN
                RAISE EXCEPTION 'Player limit reached for this team';
            END IF;

            RETURN NEW;
        END;
        $$ LANGUAGE plpgsql;
        
        CREATE TRIGGER player_limit_trigger
        BEFORE INSERT ON "player"
        FOR EACH ROW
        EXECUTE FUNCTION check_player_limit();
    `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DROP TRIGGER IF EXISTS player_limit_trigger ON "player";');
        await queryRunner.query('DROP FUNCTION IF EXISTS check_player_limit();');
    }

}
