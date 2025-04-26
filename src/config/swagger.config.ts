import { DocumentBuilder, OpenAPIObject } from '@nestjs/swagger';

export const swaggerOptions: Omit<OpenAPIObject, 'paths'> =
  new DocumentBuilder()
    .setTitle('Solaris Service API')
    .setDescription('API Dashboard')
    .setVersion('3.0')
    .addBearerAuth()
    .build();
