import * as z from 'zod';

const TYPES = ['0', '1', '2', '3'] as const;

export const zodCreateUserInput = z.object({
    name: z.string({ required_error: "Name is required", invalid_type_error: "Name must be a string", }),
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(8, { message: "Password must be at least 8 characters long" }),
    type: z.enum(TYPES).optional(),
    imagePath: z.string().optional()    
})

export const zodUpdateUserInput = z.object({
    name: z.string({ required_error: "Name is required", invalid_type_error: "Name must be a string", }).optional(),
    email: z.string().email({ message: "Invalid email address" }).optional(),
    password: z.string().min(8, { message: "Password must be at least 8 characters long" }).optional(),
    type: z.enum(TYPES).optional(),
    imagePath: z.string().optional()
})