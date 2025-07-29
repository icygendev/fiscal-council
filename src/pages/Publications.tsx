import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BookOpen, Calendar, User, Search, Filter, FileText, Download } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface Publication {
  id: string;
  title_bg: string;
  title_en?: string;
  description_bg?: string;
  description_en?: string;
  content_bg?: string;
  content_en?: string;
  publication_type: string;
  document_url?: string;
  published: boolean;
  featured: boolean;
  created_at: string;
  updated_at: string;
}

const Publications = () => {
  const [publications, setPublications] = useState<Publication[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedYear, setSelectedYear] = useState("all");

  useEffect(() => {
    fetchPublications();
  }, []);

  const fetchPublications = async () => {
    try {
      const { data, error } = await supabase
        .from('publications')
        .select('*')
        .eq('published', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPublications(data || []);
    } catch (error) {
      console.error('Error fetching publications:', error);
    } finally {
      setLoading(false);
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "доклад": return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "анализ": return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200";
      case "изследване": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "препоръки": return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200";
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

  const calculateReadTime = (content: string) => {
    const wordsPerMinute = 200;
    const wordCount = content.split(' ').length;
    return Math.ceil(wordCount / wordsPerMinute);
  };

  const filteredPublications = publications.filter(item => {
    const matchesSearch = item.title_bg.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (item.description_bg && item.description_bg.toLowerCase().includes(searchTerm.toLowerCase()));
    const itemYear = new Date(item.created_at).getFullYear().toString();
    const matchesYear = selectedYear === "all" || itemYear === selectedYear;
    const matchesType = selectedType === "all" || item.publication_type === selectedType;
    
    return matchesSearch && matchesYear && matchesType;
  });

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p>Зареждане на публикациите...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <BookOpen className="w-8 h-8 text-primary mr-3" />
              <h1 className="text-4xl font-bold text-primary">Публикации</h1>
            </div>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Анализи, доклади и изследвания на Фискалния съвет на България
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
                      placeholder="Търсете в публикациите..."
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
                  
                  <Select value={selectedType} onValueChange={setSelectedType}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Тип" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Всички типове</SelectItem>
                      <SelectItem value="доклад">Доклади</SelectItem>
                      <SelectItem value="анализ">Анализи</SelectItem>
                      <SelectItem value="изследване">Изследвания</SelectItem>
                      <SelectItem value="препоръки">Препоръки</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Results Count */}
          <div className="mb-6">
            <p className="text-muted-foreground">
              Показани {filteredPublications.length} от {publications.length} резултата
            </p>
          </div>

          {/* Publications Grid */}
          <div className="grid gap-6">
            {filteredPublications.map((publication) => (
              <Card key={publication.id} className="group hover:shadow-lg transition-all duration-300 border-l-4 border-l-primary/20 hover:border-l-primary">
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className={getTypeColor(publication.publication_type)}>
                          {publication.publication_type}
                        </Badge>
                        {publication.featured && (
                          <Badge variant="default">Важна</Badge>
                        )}
                        {publication.document_url && (
                          <Badge variant="outline">
                            <FileText className="h-3 w-3 mr-1" />
                            PDF
                          </Badge>
                        )}
                      </div>
                      <CardTitle className="text-xl group-hover:text-primary transition-colors mb-2">
                        {publication.title_bg}
                      </CardTitle>
                      <CardDescription className="text-base leading-relaxed">
                        {publication.description_bg || (publication.content_bg && publication.content_bg.substring(0, 200) + '...')}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-6 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      <span>Фискален съвет</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(publication.created_at)}</span>
                    </div>
                    {publication.content_bg && (
                      <div className="flex items-center gap-1">
                        <BookOpen className="w-4 h-4" />
                        <span>{calculateReadTime(publication.content_bg)} мин четене</span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <button className="text-primary hover:text-primary/80 font-medium transition-colors">
                      Прочети още →
                    </button>
                    {publication.document_url && (
                      <Button variant="outline" size="sm" asChild>
                        <a href={publication.document_url} target="_blank" rel="noopener noreferrer">
                          <Download className="h-4 w-4 mr-2" />
                          Изтегли PDF
                        </a>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* No Results */}
          {filteredPublications.length === 0 && (
            <div className="text-center py-12">
              <Filter className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">Няма намерени резултати</h3>
              <p className="text-muted-foreground">
                Опитайте с различни критерии за търсене или филтриране
              </p>
            </div>
          )}

          {/* Load More */}
          {filteredPublications.length > 0 && (
            <div className="text-center mt-12">
              <Button variant="outline" size="lg">
                Заредете още публикации
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Publications;