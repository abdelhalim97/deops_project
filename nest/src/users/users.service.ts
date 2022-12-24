import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/entities/product.entity';
import { User } from 'src/entities/User.entity';
import { Repository } from 'typeorm';
import { sigupDto } from './dto/signup.dto';
import * as bcrypt from 'bcryptjs'
import { signinDto } from './dto/signin.dto';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        @InjectRepository(Product) private productRepository: Repository<Product>,
        private jwtService: JwtService) { }

    signup = async (createUserParams: sigupDto) => {
        const { email, password, fullname } = createUserParams
        const salt = await bcrypt.genSalt()
        const hashedPass = await bcrypt.hash(password, salt)
        const isUserEmailExist = await this.userRepository.findOneBy({ email: email.toLowerCase() });
        if (isUserEmailExist) throw new HttpException('email_already_exists', HttpStatus.CONFLICT);
        const user = await this.userRepository.create({ email, password: hashedPass, fullname })
        await this.userRepository.save(user)
        return user
    }
    signin = async (signin: signinDto) => {
        const { email, password } = signin
        const user = await this.userRepository.findOneBy({ email })
        if (!user) throw new HttpException('email_doesnt_exist', HttpStatus.NOT_FOUND)
        const hashedPAss = await bcrypt.compare(password, user.password)
        if (!hashedPAss) throw new HttpException('wrong_password', HttpStatus.UNAUTHORIZED)
        const payload = user.id
        const token: string = await this.jwtService.sign({ payload })
        console.log({ token });
        return { token, role: user.role }
    }
    users = async () => {
        const users = await this.userRepository.find()
        return users
    }
    deleteUser = async (id) => {
        const deletedUser = await this.userRepository.delete({ id })
        return deletedUser
    }
}
