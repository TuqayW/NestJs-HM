import { IsEmail, IsString } from "class-validator";

export class RegisterDto{
    @IsEmail()
    email: string;

    @IsEmail()
    fullname: string;

    @IsString()
    password: string;
}