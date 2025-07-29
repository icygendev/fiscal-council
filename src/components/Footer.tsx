import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-muted/50 border-t border-border">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-primary mb-4">
              Контактна информация
            </h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin size={16} className="text-muted-foreground" />
                <span className="text-sm">
                  1000 София, ул. „Княз Дондуков" № 1, партер
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone size={16} className="text-muted-foreground" />
                <span className="text-sm">+359 2 940 7100</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail size={16} className="text-muted-foreground" />
                <span className="text-sm">info@fiscal-council.bg</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-primary mb-4">
              Бързи връзки
            </h3>
            <div className="space-y-2">
              <Link 
                to="/about" 
                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                За Фискалния съвет
              </Link>
              <Link 
                to="/reports" 
                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Доклади и анализи
              </Link>
              <Link 
                to="/news" 
                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Новини и съобщения
              </Link>
              <Link 
                to="/contacts" 
                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Свържете се с нас
              </Link>
            </div>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-semibold text-primary mb-4">
              Последвайте ни
            </h3>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a 
                href="#" 
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
              <a 
                href="#" 
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-4">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
            <p>© 2024 Фискален съвет на България. Всички права запазени.</p>
            <div className="flex space-x-4 mt-2 md:mt-0">
              <Link 
                to="/privacy" 
                className="hover:text-primary transition-colors"
              >
                Поверителност
              </Link>
              <Link 
                to="/terms" 
                className="hover:text-primary transition-colors"
              >
                Условия за ползване
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;