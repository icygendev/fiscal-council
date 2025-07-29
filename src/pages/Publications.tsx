import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Calendar, User } from "lucide-react";

const Publications = () => {
  const publications = [
    {
      id: 1,
      title: "Нарастване на европейските разходи за отбрана и възможности за икономически растеж",
      author: "Атанас Атанасов",
      date: "28 юли 2025",
      excerpt: "Анализ на тенденциите в европейските разходи за отбрана и тяхното влияние върху икономическия растеж.",
      readTime: "5 мин четене",
      category: "Анализи"
    },
    {
      id: 2,
      title: "Ценови ограничения са използвани рядко и с малък успех при влизане в еврозоната",
      author: "Фискален съвет",
      date: "24 юли 2025",
      excerpt: "Във всички държави, сменили националната валута с евро, политиците се изправят пред един и същ страх: повишение на цените.",
      readTime: "7 мин четене",
      category: "Анализи"
    },
    {
      id: 3,
      title: "Европейски фискален монитор: Първи поглед към нова фискална парадигма",
      author: "Европейски фискален борд",
      date: "15 юли 2025",
      excerpt: "Преглед на новите фискални правила и тяхното приложение в европейските държави.",
      readTime: "10 мин четене",
      category: "Доклади"
    },
    {
      id: 4,
      title: "Годишен доклад за изпълнението на държавния бюджет",
      author: "Фискален съвет",
      date: "30 юни 2025",
      excerpt: "Детайлен анализ на изпълнението на държавния бюджет за предходната година.",
      readTime: "15 мин четене",
      category: "Доклади"
    },
    {
      id: 5,
      title: "Устойчивост на публичните финанси в условията на демографска криза",
      author: "Иван Петров",
      date: "22 юни 2025",
      excerpt: "Изследване на влиянието на демографските промени върху устойчивостта на публичните финанси.",
      readTime: "8 мин четене",
      category: "Изследвания"
    },
    {
      id: 6,
      title: "Мониторинг на фискалните правила и препоръки за подобрения",
      author: "Мария Георгиева",
      date: "10 юни 2025",
      excerpt: "Анализ на прилагането на фискалните правила и предложения за тяхното усъвършенстване.",
      readTime: "6 мин четене",
      category: "Препоръки"
    }
  ];

  const categories = ["Всички", "Анализи", "Доклади", "Изследвания", "Препоръки"];

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

          {/* Categories Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categories.map((category) => (
              <Badge
                key={category}
                variant={category === "Всички" ? "default" : "secondary"}
                className="cursor-pointer hover:bg-primary/20 transition-colors"
              >
                {category}
              </Badge>
            ))}
          </div>

          {/* Publications Grid */}
          <div className="grid gap-6">
            {publications.map((publication) => (
              <Card key={publication.id} className="group hover:shadow-lg transition-all duration-300 border-l-4 border-l-primary/20 hover:border-l-primary">
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <CardTitle className="text-xl group-hover:text-primary transition-colors mb-2">
                        {publication.title}
                      </CardTitle>
                      <CardDescription className="text-base leading-relaxed">
                        {publication.excerpt}
                      </CardDescription>
                    </div>
                    <Badge variant="outline" className="shrink-0">
                      {publication.category}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-6 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      <span>{publication.author}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{publication.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <BookOpen className="w-4 h-4" />
                      <span>{publication.readTime}</span>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-border">
                    <button className="text-primary hover:text-primary/80 font-medium transition-colors">
                      Прочети още →
                    </button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Load More Button */}
          <div className="text-center mt-12">
            <button className="bg-primary text-primary-foreground px-8 py-3 rounded-md hover:bg-primary/90 transition-colors font-medium">
              Покажи още публикации
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Publications;