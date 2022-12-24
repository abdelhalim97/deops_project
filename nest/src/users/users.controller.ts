import { Controller, Post, Body, Param, Delete } from '@nestjs/common';
import { Get } from '@nestjs/common/decorators/http/request-mapping.decorator';
import { createUser } from 'src/tasks/dto/create-user.dto';
import { signinDto } from './dto/signin.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) { }
    @Post('/signup')
    async signup(@Body() userParams: createUser) {
        await this.usersService.signup(userParams)
    }
    @Post('/signin')
    async signin(@Body() signin: signinDto) {
        return await this.usersService.signin(signin)
    }
    @Get()
    async users() {
        return await this.usersService.users()
    }
    @Delete('/:id')
    async deleteUser(@Param('id') id: string) {
        return await this.usersService.deleteUser(id)
    }
}
