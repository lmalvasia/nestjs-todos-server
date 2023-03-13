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
  UseGuards,
  Request,
} from '@nestjs/common';
import { TodoDto } from '../dto/todo.dto';
import { TodoService } from '../services/todo.service';
import { AuthGuard } from '../../firebase/auth.guard';

@Controller('todos')
@UseGuards(AuthGuard)
export class TodoController {
  constructor(private readonly service: TodoService) {}

  @Get()
  async index(
    @Request() { userId },
    @Query('showDeleted', new DefaultValuePipe(false), ParseBoolPipe)
    showDeleted: boolean,
  ) {
    return await this.service.findAll(showDeleted, userId);
  }

  @Get(':id')
  async find(@Request() { userId }, @Param('id') id: string) {
    return await this.service.findOne(id, userId);
  }

  @Post()
  async create(@Request() { userId }, @Body() todoDto: TodoDto) {
    return await this.service.create(todoDto, userId);
  }

  @Put(':id')
  async update(
    @Request() { userId },
    @Param('id') id: string,
    @Body() todoDto: TodoDto,
  ) {
    return await this.service.update(id, todoDto, userId);
  }

  @Delete(':id')
  async delete(@Request() { userId }, @Param('id') id: string) {
    return await this.service.delete(id, userId);
  }
}
