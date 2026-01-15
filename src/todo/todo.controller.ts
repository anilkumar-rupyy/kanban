import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { TodoService } from './todo.service';

@Controller('todo')
export class TodoController {
    constructor(private readonly todoService: TodoService) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    createTodo(@Body('title') title: string) {
        return this.todoService.createTodo(title);
    }

    @UseGuards(JwtAuthGuard)
    @Get("debug")
    debug(@Req() req) {
        return req.user;
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    getTodosForUser(@Req() req) {
        return this.todoService.getTodosForUser(req.user.id);
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    getTodoById(@Param('id') id: number) {
        return this.todoService.getTodoById(id);
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    updateTodoStatus(
        @Body('id') id: number,
        @Body('completed') completed: boolean,
    ) {
        return this.todoService.updateCompletionStatus(id, completed);
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    updateTodo(
        @Body('id') id: number,
        @Body('title') title: string,
    ) {
        return this.todoService.updateTodo(id, title);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    deleteTodo(@Param('id') id: number) {
        return this.todoService.deleteTodo(id);
    }
}
