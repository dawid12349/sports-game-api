import { Team } from '../domain/team.entity';
import { TeamDto } from '../dto/team.dto'
import { Injectable } from '@nestjs/common';

@Injectable()
export class TeamMapper {
    constructor() { }

    fromDomainToDto(entity: Team): TeamDto {
        const dto = new TeamDto()
        dto.id = entity.id
        dto.name = entity.name
        dto.players = entity.players 
        return dto;
    }

    fromDomainsToDto(entities: Team[]): TeamDto[] {
        return entities.map((entity) => this.fromDomainToDto(entity))
    }
}