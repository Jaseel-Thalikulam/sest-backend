import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';


async function bootstrap() {
  

  const app = await NestFactory.create(AppModule, { cors: true });
  await app.listen(4000);


  const CorsOptions = {
    origin: '*', // Replace '*' with the actual origin of your frontend application in production.
    methods: 'GET, POST, PUT, DELETE, OPTIONS',
    allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  };

  app.enableCors(CorsOptions);

  
}
bootstrap();
