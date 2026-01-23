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
import { ObservabilityModule } from './observability/observability.module';
import { ThrottlerGuard } from "@nestjs/throttler";
import { ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

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
    ThrottlerModule.forRoot([
      {
        name: 'short',
        ttl: 1000,
        limit: 3,
      },
      {
        name: 'medium',
        ttl: 10000,
        limit: 20,
      },
    ]),
    AuthModule, 
    UsersModule, 
    TodoModule,
    ObservabilityModule
  ],
  controllers: [AppController, AuthController, UsersController, TodoController],
  providers: [
    AppService, 
    AuthService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    }
  ],
})
export class AppModule {}
