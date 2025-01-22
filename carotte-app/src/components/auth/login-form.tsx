import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import MyImage from '../../assets/yamato.svg';
import { useAuth } from '../providers/auth-provider';
import { useState } from 'react';

export function LoginForm({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {
  const { onLogin, error } = useAuth();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  // Fonction pour mettre à jour l'état du formulaire
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Utilisation des valeurs des champs du formulaire pour l'authentification
    onLogin(formData.email, formData.password);
  };

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card className='bg-gradient-to-b from-fuchsia-300 via-fuchsia-200 to-fuchsia-300 border-fuchsia-300'>
        <CardHeader>
          <div className='flex justify-center items-center'>
            <img src={MyImage} alt='Yamato' className='size-2/3 rounded-full' />
          </div>
          <CardTitle className='text-2xl text-center text-purple-600'>Connexion</CardTitle>
          <CardDescription className='text-center text-purple-600'>À toi de jouer Yu-gi</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className='flex flex-col gap-6'>
              <div className='grid gap-2'>
                <Label htmlFor='email' className='text-purple-600'>
                  Adresse mail
                </Label>
                <Input
                  id='email'
                  type='email'
                  className='text-purple-600 border-purple-600 focus-visible:ring-0'
                  placeholder='kozuki.oden@carotte.com'
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className='grid gap-2'>
                <div className='flex items-center'>
                  <Label htmlFor='password' className='text-purple-600'>
                    Mot de passe
                  </Label>
                </div>
                <Input
                  id='password'
                  type='password'
                  className='border-purple-600 focus-visible:ring-0'
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              {error && (
                <div>
                  <p className='text-red-500'>{error}</p>
                </div>
              )}
              <Button type='submit' className='w-full'>
                Se connecter
              </Button>
            </div>
            <div className='mt-4 text-center text-sm text-purple-600'>Made with love ❤️</div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
