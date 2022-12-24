import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from '../entities/task.entity';
import { User } from 'src/entities/User.entity';
import { Product } from 'src/entities/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Task, User, Product])],
  controllers: [TasksController],
  providers: [TasksService]
})
export class TasksModule { }
