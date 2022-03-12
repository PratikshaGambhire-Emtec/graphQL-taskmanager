/* eslint-disable prettier/prettier */
import { UserEntity } from 'src/entity/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { TaskEntity } from "../entity/tasks.entity";
import { CreateTaskDTO } from './dto/create.task.dto';
import { SearchTaskDTO } from './dto/search.task.dto';
import { TaskStatus } from './tasks.enum';
import { TaskInputType } from './types/task.input';

@EntityRepository(TaskEntity)
export class TaskRepository extends Repository<TaskEntity>{

 async getTask( user: UserEntity){
    const query = this.createQueryBuilder('task')
    
    //add the userID
    query.andWhere(`task.userId= :userId`, {userId: user.id})

    //execute the query to get many records
    console.log ( await query.getMany());
    return await query.getMany();
 }
//creating a task
    async createTask(input: TaskInputType, user: UserEntity){
        //create a row in the Task table(TaskEntity)
        const task= new TaskEntity()
        task.title=input.title;
        task.description=input.description;
        task.status= TaskStatus.OPEN;

        task.user = user;

        //create a new row in the Task Table
        await task.save()

        //delete user property
        delete task.user;

        return task;
    }
}
