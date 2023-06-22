import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {ValidationPipe} from "@nestjs/common";

async function main() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix("api");

  app.useGlobalPipes(
    new ValidationPipe({
      // Para las Validaciones de los DataTransformObject
      // * para validad que llegen
      whitelist: true,
      // * para validar que no mandes prop que no debes
      forbidNonWhitelisted: true,

      // * Tranformar simplemente en pipes
      transform: true,
      // * Transforma el objeto DTO con las propiedades que especificamos
      transformOptions: {
        enableImplicitConversion: true,
      }
    })
  );

  const PORT = process.env.PORT || 4000;
  
  await app.listen(PORT, () => {
    console.log(`running in http://localhost:${PORT}/api`);
  });
}

main();
