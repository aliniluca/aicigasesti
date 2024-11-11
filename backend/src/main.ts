import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS with specific origin
  app.enableCors({
    origin: 'http://localhost:3009', // Frontend URL
    credentials: true, // If using cookies or authentication
  });

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(8089);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
