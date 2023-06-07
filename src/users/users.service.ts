import { Injectable, PlainLiteralObject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { ResponseDto } from 'src/response.dto';
import { plainToClass } from 'class-transformer';
import { UserDto } from './dtos/user.dto';
import { isArray } from 'class-validator';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  create(email: string, password: string) {
    const user = this.repo.create({ email, password });

    return this.repo.save(user);
  }

  async findOne(id: any) {
    console.log('id in service', id);
    const user = await this.repo.findOneBy({ id });
    // console.log(user);
    if (!user) {
      return new ResponseDto().sendNotFound('user not found!');
    }
    return this.convertDto([await this.repo.findOneBy({ id })], UserDto);
  }

  async find(email: string) {
    // return await this.convertDto(
    //   await this.repo.find({ where: { email } }),
    //   UserDto,
    // );
    return await this.repo.find({ where: { email } });
  }

  async update(id: number, attrs: Partial<User>) {
    const user = await this.findOne(id);
    if (!user) {
      throw new Error('user not found');
    }
    Object.assign(user, attrs);
    return this.repo.save(user);
  }

  async remove(id: number) {
    console.log('id in remove:', id);
    const user = await this.findOne(id);
    if (!user) {
      throw new Error('user not found');
    }
    return this.repo.remove(user);
  }

  async convertDto(users: any, dto: any) {
    console.log('called here');
    console.log(users);

    let userArr = [];
    for (let user of users) {
      console.log('called here!!');
      user = plainToClass(dto, user, {
        excludeExtraneousValues: true,
      });

      userArr.push(user);
    }

    return userArr;
  }
}
