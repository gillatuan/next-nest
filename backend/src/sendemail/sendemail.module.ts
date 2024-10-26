import { Module } from '@nestjs/common';
import { SendemailService } from './sendemail.service';
import { SendemailController } from './sendemail.controller';

@Module({
  controllers: [SendemailController],
  providers: [SendemailService]
})
export class SendemailModule {}
