import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/entities/product.entity';
import { User } from 'src/entities/User.entity';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [TypeOrmModule.forFeature([Product, User]),
  PassportModule.register({ defaultStrategy: 'jwt' })
  ],
  controllers: [ProductsController],
  providers: [ProductsService]
})
export class ProdutsModule { }
