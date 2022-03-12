/* eslint-disable prettier/prettier */
import { Field, ID, ObjectType } from "@nestjs/graphql";
import { type } from "os";

@ObjectType('Task')
export class TaskType{

    @Field(type=> ID)
    id: number;

    @Field()
    title: string;

    @Field( )
    description: string;
}