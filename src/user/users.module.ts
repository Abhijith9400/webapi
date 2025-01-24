import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/users.entity'; // Import UserEntity for database operations


@Module({
  imports: [
    TypeOrmModule.forFeature([User]), // Register UserEntity with TypeOrm for database interaction
  ],
  controllers: [UsersController], // Register the UserController to handle HTTP requests
  providers: [UsersService], // Provide the UserService to handle business logic
  // exports: [UsersService], // Export UserService to make it reusable in other modules
})
export class UserModule {}
