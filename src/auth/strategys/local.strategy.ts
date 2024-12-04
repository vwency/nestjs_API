import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserDto } from '../dto/user.dto';
import { JwtAuthService } from '../services/auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private JwtAuthService: JwtAuthService,

  ) {
    super();
  }

  validate(username: string, password: string) {
    console.log('Inside LocalStrategy');
    console.log(password);
    const user = this.JwtAuthService.validateUserJwt({ username, password });
    if (!user) throw new UnauthorizedException();
    return user;
  }
}
