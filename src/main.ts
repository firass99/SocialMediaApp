import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationTypes } from 'class-validator';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  //swagger config
  const options = new DocumentBuilder()
    .setTitle('BackendSocialMedia')
    .setDescription('The BackendSocialMedia API description')
    .setVersion('1.0')
    .addServer('http://localhost:3000/', 'Local env')
    //.addServer('https://staging.yourapi.com/', 'Staging')
    //.addServer('https://production.yourapi.com/', 'Production')
    .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api', app, document);
    //posts api documented successflyy(dto, controller,  )
  //connection and validation
  app.useGlobalPipes(new ValidationPipe());
  const connected=await app.listen(3000);
  connected?console.log('CONNECTED SUCCESSFULLY to port 3000'):console.log('FAIL TO CONNECT to DB');







}
bootstrap();
