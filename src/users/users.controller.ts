import { Controller, Get, Post, Body, Put, Param, Delete, BadRequestException, HttpCode } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserInput, UpdateUserInput } from './dto/CreateUserInput';
import { zodCreateUserInput, zodUpdateUserInput } from 'src/zod/users';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  @HttpCode(204)
  async createUser(@Body() input: CreateUserInput) {
    const isValidInput = zodCreateUserInput.parse(input)

    if (!isValidInput) throw new BadRequestException ('Seu input está inválido')

    return this.usersService.createUser(input)
  }

  @Get() 
  getAllUsers() {
    return this.usersService.getAllUsers()
  }

  @Get(':id')
  getOneUser(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Put(':id')
  @HttpCode(204)
  async updateUser(@Body() input: UpdateUserInput,@Param('id') id: string ) {
    const isValidInput = zodUpdateUserInput.parse(input)

    if (!isValidInput) throw new BadRequestException ('Seu input está inválido')

    return this.usersService.updateUser(input, id)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
