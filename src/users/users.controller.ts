import { Controller, Get, Post, UseGuards, Body, Put, Param, Delete, HttpStatus, HttpCode } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport'
import { CreateUserInput, UpdateUserInput } from './dto';

@Controller('api/v1/users')
@UseGuards(AuthGuard('jwt'))
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  @HttpCode(204)
  async createUser(@Body() input: CreateUserInput) {
    return await this.usersService.createUser(input)
  }

  @Get()
  async getAllUsers() {
    return await this.usersService.findAll()
  }

  @Get(':id')
  async getOneUser(@Param('id') id: string) {
    return await this.usersService.findOneById(id);
  }

  @Put(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async updateUser(@Body() input: UpdateUserInput, @Param('id') id: string) {
    return await this.usersService.update(input, id)
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.usersService.remove(id);
  }
}
