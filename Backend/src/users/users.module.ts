import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersService } from '~/users/users.service';
import { User, UserSchema } from '~/users/schemas/user.schema';

@Module({
  // Import "Mongoose model for User schema"
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [UsersService],
  // Export so that AuthModule can use
  exports: [UsersService],
})
export class UsersModule {}
