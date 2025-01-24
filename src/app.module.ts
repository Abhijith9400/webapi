import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { User } from './user/entities/users.entity'; // Import UserEntity for database operations
// import { UsersService } from './users.service';
// import { UsersController } from './user/users.controller';
// import { UsersService } from './user/users.service';
import { UserModule } from './user/users.module';
// import { dataSourceOptions } from 'db/data-source';
@Module({
  imports: [TypeOrmModule.forRoot({
      type:'postgres',
      host:'localhost',
      port:5432,
      username: 'Abhijith',
      password: 'Abhijith2003',
      database: 'Abhijith',
      autoLoadEntities:true,
      synchronize:true
  }),UserModule],
  // controllers:[UsersController],
  // providers:[UsersService]

})
export class AppModule {}
