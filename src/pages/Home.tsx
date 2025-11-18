import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

const services = [
  {
    icon: 'Home',
    title: 'Уборка квартир',
    description: 'Комплексная уборка квартир любой площади с профессиональным оборудованием',
    price: 'от 2 500 ₽'
  },
  {
    icon: 'Building2',
    title: 'Уборка офисов',
    description: 'Регулярная и генеральная уборка офисных помещений',
    price: 'от 3 000 ₽'
  },
  {
    icon: 'Sofa',
    title: 'Химчистка мебели',
    description: 'Глубокая очистка мягкой мебели, ковров и матрасов',
    price: 'от 1 500 ₽'
  },
  {
    icon: 'Droplets',
    title: 'Мойка окон',
    description: 'Профессиональная мойка окон на любой высоте',
    price: 'от 800 ₽'
  },
  {
    icon: 'Sparkles',
    title: 'Послестроительная уборка',
    description: 'Удаление строительной пыли и мусора после ремонта',
    price: 'от 4 000 ₽'
  },
  {
    icon: 'Wind',
    title: 'Уборка после мероприятий',
    description: 'Быстрая уборка после праздников и мероприятий',
    price: 'от 2 000 ₽'
  }
];

const prices = [
  { name: 'Уборка 1-комнатной квартиры', price: '2 500 ₽' },
  { name: 'Уборка 2-комнатной квартиры', price: '3 500 ₽' },
  { name: 'Уборка 3-комнатной квартиры', price: '4 500 ₽' },
  { name: 'Генеральная уборка офиса до 50м²', price: '3 000 ₽' },
  { name: 'Генеральная уборка офиса до 100м²', price: '5 500 ₽' },
  { name: 'Химчистка дивана 2-местного', price: '2 000 ₽' },
  { name: 'Химчистка дивана 3-местного', price: '2 800 ₽' },
  { name: 'Мойка окон стандартных (за окно)', price: '400 ₽' },
  { name: 'Чистка ковра (за м²)', price: '250 ₽' },
];

export default function Home() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('https://functions.poehali.dev/fd495b6a-9567-4ec0-a1a7-5c7178e9954a', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        toast({
          title: 'Заявка отправлена!',
          description: 'Мы свяжемся с вами в ближайшее время',
        });
        setFormData({ name: '', phone: '', service: '', message: '' });
      }
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Не удалось отправить заявку. Попробуйте позже.',
        variant: 'destructive'
      });
    }
  };

  return (
    <div className="min-h-screen">
      <section 
        className="relative h-[90vh] flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url('https://cdn.poehali.dev/projects/b2cc3f7f-1acb-4ce6-a884-cdf8e9c5b3a6/files/4f78b50b-b472-485b-95e8-9ca0f3bf0f59.jpg')` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/40" />
        <div className="relative container mx-auto px-4 text-center text-white animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Чистота — это наша работа
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto font-light">
            Профессиональная уборка любой сложности. Быстро, качественно, надёжно.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button size="lg" className="text-lg px-8 py-6 bg-primary hover:bg-primary/90">
              <a href="#order">Заказать уборку</a>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6 bg-white/10 backdrop-blur-sm border-white text-white hover:bg-white/20">
              <a href="#services">Узнать больше</a>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white" id="services">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Наши услуги</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Предоставляем полный спектр клининговых услуг для дома и бизнеса
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <Card 
                key={index} 
                className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-2 hover:border-primary/50"
              >
                <CardHeader>
                  <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                    <Icon name={service.icon as any} size={28} className="text-primary" />
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                  <CardDescription className="text-base">{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-primary">{service.price}</span>
                    <Button variant="ghost" className="hover:text-primary">
                      Подробнее <Icon name="ArrowRight" size={16} className="ml-1" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-secondary" id="prices">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Цены на услуги</h2>
            <p className="text-muted-foreground text-lg">
              Прозрачные цены без скрытых платежей
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="shadow-lg">
              <CardContent className="p-0">
                <div className="divide-y divide-border">
                  {prices.map((item, index) => (
                    <div 
                      key={index} 
                      className="flex items-center justify-between p-6 hover:bg-muted/50 transition-colors"
                    >
                      <span className="text-lg font-medium">{item.name}</span>
                      <span className="text-2xl font-bold text-primary">{item.price}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="mt-8 p-6 bg-primary/5 rounded-xl border border-primary/20">
              <div className="flex items-start gap-3">
                <Icon name="Info" size={24} className="text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-2">Дополнительная информация</h3>
                  <p className="text-muted-foreground text-sm">
                    Итоговая стоимость может варьироваться в зависимости от степени загрязнения и площади помещения. 
                    Для точного расчёта свяжитесь с нашим менеджером.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white" id="order">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Оформить заказ</h2>
              <p className="text-muted-foreground text-lg">
                Заполните форму и мы свяжемся с вами в течение 15 минут
              </p>
            </div>

            <Card className="shadow-lg">
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Ваше имя</label>
                    <Input
                      placeholder="Иван Иванов"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
                    <label className="block text-sm font-medium mb-2">Услуга</label>
                    <Input
                      placeholder="Например: Уборка 2-комнатной квартиры"
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      required
                      className="h-12"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Дополнительная информация</label>
                    <Textarea
                      placeholder="Расскажите о ваших требованиях..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      rows={4}
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full text-lg h-14">
                    <Icon name="Send" size={20} className="mr-2" />
                    Отправить заявку
                  </Button>
                </form>

                <div className="mt-8 pt-8 border-t border-border">
                  <div className="flex items-center justify-center gap-8 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Icon name="CheckCircle2" size={16} className="text-primary" />
                      <span>Быстрый ответ</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon name="Shield" size={16} className="text-primary" />
                      <span>Безопасность данных</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Готовы сделать ваш дом идеально чистым?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Позвоните нам или оставьте заявку, и мы подберём оптимальное решение для вас
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-6">
              <Icon name="Phone" size={20} className="mr-2" />
              +7 (999) 123-45-67
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-white text-white hover:bg-white/10">
              <a href="#order">Оставить заявку</a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}