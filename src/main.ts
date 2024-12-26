import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as fs from 'fs';

async function bootstrap() {
  const httpsOptions = {
    key: fs.readFileSync('/etc/letsencrypt/live/kochamcie.duckdns.org/privkey.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/kochamcie.duckdns.org/fullchain.pem'),
  };
  const app = await NestFactory.create(AppModule, {
    httpsOptions,
  });
  app.enableCors({
    origin: '*',
    credentials: true,
  });
  await app.listen(process.env.PORT ?? 3000);
  console.log('Server is running on port ' + (process.env.PORT ?? 3000));
}
bootstrap();
