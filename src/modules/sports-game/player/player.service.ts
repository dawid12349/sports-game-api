import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Player } from "./domain/player.entity";
import { Repository } from "typeorm";


@Injectable()
export class PlayerService {
    constructor(
        @InjectRepository(Player)
        private readonly playerRepository: Repository<Player>) { }

    async findAllWithTeamAndMatches(): Promise<Player[]> {
        return await this.playerRepository.find({
            relations: ['team', 'matches']
        });
    }
}