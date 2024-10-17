import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { BoardsService } from './boards.service';
import { Auth } from '../auth/decorators/roles.decorator';
import { USER_ROLES } from '../users/entities/user.entity';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { PageRequestDto } from '../common/dto/page-request.dto';

@Controller('boards')
export class BoardsController {
  constructor(private boardsService: BoardsService) {}

  @Get()
  async getBoards(@Query() query: PageRequestDto) {
    return this.boardsService.getBoards(query);
  }

  @Post()
  @Auth(USER_ROLES.ADMIN)
  async createBoard(@Body() createBoardDto: CreateBoardDto) {
    const category = await this.boardsService.getByName(createBoardDto.name);
    if (category) {
      throw new HttpException('이미 존재하는 카테고리입니다.', 400);
    }
    return this.boardsService.createBoard(createBoardDto);
  }

  @Patch(':id')
  @Auth(USER_ROLES.ADMIN)
  async updateBoard(
    @Param('id') id: string,
    @Body() updateBoardDto: UpdateBoardDto,
  ) {
    return this.boardsService.updateBoard(id, updateBoardDto);
  }

  @Get(':id')
  async getBoard(@Param('id') id: string) {
    return this.boardsService.getBoard(id);
  }

  @Delete(':id')
  @Auth(USER_ROLES.ADMIN)
  async deleteBoard(@Param('id') id: string) {
    return this.boardsService.deleteBoard(id);
  }
}
