import { IsEmail, IsString, Length, Matches } from 'class-validator';

export class RegisterUserDto {
  @IsString()
  @Length(5, 20)
  username: string;

  @IsString()
  @Length(5, 20)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]+$/, {
    message:
      'The field must contain capital letters, lowercase and numbers, without special characters.',
  })
  password: string;

  @IsEmail()
  email: string;
}
