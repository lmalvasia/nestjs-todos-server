import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseBoolPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { TodoDto } from '../dto/todo.dto';
import { TodoService } from '../services/todo.service';

@Controller('todos')
export class TodoController {
  constructor(private readonly service: TodoService) {}

  @Get()
  async index(
    @Query('showDeleted', new DefaultValuePipe(false), ParseBoolPipe)
    showDeleted: boolean,
  ) {
    return await this.service.findAll(showDeleted);
  }

  @Get(':id')
  async find(@Param('id') id: string) {
    return await this.service.findOne(id);
  }

  @Post()
  async create(@Body() todoDto: TodoDto) {
    return await this.service.create(todoDto);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() todoDto: TodoDto) {
    return await this.service.update(id, todoDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.service.delete(id);
  }
}
