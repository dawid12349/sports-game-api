import { TeamMapper } from './team.mapper';
import { TeamDto } from '../dto/team.dto';
import { Team } from '../domain/team.entity';

describe('TeamMapper', () => {
    let teamMapper: TeamMapper;

    beforeEach(() => {
        teamMapper = new TeamMapper();
    });

    describe('fromDomainToDto', () => {
        it('should map a Team object to a TeamDto object', () => {
            const teamEntity: Team = {
                id: 1,
                name: 'Team A',
                players: []
            } as Team;

            const result = teamMapper.fromDomainToDto(teamEntity);

            expect(result).toBeInstanceOf(TeamDto);
            expect(result.id).toEqual(teamEntity.id);
            expect(result.name).toEqual(teamEntity.name);
        });
    });

    describe('fromDomainsToDto', () => {
        it('should map an array of Team objects to an array of TeamDto objects', () => {
            // Sample array of Team entities
            const teamEntities: Team[] = [
                { id: 1, name: 'Team A', players: [] },
                { id: 2, name: 'Team B', players: [] }
            ] as Team[];

            const result = teamMapper.fromDomainsToDto(teamEntities);

            expect(result.length).toEqual(teamEntities.length);

            result.forEach((teamDto, index) => {
                expect(teamDto).toBeInstanceOf(TeamDto);
                expect(teamDto.id).toEqual(teamEntities[index].id);
                expect(teamDto.name).toEqual(teamEntities[index].name);
            });
        });
    });
});