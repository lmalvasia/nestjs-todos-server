import { IsString, IsBoolean } from 'class-validator';

export class TodoDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsBoolean()
  isCompleted: boolean;

  @IsBoolean()
  isDeleted: boolean;
}
