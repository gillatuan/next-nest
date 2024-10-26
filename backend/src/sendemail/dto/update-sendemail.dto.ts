import { PartialType } from '@nestjs/swagger';
import { CreateSendemailDto } from './create-sendemail.dto';

export class UpdateSendemailDto extends PartialType(CreateSendemailDto) {}
