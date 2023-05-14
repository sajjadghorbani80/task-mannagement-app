import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;
    const task: Task = {
      id: uuid(),
      title: title,
      description: description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);
    return task;
  }

  getTaskById(id: string): Task {
    const task = this.tasks.find((t) => t.id == id);
    return task;
  }

  deleteTaskById(id: string): boolean {
    const taskIndex = this.tasks.findIndex((t) => t.id === id);
    if (taskIndex == -1) throw Error('task not found');
    this.tasks.splice(taskIndex, 1);
    return true;
  }

  updateTaskStatus(id: string, status: TaskStatus): Task {
    const task = this.tasks.find((t) => t.id == id);
    if (task == undefined) throw Error('task not found');
    task.status = status;
    return task;
  }
}
