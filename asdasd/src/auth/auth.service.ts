import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { LoginDto } from './login.dto';
import * as bcrypt from 'bcrypt'
import { RegisterDto } from './register.dto';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@Injectable()
export class AuthService {

    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) {}

    async validateUser(email: string, password: string){
        const user = await this.userService.findByEmail(email)
        if(user && await bcrypt.compare(password, user.passhash)){
            const {passhash, ...result} = user
            return result
        }
        return null
    }
    async validateUserFromToken(token: string) {
        try {
            const decoded = this.jwtService.verify(token);
            const userId = decoded.sub;

            const user = await this.userService.findById(userId); 

            if (user) {
                return user;
            }
            return null;
        } catch (error) {
            return null;
        }
    }
    async login(loginDto: LoginDto){
        const user = await this.validateUser(loginDto.email, loginDto.password);
        if (!user){
            throw new UnauthorizedException('Invalid Credentials')
        }
        const payload = {email: user.email, sub: user.id}

        const access_token = this.jwtService.sign(payload,{
            expiresIn: process.env.JWT_EXPIRES_MIN 
        })

        return {
            user,
            access_token: access_token
        }
    }

    async register(registerDto: RegisterDto){
        const createUserDto: CreateUserDto = {
            email: registerDto.email,
            fullname: registerDto.fullname,
            password: registerDto.password
        }
        const user = await this.userService.create(createUserDto)
        const payload = {email: user.email, sub: user.id}

        const access_token = this.jwtService.sign(payload,{
            expiresIn: process.env.JWT_EXPIRES_MIN 
        })
        
        return {
            user,
            access_token : access_token
        }
    }


}
