import { IsNotEmpty, IsNumberString } from 'class-validator';

export class FindOneParams {
  @IsNotEmpty()
  @IsNumberString()
  id: number;
}
