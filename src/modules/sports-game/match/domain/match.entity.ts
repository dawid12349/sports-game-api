import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, RelationId, JoinColumn, ManyToMany, JoinTable, OneToMany, PrimaryColumn } from 'typeorm';
import { Team } from '../../team/domain/team.entity';
import { Player } from '../../player/domain/player.entity';

@Entity({
    name: 'match'
})
export class Match {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255 })
    location: string;

    @Column({
        type: 'date',
        name: 'start_date'
    })
    startDate: Date;

    @Column({
        type: 'time',
        name: 'start_time'
    })
    startTime: Date

    @ManyToMany(() => Team, (team) => team.matches)
    @JoinTable()
    teams: Team[];

    @ManyToMany(() => Player, (player) => player.matches)
    @JoinTable()
    players: Player[];
}



