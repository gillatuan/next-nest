import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './passport/local-auth.guard';
import { Public, ResponseMessage } from '@/decorator/customize';
import { ChangePasswordAuthDto, CodeAuthDto, CreateAuthDto } from './dto/create-auth.dto';
import { MailerService } from '@nestjs-modules/mailer';
import { Request, Response } from 'express';
import { RegisterUserDto } from '@/modules/users/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly mailerService: MailerService
  ) { }

  @Post("login")
  @Public()
  @UseGuards(LocalAuthGuard)
  @ResponseMessage("Fetch login")
  handleLogin(
      @Req() req,
      @Res({ passthrough: true }) response: Response) {
      return this.authService.login(req.user, response);
  }

  @Post('register')
  @Public()
  register(@Body() registerDto: RegisterUserDto) {
    return this.authService.register(registerDto);
  }

/* 
  @Post('check-code')
  @Public()
  checkCode(@Body() registerDto: CodeAuthDto) {
    return this.authService.checkCode(registerDto);
  }

  @Post('retry-active')
  @Public()
  retryActive(@Body("email") email: string) {
    return this.authService.retryActive(email);
  }

  @Post('retry-password')
  @Public()
  retryPassword(@Body("email") email: string) {
    return this.authService.retryPassword(email);
  }



  @Post('change-password')
  @Public()
  changePassword(@Body() data: ChangePasswordAuthDto) {
    return this.authService.changePassword(data);
  } */

  @Get('mail')
  @Public()
  testMail() {
    this.mailerService
      .sendMail({
        to: 'ads.hoidanit@gmail.com', // list of receivers
        subject: 'Testing Nest MailerModule ✔', // Subject line
        text: 'welcome', // plaintext body
        template: "register",
        context: {
          name: "Eric",
          activationCode: 123456789
        }
      })
    return "ok";
  }
}
