import { IsString, MinLength } from 'class-validator';

export class CreateArticleDto {
  @IsString()
  @MinLength(1)
  title: string;

  @IsString()
  @MinLength(1)
  content: string;

  @IsString()
  image: string;

  @IsString()
  imageDescription: string;

  @IsString()
  boardId: string;
}
