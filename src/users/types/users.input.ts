/* eslint-disable prettier/prettier */
import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class UserInput{
    
    @Field()
    userName: string
    
    @Field()
    userPassword: string
}