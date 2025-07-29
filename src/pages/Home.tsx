import { useState, useEffect } from "react";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Shield, BarChart3, FileText, ChevronRight, Calendar, ArrowRight, Users, TrendingUp, Award, Building } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import heroParliament from "/lovable-uploads/d2924a0c-eb84-41bc-993d-d5c8c0840d0d.png";
import heroGovernment from "/lovable-uploads/aa0da3ae-e708-4c56-992d-df2b19cb0f08.png";
import heroBuilding from "/lovable-uploads/cc69f144-c0b7-4c82-95b6-6f4b808c8763.png";
import roleGovernance from "@/assets/role-governance.jpg";
import roleOversight from "@/assets/role-oversight.jpg";
import roleProfessional from "@/assets/role-professional.jpg";
import newsBackground from "@/assets/news-background.jpg";

const Home = () => {
  const { t } = useLanguage();
  const [currentHeroImage, setCurrentHeroImage] = useState(0);
  
  const heroImages = [heroParliament, heroGovernment, heroBuilding];
  
  const roleImages = [roleGovernance, roleOversight, roleProfessional];

  const stats = [
    {
      icon: Building,
      value: "5",
      label: t("Години опит", "Years of Experience"),
      description: t("в анализ на фискалната политика", "in fiscal policy analysis")
    },
    {
      icon: FileText,
      value: "50+",
      label: t("Публикувани доклада", "Published Reports"),
      description: t("и становища към правителството", "and opinions to the government")
    },
    {
      icon: TrendingUp,
      value: "95%",
      label: t("Точност на прогнозите", "Forecast Accuracy"),
      description: t("при анализ на бюджетните параметри", "in budget parameter analysis")
    },
    {
      icon: Award,
      value: "100%",
      label: t("Независимост", "Independence"),
      description: t("в оценката на публичните финанси", "in public finance assessment")
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
      title: t("Независим мониторинг", "Independent Monitoring"),
      description: t("Безпристрастна оценка на фискалната политика и бюджетни прогнози", "Impartial assessment of fiscal policy and budget forecasts")
    },
    {
      icon: BarChart3,
      title: t("Оценка на прогнози", "Forecast Evaluation"),
      description: t("Анализ на макроикономическите прогнози и фискалните проекции", "Analysis of macroeconomic forecasts and fiscal projections")
    },
    {
      icon: FileText,
      title: t("Публичност и отчетност", "Transparency and Accountability"),
      description: t("Прозрачно представяне на анализи и становища пред обществото", "Transparent presentation of analyses and opinions to the public")
    }
  ];

  const latestNews = [
    {
      title: t("Становище относно актуализацията на бюджета за 2024 година", "Opinion on the 2024 Budget Update"),
      date: t("15 юли 2024", "July 15, 2024"),
      excerpt: t("Фискалният съвет анализира предложените промени в държавния бюджет и техните възможни последици за фискалната устойчивост.", "The Fiscal Council analyzes the proposed changes to the state budget and their potential consequences for fiscal sustainability."),
      category: t("Становище", "Opinion")
    },
    {
      title: t("Доклад за изпълнението на бюджета за първото полугодие", "Report on Budget Execution for the First Half of the Year"),
      date: t("28 юни 2024", "June 28, 2024"), 
      excerpt: t("Детайлен анализ на постигнатите резултати при изпълнението на държавния бюджет през първите шест месеца от годината.", "Detailed analysis of the results achieved in the execution of the state budget during the first six months of the year."),
      category: t("Доклад", "Report")
    },
    {
      title: t("Оценка на макроикономическите прогнози за 2024-2026", "Assessment of Macroeconomic Forecasts for 2024-2026"),
      date: t("10 май 2024", "May 10, 2024"),
      excerpt: t("Анализ на прогнозите за икономическо развитие и тяхното въздействие върху публичните финанси.", "Analysis of economic development forecasts and their impact on public finances."),
      category: t("Анализ", "Analysis")
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
              {t("Фискален съвет на България", "Fiscal Council of Bulgaria")}
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90">
              {t("Обективност, прозрачност и фискална устойчивост", "Objectivity, transparency and fiscal sustainability")}
            </p>
            <div className="flex flex-wrap gap-4 mb-8">
              <Badge variant="secondary" className="text-sm px-4 py-2 bg-white/20 text-white border-white/30">
                {t("Независимост", "Independence")}
              </Badge>
              <Badge variant="secondary" className="text-sm px-4 py-2 bg-white/20 text-white border-white/30">
                {t("Прозрачност", "Transparency")}
              </Badge>
              <Badge variant="secondary" className="text-sm px-4 py-2 bg-white/20 text-white border-white/30">
                {t("Устойчивост", "Sustainability")}
              </Badge>
            </div>
            <p className="text-lg mb-8 text-white/80">
              {t("Анализираме бюджета безпристрастно и предоставяме независими оценки на фискалната политика", "We analyze the budget impartially and provide independent assessments of fiscal policy")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" variant="secondary" asChild>
                <Link to="/about">
                  {t("Научете повече за нас", "Learn more about us")}
                  <ChevronRight className="ml-2" size={16} />
                </Link>
              </Button>
              <Button size="lg" className="bg-white text-primary hover:bg-white/90" asChild>
                <Link to="/reports">
                  {t("Прегледайте докладите", "View Reports")}
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
            {t("Нашата роля", "Our Role")}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("Като независим орган осигуряваме обективен анализ и оценка на фискалната политика", "As an independent body, we provide objective analysis and assessment of fiscal policy")}
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
            {t("Нашите постижения", "Our Achievements")}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("Статистики, които отразяват нашия професионализъм и качество на работа", "Statistics that reflect our professionalism and quality of work")}
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
              {t("Последни новини", "Latest News")}
            </h2>
            <p className="text-lg text-muted-foreground">
              {t("Актуална информация за дейността на Фискалния съвет", "Current information about the activities of the Fiscal Council")}
            </p>
          </div>
          <Button variant="outline" asChild className="hidden md:inline-flex">
            <Link to="/news">
              {t("Всички новини", "All News")}
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
                  {t("Прочети още", "Read more")}
                  <ChevronRight className="ml-1" size={14} />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-8 md:hidden">
          <Button variant="outline" asChild>
            <Link to="/news">
              {t("Всички новини", "All News")}
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
              {t("Виж всички доклади и анализи", "View All Reports and Analyses")}
            </h2>
            <p className="text-lg mb-8 text-white/90 max-w-2xl mx-auto">
              {t("Получете достъп до цялостните анализи, доклади и становища на Фискалния съвет", "Get access to comprehensive analyses, reports and opinions of the Fiscal Council")}
            </p>
            <Button size="lg" variant="secondary" asChild>
              <Link to="/reports">
                {t("Прегледайте докладите", "View Reports")}
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