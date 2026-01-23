import { Todo } from "src/todo/todo.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    name: string;

    @Column({ nullable: false, unique: true })
    email: string;

    @Column({ nullable: false })
    pass: string;

    @CreateDateColumn()
    createdAt: Date;

    @OneToMany(() => Todo, todo => todo.userId, {onDelete: 'CASCADE'})
    todos: Todo[];
}