import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as argon from 'argon2';
import { AuthDto } from './dto';
import { JwtPayload, Tokens } from './types';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private config: ConfigService,
    private prisma: PrismaService,
  ) {}

  async signupLocal(dto: AuthDto): Promise<Tokens> {
    const User = await this.prisma.users.findUnique({
      where: {
        username: dto.username,
      },
    });

    if (User) throw { message: 'User already exists' };

    const hash = await argon.hash(dto.password);

    const user = await this.prisma.users.create({
      data: {
        username: dto.username,
        hash: hash,
        email: dto.email,
      },
    });

    const tokens = await this.getTokens(user.user_id, user.username);
    await this.updateRtHash(user.user_id, tokens.refresh_token);

    return tokens;
  }

  async signinLocal(dto: AuthDto): Promise<Tokens> {
    const User = await this.prisma.users.findUnique({
      where: { username: dto.username },
    });

    if (!User) throw new ForbiddenException('Access Denied');

    const passwordMatches = await argon.verify(User.hash, dto.password);
    if (!passwordMatches) throw new ForbiddenException('Access Denied');

    const tokens = await this.getTokens(User.user_id, User.username);
    await this.updateRtHash(User.user_id, tokens.refresh_token);

    return tokens;
  }

  async logout(userId: string): Promise<boolean> {
    await this.prisma.users.updateMany({
      where: {
        user_id: userId,
        hashedRt: {
          not: null,
        },
      },
      data: {
        hashedRt: null,
      },
    });
    return true;
  }

  async refreshTokens(userId: string, rt: string): Promise<Tokens> {
    const user = await this.prisma.users.findUnique({
      where: {
        user_id: userId,
      },
    });

    if (!user || !user.hashedRt) throw new ForbiddenException('Access Denied');

    const rtMatches = await argon.verify(user.hashedRt, rt);
    if (!rtMatches) throw new ForbiddenException('Access Denied');

    const tokens = await this.getTokens(user.user_id, user.email);
    await this.updateRtHash(user.user_id, tokens.refresh_token);

    return tokens;
  }

  async updateRtHash(userId: string, rt: string): Promise<void> {
    const hash = await argon.hash(rt);
    await this.prisma.users.update({
      where: {
        user_id: userId,
      },
      data: {
        hashedRt: hash,
      },
    });
  }

  async getTokens(userId: string, username: string): Promise<Tokens> {
    const jwtPayload: JwtPayload = {
      sub: userId,
      username: username,
    };

    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: this.config.get<string>('AT_SECRET'),
        expiresIn: '10h',
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: this.config.get<string>('RT_SECRET'),
        expiresIn: '7d',
      }),
    ]);

    return {
      access_token: at,
      refresh_token: rt,
    };
  }
}
