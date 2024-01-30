import { PlayerMapper } from './player.mapper';
import { PlayerDto } from '../dto/player.dto';
import { Player } from '../domain/player.entity';
import { Team } from '../../team/domain/team.entity';

describe('PlayerMapper', () => {
    let playerMapper: PlayerMapper;

    beforeEach(() => {
        playerMapper = new PlayerMapper();
    });

    describe('fromDomainToDto', () => {
        it('should map an IPlayer object to a PlayerDto object', () => {
            const playerEntity: Player = {
                id: 1,
                name: 'John',
                surname: 'Doe',
                number: 10,
                matches: [],
                team: new Team()
            };

            const result = playerMapper.fromDomainToDto(playerEntity);

            expect(result).toBeInstanceOf(PlayerDto);
            expect(result.id).toEqual(playerEntity.id);
            expect(result.name).toEqual(playerEntity.name);
        });
    });

    describe('fromDomainsToDto', () => {
        it('should map an array of IPlayer objects to an array of PlayerDto objects', () => {
            const playerEntities = [
                {
                    id: 1,
                    name: 'John',
                    surname: 'Doe',
                    number: 10,
                    matches: [],
                    team: { id: 1, name: 'A' },
                },
                {
                    id: 1,
                    name: 'John',
                    surname: 'Doe',
                    number: 10,
                    matches: [],
                    team: { id: 2, name: 'B' },
                },
            ] as Player[];

            const result = playerMapper.fromDomainsToDto(playerEntities);
            
            result.forEach((playerDto, index) => {
                expect(playerDto).toBeInstanceOf(PlayerDto);
                expect(playerDto.id).toEqual(playerEntities[index].id);
                expect(playerDto.name).toEqual(playerEntities[index].name);
            });
        });
    });
});