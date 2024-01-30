import { Test, TestingModule } from '@nestjs/testing';
import { PlayerResolver } from './player.resolver';
import { PlayerService } from './player.service';
import { PlayerMapper } from './mapper/player.mapper';
import { ConnectionArgs } from '../../../shared/types/relay/connection-args';
import { PlayerDto } from './dto/player.dto';
import { connectionFromArray } from 'graphql-relay';
import { Player } from './domain/player.entity';

describe('PlayerResolver', () => {
    let playerResolver: PlayerResolver;
    let playerServiceMock: jest.Mocked<PlayerService>;
    let playerMapperMock: jest.Mocked<PlayerMapper>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                PlayerResolver,
                {
                    provide: PlayerService,
                    useValue: {
                        findAllWithTeamAndMatches: jest.fn(),
                    },
                },
                {
                    provide: PlayerMapper,
                    useValue: {
                        fromDomainsToDto: jest.fn(),
                    },
                },
            ],
        }).compile();

        playerResolver = module.get<PlayerResolver>(PlayerResolver);
        playerServiceMock = module.get<PlayerService>(PlayerService) as jest.Mocked<PlayerService>;
        playerMapperMock = module.get<PlayerMapper>(PlayerMapper) as jest.Mocked<PlayerMapper>;
    });

    it('should be defined', () => {
        expect(playerResolver).toBeDefined();
    });

    describe('players', () => {
        it('should return players', async () => {
            const args: ConnectionArgs = {};
            const players: Player[] = [{ id: 1, surname: 'test' } as Player];

            playerServiceMock.findAllWithTeamAndMatches.mockResolvedValue(players);
            playerMapperMock.fromDomainsToDto.mockReturnValue(players);

            const result = await playerResolver.players(args);
        
            expect(result).toEqual(connectionFromArray(players, args));
            expect(playerServiceMock.findAllWithTeamAndMatches).toHaveBeenCalled();
            expect(playerMapperMock.fromDomainsToDto).toHaveBeenCalledWith(players);
        });
    });

    describe('getTeam', () => {
        it('should return the player team', () => {
            const playerDto: PlayerDto = {
                id: 1, name: 'Player 1', team: { id: 1, name: 'Team A' }, matches: [],
                surname: '',
                number: 0
            };

            const result = playerResolver.getTeam(playerDto);

            expect(result).toEqual(playerDto.team);
        });
    });

    describe('getMatches', () => {
        it('should return player matches', () => {
            const args: ConnectionArgs = {};
            const playerDto: PlayerDto = {
                id: 1, name: 'Player 1', team: { id: 1, name: 'Team A' }, matches: [],
                surname: '',
                number: 0
            };

            const result = playerResolver.getMatches(args, playerDto);
    
            expect(result).toEqual(connectionFromArray(playerDto.matches, args));
        });
    });
});
