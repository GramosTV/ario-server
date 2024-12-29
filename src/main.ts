import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as fs from 'fs';
import * as cookieParser from 'cookie-parser';
async function bootstrap() {
  let httpsOptions;
  if (process.env.DEV !== '1') {
    httpsOptions = {
      key: fs.readFileSync('/etc/letsencrypt/live/kochamcie.duckdns.org/privkey.pem'),
      cert: fs.readFileSync('/etc/letsencrypt/live/kochamcie.duckdns.org/fullchain.pem'),
    };
  }
  const app = await NestFactory.create(AppModule, {
    httpsOptions,
  });
  app.use(cookieParser());
  app.enableCors({
    origin: 'https://www.harmancheats.com',
    credentials: true,
  });
  await app.listen(process.env.PORT ?? 3000);
  console.log('Server is running on port ' + (process.env.PORT ?? 3000));
}
bootstrap();
