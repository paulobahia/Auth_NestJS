import { IsOptional, Length, IsEnum, IsEmail } from 'class-validator';

enum Role {
    ADMIN = "ADMIN",
    WAITER = "WAITER",
    KITCHEN = "KITCHEN",
    MANAGER = "MANAGER"
}

export class UpdateUserInput {

    @IsOptional()
    name?: string;

    @IsOptional()
    @IsEmail({}, { message: 'Invalid email address' })
    email?: string;

    @IsOptional()
    @Length(8, 50, { message: 'The password must have at least 8 characters' })
    password?: string;
    
    @IsOptional()
    @IsEnum(Role)
    type?: Role;
    
    @IsOptional()
    imagePath?: string;
}