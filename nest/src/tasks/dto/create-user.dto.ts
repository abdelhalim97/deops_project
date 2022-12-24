import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class createUser {
    @IsString()
    fullname: string;
    @IsNotEmpty()
    @IsEmail()
    email: string;
    @IsNotEmpty()
    @MinLength(6)
    password: string;
}