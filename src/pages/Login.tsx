import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

export default function Login() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('https://functions.poehali.dev/92af5e34-0446-4373-8722-138ce7b02153', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, action: 'login' })
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('user', JSON.stringify(data.user));
        toast({
          title: 'Успешный вход!',
          description: 'Добро пожаловать обратно',
        });
        navigate('/');
      } else {
        toast({
          title: 'Ошибка входа',
          description: data.error || 'Неверный email или пароль',
          variant: 'destructive'
        });
      }
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Не удалось выполнить вход',
        variant: 'destructive'
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary px-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center mx-auto mb-4">
            <Icon name="LogIn" size={32} className="text-white" />
          </div>
          <CardTitle className="text-3xl">Вход в аккаунт</CardTitle>
          <CardDescription className="text-base">
            Войдите, чтобы управлять заказами
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <Input
                type="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="h-12"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Пароль</label>
              <Input
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
                className="h-12"
              />
            </div>

            <Button type="submit" size="lg" className="w-full text-lg h-12">
              Войти
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Нет аккаунта?{' '}
              <a 
                href="/register" 
                className="text-primary font-medium hover:underline"
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/register');
                }}
              >
                Зарегистрироваться
              </a>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}