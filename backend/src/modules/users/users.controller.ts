import { Public } from '@/helpers/setPubicPage';
import { CreateUserDto } from '@/modules/users/dto/create-user.dto';
import { DeleteUserDto } from '@/modules/users/dto/delete-user.dto';
import { UpdateUserDto } from '@/modules/users/dto/update-user.dto';
import { UsersService } from '@/modules/users/users.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll(
    @Query() query: string,
    @Query('current') current?: string,
    @Query('pageSize') pageSize?: string,
    @Query('sort') sort?: string,
  ) {
    return this.usersService.findAll(query, +current, +pageSize, sort);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch()
  update(@Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(updateUserDto);
  }

  @Delete()
  remove(@Body() @Body() deleteUserDto: DeleteUserDto) {
    return this.usersService.remove(deleteUserDto._id);
  }

  @Public()
  @Post('register')
  handleRegister(@Body() createUserDto: CreateUserDto) {
    return this.usersService.handleRegister(createUserDto);
  }

  @Public()
  @Post('verify')
  handleActive(@Body() data: { code: string }) {
    return this.usersService.handleActive(data.code);
  }
}
