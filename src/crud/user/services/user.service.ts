import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { UserDto } from 'src/crud/user/dto/user.dto';
import { UserIdDto } from '../dto/user_id.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getAll() {
    return await this.prisma.users.findMany();
  }

  async getUser(userDto: UserDto): Promise<string> {
    const user = await this.prisma.users.findUnique({ where: { ...userDto } });
    if (!user) throw new NotFoundException('User not found');
    return JSON.stringify(user);
  }

  async validateUser(userDto: UserDto): Promise<boolean> {
    return !!(await this.prisma.users.findUnique({
      where: { username: userDto.username },
    }));
  }
}
