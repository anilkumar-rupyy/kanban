import { Todo } from "src/todo/todo.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    pass: string;

    @CreateDateColumn()
    createdAt: Date;

    @OneToMany(() => Todo, todo => todo.user)
    todos: Todo[];
}