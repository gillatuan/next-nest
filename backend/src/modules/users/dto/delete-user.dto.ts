import { OmitType } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsOptional, ValidationOptions } from 'class-validator';

export class DeleteUserDto {
  @IsMongoId({ message: '_id ko dung dinh dang' } as ValidationOptions)
  @IsNotEmpty({ message: '_id ko dc trong' })
  _id: string;
}
