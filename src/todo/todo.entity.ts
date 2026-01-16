import { User } from "src/users/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Todo {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @ManyToOne(() => User, user => user.todos, { onDelete: 'CASCADE' })
    user: User;

    @Column({ default: false })
    completed: boolean;
    
    
}