import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/entities/product.entity';
import { User } from 'src/entities/User.entity';
import { Repository } from 'typeorm';
import { AddProductDto, BuyProductDto, CreateProductDto } from './dto/product.dto';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        @InjectRepository(Product) private productRepository: Repository<Product>) { }

    createProduct = async (id: string, CreateUserProduct: CreateProductDto) => {
        const user = await this.userRepository.findOneBy({ id })
        if (user.role !== 'admin') throw new HttpException(`you are not admin`, HttpStatus.FORBIDDEN);
        const newProduct = await this.productRepository.create({ ...CreateUserProduct, user })
        const savedProduct = await this.productRepository.save(newProduct)
        return savedProduct
    }
    buyProduct = async (id: string, BuyProduct: BuyProductDto) => {
        const product = await this.productRepository.findOneBy({ id })
        if (!product) throw new HttpException("product not found", HttpStatus.NOT_FOUND);
        const { quantity } = BuyProduct
        if (quantity > product.quantity) throw new HttpException(`we dont have ${quantity} from this product`, HttpStatus.CONFLICT);
        product.quantity -= quantity
        await this.productRepository.save(product)
        return product
    }
    addProduct = async (id: string, BuyProduct: AddProductDto) => {
        const product = await this.productRepository.findOneBy({ id })
        if (!product) throw new HttpException("product not found", HttpStatus.NOT_FOUND);
        const { quantity } = BuyProduct
        product.quantity += quantity
        await this.productRepository.save(product)
        return product
    }
    products = async () => {
        const products = await this.productRepository.find()
        console.log(products);
        return products
    }
    product = async (id: string) => {
        const product = await this.productRepository.findOneBy({ id })
        return product
    }
    deleteProducts = async () => {
        const products = await this.productRepository.delete({})
        return products
    }
}
