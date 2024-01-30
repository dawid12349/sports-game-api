import { Resolver, Query, Args, ResolveField, Parent, Int } from '@nestjs/graphql';
import { TeamService } from './team.service';
import { ConnectionArgs } from '../../../shared/types/relay/connection-args';
import { connectionFromArray } from 'graphql-relay';
import { TeamDto, TeamDtoConnection } from './dto/team.dto';
import { PlainPlayerDtoConnection } from '../player/dto/player.dto';
import { TeamMapper } from './mapper/team.mapper';

@Resolver(() => TeamDto)
export class TeamResolver {
    constructor(
        private readonly teamService: TeamService,
        private readonly teamMapper: TeamMapper
    ) { }

    @Query(() => TeamDtoConnection, { name: 'teams', description: 'Returns connection of teams' })
    async teams(@Args() args: ConnectionArgs) {
        const teams = await this.teamService.findAllWithPlayers();
        return connectionFromArray(this.teamMapper.fromDomainsToDto(teams), args);
    }

    @ResolveField('players', () => PlainPlayerDtoConnection, { description: "Returns connection of Team's players" })
    getPlayers(@Args() args: ConnectionArgs, @Parent() parent: TeamDto) {
        return connectionFromArray(parent.players, args)
    }
}