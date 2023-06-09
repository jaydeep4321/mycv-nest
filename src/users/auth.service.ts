import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  async signup(email: string, password: string) {
    // 1) See if email is in use
    const users = await this.userService.find(email);
    if (users.length) {
      throw new BadRequestException('email in use');
    }
    // 2) Hash the users password
    // ==>Generate a salt
    const salt = randomBytes(8).toString('hex');

    // ==>Hash the salt and the password together
    const hash = (await scrypt(password, salt, 32)) as Buffer;

    // ==>Join the hashed result and the salt together
    const result = salt + '.' + hash.toString('hex');

    // 3) Create new user and save it
    const user = await this.userService.create(email, result);

    // 4)return user
    return user;
  }

  async signin(email: string, password: string) {
    console.log('we are in signin');
    console.log('passport email ==>', email);
    console.log('passport password ==>', password);
    const [user] = await this.userService.find(email);
    if (!user) {
      throw new NotFoundException('user not found');
    }

    console.log('we are here in signup with founded user ==>', user);
    console.log('this is password of user ==>', user.password);
    const [salt, storedHash] = user.password.split('.');

    const hash = (await scrypt(password, salt, 32)) as Buffer;

    if (storedHash !== hash.toString('hex')) {
      throw new BadRequestException('bad password');
    }

    return user;
  }
}
