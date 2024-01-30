import { MatchMapper } from './match.mapper';
import { MatchDto } from '../dto/match.dto';
import { Match } from '../domain/match.entity';

describe('MatchMapper', () => {
    let matchMapper: MatchMapper;

    beforeEach(() => {
        matchMapper = new MatchMapper();
    });

    describe('fromDomainToDto', () => {
        it('should map a Match object to a MatchDto object', () => {
            const matchEntity: Match = {
                id: 1,
                startDate: '2024-01-30',
                startTime: '14:00',
                location: 'Stadium A',
                players: [],
                teams: []
            } as unknown as Match;

            const result = matchMapper.fromDomainToDto(matchEntity);

            expect(result).toBeInstanceOf(MatchDto);

            expect(result.id).toEqual(matchEntity.id);
            expect(result.startDate).toEqual(matchEntity.startDate);
            expect(result.startTime).toEqual(matchEntity.startTime);
            expect(result.location).toEqual(matchEntity.location);
        });
    });

    describe('fromDomainsToDto', () => {
        it('should map an array of Match objects to an array of MatchDto objects', () => {
            const matchEntities: Match[] = [
                { id: 1, startDate: '2024-01-30', startTime: '14:00', location: 'Stadium A', players: [], teams: [] },
                { id: 2, startDate: '2024-02-01', startTime: '15:30', location: 'Stadium B', players: [], teams: [] }
            ] as unknown as Match[];

            const result = matchMapper.fromDomainsToDto(matchEntities);

            expect(result.length).toEqual(matchEntities.length);

            result.forEach((matchDto, index) => {
                expect(matchDto).toBeInstanceOf(MatchDto);
                expect(matchDto.id).toEqual(matchEntities[index].id);
                expect(matchDto.startDate).toEqual(matchEntities[index].startDate);
                expect(matchDto.startTime).toEqual(matchEntities[index].startTime);
                expect(matchDto.location).toEqual(matchEntities[index].location);
            });
        });
    });
});