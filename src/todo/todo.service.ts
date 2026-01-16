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

    async createTodo(userId: number, title: string) {
        try {
            const todo = this.todoRepo.create({ title, user: { id: userId } });
            if (!todo) {
                throw new Error('Todo creation failed');
            }

            const savedTodo = await this.todoRepo.save(todo);
            if (!savedTodo) {
                throw new Error('Saving todo failed');
            }
            
            return savedTodo;
        } catch (error) {
            throw error;
        }
    }

    async updateTodo(id: number, title: string) {
        try {
            const todo = await this.todoRepo.findOne({ where: { id } });
            if (!todo) {
                throw new Error('Todo not found');
            }
            
            const updated = await this.todoRepo.update(id, { title });
            return updated;
        } catch (error) {
            throw error;
        }
    }

    async deleteTodo(id: number) {
        try {
            const todo = await this.todoRepo.findOne({ where: { id } });
            if(!todo) {
                throw new Error('Todo not found');
            }

            const deletedStatus = await this.todoRepo.delete(id);
            if (!deletedStatus) {
                throw new Error('Todo deletion failed');
            }
            
            return deletedStatus;
        } catch (error) {
            throw error;
        }
    }

    async updateCompletionStatus(id: number, completed: boolean) {
        try {
            const todo = await this.todoRepo.findOne({ where: { id } });
            if (!todo) {
                throw new Error('Todo not found');
            }

            const updatedResult = await this.todoRepo.update(id, { completed });
            if (!updatedResult) {
                throw new Error('Updating todo status failed');
            }

            return updatedResult;
        } catch (error) {
            throw error;
        }
    }


    async getTodosForUser(userId: number) {
        try {
            const todos = await this.todoRepo.find({ where: { user: { id: userId } } });
            return todos;
        } catch (error) {
            throw error;
        }
    }


    async getTodoById(id: number) {
        try {
            const todo = await this.todoRepo.findOne({ where: { id } });
            if(!todo) {
                throw new Error('Todo not found');
            }

            return todo;
        } catch (error) {
            throw error;
        }
    }
}
