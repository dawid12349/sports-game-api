import { Type } from "@nestjs/common";
import { Field, ObjectType } from "@nestjs/graphql";
import { Connection as RelayConnection, Edge as RelayEdge, PageInfo as RelayPageInfo } from "graphql-relay";

@ObjectType({ isAbstract: true, description: "Relay's mechanism pagination object" })
class PageInfo implements RelayPageInfo {
    @Field(() => String, { nullable: true, description: "cursor indicating the position of the first node in the dataset" })
    startCursor: string;

    @Field(() => String, { nullable: true, description: "cursor indicating the position of the last node in the dataset" })
    endCursor: string;

    @Field(() => Boolean, { nullable: false, description: "Indicates whether there are previous pages before the current page" })
    hasPreviousPage: boolean;

    @Field(() => Boolean, { nullable: false, description: "Indicates whether there are next pages after the current page" })
    hasNextPage: boolean;
}

export function Connection<GraphQLObject>(GenericClass?: Type<GraphQLObject>) {
    @ObjectType(`${GenericClass.name}Edge`, { isAbstract: true, description: 'Edge of the Connection containing GraphQLObject and cursor to that object'})
    abstract class Edge implements RelayEdge<GraphQLObject> {
        @Field(() => GenericClass, { nullable: false, description: `Node containing some ${GenericClass} object` })
        node: GraphQLObject

        @Field(() => String, { nullable: false, description: 'cursor of the edge'})
        cursor: string
    }

    @ObjectType({ isAbstract: true, description: "Relay's connection Object containing Edge and PageInfo"})
    abstract class ConnectionClass implements RelayConnection<GraphQLObject> {
        @Field(() => [Edge], { nullable: false })
        edges: Edge[]

        @Field(() => PageInfo, { nullable: false })
        pageInfo: PageInfo;
    }

    return ConnectionClass
}
