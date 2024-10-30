import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskDto } from './create-task.dto';
import { IsEnum, IsOptional, IsString, Length } from 'class-validator';
import { TaskStatus } from '../utils/taskStatus.utils';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
  @IsOptional()
  @IsString()
  @Length(5, 20)
  title?: string;

  @IsOptional()
  @IsString()
  @Length(10, 200)
  description?: string;

  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;
}
