import { useState, useEffect } from "react";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Shield, BarChart3, FileText, ChevronRight, Calendar, ArrowRight, Users, TrendingUp, Award, Building } from "lucide-react";
import heroParliament from "@/assets/hero-parliament.jpg";
import heroAssembly from "@/assets/hero-assembly.jpg";
import heroGovernment from "@/assets/hero-government.jpg"; 
import heroPresidency from "@/assets/hero-presidency.jpg";
import roleGovernance from "@/assets/role-governance.jpg";
import roleOversight from "@/assets/role-oversight.jpg";
import roleProfessional from "@/assets/role-professional.jpg";
import newsBackground from "@/assets/news-background.jpg";

const Home = () => {
  const [currentHeroImage, setCurrentHeroImage] = useState(0);
  
  const heroImages = [heroParliament, heroAssembly, heroGovernment, heroPresidency];
  
  const roleImages = [roleGovernance, roleOversight, roleProfessional];

  const stats = [
    {
      icon: Building,
      value: "5",
      label: "Години опит",
      description: "в анализ на фискалната политика"
    },
    {
      icon: FileText,
      value: "50+",
      label: "Публикувани доклада",
      description: "и становища към правителството"
    },
    {
      icon: TrendingUp,
      value: "95%",
      label: "Точност на прогнозите",
      description: "при анализ на бюджетните параметри"
    },
    {
      icon: Award,
      value: "100%",
      label: "Независимост",
      description: "в оценката на публичните финанси"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroImage((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [heroImages.length]);

  const coreValues = [
    {
      icon: Shield,
      title: "Независим мониторинг",
      description: "Безпристрастна оценка на фискалната политика и бюджетни прогнози"
    },
    {
      icon: BarChart3,
      title: "Оценка на прогнози",
      description: "Анализ на макроикономическите прогнози и фискалните проекции"
    },
    {
      icon: FileText,
      title: "Публичност и отчетност",
      description: "Прозрачно представяне на анализи и становища пред обществото"
    }
  ];

  const latestNews = [
    {
      title: "Становище относно актуализацията на бюджета за 2024 година",
      date: "15 юли 2024",
      excerpt: "Фискалният съвет анализира предложените промени в държавния бюджет и техните възможни последици за фискалната устойчивост.",
      category: "Становище"
    },
    {
      title: "Доклад за изпълнението на бюджета за първото полугодие",
      date: "28 юни 2024", 
      excerpt: "Детайлен анализ на постигнатите резултати при изпълнението на държавния бюджет през първите шест месеца от годината.",
      category: "Доклад"
    },
    {
      title: "Оценка на макроикономическите прогнози за 2024-2026",
      date: "10 май 2024",
      excerpt: "Анализ на прогнозите за икономическо развитие и тяхното въздействие върху публичните финанси.",
      category: "Анализ"
    }
  ];

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary/90 to-primary-dark/90 text-white overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20 transition-all duration-1000"
          style={{ backgroundImage: `url(${heroImages[currentHeroImage]})` }}
        />
        {/* Hero image indicators */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentHeroImage(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentHeroImage ? 'bg-white' : 'bg-white/50 hover:bg-white/70'
              }`}
            />
          ))}
        </div>
        <div className="relative container mx-auto px-4 py-20 md:py-32">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Фискален съвет на България
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90">
              Обективност, прозрачност и фискална устойчивост
            </p>
            <div className="flex flex-wrap gap-4 mb-8">
              <Badge variant="secondary" className="text-sm px-4 py-2 bg-white/20 text-white border-white/30">
                Независимост
              </Badge>
              <Badge variant="secondary" className="text-sm px-4 py-2 bg-white/20 text-white border-white/30">
                Прозрачност
              </Badge>
              <Badge variant="secondary" className="text-sm px-4 py-2 bg-white/20 text-white border-white/30">
                Устойчивост
              </Badge>
            </div>
            <p className="text-lg mb-8 text-white/80">
              Анализираме бюджета безпристрастно и предоставяме независими оценки на фискалната политика
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" variant="secondary" asChild>
                <Link to="/about">
                  Научете повече за нас
                  <ChevronRight className="ml-2" size={16} />
                </Link>
              </Button>
              <Button size="lg" className="bg-white text-primary hover:bg-white/90" asChild>
                <Link to="/reports">
                  Прегледайте докладите
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Нашата роля
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Като независим орган осигуряваме обективен анализ и оценка на фискалната политика
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {coreValues.map((value, index) => (
            <Card key={index} className="text-center group hover:shadow-lg transition-all duration-300 border-border/50 overflow-hidden">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={roleImages[index]} 
                  alt={value.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-gradient-to-br from-primary to-primary-dark rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <value.icon className="w-8 h-8 text-white" />
                </div>
              </div>
              <CardHeader>
                <CardTitle className="text-xl text-primary">{value.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  {value.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Statistics Section */}
      <section className="container mx-auto px-4 py-16 bg-gradient-to-r from-primary/5 to-primary-dark/5">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Нашите постижения
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Статистики, които отразяват нашия професионализъм и качество на работа
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center group hover:shadow-lg transition-all duration-300 bg-white/70 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="mx-auto w-16 h-16 bg-gradient-to-br from-primary to-primary-dark rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                  <AnimatedCounter value={stat.value} duration={2500} />
                </div>
                <div className="text-lg font-semibold text-primary/80 mb-1">{stat.label}</div>
                <div className="text-sm text-muted-foreground">{stat.description}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Latest News */}
      <section className="relative container mx-auto px-4 py-16">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-5"
          style={{ backgroundImage: `url(${newsBackground})` }}
        />
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Последни новини
            </h2>
            <p className="text-lg text-muted-foreground">
              Актуална информация за дейността на Фискалния съвет
            </p>
          </div>
          <Button variant="outline" asChild className="hidden md:inline-flex">
            <Link to="/news">
              Всички новини
              <ArrowRight className="ml-2" size={16} />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {latestNews.map((news, index) => (
            <Card key={index} className="group hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="secondary" className="text-xs">
                    {news.category}
                  </Badge>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar size={14} className="mr-1" />
                    {news.date}
                  </div>
                </div>
                <CardTitle className="text-lg leading-tight group-hover:text-primary transition-colors">
                  {news.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm mb-4">
                  {news.excerpt}
                </CardDescription>
                <Button variant="ghost" size="sm" className="p-0 h-auto font-medium text-primary">
                  Прочети още
                  <ChevronRight className="ml-1" size={14} />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-8 md:hidden">
          <Button variant="outline" asChild>
            <Link to="/news">
              Всички новини
              <ArrowRight className="ml-2" size={16} />
            </Link>
          </Button>
        </div>
      </section>

      {/* Call to Action */}
      <section className="container mx-auto px-4 py-16">
        <Card className="bg-gradient-to-r from-primary to-primary-dark text-white border-0">
          <CardContent className="p-8 md:p-12 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Виж всички доклади и анализи
            </h2>
            <p className="text-lg mb-8 text-white/90 max-w-2xl mx-auto">
              Получете достъп до цялостните анализи, доклади и становища на Фискалния съвет
            </p>
            <Button size="lg" variant="secondary" asChild>
              <Link to="/reports">
                Прегледайте докладите
                <FileText className="ml-2" size={16} />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default Home;