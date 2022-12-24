import { IsNumber, IsString } from "class-validator";

export class BuyProductDto {
    @IsNumber()
    quantity: number;
}
export class AddProductDto {
    @IsNumber()
    quantity: number;
}
export class CreateProductDto {
    @IsString()
    id: string;
    @IsString()
    base64: string;
    @IsString()
    name: string;
    @IsNumber()
    quantity: number;
}
