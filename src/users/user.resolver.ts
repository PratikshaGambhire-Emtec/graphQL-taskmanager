/* eslint-disable prettier/prettier */
import {Query, Args, Mutation, Resolver } from "@nestjs/graphql";
import { UserServices } from "./users.service";
import { UserType } from "./types/users.type";
import { UserInput } from "./types/users.input";
import { SigninResponse } from "./types/signin.response";
import { UseGuards } from "@nestjs/common";
import { GQLAuthGuard } from "./gql.authguard";
import { GetUser } from "./get.user.decorator";
import { UserEntity } from "src/entity/user.entity";

@Resolver((of)=> UserType)
export class UserResolver{
    


    constructor(private userService: UserServices){}
    @Mutation((returns)=> UserType)   
    signup(
        @Args('input') input: UserInput) {
            return this.userService.signup(input)
        }



    @Mutation(returns => SigninResponse)
    signin(@Args('input') input: UserInput) {
        return this.userService.signin(input)
    }

    

    
    @Query((returns) => UserType)
    @UseGuards(GQLAuthGuard)
    profile(@GetUser() user:UserEntity){
        return user;
    }

}