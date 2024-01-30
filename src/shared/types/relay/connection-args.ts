import { ArgsType, Field, InputType, Int } from "@nestjs/graphql";
import { ConnectionArguments, ConnectionCursor } from "graphql-relay";

@ArgsType()
@InputType()
export class ConnectionArgs implements ConnectionArguments {
    @Field({ nullable: true, description: "represents a cursor indicating the position in the data set to fetch items preceding it" })
    before?: ConnectionCursor | null;

    @Field({ nullable: true, description: "denotes a cursor indicating the position in the data set to fetch items following it" })
    after?: ConnectionCursor | null;

    @Field(() => Int, { nullable: true, description: "maximum number of items to fetch from the beginning of the data set" })
    first?: number | null;

    @Field(() => Int, { nullable: true, description: "number of items to fetch from the end of the data set" })
    last?: number | null;
}
