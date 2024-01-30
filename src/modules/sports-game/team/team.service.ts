import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Team } from "./domain/team.entity";

@Injectable()
export class TeamService {
    constructor(
        @InjectRepository(Team) private readonly teamRepository: Repository<Team>
    ) { }

    async findAllWithPlayers() {
        return await this.teamRepository.find({
            relations: ['players']
        })
    }
}