import { Test, TestingModule } from '@nestjs/testing';
import { TeamResolver } from './team.resolver';
import { TeamService } from './team.service';
import { TeamMapper } from './mapper/team.mapper';
import { ConnectionArgs } from '../../../shared/types/relay/connection-args';
import { TeamDto } from './dto/team.dto';
import { connectionFromArray } from 'graphql-relay';
import { Team } from './domain/team.entity';
import { PlayerDto } from '../player/dto/player.dto';

describe('TeamResolver', () => {
    let teamResolver: TeamResolver;
    let teamServiceMock: jest.Mocked<TeamService>;
    let teamMapperMock: jest.Mocked<TeamMapper>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                TeamResolver,
                {
                    provide: TeamService,
                    useValue: {
                        findAllWithPlayers: jest.fn(),
                    },
                },
                {
                    provide: TeamMapper,
                    useValue: {
                        fromDomainsToDto: jest.fn(),
                    },
                },
            ],
        }).compile();

        teamResolver = module.get<TeamResolver>(TeamResolver);
        teamServiceMock = module.get<TeamService>(TeamService) as jest.Mocked<TeamService>;
        teamMapperMock = module.get<TeamMapper>(TeamMapper) as jest.Mocked<TeamMapper>;
    });

    it('should be defined', () => {
        expect(teamResolver).toBeDefined();
    });

    describe('teams', () => {
        it('should return teams with players', async () => {
            const args: ConnectionArgs = {};
            const teams: Team[] = [{ id: 1, name: 'Team A', players: [{ id: 1, name: 'Player 1' }] } as Team];

            teamServiceMock.findAllWithPlayers.mockResolvedValue(teams);
            teamMapperMock.fromDomainsToDto.mockReturnValue(teams);

            const result = await teamResolver.teams(args);
        
            expect(result).toEqual(connectionFromArray(teams, args));
            expect(teamServiceMock.findAllWithPlayers).toHaveBeenCalled();
            expect(teamMapperMock.fromDomainsToDto).toHaveBeenCalledWith(teams);
        });
    });

    describe('getPlayers', () => {
        it('should return players for a team', () => {
            const args: ConnectionArgs = {};
            const teamDto: TeamDto = {
                id: 1,
                name: 'Team A',
                players: [{ id: 1, name: 'Player 1' } as PlayerDto],
            };

            const result = teamResolver.getPlayers(args, teamDto);
        
            expect(result).toEqual(connectionFromArray(teamDto.players, args));
        });
    });
});