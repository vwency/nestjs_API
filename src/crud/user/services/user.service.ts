import { Injectable, NotFoundException } from '@nestjs/common';
import { UserDto } from 'src/crud/user/dto/user.dto';
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
