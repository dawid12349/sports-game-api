import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany } from 'typeorm';
import { Player } from '../../player/domain/player.entity';
import { Match } from '../../match/domain/match.entity';

@Entity({
    name: 'team'
})
export class Team {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 40 })
    name: string;

    @OneToMany(() => Player, player => player.team)
    players: Player[];

    @ManyToMany(() => Match, (match) => match.teams)
    matches: Match[]
}