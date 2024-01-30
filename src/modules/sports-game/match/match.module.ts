import { Module } from "@nestjs/common";
import { Match } from "./domain/match.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MatchResolver } from "./match.resolver";
import { MatchService } from "./match.service";
import { MatchMapper } from "./mapper/match.mapper";

@Module({
    imports: [TypeOrmModule.forFeature([Match])],
    providers: [MatchResolver, MatchService, MatchMapper],
})
export class MatchModule { }
