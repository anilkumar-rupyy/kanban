import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDTO } from './dto/create-user.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepo: Repository<User>,
    ) {}

    createUser(createUserDTO: CreateUserDTO){
        try {
            const user = this.usersRepo.create(createUserDTO);
            if (!user) {
                throw new Error('User creation failed');
            }

            return this.usersRepo.save(user);
        } catch (error) {
            throw error;
        }
    }

    async findByEmail(email: string) {
        try {
            const user = await this.usersRepo.findOne({ where: { email } });
            return user;
        } catch (error) {
            throw error;
        }
    }

    findById(id: number) {
        return this.usersRepo.findOne({ where: { id } });
    }

    findAll(): Promise<User[]> {
        return this.usersRepo.find();
    }

    remove(id: number) {
        return this.usersRepo.delete(id);
    }
}
