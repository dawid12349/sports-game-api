import { Resolver, Query, Args, ResolveField, Parent, Int } from '@nestjs/graphql';
import { PlayerService } from './player.service';
import { connectionFromArray, } from 'graphql-relay';
import { ConnectionArgs } from '../../..//shared/types/relay/connection-args';
import { PlayerDto, PlayerDtoConnnection } from './dto/player.dto';
import { PlainTeamDto } from '../team/dto/team.dto';
import { PlainMatchDtoConnection } from '../match/dto/match.dto';
import { PlayerMapper } from './mapper/player.mapper';

@Resolver(() => PlayerDto)
export class PlayerResolver {
    constructor(
        private readonly playerService: PlayerService,
        private readonly playerMapper: PlayerMapper
    ) { }

    @Query(() => PlayerDtoConnnection, { name: 'players', description: 'Returns connection of players' })
    async players(@Args() args: ConnectionArgs) {
        const players = await this.playerService.findAllWithTeamAndMatches()
        return connectionFromArray(this.playerMapper.fromDomainsToDto(players), args)
    }

    @ResolveField('team', () => PlainTeamDto, { description: "Returns Player's team" })
    getTeam(@Parent() parent: PlayerDto) {
        return parent.team;
    }

    @ResolveField('matches', () => PlainMatchDtoConnection, { description: "Returns connection of Player's Matches" })
    getMatches(@Args() args: ConnectionArgs, @Parent() parent: PlayerDto) {
        return connectionFromArray(parent.matches, args)
    }
}