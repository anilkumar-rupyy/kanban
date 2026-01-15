import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { UsersController } from './users/users.controller';
import { UsersModule } from './users/users.module';
import { TodoController } from './todo/todo.controller';
import { TodoModule } from './todo/todo.module';
import { ConfigModule } from '@nestjs/config';
import { User } from './users/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import configuration from './config/configuration';
import { Todo } from './todo/todo.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: configuration().database.host,
      port: configuration().database.port,  
      username: configuration().database.user,
      password: configuration().database.pass,
      database: configuration().database.name,
      synchronize: true, // set to false in prod
      entities: [User, Todo],
    }),
    AuthModule, 
    UsersModule, 
    TodoModule
  ],
  controllers: [AppController, AuthController, UsersController, TodoController],
  providers: [AppService, AuthService],
})
export class AppModule {}
