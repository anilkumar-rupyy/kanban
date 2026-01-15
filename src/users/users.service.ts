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
        const user = this.usersRepo.create(createUserDTO);
        return this.usersRepo.save(user);
    }
    
    findByEmail(email: string) {
        return this.usersRepo.findOne({ where: { email } });
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
