import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';


@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post("register")
    register(@Body() body: {name: string; email: string; pass: string;}) {
        console.log(body.name, body.email, body.pass);
        return this.authService.register(body.name, body.email, body.pass);
    }

    @Post("login")
    login(@Body() body: {email: string; pass: string;}) {
        return this.authService.signIn(body.email, body.pass);
    }
}