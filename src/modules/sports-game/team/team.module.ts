import { Module } from "@nestjs/common";
import { Team } from "./domain/team.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TeamResolver } from "./team.resolver";
import { TeamService } from "./team.service";
import { TeamMapper } from "./mapper/team.mapper";

@Module({
    imports: [TypeOrmModule.forFeature([Team])],
    providers: [TeamResolver, TeamService, TeamMapper],
})
export class TeamModule { }
