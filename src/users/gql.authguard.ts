/* eslint-disable prettier/prettier */
import { ExecutionContext, Injectable } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class GQLAuthGuard extends AuthGuard('jwt'){

    constructor(){
        super();
    }

    getRequest(context: ExecutionContext){

        // create a new GraphQL context using the default context
        const ctx=GqlExecutionContext.create(context)
        
        // return the graphQL context request
        return ctx.getContext().req;
    }
}