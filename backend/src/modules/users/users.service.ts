import { setHashPassword } from '@/helpers/utils';
import { MailerService } from '@nestjs-modules/mailer';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import aqp from 'api-query-params';
import dayjs from 'dayjs';
import mongoose, { Model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly mailerService: MailerService,
  ) {}

  isEmailExist = async (email: string) => {
    const isExist = await this.userModel.exists({ email });

    if (isExist) {
      return true;
    }

    return false;
  };
  async create(createUserDto: CreateUserDto) {
    const { name, email, password, phone, address, image, role } =
      createUserDto;

    // check exist email
    const isExist = await this.isEmailExist(email);
    if (isExist) {
      throw new BadRequestException(
        `Email da ton tai: ${email}. Please use another`,
      );
    }
    // create hash password
    const hashPassword = await setHashPassword(password);

    // create user
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
    };
  }

  async findAll(
    query: string,
    current?: number,
    pageSize?: number,
    sort?: string,
  ) {
    const { filter } = aqp(query);

    if (filter.current) delete filter.current;
    if (filter.pageSize) delete filter.pageSize;

    if (!current) current = 1;
    if (!pageSize) pageSize = 10;

    const totalItems = await this.userModel.countDocuments(filter);
    const totalPages = Math.ceil(totalItems / pageSize);
    const skip = (current - 1) * pageSize;

    const results = await this.userModel
      .find(filter)
      .limit(pageSize)
      .skip(skip)
      .select('-password')
      .sort(sort);

    return {
      results,
      totalPages,
    };
  }

  async findOne(id: string): Promise<void> {
    if (mongoose.isValidObjectId(id)) {
      return this.userModel.findOne({ _id: id });
    }
    throw new BadRequestException('Id ko dung dinh dang mongodb');
  }

  async findByKey(params: Object) {
    return await this.userModel.findOne(params);
  }

  async update(updateUserDto: UpdateUserDto) {
    return await this.userModel.updateOne(
      { _id: updateUserDto._id },
      { ...updateUserDto },
    );
  }

  async remove(id: string) {
    if (mongoose.isValidObjectId(id)) {
      const checkUserIsAdmin = await this.userModel.findOne({
        _id: id,
        role: 'ADMIN',
      });
      if (!checkUserIsAdmin) {
        return this.userModel.deleteOne({ _id: id });
      }

      throw new BadRequestException('Ban khong co quyen xoa');
    }
    throw new BadRequestException('Id ko dung dinh dang mongodb');
  }

  async handleRegister(createUserDto: CreateUserDto) {
    const { name, email, password, phone, address, image } = createUserDto;

    // check exist email
    const isExist = await this.isEmailExist(email);
    if (isExist) {
      throw new BadRequestException(
        `Email da ton tai: ${email}. Please use another`,
      );
    }
    // create hash password∏
    const hashPassword = await setHashPassword(password);

    // create user
    const codeId = uuidv4()
    const user = await this.userModel.create({
      name,
      email,
      password: hashPassword,
      phone,
      address,
      image,
      isActive: false,
      codeId,
      codeExpired: dayjs().add(30, 'seconds'),
    });

    // send email
    this.mailerService
      .sendMail({
        to: 'gangtergilla5@gmail.com', // list of receivers
        // from: 'noreply@nestjs.com', // sender address
        subject: 'TuanBDN Testing Nest MailerModule ✔', // Subject line
        text: 'welcome', // plaintext body
        // html: '<b>Hello World TuanBDN</b>', // HTML body content
        template: 'register',
        context: {
          name: user.name,
          activationCode: codeId,
        },
      })
      .then(() => {})
      .catch(() => {});

    return {
      _id: user._id,
      name,
      email,
      role: user.role,
      phone,
      address,
      image,
    };
  }
}
