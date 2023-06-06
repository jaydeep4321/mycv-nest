import { ConsoleLogger, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { UsersService } from '../users.service';
import { User } from '../user.entity';

declare global {
  namespace Express {
    interface Request {
      currentUser?: User;
    }
  }
}

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
  constructor(private usersService: UsersService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    // console.log('middleware called');
    const { userId } = req.session || {};

    // console.log('user id: ==>', userId);

    if (userId) {
      console.log('called here!!');

      let user = await this.usersService.findOne(userId);

      const { password, ...newUser } = user;
      console.log('updated user', newUser);

      user = newUser;

      console.log('ended here  !!!');
      req.currentUser = user;
      console.log('current user ==>', req.currentUser);
    }

    next();
  }
}
