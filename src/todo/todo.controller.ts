import { Body, Controller, Delete, ForbiddenException, Get, NotFoundException, Param, Patch, Post, Put, Req, UnauthorizedException, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { TodoService } from './todo.service';
import { GetUser } from 'src/auth/get-user.decorator';

@Controller('todo')
export class TodoController {
    constructor(private readonly todoService: TodoService) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    createTodo(@GetUser() user: {userId: number; email: string}, @Body() { title }: { title: string }) {
        try {
            // get user id from authorization token 
            const userId = user.userId;
            if (!userId) {
                throw new NotFoundException('User not authorized');
            }

            return this.todoService.createTodo(userId, title);
        } catch (error) {
            throw error;
        }
    }

    @UseGuards(JwtAuthGuard)
    @Get("debug")
    debug(@Req() req) {
        return req.user;
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    getTodosForUser(@GetUser() user: {userId: number; email: string}) {
        return this.todoService.getTodosForUser(user.userId);
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    getTodoById(@Param('id') id: number) {
        return this.todoService.getTodoById(id);
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    updateTodoStatus(
        @Param('id') id: number,
        @Body('completed') completed: boolean,
    ) {
        return this.todoService.updateCompletionStatus(id, completed);
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    updateTodo(
        @Param('id') id: number,
        @Body('title') title: string,
    ) {
        return this.todoService.updateTodo(id, title);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async deleteTodo(@GetUser() user: {userId: number; email: string}, @Param('id') id: number) {
        try {
            if (!user.userId) {
                throw new UnauthorizedException('User not authorized');
            }

            const todo = await this.todoService.getTodoById(id);
            if (todo.user.id !== user.userId) {
                throw new ForbiddenException('User not authorized to delete this todo');
            }

            return this.todoService.deleteTodo(id);
        } catch (error) {
            throw error;
        }
    }
}
