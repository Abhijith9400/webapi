import { IsEmail, IsString, MinLength, IsArray, IsEnum } from 'class-validator';
import { Roles } from 'src/utility/common/user-roles.enum';


export class CreateUserDto {

  @IsEmail({}, { message: 'Invalid email format' })
  email: string;




  @IsString({ message: 'Name must be a string' })
  name?: string;  // New optional property for name

}
