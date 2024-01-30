import { Field, ID, InterfaceType, ObjectType } from "@nestjs/graphql";
import { Connection } from "../../../../shared/types/relay/connection";
import { PlainPlayerDto } from "../../player/dto/player.dto";
import { IPlainTeam } from "../domain/types";

@InterfaceType({ description: 'Interface for Team' })
export abstract class IPlainTeamDto implements IPlainTeam {
    @Field(() => ID)
    id: number;

    @Field({ description: 'Team name' })
    name: string;
}

@ObjectType({ implements: IPlainTeamDto })
export class PlainTeamDto implements IPlainTeamDto {
    id: number;
    name: string;
}

@ObjectType({ description: 'Team DTO' })
export class TeamDto extends PlainTeamDto {
    @Field(() => [PlainPlayerDto], { description: 'List of players in the team', nullable: true })
    players?: PlainPlayerDto[];
}

@ObjectType({ description: 'Relay connection type of MatchDto' })
export class TeamDtoConnection extends Connection<TeamDto>(TeamDto) { }

@ObjectType({ description: 'Relay connection type of PlainTeamDto' })
export class PlainTeamDtoConnection extends Connection<PlainTeamDto>(PlainTeamDto) { }
