import { IsNotEmpty, Length, IsEnum, IsEmail } from 'class-validator';

enum Role {
    ADMIN = "ADMIN",
    WAITER = "WAITER",
    KITCHEN = "KITCHEN",
    MANAGER = "MANAGER"
}

export class CreateUserInput {

    @IsNotEmpty({ message: 'Name is required' })
    name: string;

    @IsNotEmpty({ message: 'Email is required' })
    @IsEmail({} , { message: 'Invalid email address' })
    email: string;

    @IsNotEmpty({ message: 'Password is required' })
    @Length(8, 50, { message: 'The password must have at least 8 characters' })
    password: string;

    @IsNotEmpty({ message: 'Type is required' })
    @IsEnum(Role)
    type: Role;

    imagePath: string;
}
