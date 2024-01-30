import { PlayerService } from './player.service';
import { Player } from './domain/player.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Test } from '@nestjs/testing';
import { Team } from '../team/domain/team.entity';
import { Match } from '../match/domain/match.entity';

describe('PlayerService', () => {
    let playerService: PlayerService;
    let playerRepository: Repository<Player>;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            providers: [
                PlayerService,
                {
                    provide: getRepositoryToken(Player),
                    useClass: Repository,
                },
            ],
        }).compile();

        playerService = moduleRef.get<PlayerService>(PlayerService);
        playerRepository = moduleRef.get<Repository<Player>>(getRepositoryToken(Player));
    });

    describe('findAllWithTeamAndMatches', () => {
        it('should return all players with teams and matches', async () => {

            const mockPlayers = [
                { id: 1, name: 'player1', surname: 'surname1', number: 1, team: { id: 1 } as Team, matches: { id: 1 } as Match } as unknown as Player,
                { id: 2, name: 'player2', surname: 'surname2', number: 2, team: { id: 1 } as Team, matches: { id: 1 } as Match } as unknown as Player
            ]

            jest.spyOn(playerRepository, 'find').mockResolvedValue(mockPlayers);

            const result = await playerService.findAllWithTeamAndMatches();

            expect(result).toEqual(mockPlayers);
            expect(result.length).toEqual(mockPlayers.length);
            expect(playerRepository.find).toHaveBeenCalledWith({
                relations: ['team', 'matches'],
            });
        });
    });
});