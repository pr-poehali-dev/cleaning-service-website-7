import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

export default function Register() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('https://functions.poehali.dev/92af5e34-0446-4373-8722-138ce7b02153', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, action: 'register' })
      });

      const data = await response.json();

      if (response.ok) {
        toast({
          title: 'Регистрация успешна!',
          description: 'Теперь вы можете войти в систему',
        });
        navigate('/login');
      } else {
        toast({
          title: 'Ошибка регистрации',
          description: data.error || 'Не удалось создать аккаунт',
          variant: 'destructive'
        });
      }
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Не удалось выполнить регистрацию',
        variant: 'destructive'
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary px-4 py-12">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center mx-auto mb-4">
            <Icon name="UserPlus" size={32} className="text-white" />
          </div>
          <CardTitle className="text-3xl">Регистрация</CardTitle>
          <CardDescription className="text-base">
            Создайте аккаунт для управления заказами
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-2">Имя</label>
              <Input
                placeholder="Иван Иванов"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="h-12"
              />
            </div>

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
              <label className="block text-sm font-medium mb-2">Телефон</label>
              <Input
                type="tel"
                placeholder="+7 (999) 123-45-67"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
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
                minLength={6}
                className="h-12"
              />
            </div>

            <Button type="submit" size="lg" className="w-full text-lg h-12">
              Зарегистрироваться
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Уже есть аккаунт?{' '}
              <a 
                href="/login" 
                className="text-primary font-medium hover:underline"
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/login');
                }}
              >
                Войти
              </a>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}