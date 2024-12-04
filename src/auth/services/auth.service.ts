import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { Users } from '../../database/schema/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDto } from '../dto/user.dto';
import { UserService } from 'src/crud/user/services/user.service';
import { UUID } from 'crypto';
import { JwtStrategy } from '../strategys/auth.strategy';

@Injectable()
export class JwtAuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
    private readonly UserService: UserService,
  ) { }

  async validateUser2(UserDto: UserDto) {

    return !!(await this.userRepository.findOne({ where: { username: UserDto.username } }));
  }

  async validateToken(token: string): Promise<boolean> {
    try {
      const decoded = await this.jwtService.verify(token);
      return !!(await this.userRepository.findOne({ where: { username: decoded.username } }));
    } catch {
      return false;
    }
  }


  async signPayload(userDto: UserDto): Promise<any> {
    
    const isValidUser = await this.UserService.validateUser(userDto);
    if (!isValidUser) throw new BadRequestException("Err");

    const payload = { username: userDto.username, password: userDto.password};
    return this.jwtService.sign(payload);
  }

}
