import { Public } from '@/helpers/setPubicPage';
import { MailerService } from '@nestjs-modules/mailer';
import { Controller, Get } from '@nestjs/common';
import { SendemailService } from './sendemail.service';

@Controller('sendemail')
export class SendemailController {
  constructor(
    private readonly sendemailService: SendemailService,
    private readonly mailerService: MailerService,
  ) {}

  @Public()
  @Get('send')
  sendEmail() {
    this.mailerService
      .sendMail({
        to: 'gangtergilla5@gmail.com', // list of receivers
        // from: 'noreply@nestjs.com', // sender address
        subject: 'TuanBDN Testing Nest MailerModule ✔', // Subject line
        text: 'welcome', // plaintext body
        html: '<b>Hello World TuanBDN</b>', // HTML body content
      })
      .then(() => {})
      .catch(() => {});

    return 'Sent Email OK';
  }
}
