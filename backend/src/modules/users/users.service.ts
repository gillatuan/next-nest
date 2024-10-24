import { setHashPassword } from '@/helpers/utils';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  isEmailExist = async (email: string) => {
    const isExist = await this.userModel.exists({ email });

    if (isExist) {
      return true
    }

    return false
  };
  async create(createUserDto: CreateUserDto) {
    const { name, email, password, phone, address, image, role } = createUserDto;

    // check exist email
    const isExist = await this.isEmailExist(email)
    if (isExist) {
      throw new BadRequestException(`Email da ton tai: ${email}. Please use another`)
    }
    // create hash password
    const hashPassword = await setHashPassword(password);
    const user = await this.userModel.create({
      name,
      email,
      password: hashPassword,
      phone,
      address,
      image,
    });
    return {
      _id: user._id,
      name,
      email,
      role,
      phone,
      address,
      image,
    }
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
