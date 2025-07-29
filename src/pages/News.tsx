import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Search, Filter, ChevronRight } from "lucide-react";

const News = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedYear, setSelectedYear] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const newsItems = [
    {
      id: 1,
      title: "Становище относно актуализацията на бюджета за 2024 година",
      date: "15 юли 2024",
      category: "Становище",
      excerpt: "Фискалният съвет анализира предложените промени в държавния бюджет и техните възможни последици за фискалната устойчивост. Основните изводи показват необходимост от по-консервативен подход при прогнозирането на приходите.",
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=200&fit=crop",
      readTime: "5 мин"
    },
    {
      id: 2,
      title: "Доклад за изпълнението на бюджета за първото полугодие",
      date: "28 юни 2024",
      category: "Доклад",
      excerpt: "Детайлен анализ на постигнатите резултати при изпълнението на държавния бюджет през първите шест месеца от годината. Отчетен е дефицит от 2.1% от БВП.",
      image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=200&fit=crop",
      readTime: "8 мин"
    },
    {
      id: 3,
      title: "Оценка на макроикономическите прогнози за 2024-2026",
      date: "10 май 2024",
      category: "Анализ",
      excerpt: "Анализ на прогнозите за икономическо развитие и тяхното въздействие върху публичните финанси. Очаква се умерен ръст на БВП от 2.8% за 2024 година.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=200&fit=crop",
      readTime: "6 мин"
    },
    {
      id: 4,
      title: "Прессъобщение: Нова методология за оценка на фискалните рискове",
      date: "22 април 2024",
      category: "Прессъобщение",
      excerpt: "Фискалният съвет въвежда обновена методология за идентифициране и оценка на основните фискални рискове за българската икономика.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=200&fit=crop",
      readTime: "3 мин"
    },
    {
      id: 5,
      title: "Становище по проекта за изменение на Закона за публичните финанси",
      date: "5 март 2024",
      category: "Становище",
      excerpt: "Анализ и препоръки относно предложените промени в законодателството, касаещи управлението на публичните финанси и фискалните правила.",
      image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400&h=200&fit=crop",
      readTime: "7 мин"
    },
    {
      id: 6,
      title: "Годишен доклад за дейността на Фискалния съвет за 2023",
      date: "15 февруари 2024",
      category: "Доклад",
      excerpt: "Цялостен преглед на дейността и постиженията на Фискалния съвет през изминалата година, включително основните анализи и становища.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=200&fit=crop",
      readTime: "12 мин"
    }
  ];

  const categories = ["Всички", "Доклад", "Становище", "Анализ", "Прессъобщение"];
  const years = ["Всички години", "2024", "2023", "2022"];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Доклад": return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "Становище": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "Анализ": return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200";
      case "Прессъобщение": return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  const filteredNews = newsItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesYear = selectedYear === "all" || item.date.includes(selectedYear);
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
    
    return matchesSearch && matchesYear && matchesCategory;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
          Новини и съобщения
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Последните новини, доклади и становища на Фискалния съвет
        </p>
      </div>

      {/* Filters */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
                <Input
                  placeholder="Търсете в новините..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-4">
              <Select value={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Година" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Всички години</SelectItem>
                  <SelectItem value="2024">2024</SelectItem>
                  <SelectItem value="2023">2023</SelectItem>
                  <SelectItem value="2022">2022</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Категория" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Всички категории</SelectItem>
                  <SelectItem value="Доклад">Доклад</SelectItem>
                  <SelectItem value="Становище">Становище</SelectItem>
                  <SelectItem value="Анализ">Анализ</SelectItem>
                  <SelectItem value="Прессъобщение">Прессъобщение</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results Count */}
      <div className="mb-6">
        <p className="text-muted-foreground">
          Показани {filteredNews.length} от {newsItems.length} резултата
        </p>
      </div>

      {/* News Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredNews.map((item) => (
          <Card key={item.id} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
            <div className="aspect-video overflow-hidden">
              <img 
                src={item.image} 
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between mb-2">
                <Badge 
                  variant="secondary" 
                  className={getCategoryColor(item.category)}
                >
                  {item.category}
                </Badge>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar size={14} className="mr-1" />
                  {item.date}
                </div>
              </div>
              <CardTitle className="text-lg leading-tight group-hover:text-primary transition-colors line-clamp-2">
                {item.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <CardDescription className="text-sm mb-4 line-clamp-3">
                {item.excerpt}
              </CardDescription>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">
                  {item.readTime} четене
                </span>
                <Button variant="ghost" size="sm" className="p-0 h-auto font-medium text-primary">
                  Прочети още
                  <ChevronRight className="ml-1" size={14} />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* No Results */}
      {filteredNews.length === 0 && (
        <div className="text-center py-12">
          <Filter className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">Няма намерени резултати</h3>
          <p className="text-muted-foreground">
            Опитайте с различни критерии за търсене или филтриране
          </p>
        </div>
      )}

      {/* Load More */}
      {filteredNews.length > 0 && (
        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            Заредете още новини
          </Button>
        </div>
      )}
    </div>
  );
};

export default News;