import { UserRole } from "src/utils/user.types";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./product.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string
    @Column()
    fullname: string
    @Column({ unique: true })
    email: string
    @Column({ type: "enum", enum: UserRole, default: UserRole.USER })
    role: string
    @Column()
    password: string
    @OneToMany(() => Product, (product) => product.user)
    @JoinColumn()
    products: Product[];
}