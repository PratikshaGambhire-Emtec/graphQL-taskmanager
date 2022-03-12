/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "src/entity/user.entity";
import { User } from "src/users/users.model";
import { CreateTaskDTO } from "./dto/create.task.dto";
import { SearchTaskDTO } from "./dto/search.task.dto";
import { TaskRepository } from "./task.respository";
import { TaskStatus } from "./tasks.enum";
import { TaskInputType } from "./types/task.input";


@Injectable()
export class TaskService {
  
    constructor(
        //add the dependency for TaskRepository
        @InjectRepository(TaskRepository)
        private taskrepository: TaskRepository
    ){} 
       
    // return tasks
   async getTasks( user:UserEntity) {
     return this.taskrepository.getTask( user)
    }
  
    // create a new task
    async createTask(input: TaskInputType, user: UserEntity) {

        //get a new row created for the task
        return this.taskrepository.createTask(input, user)
    }

   async getTaskById(id: string){
      //select * from Task where id = {id}
      const task= await this.taskrepository.findOne(id); 
        if(!task){
          throw new NotFoundException('task not found');

        }
        return task;
      }

   async updateTaskStatus(id: string, status: TaskStatus) {     
    const task= await this.getTaskById(id)
    
    task.status= status
    await task.save();

    return task;
  }
  
    async deleteTask(id: string) {
      const result=await this.taskrepository.delete(id)
      
      if(result.affected==0){
        throw new NotFoundException('Task not found')
      }

      return result;
    }
  }






























// function createTask(createTaskDto: any, CreateTaskDTO: typeof CreateTaskDTO) {
//     throw new Error("Function not implemented.");
// }
// export class TaskServices{
//     tasks:Task[]=[];

//     addTask(taskName:string, taskStatus:string, username:string) {
//         const newTask= new Task(taskName,taskStatus,username);
//         this.tasks.push(newTask);
//     }
    

//     getTask(tName:string){
//         const targetTask=this.tasks.find((tas) => tas.name === tName);
//         if(!targetTask){
//             return 'No such task found';
//         }
//         return {...targetTask};
//     }
    
//     updateTaskStatus(tname:string, tstatus:string,tuser:string)
//     {
//         const targetTask=this.tasks.find((tas)=> tas.name===tname);
//         if(!targetTask)
//         {
//             return 'No such task found'
//         }
//         targetTask.status=tstatus;
//         targetTask.taskStatus=tstatus;
//         targetTask.user=tuser;
//         targetTask.username=tuser;
//         return {...targetTask};
//     }

//     deletetask(tname:string)
//     {
//         const targetTask=this.tasks.find((tas) => tas.taskName === tname);
//         if(!targetTask){
//             return 'No such task found';
//         }
//         else{
//             var arr=this.tasks
//             this.tasks=this.tasks.filter(function(task,index, arr){
//                 return task!=targetTask;
//             })
//             return 'Task deleted successfully';
//         }
//     }
// }