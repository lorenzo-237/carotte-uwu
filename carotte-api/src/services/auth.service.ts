import { SECRET_KEY } from '@/config';
import { LogInDto } from '@/dtos/auth.dto';
import { HttpException } from '@/exceptions/httpException';
import { DataStoredInToken, TokenData } from '@/interfaces/auth.interface';
import { compare } from 'bcrypt';
import { Service } from 'typedi';
import { sign } from 'jsonwebtoken';
import { User } from '@/interfaces/users.interface';
import { prisma } from '@/lib/prisma';

@Service()
export class AuthService {
  public async logIn(dto: LogInDto): Promise<{ cookie: string; user: User; token: string }> {
    const findUser = await prisma.user.findUnique({
      where: { email: dto.email },
    });
    if (!findUser) throw new HttpException(404, `User not found`);

    const findPassword = await prisma.userPassword.findUnique({
      where: {
        userId: findUser.id,
      },
    });

    if (!findPassword) throw new HttpException(404, 'No Password');

    const passwordValue = findPassword.password;

    const match = await compare(dto.password, passwordValue);

    if (!match) {
      throw new HttpException(403, 'Invalid credentials');
    }

    const data = this.createToken(findUser);
    const cookie = this.createCookie(data);
    const token = data.token;

    const user: User = {
      ...findUser,
    };
    return { cookie, user, token };
  }

  public createToken(user: User): TokenData {
    const dataStoredInToken: DataStoredInToken = { id: user.id };
    const secretKey: string = SECRET_KEY;
    const expiresIn: number = 24 * 60 * 60; // 1day

    return { expiresIn, token: sign(dataStoredInToken, secretKey, { expiresIn }) };
  }

  public createCookie(tokenData: TokenData): string {
    return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`;
  }
}
