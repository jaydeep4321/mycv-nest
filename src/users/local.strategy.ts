import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' });
  }

  async validate(username: string, password: string): Promise<any> {
    console.log('validate is called!');
    const user = await this.authService.signin(username, password);

    if (!user) {
      throw new UnauthorizedException();
    }

    console.log('we are in passport with user ==>', user);
    return user;
  }
}
