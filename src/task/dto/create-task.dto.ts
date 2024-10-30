import { IsDate, IsEnum, IsOptional, IsString, Length } from 'class-validator';
import { TaskStatus } from '../utils/taskStatus.utils';
import { Type } from 'class-transformer';

export class CreateTaskDto {
  @IsString()
  @Length(5, 20)
  title: string;

  @IsString()
  @Length(10, 200)
  description: string;

  @IsOptional() // By default our entity set the status to PENDING
  @IsEnum(TaskStatus)
  status?: TaskStatus;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  completionDate?: Date;

  // user Id is provided by the auth module
}
