import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/entities/User.entity";
import { Repository } from "typeorm";
import { JwtPayload } from './dto/jwt-payload'
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(@InjectRepository(User) private userRepository: Repository<User>) {
        super({ secretOrKey: 'topSecret51', jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken() })
    }
    async validate(payload: JwtPayload): Promise<string> {
        const id = payload.payload
        const user: User = await this.userRepository.findOneBy({ id })
        if (!user) throw new HttpException('Forbidden', HttpStatus.UNAUTHORIZED)
        return id
    }
}
