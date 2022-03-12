/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { AuthCredentialsDTO } from "./dto/auth.credentials.dto";
import { JwtPayload } from "./jwt.payload";
import { UserInput } from "./types/users.input";
import { User } from "./users.model";
import { UserRepository } from "./users.repository";

@Injectable()
export class UserServices{

    //dependency injection
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        
        //for creating jwt token
        private jwtService: JwtService,
    
    
        ){}
    async signup(UserInput: UserInput) {
        return this.userRepository.signup(UserInput);
    }


    async signin(UserInput: UserInput) {
    const user =await this.userRepository.signin(UserInput);
        
    if(!user){
        throw new NotFoundException('user not found ')
    }
  
    //create the JWT token
    const payload: JwtPayload= {
         userName: user.userName, 
         id:user.id, };
    
         //create and return the token
    const token =  await this.jwtService.sign(payload);

    //return the token
    return{token, user};
}


}





























// export class UserServices{
//     users:User[]=[];

//     adduser(name:string, email:string, password:string) {
//         const newuser= new User(name,email,password);
//         this.users.push(newuser);
//     }


//     getuser(name:string){
//         const targetuser=this.users.find((tuser) => tuser.name === name);
//         if(!targetuser){
//             return 'No such user found';
//         }
//         return {...targetuser};
//     }
    
//     updateuserPass(name:string, email:string, password:string)
//     {
//         const targetuser=this.users.find((tuser)=> tuser.name===name);
//         if(!targetuser)
//         {
//             return 'No such user found';
//         }
//         if(targetuser.email===email)
//         {
//             targetuser.userPassword=password;
//             targetuser.password=password;
//             return 'Password successfully Updated';
//         }
//         else{
//             return 'Wrong details provided';
//         }
//     }

//     deleteUser(name:string){
//         const targetTask=this.users.find((tuser) => tuser.name === name);
//         if(!targetTask){
//             return 'No such task found';
//         }
//         else{
//             var arr=this.users
//             this.users=this.users.filter(function(user,index, arr){
//                 return user!=targetTask;
//             })
//             return 'Task deleted successfully';
//         }
//     }
// }