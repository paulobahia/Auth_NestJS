export class CreateUserInput {
    name: string;
    email: string;
    password: string;
    type: string;
    imagePath: string;
}

export class UpdateUserInput {
    name?: string;
    email?: string;
    password?: string;
    type?: string;
    imagePath?: string;
}
