import { ConflictException, Injectable, InternalServerErrorException, BadRequestException } from '@nestjs/common';
import { encodePassword } from 'src/utils/bcrypt';
import { CreateUserInput, UpdateUserInput } from './dto';
import { UserRepository } from './repositories';
import { MessagesHelper } from 'src/helpers/messages.helper';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) { }

  async createUser(input: CreateUserInput) {
    const foundUserByEmail = await this.userRepository.findUniqueById({
      email: input.email
    })

    if (foundUserByEmail)
      throw new ConflictException('Username or password is invalid');

    const password = encodePassword(input.password)

    try {
      return this.userRepository.create({ ...input, password });
    } catch {
      throw new InternalServerErrorException();
    }
  }

  async findAll() {
    return await this.userRepository.findAll()
  }

  async update(input: UpdateUserInput, id: string) {
    const foundUserById = await this.userRepository.findUniqueById({
      id: id
    })

    if (!foundUserById)
      throw new BadRequestException(MessagesHelper.USER_NOT_FOUND)
    try {
      return this.userRepository.update(input, id)
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async findOneById(id: string) {
    try {
      return await this.userRepository.findUniqueById({ id: id })
    } catch (error) {
      throw new BadRequestException(MessagesHelper.PASSWORD_OR_EMAIL_INVALID)
    }
  }

  async findOneByEmail(email: string) {
    try {
      return await this.userRepository.findUniqueByEmail({ email: email })
    } catch (error) {
      throw new BadRequestException(MessagesHelper.PASSWORD_OR_EMAIL_INVALID)
    }
  }

  async remove(id: string) {
    return await this.userRepository.delete(id)
  }
}
