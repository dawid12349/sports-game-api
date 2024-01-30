import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Player } from "./domain/player.entity";
import { PlayerService } from "./player.service";
import { PlayerResolver } from "./player.resolver";
import { PlayerMapper } from "./mapper/player.mapper";

@Module({
    imports: [TypeOrmModule.forFeature([Player])],
    providers: [PlayerResolver, PlayerService, PlayerMapper],
})
export class PlayerModule { }
