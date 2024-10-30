import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';
import { User } from 'src/auth/entities/auth.entity';
import { TaskStatus } from './utils/taskStatus.utils';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}

  async create(createTaskDto: CreateTaskDto, user: User) {
    const { title, description, status, completionDate } = createTaskDto;
    const task = this.taskRepository.create({
      title,
      description,
      status,
      user,
      completionDate,
    });
    return this.taskRepository.save(task);
  }

  async findAll(user: User, status: TaskStatus) {
    if (!status) return this.taskRepository.find({ where: { user } });
    return this.taskRepository.find({ where: { user, status } });
  }

  async findOneById(id: string, user: User) {
    const task = await this.taskRepository.findOne({ where: { id, user } });
    if (!task) throw new NotFoundException('Task not found');
    return task;
  }

  async update(id: string, updateTaskDto: UpdateTaskDto, user: User) {
    const task = await this.findOneById(id, user);

    const { title, description, status, completionDate } = updateTaskDto;

    if (title) task.title = title;
    if (description) task.description = description;
    if (status) task.status = status;
    if (completionDate) task.completionDate = completionDate;

    return this.taskRepository.save(task);
  }

  async remove(id: string, user: User) {
    const result = await this.taskRepository.delete({ id, user });
    if (result.affected === 0) throw new NotFoundException('Task not found');
    return result;
  }
}
