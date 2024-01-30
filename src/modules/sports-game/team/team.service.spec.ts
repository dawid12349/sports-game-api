import { TeamService } from './team.service';
import { Team } from './domain/team.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Test } from '@nestjs/testing';

describe('TeamService', () => {
    let teamService: TeamService;
    let teamRepository: Repository<Team>;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            providers: [
                TeamService,
                {
                    provide: getRepositoryToken(Team),
                    useClass: Repository,
                },
            ],
        }).compile();

        teamService = moduleRef.get<TeamService>(TeamService);
        teamRepository = moduleRef.get<Repository<Team>>(getRepositoryToken(Team));
    });

    describe('findAllWithPlayers', () => {
        it('should return all teams with players', async () => {

            const mockTeamsWithPlayers = [
                {
                    id: 1,
                    name: 'Team A',
                    players: [
                        { id: 1, name: 'Player 1' },
                        { id: 2, name: 'Player 2' },
                    ],
                },,
                {
                    id: 2,
                    name: 'Team B',
                    players: [
                        { id: 3, name: 'Player 3'},
                        { id: 4, name: 'Player 4' },
                    ],
                },
            ] as Team[];

            jest.spyOn(teamRepository, 'find').mockResolvedValue(mockTeamsWithPlayers);

            const result = await teamService.findAllWithPlayers();

            expect(result).toEqual(mockTeamsWithPlayers);
            expect(result.length).toEqual(mockTeamsWithPlayers.length);
            expect(teamRepository.find).toHaveBeenCalledWith({
                relations: ['players'],
            });
        });
    });
});