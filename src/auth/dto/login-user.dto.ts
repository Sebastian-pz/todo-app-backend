// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { IsEmail, IsString } from 'class-validator';

export class LoginUserDto {
  @IsString()
  username: string;

  @IsString()
  password: string;

  // @IsEmail()
  // email: string;
}
