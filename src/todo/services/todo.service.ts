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

  async findAll(showDeleted: boolean): Promise<Todo[]> {
    return await this.model
      .find(showDeleted ? {} : { isDeleted: false })
      .exec();
  }

  async findOne(id: string): Promise<Todo> {
    return await this.model.findById(id).exec();
  }

  async create(todoDto: TodoDto): Promise<Todo> {
    return await new this.model(todoDto).save();
  }

  async update(id: string, todoDto: TodoDto): Promise<Todo> {
    return await this.model.findByIdAndUpdate(id, todoDto).exec();
  }

  async delete(id: string): Promise<Todo> {
    return await this.model
      .findByIdAndUpdate(id, {
        isDeleted: true,
      })
      .exec();
  }
}
