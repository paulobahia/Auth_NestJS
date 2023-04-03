import { IsNotEmpty, Length, IsEnum, IsEmail, MinLength, MaxLength, Matches } from 'class-validator';
import { MessagesHelper } from 'src/helpers/messages.helper';
import { RegExHelper } from 'src/helpers/regex.helper';

enum Role {
    ADMIN = "ADMIN",
    WAITER = "WAITER",
    KITCHEN = "KITCHEN",
    MANAGER = "MANAGER"
}

export class CreateUserInput {

    @IsNotEmpty({ message: MessagesHelper.NAME_REQUIRED })
    name: string;

    @IsNotEmpty({ message: MessagesHelper.EMAIL_REQUIRED })
    @IsEmail({}, { message: MessagesHelper.EMAIL_VALID })
    email: string;

    @IsNotEmpty({ message: MessagesHelper.PASSWORD_REQUIRED })
    @MinLength(8)
    @MaxLength(30)
    @Matches(RegExHelper.password, { message: MessagesHelper.PASSWORD_VALID })
    password: string;

    @IsNotEmpty({ message: MessagesHelper.TYPE_REQUIRED })
    @IsEnum(Role)
    type: Role;

    imagePath: string;
}
