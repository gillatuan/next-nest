import { compare2Password } from '@/helpers/utils';
import { UsersService } from '@/modules/users/users.service';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Auth } from '@/auth/schemas/auth.schema';
import { User } from '@/modules/users/schemas/user.schema';
import { Request } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  // apply for using Passport
  async validateUser(email: string, plainPassword: string): Promise<Omit<User, 'password'>> {
    // check existing user by email
    const user: User = await this.usersService.findByKey({ email });
    if (!user) {
      return null;
    }

    // check password and hashpassword
    const isMatch = await compare2Password(plainPassword, user.password);
    if (!isMatch) {
      return null;
    }

    // remove unnecessary password
    // const { password, ...result } = user;
    return user;
  }

  async login(data) {
    const payload = { email: data.email, sub: data._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
