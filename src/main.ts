import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { AppModule } from './app.module';
import { SERVER_PORT } from './config/constants';

async function main() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger();

  const config = app.get(ConfigService);
  const port = parseInt(config.get<string>(SERVER_PORT), 10) || 3000;

  await app.listen(port, '0.0.0.0');
  logger.log(`Server is running in ${await app.getUrl()}`);
}
main();
