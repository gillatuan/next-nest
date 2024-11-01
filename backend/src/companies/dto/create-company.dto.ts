import { IsEmail, IsNotEmpty } from "class-validator";

export class CreateCompanyDto {
    @IsNotEmpty({ message: "name không được để trống" })
    name: string;
  
    @IsNotEmpty({ message: 'Address ko dc trong' })
    address: string;
  
    @IsNotEmpty({ message: 'Description ko dc trong' })
    description: string;
}
