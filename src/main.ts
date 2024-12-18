import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppClusterService } from './app_cluster.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.enableCors();
  // app.enableCors({
  //   allowedHeaders: '*',
  //   origin: ['http://localhost:3000'],
  //   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  //   preflightContinue: false,
  //   credentials: true,
  // });
  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  await app.listen(process.env.PORT || 4000);
}

// AppClusterService.clusterize(bootstrap);
bootstrap();
