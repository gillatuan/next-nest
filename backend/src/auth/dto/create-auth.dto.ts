import { IsEmail, IsNotEmpty } from "class-validator";

export class CreateAuthDto {
  @IsNotEmpty({ message: 'Email ko de trong' })
  @IsEmail({}, { message: 'Email ko dung dinh dang' })
  email: string

  @IsNotEmpty({ message: 'Password ko de trong' })
  password: string
}
