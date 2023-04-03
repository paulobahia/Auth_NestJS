import { Injectable } from '@nestjs/common';
import { compareSync } from 'bcrypt'
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UsersService,
        private readonly jwtService: JwtService,
    ) { }

    async authUser(user) {
        const payload = { sub: user.id, email: user.email, type: user.type, imagePath: user.imagePath }

        return {
            access_token: this.jwtService.sign(payload)
        }
    }

    async validateUser(email: string, password: string) {
        let user

        try {
            user = await this.userService.findOneByEmail(email);
        } catch (error) {
            return null;
        }

        const isPasswordValid = compareSync(password, user.password);
        if (!isPasswordValid) return null;

        return user;
    }

}
