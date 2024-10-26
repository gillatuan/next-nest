import { OmitType } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsOptional, ValidationOptions } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends OmitType(CreateUserDto, ['password']) {
  @IsMongoId({ message: '_id ko dung dinh dang' } as ValidationOptions)
  @IsNotEmpty({ message: '_id ko dc trong' })
  _id: string;

  @IsOptional()
  name: string;

  @IsOptional()
  phone: string;

  @IsOptional()
  address: string;

  @IsOptional()
  image: string;
}
