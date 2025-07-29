import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import fiscalCouncilLogo from "/lovable-uploads/113eeab5-8568-4061-9f4e-7dfdc2c8eee7.png";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: "Начало", path: "/" },
    { 
      name: "Фискален съвет", 
      subItems: [
        { name: "Мисия и цели", path: "/mission" },
        { name: "Структура", path: "/structure" },
        { name: "История", path: "/history" }
      ]
    },
    { name: "Новини", path: "/news" },
    { name: "Доклади", path: "/reports" },
    { name: "Нормативна база", path: "/regulatory-framework" },
    { name: "Полезни връзки", path: "/useful-links" },
    { name: "Контакти", path: "/contacts" },
  ];

  const isActivePath = (path: string) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };

  const isActiveDropdown = (subItems: any[]) => {
    return subItems.some(item => isActivePath(item.path));
  };

  return (
    <header className="bg-background border-b border-border sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <img 
              src={fiscalCouncilLogo} 
              alt="Фискален съвет на България" 
              className="h-12 w-auto"
            />
            <div className="flex flex-col">
              <h1 className="text-lg font-bold text-primary leading-tight">
                Фискален съвет
              </h1>
              <p className="text-sm text-muted-foreground leading-tight">
                на България
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              item.subItems ? (
                <DropdownMenu key={item.name}>
                  <DropdownMenuTrigger asChild>
                    <button
                      className={`text-sm font-medium transition-colors hover:text-primary flex items-center space-x-1 ${
                        isActiveDropdown(item.subItems)
                          ? "text-primary border-b-2 border-primary pb-1"
                          : "text-foreground"
                      }`}
                    >
                      <span>{item.name}</span>
                      <ChevronDown size={14} />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-background border border-border shadow-lg z-50">
                    {item.subItems.map((subItem) => (
                      <DropdownMenuItem key={subItem.path} asChild>
                        <Link
                          to={subItem.path}
                          className={`w-full px-3 py-2 text-sm transition-colors hover:bg-secondary/80 ${
                            isActivePath(subItem.path) ? "text-primary font-semibold" : "text-foreground"
                          }`}
                        >
                          {subItem.name}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    isActivePath(item.path)
                      ? "text-primary border-b-2 border-primary pb-1"
                      : "text-foreground"
                  }`}
                >
                  {item.name}
                </Link>
              )
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t border-border">
            {navItems.map((item) => (
              item.subItems ? (
                <div key={item.name} className="mb-2">
                  <div className="font-medium text-primary py-2">{item.name}</div>
                  {item.subItems.map((subItem) => (
                    <Link
                      key={subItem.path}
                      to={subItem.path}
                      className={`block py-2 pl-4 text-sm transition-colors hover:text-primary ${
                        isActivePath(subItem.path)
                          ? "text-primary font-semibold"
                          : "text-foreground"
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {subItem.name}
                    </Link>
                  ))}
                </div>
              ) : (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`block py-2 text-sm font-medium transition-colors hover:text-primary ${
                    isActivePath(item.path)
                      ? "text-primary font-semibold"
                      : "text-foreground"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              )
            ))}
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;