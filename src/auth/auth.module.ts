import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from 'src/config/configuration';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [
        UsersModule,
        PassportModule,
        ConfigModule.forRoot({
            isGlobal: true,
            load: [configuration],
        }),
        JwtModule.register({
            global: true,
            secret: configuration().jwt.secret,
            signOptions: { expiresIn: parseInt(configuration().jwt.expiresIn, 10) },
        })
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy],
})

export class AuthModule {}
