import { Service } from 'typedi';
import { prisma } from '@/lib/prisma';
import { hashPassword } from '@/lib/hash';

@Service()
export class TestService {
  public async createCarotteUser() {
    return prisma.user.create({
      data: {
        email: 'eliabarrot@gmail.com',
        instagram: '@carotte.ttt',
        name: 'Elia',
        password: await hashPassword('elia'),
      },
    });
  }
}
