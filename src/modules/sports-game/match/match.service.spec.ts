import { MatchService } from './match.service';
import { Match } from './domain/match.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Test } from '@nestjs/testing';

describe('MatchService', () => {
    let matchService: MatchService;
    let matchRepository: Repository<Match>;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            providers: [
                MatchService,
                {
                    provide: getRepositoryToken(Match),
                    useClass: Repository,
                },
            ],
        }).compile();

        matchService = moduleRef.get<MatchService>(MatchService);
        matchRepository = moduleRef.get<Repository<Match>>(getRepositoryToken(Match));
    });

    describe('findAllWithTeamsAndPlayers', () => {
        it('should return all matches with teams and players', async () => {
            const mockMatchesWithTeamsAndPlayers = [
                {
                    id: 1,
                    startDate: new Date('2024-01-30'),
                    startTime: '14:00',
                    location: 'Stadium A',
                    teams: [{ id: 1, name: 'Team A' }],
                    players: [{ id: 1, name: 'Player 1' }]
                },
                {
                    id: 2,
                    startDate: new Date('2024-02-01'),
                    startTime: '15:30',
                    location: 'Stadium B',
                    teams: [{ id: 2, name: 'Team B' }],
                    players: [{ id: 2, name: 'Player 2' }]
                }
            ] as unknown as Match[];

            jest.spyOn(matchRepository, 'find').mockResolvedValue(mockMatchesWithTeamsAndPlayers);

            const result = await matchService.findAllWithTeamsAndPlayers();

            expect(result).toEqual(mockMatchesWithTeamsAndPlayers);
            expect(result.length).toEqual(mockMatchesWithTeamsAndPlayers.length);
            expect(matchRepository.find).toHaveBeenCalledWith({
                relations: ['teams', 'players'],
            });
        });
    });
});