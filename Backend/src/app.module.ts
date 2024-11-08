import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import configuration from '~/config/configuration';

import { UsersModule } from '~/users/users.module';
import { AppController } from '~/app.controller';
import { AppService } from '~/app.service';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    // Loads .env & configuration.ts
    ConfigModule.forRoot({
      load: [configuration],
    }),
    // Connects to MongoDB
    MongooseModule.forRoot(process.env.MONGO_URI),
    // Additional modules
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
