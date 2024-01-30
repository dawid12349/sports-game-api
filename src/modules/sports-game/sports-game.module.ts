import { Module } from '@nestjs/common';
import { PlayerModule } from './player/player.module';
import { TeamModule } from './team/team.module';
import { MatchModule } from './match/match.module';

@Module({
  imports: [PlayerModule, TeamModule, MatchModule],
})
export class SportsGameModule { }
