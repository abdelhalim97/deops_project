import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { CreateTaskDTO } from './dto/create-task.dto';
import { GetTaskDTO } from './dto/get-task.dto';
import { UpdateTaskStatusDTO } from './dto/update-task-status.dto';
import { Task } from '../utils/task.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) { }
    @Get()
    async getTasks() {//we dont use dtos here coz user can send in req more data but wont save in db
        return await this.tasksService.getTasks()
    }
    @Post()
    // createTask(@Body() body):Task{
    //     return this.tasksService.createTask(body.title,body.description)
    // }
    createTask(@Body() CreateTaskDTO: CreateTaskDTO) {//@Body('title') title:string,@Body('description') description:string
        this.tasksService.createTask(CreateTaskDTO)
    }
    @Get('/:id')
    async getTaskById(@Param('id') id: string) {
        return await this.tasksService.getTaskById(id)
    }
    @Delete('/:id')
    deleteTask(@Param('id') id: string): void {
        return this.tasksService.deleteTask(id)
    }
    @Put('/:id')
    async updateTask(@Param('id') id: string, @Body() UpdateTaskStatusDTO: UpdateTaskStatusDTO) {
        await this.tasksService.updateTask(id, UpdateTaskStatusDTO)
    }

}
