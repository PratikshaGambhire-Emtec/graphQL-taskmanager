/* eslint-disable prettier/prettier */
import { UserEntity } from "src/entity/user.entity";
import { EntityRepository, Repository } from "typeorm";
import { AuthCredentialsDTO } from "./dto/auth.credentials.dto";
import * as crypto from 'crypto-js';
import { UserInput } from "./types/users.input";
@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity>{

    
    async signup(UserInput: UserInput) {
      //  create a row for user table
        const user= new UserEntity()
        user.userName=UserInput.userName
        
        //encrypt the password
        user.userPassword= `${crypto.MD5(UserInput.userPassword)}`;
        
        //commit the row
        await user.save();

        // return the current user;
        return user
    }
   
    async signin(UserInput: UserInput) {
        const {userName, userPassword}= UserInput;

        //find the user by user name
        const user = await this.findOne({ userName })
        //console.log(user);

        //check if user exists
        //const passwordValidation = user.validatePassword(userPassword)
        //console.log(`password validation = ${passwordValidation}`)
        if (!user){
            return null;
        }

        // const passwordValidation = user.validatePassword(userPassword)
        // console.log(`password validation = ${passwordValidation}`)
        if(!user.validatePassword(userPassword)){
            return null;
        }
        
        return user;
    }
}