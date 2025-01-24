import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-users.dto';
import { IsString, MinLength, IsOptional, IsArray, IsEnum } from 'class-validator';
import { Roles } from '../../utility/common/user-roles.enum';


export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsOptional() // Indicates that this field is optional
  @IsString({ message: 'Password must be a string' })
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password?: string;

  @IsOptional()
  @IsArray({ message: 'Roles must be an array if provided' })
  @IsEnum(Roles, { each: true, message: 'Each role must be a valid enum value' })
  roles?: Roles[];
}
