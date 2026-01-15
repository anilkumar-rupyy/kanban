import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService) {}

    @Post()
    createUser(@Body() craeteUserDTO: CreateUserDTO) {
        return this.usersService.createUser(craeteUserDTO);
    }

    @Get(':id')
    getUserById(@Param('id') id: number) {
        return this.usersService.findById(id);
    }

    @Get()
    findAll(): Promise<User[]> {
        return this.usersService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @Delete(":id")
    deleteUser(@Param('id') id: number) {
        return this.usersService.remove(id);
    }
}
