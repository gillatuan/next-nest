import { IsEmail, IsNotEmpty } from "class-validator";

export class CreateUserDto {
    _id?: string
    @IsNotEmpty({message: "naame ko dc trong"})
    name: string;

    @IsNotEmpty({message: "Email ko dc trong"})
    @IsEmail({}, {message: "Email sai dinh dang"})
    email: string;

    @IsNotEmpty({message: "password ko dc trong"})
    password?: string;

    @IsNotEmpty({message: "Phone ko dc trong"})
    phone: string;

    @IsNotEmpty({message: "Address ko dc trong"})
    address: string;

    image: string;
    role: string;
}
