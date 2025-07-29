import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Search, Filter, ChevronRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface NewsItem {
  id: string;
  title_bg: string;
  title_en?: string;
  content_bg: string;
  content_en?: string;
  excerpt_bg?: string;
  excerpt_en?: string;
  category: string;
  image_url?: string;
  published: boolean;
  featured: boolean;
  created_at: string;
  updated_at: string;
}

const News = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedYear, setSelectedYear] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const { data, error } = await supabase
        .from('news')
        .select('*')
        .eq('published', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setNewsItems(data || []);
    } catch (error) {
      console.error('Error fetching news:', error);
    } finally {
      setLoading(false);
    }
  };

  const categories = ["Всички", "доклад", "становище", "анализ", "прессъобщение", "новини"];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "доклад": return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "становище": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "анализ": return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200";
      case "прессъобщение": return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('bg-BG', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const filteredNews = newsItems.filter(item => {
    const matchesSearch = item.title_bg.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (item.excerpt_bg && item.excerpt_bg.toLowerCase().includes(searchTerm.toLowerCase()));
    const itemYear = new Date(item.created_at).getFullYear().toString();
    const matchesYear = selectedYear === "all" || itemYear === selectedYear;
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
    
    return matchesSearch && matchesYear && matchesCategory;
  });

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p>Зареждане на новините...</p>
        </div>
      </div>
    );
  }

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
                  <SelectItem value="доклад">Доклад</SelectItem>
                  <SelectItem value="становище">Становище</SelectItem>
                  <SelectItem value="анализ">Анализ</SelectItem>
                  <SelectItem value="прессъобщение">Прессъобщение</SelectItem>
                  <SelectItem value="новини">Новини</SelectItem>
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
                src={item.image_url || "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=200&fit=crop"} 
                alt={item.title_bg}
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
                  {formatDate(item.created_at)}
                </div>
              </div>
              <CardTitle className="text-lg leading-tight group-hover:text-primary transition-colors line-clamp-2">
                {item.title_bg}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <CardDescription className="text-sm mb-4 line-clamp-3">
                {item.excerpt_bg || item.content_bg.substring(0, 150) + '...'}
              </CardDescription>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">
                  {Math.ceil(item.content_bg.length / 1000)} мин четене
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