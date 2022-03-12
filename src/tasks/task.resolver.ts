/* eslint-disable prettier/prettier */
import { UseGuards } from "@nestjs/common";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { UserEntity } from "src/entity/user.entity";
import { GetUser } from "src/users/get.user.decorator";
import { GQLAuthGuard } from "src/users/gql.authguard";
import { TaskService } from "./tasks.service";
import { TaskInputType } from "./types/task.input";
import { TaskType } from "./types/task.type";

@Resolver((of)=> TaskType)
@UseGuards(GQLAuthGuard)
export class TaskResolver {
    constructor(private taskService: TaskService ){

    }

    @Query((returns) => [TaskType]  )
    tasks(@GetUser() user:UserEntity){
        return this.taskService.getTasks(user);
    }

    @Mutation((returns)=> TaskType)
    createTask(
        @Args('input') input: TaskInputType,
        @GetUser() user: UserEntity){
            return this.taskService.createTask(input, user)
    }
}