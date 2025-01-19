import { Service } from 'typedi';
import { prisma } from '@/lib/prisma';
import { hashPassword } from '@/lib/hash';
import { CreateUserDTO } from '@/dtos/user.dto';

@Service()
export class UserService {
  async createUser(data: CreateUserDTO): Promise<void> {
    console.log(data);
    const { email, name, instagram, password } = data;

    // Vérifier si un utilisateur avec cet email existe déjà
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new Error('Un utilisateur avec cet email existe déjà.');
    }

    // Hachage du mot de passe
    const hashedPassword = await hashPassword(password);

    // Création de l'utilisateur et du mot de passe dans une transaction
    await prisma.$transaction(async prismaTransaction => {
      const user = await prismaTransaction.user.create({
        data: {
          email,
          name,
          instagram,
        },
      });

      await prismaTransaction.userPassword.create({
        data: {
          userId: user.id, // Utiliser l'ID retourné par la création de l'utilisateur
          password: hashedPassword,
        },
      });
    });
  }
}
