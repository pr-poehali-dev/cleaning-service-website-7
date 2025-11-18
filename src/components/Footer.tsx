import Icon from '@/components/ui/icon';

export default function Footer() {
  return (
    <footer className="bg-secondary py-12 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="Sparkles" size={24} className="text-white" />
              </div>
              <span className="text-xl font-bold">ЧистоПро</span>
            </div>
            <p className="text-muted-foreground text-sm">
              Профессиональная уборка для вашего дома и офиса
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Услуги</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#services" className="hover:text-primary transition-colors">Уборка квартир</a></li>
              <li><a href="#services" className="hover:text-primary transition-colors">Уборка офисов</a></li>
              <li><a href="#services" className="hover:text-primary transition-colors">Химчистка мебели</a></li>
              <li><a href="#services" className="hover:text-primary transition-colors">Мойка окон</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Компания</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">О нас</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Контакты</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Вакансии</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Отзывы</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Контакты</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Icon name="Phone" size={16} className="text-primary" />
                +7 (999) 123-45-67
              </li>
              <li className="flex items-center gap-2">
                <Icon name="Mail" size={16} className="text-primary" />
                info@chistopro.ru
              </li>
              <li className="flex items-center gap-2">
                <Icon name="MapPin" size={16} className="text-primary" />
                Москва, ул. Примерная, 1
              </li>
            </ul>
            <div className="flex gap-3 mt-4">
              <a href="#" className="w-9 h-9 bg-white rounded-lg flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                <Icon name="Instagram" size={18} />
              </a>
              <a href="#" className="w-9 h-9 bg-white rounded-lg flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                <Icon name="Facebook" size={18} />
              </a>
              <a href="#" className="w-9 h-9 bg-white rounded-lg flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                <Icon name="Twitter" size={18} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>© 2024 ЧистоПро. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
}
