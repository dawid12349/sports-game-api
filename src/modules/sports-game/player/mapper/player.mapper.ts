
import { Injectable } from '@nestjs/common';
import { PlayerDto } from '../dto/player.dto';
import { Player } from '../domain/player.entity';
;

@Injectable()
export class PlayerMapper {
    constructor() { }

    fromDomainToDto(entity: Player): PlayerDto {
        const dto = new PlayerDto()
        dto.id = entity.id;
        dto.name = entity.name;
        dto.number = entity.number;
        dto.surname = entity.surname;
        dto.matches = entity.matches;
        dto.team = entity.team
        return dto;
    }

    fromDomainsToDto(entities: Player[]): PlayerDto[] {
        return entities.map((entity) => this.fromDomainToDto(entity))
    }
}