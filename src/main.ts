import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import mongoose from 'mongoose';
import { ValidationPipe } from '@nestjs/common';
import { JwtAuthGuard } from './modules/campaigns/features/shared/campaign-auth.guard';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common'; // <-- 1. Importar esto

mongoose.connection.on('connected', () => {
  console.log('✅ MongoDB conectado');
});

async function bootstrap() {
  const app: INestApplication = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalGuards(app.get(JwtAuthGuard));

  const config = new DocumentBuilder()
    .setTitle('My API')
    .setDescription('Docs using swaggers and NestJS')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
