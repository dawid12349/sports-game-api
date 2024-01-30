import { Test, TestingModule } from '@nestjs/testing';
import { MatchResolver } from './match.resolver';
import { MatchService } from './match.service';
import { MatchMapper } from './mapper/match.mapper';
import { ConnectionArgs } from '../../../shared/types/relay/connection-args';
import { MatchDto } from './dto/match.dto';
import { connectionFromArray } from 'graphql-relay';
import { Match } from './domain/match.entity';
import { PlayerDto } from '../player/dto/player.dto';

describe('MatchResolver', () => {
    let matchResolver: MatchResolver;
    let matchServiceMock: jest.Mocked<MatchService>;
    let matchMapperMock: jest.Mocked<MatchMapper>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                MatchResolver,
                {
                    provide: MatchService,
                    useValue: {
                        findAllWithTeamsAndPlayers: jest.fn(),
                    },
                },
                {
                    provide: MatchMapper,
                    useValue: {
                        fromDomainsToDto: jest.fn(),
                    },
                },
            ],
        }).compile();

        matchResolver = module.get<MatchResolver>(MatchResolver);
        matchServiceMock = module.get<MatchService>(MatchService) as jest.Mocked<MatchService>;
        matchMapperMock = module.get<MatchMapper>(MatchMapper) as jest.Mocked<MatchMapper>;
    });

    it('should be defined', () => {
        expect(matchResolver).toBeDefined();
    });

    describe('matches', () => {
        it('should return matches with teams and players', async () => {
            const args: ConnectionArgs = {};
            const matches: Match[] = [{ id: 1, teams: [], players: [] } as Match];

            matchServiceMock.findAllWithTeamsAndPlayers.mockResolvedValue(matches);
            matchMapperMock.fromDomainsToDto.mockReturnValue(matches);

            const result = await matchResolver.matches(args);
        
            expect(result).toEqual(connectionFromArray(matches, args));
            expect(matchServiceMock.findAllWithTeamsAndPlayers).toHaveBeenCalled();
            expect(matchMapperMock.fromDomainsToDto).toHaveBeenCalledWith(matches);
        });
    });

    describe('getTeams', () => {
        it('should return teams for a match', () => {
            const args: ConnectionArgs = {};
            const matchDto: MatchDto = {
                id: 1,
                teams: [{ id: 1, name: 'Team 1' }],
                players: [],
            } as MatchDto;

            const result = matchResolver.getTeams(args, matchDto);
        
            expect(result).toEqual(connectionFromArray(matchDto.teams, args));
        });
    });

    describe('getPlayers', () => {
        it('should return players for a match', () => {
            const args: ConnectionArgs = {};
            const matchDto: MatchDto = {
                id: 1,
                teams: [],
                players: [{ id: 1, name: 'Player 1' }] as PlayerDto[],
                location: '',
                startDate: new Date(),
                startTime: new Date()
            };

            const result = matchResolver.getPlayers(args, matchDto);
        
            expect(result).toEqual(connectionFromArray(matchDto.players, args));
        });
    });
});