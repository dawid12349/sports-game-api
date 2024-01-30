import { Field, ID, Int, InterfaceType, ObjectType } from "@nestjs/graphql";
import { Connection } from "../../../../shared/types/relay/connection";
import { IPlainTeamDto, PlainTeamDto } from "../../team/dto/team.dto";
import { PlainMatchDto } from "../../match/dto/match.dto";
import { IPlainPlayer } from "../domain/types";

@InterfaceType({ description: 'Interface type for PlainPlayerDto' })
export abstract class IPlainPlayerDto implements IPlainPlayer {
    @Field(() => ID)
    id: number;

    @Field({ description: 'Player name' })
    name: string;

    @Field({ description: 'Player surname' })
    surname: string;

    @Field(() => Int, { description: 'Player number' })
    number: number;
}

@ObjectType({ implements: IPlainPlayerDto })
export class PlainPlayerDto implements IPlainPlayerDto {
    id: number;
    name: string;
    surname: string;
    number: number;
}

@ObjectType({ implements: IPlainTeamDto })
export class PlayerTeamDto implements IPlainTeamDto {
    id: number;
    name: string;
};

@ObjectType({ description: "PlayerDTO" })
export class PlayerDto extends PlainPlayerDto {
    @Field(() => PlainTeamDto, { nullable: true, description: "Players's Team DTO" })
    team?: PlainTeamDto

    @Field(() => [PlainMatchDto], { nullable: true, description: "List of Players's Matches (DTO)" })
    matches?: PlainMatchDto[]
}

@ObjectType({ description: 'Relay connection type of PlayerDTO' })
export class PlayerDtoConnnection extends Connection<PlayerDto>(PlayerDto) { }

@ObjectType({ description: 'Relay connection type of PlainPlayerDto' })
export class PlainPlayerDtoConnection extends Connection<PlainPlayerDto>(PlainPlayerDto) { }
