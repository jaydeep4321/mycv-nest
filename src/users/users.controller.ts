import {
  Body,
  Controller,
  Post,
  Get,
  Patch,
  Param,
  Delete,
  Query,
  NotFoundException,
  Session,
  UseGuards,
  Res,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UsersService } from './users.service';
import { Serialize } from '../interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';
import { AuthService } from './auth.service';
import { CurrrentUser } from './decorators/current-user.decorator';
import { User } from './user.entity';
import { AuthGuard } from '../guards/auth.guard';
import { ResponseDto } from 'src/response.dto';
import { response } from 'express';

@Controller('auth')
@Serialize(UserDto)
@Serialize(ResponseDto)
export class UsersController {
  constructor(
    private userService: UsersService,
    private authService: AuthService,
  ) {}

  // @Get('/whoami')
  // whoAmI(@Session() session: any) {
  //   console.log('==>', session.userId);
  //   return this.userService.findOne(session.userId);
  // }

  @Get('/whoami')
  @UseGuards(AuthGuard)
  whoAmI(@CurrrentUser() user: User, @Res() res: Response) {
    console.log(user);
    return new ResponseDto().sendSuccess('success', user, res);
  }

  @Post('/signout')
  signOut(@Session() session: any) {
    session.userId = null;
  }

  @Post('/signup')
  async createUser(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signup(body.email, body.password);
    session.userId = user.id;
    return user;
  }

  @Post('/signin')
  async signin(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signin(body.email, body.password);
    session.userId = user.id;
    return user;
  }

  @Get('/:id')
  async findUser(@Param('id') id: string, @Res() res: Response) {
    const user = await this.userService.findOne(parseInt(id));
    // if (!user) {
    //   // throw new NotFoundException('user not found');
    // }
    // return user;
    console.log(user);
    return new ResponseDto().sendSuccess('success', user, res);
  }

  @Get()
  async findAllUsers(@Query('email') email: string, @Res() res: Response) {
    const user = await this.userService.find(email);
    // console.log(user);
    return new ResponseDto().sendSuccess('success', user, res);
  }

  @Delete('/:id')
  async removeUser(@Param('id') id: string) {
    const user = await this.userService.findOne(parseInt(id));
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return this.userService.remove(parseInt(id));
  }

  @Patch('/:id')
  async updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    const user = await this.userService.findOne(parseInt(id));
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return this.userService.update(parseInt(id), body);
  }
}
