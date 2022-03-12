/* eslint-disable prettier/prettier */
import { Field, ObjectType } from "@nestjs/graphql";
import { UserType } from "./users.type";

@ObjectType()
export class SigninResponse{
    
    @Field()
    token: string;
   
    // @Field()
    // user: UserType;
}