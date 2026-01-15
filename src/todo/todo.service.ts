import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Todo } from './todo.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TodoService {

    constructor(
        @InjectRepository(Todo)
        private todoRepo: Repository<Todo>,
    ) {}

    createTodo(userId: number, title: string) {
        return this.todoRepo.save({
            title,
            user: { id: userId },
         });
    }

    updateTodo(id: number, title: string) {
        return this.todoRepo.update(id, { title });
    }

    deleteTodo(id: number) {
        return this.todoRepo.delete(id);
    }

    updateCompletionStatus(id: number, completed: boolean) {
        return this.todoRepo.update(id, { completed });
    }


    getTodosForUser(userId: number) {
        return this.todoRepo.find({ where: { user: { id: userId } } });
    }


    getTodoById(id: number) {
        return this.todoRepo.findOne({ where: { id } });
    }
}
