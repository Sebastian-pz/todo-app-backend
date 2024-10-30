import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './auth.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { comparePasswords, encryptPassword } from './utils';
import { ERROR_MESSAGES } from 'src/common/utils';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private authRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async register(user: RegisterUserDto) {
    const { username, password, email } = user;
    // In technical terms it doesn't matter if you use username or email, it's just a unique identifier
    if (
      (await this.authRepository.findOne({ where: { username } })) ||
      (await this.authRepository.findOne({ where: { email } }))
    )
      throw new BadRequestException(ERROR_MESSAGES.UNIQUE_USERNAME);
    const encryptedPassword = await encryptPassword(password);
    const newUser = this.authRepository.create({
      username,
      password: encryptedPassword,
      email,
    });
    await this.authRepository.save(newUser);
  }

  async validateUser(loginUser: LoginUserDto): Promise<User> {
    const { username, password } = loginUser;
    const user = await this.authRepository.findOne({
      where: { username },
    });
    if (!user)
      throw new BadRequestException(ERROR_MESSAGES.INVALID_CREDENTIALS);
    if (!(await comparePasswords(password, user.password)))
      throw new BadRequestException(ERROR_MESSAGES.INVALID_CREDENTIALS);

    return user;
  }

  async login(user: User): Promise<{ accessToken: string }> {
    // It should be a plain object, not a class (JWT error :/)
    const payload = { username: user.username, id: user.id };
    return { accessToken: this.jwtService.sign(payload) }; //
  }
}
