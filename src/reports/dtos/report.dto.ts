import { Expose, Transform } from 'class-transformer';
import { User } from '../../users/user.entity';
import { Column } from 'typeorm';

export class ReportDto {
  @Expose()
  id: number;

  @Expose()
  price: number;

  @Expose()
  year: number;

  @Expose()
  lng: number;

  @Expose()
  lat: number;

  @Expose()
  make: string;

  @Expose()
  model: string;

  @Expose()
  approved: boolean;

  @Transform(({ obj }) => obj.user.id)
  @Expose()
  userId: number;
}
