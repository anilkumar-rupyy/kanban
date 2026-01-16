import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ) { }

    async signIn(email: string, pass: string) {
        try {
            const user = await this.usersService.findByEmail(email);
            if (!user) throw new UnauthorizedException("Invalid Credentials");

            const valid = await bcrypt.compare(pass, user.pass);
            if (!valid) throw new UnauthorizedException("Invalid Credentials");

            const token = await this.signToken(user.id, user.email);
            return token;
        } catch (error) {
            throw error;
        }
    }


    async register(name: string, email: string, pass: string) {
        try {
            const existing = await this.usersService.findByEmail(email);
            if (existing) throw new ConflictException('Email already in use');

            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(pass, salt);
            const user = await this.usersService.createUser({ name, email, pass: hash })

            return this.signToken(user.id, user.email);
        } catch (error) {
            throw error;
        }
    }

    private signToken(userId: number, email: string) {
        const payload = { sub: userId, email };

        return {
            access_token: this.jwtService.sign(payload),
        }
    }

}
