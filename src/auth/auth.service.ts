import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as argon from 'argon2';
import { AuthDto } from './dto';
import { JwtPayload, Tokens } from './types';
import { IsNull, Not, Repository } from 'typeorm';
import { Users } from 'src/database/schema/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private config: ConfigService,
    @InjectRepository(Users)
    private userRepository: Repository<Users>,
  ) {}

  async signupLocal(dto: AuthDto): Promise<Tokens> {

    const ExistUser = await this.userRepository.findOne({
      where: { username: dto.username },
    });

    if (ExistUser) throw { message: "User already exists" };


    const hash = await argon.hash(dto.password);

    const user = this.userRepository.create({
      username: dto.username,
      hash: hash,
      email: dto.email
    });

    const SavedUser = await this.userRepository.save(user);

    const tokens = await this.getTokens(SavedUser.user_id, SavedUser.username);
    await this.updateRtHash(user.user_id, tokens.refresh_token);

    return tokens;
  }

  async signinLocal(dto: AuthDto): Promise<Tokens> {
    const user = await this.userRepository.findOne({
      where: { username: dto.username },
    });

    if (!user) throw new ForbiddenException('Access Denied');

    const passwordMatches = await argon.verify(user.hash, dto.password);
    if (!passwordMatches) throw new ForbiddenException('Access Denied');

    const tokens = await this.getTokens(user.user_id, user.username);
    await this.updateRtHash(user.user_id, tokens.refresh_token);

    return tokens;
  }

  async logout(userId: number): Promise<boolean> {
    await this.userRepository.update(
      { user_id: userId, hashedRt: Not(IsNull()) },
      { hashedRt: null },
    );
    return true;
  }

  async refreshTokens(userId: number, rt: string): Promise<Tokens> {
    const user = await this.userRepository.findOne({
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

  async updateRtHash(userId: number, rt: string): Promise<void> {
    const hash = await argon.hash(rt);
    await this.userRepository.update(userId, { hashedRt: hash });
  }

  async getTokens(userId: string, username: string): Promise<Tokens> {
    const jwtPayload: JwtPayload = {
      sub: userId,
      username: username,
    };

    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: this.config.get<string>('AT_SECRET'),
        expiresIn: '15m',
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
