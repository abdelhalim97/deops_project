import { IsNotEmpty } from "class-validator";

export class createUerTask {
    @IsNotEmpty()
    email: string;
    @IsNotEmpty()
    password: string;
}