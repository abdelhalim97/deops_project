import { Controller, Post, Param, Body, UseGuards, Req, Get, Delete } from '@nestjs/common';
import { AddProductDto, BuyProductDto, CreateProductDto } from './dto/product.dto';
import { ProductsService } from './products.service';
import { AuthGuard } from '@nestjs/passport'
@Controller('products')
export class ProductsController {
    constructor(private productsService: ProductsService) { }
    @Post('/create')
    @UseGuards(AuthGuard())
    async createProduct(@Req() req, @Body() createProduct: CreateProductDto,) {
        console.log('test');
        return await this.productsService.createProduct(req.user, createProduct)
    }
    @Post('/:id/buy')
    @UseGuards(AuthGuard())
    async buyProduct(@Param('id') id: string, @Body() buyProduct: BuyProductDto) {
        await this.productsService.buyProduct(id, buyProduct)
    }
    @Post('/:id/add')
    @UseGuards(AuthGuard())
    async addProduct(@Param('id') id: string, @Body() buyProduct: AddProductDto) {
        await this.productsService.addProduct(id, buyProduct)
    }
    @Get()
    async products() {
        return await this.productsService.products()
    }
    @Get('/:id')
    async product(@Param('id') id: string) {
        return await this.productsService.product(id)
    }
    @Delete()
    async deleteProducts() {
        return await this.productsService.deleteProducts()
    }
}
