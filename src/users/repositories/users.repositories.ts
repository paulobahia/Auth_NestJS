import { Prisma } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma';

@Injectable()
export class UserRepository {
    constructor(private readonly prismaService: PrismaService) { }

    findAll() {
        return this.prismaService.user.findMany({
            select: {
                id: true,
                name: true,
                type: true,
                email: true
            }
        })
    }

    findUniqueById(input: Prisma.UserWhereUniqueInput) {
        return this.prismaService.user.findUnique({
            where: input,
            select: {
                id: true,
                name: true,
                type: true,
                email: true
            }
        })
    }

    findUniqueByEmail(input: Prisma.UserWhereUniqueInput) {
        return this.prismaService.user.findUnique({
            where: input,
        })
    }

    create(input: Prisma.UserCreateInput) {
        return this.prismaService.user.create({
            data: input
        })
    }

    update(input: Prisma.UserUpdateInput, id: string) {
        return this.prismaService.user.update({
            data: input,
            where: {
                id,
            },
        });
    }

    delete(id: string) {
        return this.prismaService.user.delete({
            where: {
                id
            }
        })
    }
}