import { IsNumber, IsString } from "class-validator";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User.entity";
@Entity()
export class Product {
    @PrimaryColumn('uuid')
    id: string
    @Column("text")
    @IsString()
    base64: string
    @Column()
    @IsString()
    name: string
    @Column()
    @IsNumber()
    quantity: number
    @ManyToOne(() => User, (user) => user.products, { cascade: true })
    @JoinColumn()
    user: User
}