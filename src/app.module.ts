import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
// import 'dotenv/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    // MongooseModule.forRoot(process.env.MONGODB_URL),
    MongooseModule.forRoot(
      'mongodb+srv://admin:admin@cluster0.javws.mongodb.net/',
    ),
    UsersModule,
    ProductsModule,
    ThrottlerModule.forRoot([
      {
        ttl: 10000, //10s
        limit: 10,
      },
    ]),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
