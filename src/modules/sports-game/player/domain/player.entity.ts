import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, ManyToMany } from 'typeorm';
import { Team } from '../../team/domain/team.entity';
import { Match } from '../../match/domain/match.entity';

@Entity({
    name: 'player'
})
export class Player {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 40 })
    name: string;

    @Column({ type: 'varchar', length: 40 })
    surname: string;

    @Column({ type: 'int', unsigned: true })
    number: number;

    @ManyToOne(() => Team, team => team.players)
    @JoinColumn({ name: "team_id" })
    team: Team;

    @ManyToMany(() => Match, match => match.players)
    matches: Match[];
}