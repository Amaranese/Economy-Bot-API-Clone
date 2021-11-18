import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { NextFunction, Request } from 'express';

@Injectable()
export class VerifyBotToken implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const botToken: string = req.header('bot-token');
    if (botToken != process.env.BOT_TOKEN) {
      throw new HttpException('Unautorized', HttpStatus.UNAUTHORIZED);
    } else {
      next();
    }
  }
}
