/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
    import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { TypeOrmModule } from "@nestjs/typeorm";
import { GQLAuthGuard } from "./gql.authguard";
import { JwtStrategy } from "./jwt.strategy";
import { UserInput } from "./types/users.input";
import { UserResolver } from "./user.resolver";
import { User } from "./users.model";
import { UserRepository } from "./users.repository";
import { UserServices } from "./users.service";

@Module({
    imports: [
        //for JWT
        JwtModule.register({
            secret: 'secret',
            signOptions:{
                expiresIn:4200,
            },
        }), 
        //for passport
        PassportModule.register({
            defaultStrategy: 'jwt',
        }),


        //for TypeORM dependency
        TypeOrmModule.forFeature([UserRepository])],
    controllers:[],
    providers:[UserServices, JwtStrategy, UserResolver, UserInput, GQLAuthGuard],
    
    //to use these providers in the TaskModule
    exports: [JwtStrategy, PassportModule],
})

export class UserModule{}