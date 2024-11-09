import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt'

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private UserRepository: Repository<User>
    ){}

    async findByEmail(email: string): Promise<User | null>{
        const user = this.UserRepository.findOne({where: {email}})
        return user
    }
    
    async findById(id: string) {
        return await this.UserRepository.findOne({ where: { id } });
    }

    async create(createUserDto: CreateUserDto): Promise<User>{
        const passHash = await bcrypt.hash(createUserDto.password,10)
        const user = this.UserRepository.create({
            email: createUserDto.email,
            fullname: createUserDto.fullname,
            passhash : passHash
        });
        return this.UserRepository.save(user)
    }
}