/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModule } from "src/users/users.module";
import { TaskResolver } from "./task.resolver";
import { TaskRepository } from "./task.respository";
import { TaskService } from "./tasks.service";

@Module({

    //use typeorm to create the table task using repo
    imports:[TypeOrmModule.forFeature([TaskRepository]), UserModule ],
    controllers:[],
    providers:[TaskService, TaskResolver ],

})

export class TaskModule{}
