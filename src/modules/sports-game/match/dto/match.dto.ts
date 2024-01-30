import { Field, ID, InterfaceType, ObjectType } from "@nestjs/graphql";
import { Connection } from "../../../../shared/types/relay/connection";
import { PlainTeamDto } from "../../team/dto/team.dto";
import { PlainPlayerDto } from "../../player/dto/player.dto";
import { IPlainMatch } from "../domain/types";

@InterfaceType({ description: 'Interface for plain MatchDto Object' })
export abstract class IPlainMatchDto implements IPlainMatch {
    @Field(() => ID)
    id: number;

    @Field(() => String, { description: "Location of the match" })
    location: string;

    @Field(() => String, { description: "start date of the match" })
    startDate: Date;

    @Field(() => String, { description: "start time of the match" })
    startTime: Date
}

@ObjectType({ implements: IPlainMatchDto, description: 'Return type for Plain MatchDto Object' })
export class PlainMatchDto implements IPlainMatchDto {
    id: number;
    location: string;
    startDate: Date;
    startTime: Date;
}

@ObjectType({ description: "Match DTO with Plain relationships" })
export class MatchDto extends PlainMatchDto {
    @Field(() => [PlainTeamDto], { nullable: true, description: "List of Match's teams" })
    teams?: PlainTeamDto[]

    @Field(() => [PlainPlayerDto], { nullable: true, description: "List of Match's players" })
    players?: PlainPlayerDto[]
}


@ObjectType({ description: 'Relay connection type of MatchDto' })
export class MatchDtoConnection extends Connection<MatchDto>(MatchDto) { }


@ObjectType({ description: 'Relay connection type of PlainMatchDto' })
export class PlainMatchDtoConnection extends Connection<PlainMatchDto>(PlainMatchDto) { }