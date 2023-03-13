import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Todo, TodoDocument } from '../schemas/todo.schema';
import { TodoDto } from '../dto/todo.dto';

@Injectable()
export class TodoService {
  constructor(
    @InjectModel(Todo.name) private readonly model: Model<TodoDocument>,
  ) {}

  async findAll(showDeleted: boolean, userId: string): Promise<Todo[]> {
    return await this.model
      .find(
        showDeleted
          ? {
              userId,
            }
          : { isDeleted: false, userId },
      )
      .exec();
  }

  async findOne(id: string, userId: string): Promise<Todo> {
    return await this.model
      .findOne({
        id,
        userId,
      })
      .exec();
  }

  async create(todoDto: TodoDto, userId: string): Promise<Todo> {
    return await new this.model({
      ...todoDto,
      userId,
    }).save();
  }

  async update(id: string, todoDto: TodoDto, userId: string): Promise<Todo> {
    return await this.model
      .findOneAndUpdate(
        {
          id,
          userId,
        },
        todoDto,
      )
      .exec();
  }

  async delete(id: string, userId: string): Promise<Todo> {
    return await this.model
      .findOneAndUpdate(
        {
          id,
          userId,
        },
        {
          isDeleted: true,
        },
      )
      .exec();
  }
}
