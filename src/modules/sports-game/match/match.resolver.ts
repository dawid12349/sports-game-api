import { Resolver, Query, Args, ResolveField, Parent } from '@nestjs/graphql';
import { MatchService } from './match.service';
import { MatchDto, MatchDtoConnection } from './dto/match.dto';
import { ConnectionArgs } from '../../../shared/types/relay/connection-args';
import { connectionFromArray } from 'graphql-relay';
import { PlainTeamDtoConnection } from '../team/dto/team.dto';
import { PlainPlayerDtoConnection } from '../player/dto/player.dto';
import { MatchMapper } from './mapper/match.mapper';

@Resolver(() => MatchDto)
export class MatchResolver {
    constructor(
        private readonly matchService: MatchService,
        private readonly matchMapper: MatchMapper
    ) { }

    @Query(() => MatchDtoConnection, { name: 'matches', description: 'Returns connection of matches' })
    async matches(@Args() args: ConnectionArgs) {
        const matches = await this.matchService.findAllWithTeamsAndPlayers();
        return connectionFromArray(this.matchMapper.fromDomainsToDto(matches), args)
    }

    @ResolveField('teams', () => PlainTeamDtoConnection, { description: "Returns connection of Match's teams" })
    getTeams(@Args() args: ConnectionArgs, @Parent() parent: MatchDto) {
        return connectionFromArray(parent.teams, args)
    }

    @ResolveField('players', () => PlainPlayerDtoConnection, { description: "Returns connection of Match's players" })
    getPlayers(@Args() args: ConnectionArgs, @Parent() parent: MatchDto) {
        return connectionFromArray(parent.players, args)
    }
}