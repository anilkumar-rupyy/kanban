import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggingInterceptor } from './observability/logging.interceptor';
import { AppLogger } from './observability/logger/app-logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*',
    credentials: true,
  });
  app.useGlobalInterceptors(new LoggingInterceptor(new AppLogger()))
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
