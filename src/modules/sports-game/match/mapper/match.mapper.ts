
import { Injectable } from '@nestjs/common';
import { MatchDto } from '../dto/match.dto';
import { Match } from '../domain/match.entity';


@Injectable()
export class MatchMapper {
    constructor() { }

    fromDomainToDto(entity: Match): MatchDto {
        const dto = new MatchDto()
        dto.id = entity.id;
        dto.startDate = entity.startDate;
        dto.startTime = entity.startTime;
        dto.location = entity.location;
        dto.players = entity.players;
        dto.teams = entity.teams;
        return dto;
    }

    fromDomainsToDto(entities: Match[]): MatchDto[] {
        return entities.map((entity) => this.fromDomainToDto(entity))
    }
}