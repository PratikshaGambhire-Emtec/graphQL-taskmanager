/* eslint-disable prettier/prettier */
import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class TaskInputType {
  @Field() 
  title: string;

  @Field() 
  description: string;
}   