import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown, ChevronRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageToggle } from "@/components/LanguageToggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu";
import fiscalCouncilLogo from "/lovable-uploads/113eeab5-8568-4061-9f4e-7dfdc2c8eee7.png";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { t } = useLanguage();

  const navItems = [
    { name: t("Начало", "Home"), path: "/" },
    { 
      name: t("Фискален съвет", "Fiscal Council"), 
      subItems: [
        { name: t("Мисия и цели", "Mission & Goals"), path: "/mission" },
        { 
          name: t("Структура", "Structure"), 
          path: "/structure",
          subItems: [
            { name: t("Членове", "Members"), path: "/council-members" },
            { name: t("Експертен съвет", "Expert Council"), path: "/expert-council" }
          ]
        },
        { name: t("История", "History"), path: "/history" }
      ]
    },
    { name: t("Новини", "News"), path: "/news" },
    { name: t("Доклади", "Reports"), path: "/reports" },
    { name: t("Публикации", "Publications"), path: "/publications" },
    { name: t("Нормативна база", "Regulatory Framework"), path: "/regulatory-framework" },
    { name: t("Контакти", "Contacts"), path: "/contacts" },
    { name: t("Вход", "Login"), path: "/auth" },
  ];

  const isActivePath = (path: string) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };

  const isActiveDropdown = (subItems: any[]) => {
    return subItems.some(item => {
      if (item.subItems) {
        return isActivePath(item.path) || isActiveDropdown(item.subItems);
      }
      return isActivePath(item.path);
    });
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
                {t("Фискален съвет", "Fiscal Council")}
              </h1>
              <p className="text-sm text-muted-foreground leading-tight">
                {t("на България", "of Bulgaria")}
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <nav className="flex items-center space-x-8">
            {navItems.map((item) => (
              item.subItems ? (
                <DropdownMenu key={item.name}>
                  <DropdownMenuTrigger asChild>
                    <button
                      className={`text-sm font-medium transition-colors hover:text-primary flex items-center space-x-1 uppercase ${
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
                      subItem.subItems ? (
                        <DropdownMenuSub key={subItem.name}>
                          <DropdownMenuSubTrigger className="flex items-center justify-between w-full px-3 py-2 text-sm transition-colors hover:bg-secondary/80">
                            <span className={isActivePath(subItem.path) ? "text-primary font-semibold" : "text-foreground"}>
                              {subItem.name}
                            </span>
                            <ChevronRight size={14} />
                          </DropdownMenuSubTrigger>
                          <DropdownMenuSubContent className="bg-background border border-border shadow-lg">
                            {subItem.subItems.map((nestedItem) => (
                              <DropdownMenuItem key={nestedItem.path} asChild>
                                <Link
                                  to={nestedItem.path}
                                  className={`w-full px-3 py-2 text-sm transition-colors hover:bg-secondary/80 ${
                                    isActivePath(nestedItem.path) ? "text-primary font-semibold" : "text-foreground"
                                  }`}
                                >
                                  {nestedItem.name}
                                </Link>
                              </DropdownMenuItem>
                            ))}
                          </DropdownMenuSubContent>
                        </DropdownMenuSub>
                      ) : (
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
                      )
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`text-sm font-medium transition-colors hover:text-primary uppercase ${
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
            <LanguageToggle />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <LanguageToggle />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t border-border">
            {navItems.map((item) => (
              item.subItems ? (
                <div key={item.name} className="mb-2">
                  <div className="font-medium text-primary py-2">{item.name}</div>
                  {item.subItems.map((subItem) => (
                    subItem.subItems ? (
                      <div key={subItem.name} className="ml-2 mb-2">
                        <div className="font-medium text-primary/80 py-1 text-sm">{subItem.name}</div>
                        {subItem.subItems.map((nestedItem) => (
                          <Link
                            key={nestedItem.path}
                            to={nestedItem.path}
                            className={`block py-1 pl-6 text-sm transition-colors hover:text-primary ${
                              isActivePath(nestedItem.path)
                                ? "text-primary font-semibold"
                                : "text-foreground"
                            }`}
                            onClick={() => setIsMenuOpen(false)}
                          >
                            {nestedItem.name}
                          </Link>
                        ))}
                      </div>
                    ) : (
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
                    )
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