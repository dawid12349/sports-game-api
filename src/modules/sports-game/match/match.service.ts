import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Match } from "./domain/match.entity";

@Injectable()
export class MatchService {
    constructor(
        @InjectRepository(Match)
        private readonly matchRepository: Repository<Match>) { }

    async findAllWithTeamsAndPlayers() {
        return await this.matchRepository.find({
            relations: ['teams', 'players']
        });
    }
}