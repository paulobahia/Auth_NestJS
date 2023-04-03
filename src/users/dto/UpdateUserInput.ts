import { IsOptional } from 'class-validator';

export class UpdateUserInput {

    @IsOptional()
    name?: string;

    @IsOptional()
    imagePath?: string;
}