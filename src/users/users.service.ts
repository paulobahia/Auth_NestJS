import { ConflictException, Injectable, InternalServerErrorException, BadRequestException } from '@nestjs/common';
import { encodePassword } from 'src/utils/bcrypt';
import { CreateUserInput, UpdateUserInput } from './dto';
import { UserRepository } from './repositories';

@Injectable()
export class UsersService {

  constructor(private readonly userRepository: UserRepository) { }

  async createUser(input: CreateUserInput) {
    const foundUserByEmail = await this.userRepository.findByUnique({
      email: input.email
    })

    if (foundUserByEmail)
      throw new ConflictException('Username or password is invalid');

    const password = encodePassword(input.password)

    try {
      return this.userRepository.create({ ...input, password});
    } catch {
      throw new InternalServerErrorException();
    }
  }

  getAllUsers() {
    return this.userRepository.findAll()
  }

  async updateUser(input: UpdateUserInput, id: string) {
    const foundUserById = await this.userRepository.findByUnique({
      id: id
    })

    if (!foundUserById)
      throw new BadRequestException('Usuário não existe')

    try {
      return this.userRepository.update(input, id)
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  findOne(id: string) {
    return this.userRepository.findByUnique({ id: id })
  }

  remove(id: string) {
    return this.userRepository.delete(id)
  }
}
