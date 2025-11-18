import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem('user');

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-border z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <div 
            className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => navigate('/')}
          >
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="Sparkles" size={24} className="text-white" />
            </div>
            <span className="text-2xl font-bold text-foreground">ЧистоПро</span>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <a href="#services" className="text-foreground hover:text-primary transition-colors font-medium">
              Услуги
            </a>
            <a href="#prices" className="text-foreground hover:text-primary transition-colors font-medium">
              Цены
            </a>
            <a href="#order" className="text-foreground hover:text-primary transition-colors font-medium">
              Заказать
            </a>
            {isAuthenticated ? (
              <Button onClick={handleLogout} variant="outline">
                Выйти
              </Button>
            ) : (
              <>
                <Button onClick={() => navigate('/login')} variant="ghost">
                  Войти
                </Button>
                <Button onClick={() => navigate('/register')} className="bg-primary hover:bg-primary/90">
                  Регистрация
                </Button>
              </>
            )}
          </nav>

          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Icon name={isMenuOpen ? "X" : "Menu"} size={24} />
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border animate-fade-in">
            <nav className="flex flex-col gap-4">
              <a href="#services" className="text-foreground hover:text-primary transition-colors font-medium py-2">
                Услуги
              </a>
              <a href="#prices" className="text-foreground hover:text-primary transition-colors font-medium py-2">
                Цены
              </a>
              <a href="#order" className="text-foreground hover:text-primary transition-colors font-medium py-2">
                Заказать
              </a>
              {isAuthenticated ? (
                <Button onClick={handleLogout} variant="outline" className="w-full">
                  Выйти
                </Button>
              ) : (
                <>
                  <Button onClick={() => navigate('/login')} variant="ghost" className="w-full">
                    Войти
                  </Button>
                  <Button onClick={() => navigate('/register')} className="w-full">
                    Регистрация
                  </Button>
                </>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
