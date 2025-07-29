import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Download, Search, FileText, Calendar, Tag } from "lucide-react";

const Reports = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedYear, setSelectedYear] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [viewMode, setViewMode] = useState<"table" | "cards">("table");

  const reports = [
    {
      id: 1,
      title: "Становище относно актуализацията на бюджета за 2024 година",
      date: "15.07.2024",
      type: "Становище",
      keywords: ["бюджет", "актуализация", "фискална политика"],
      fileSize: "2.3 MB",
      pages: 45,
      summary: "Анализ на предложените промени в държавния бюджет за 2024 г."
    },
    {
      id: 2,
      title: "Доклад за изпълнението на бюджета - I полугодие 2024",
      date: "28.06.2024",
      type: "Доклад",
      keywords: ["изпълнение", "бюджет", "полугодие"],
      fileSize: "4.1 MB",
      pages: 78,
      summary: "Детайлен анализ на бюджетното изпълнение за първите 6 месеца"
    },
    {
      id: 3,
      title: "Оценка на макроикономическите прогнози 2024-2026",
      date: "10.05.2024",
      type: "Анализ",
      keywords: ["прогнози", "макроикономика", "БВП"],
      fileSize: "1.8 MB",
      pages: 32,
      summary: "Анализ на прогнозите за икономическо развитие"
    },
    {
      id: 4,
      title: "Становище по проекта за изменение на ЗПУБФ",
      date: "05.03.2024",
      type: "Становище",
      keywords: ["законодателство", "публични финанси"],
      fileSize: "1.2 MB",
      pages: 18,
      summary: "Анализ на предложените промени в закона"
    },
    {
      id: 5,
      title: "Годишен доклад за дейността за 2023 година",
      date: "15.02.2024",
      type: "Годишен доклад",
      keywords: ["годишен доклад", "дейност", "2023"],
      fileSize: "5.7 MB",
      pages: 95,
      summary: "Цялостен преглед на дейността през 2023 г."
    },
    {
      id: 6,
      title: "Оценка на устойчивостта на публичните финанси",
      date: "12.12.2023",
      type: "Анализ",
      keywords: ["устойчивост", "дълг", "демография"],
      fileSize: "3.2 MB",
      pages: 58,
      summary: "Дългосрочен анализ на фискалната устойчивост"
    },
    {
      id: 7,
      title: "Становище относно Конвергентната програма 2023-2026",
      date: "28.04.2023",
      type: "Становище",
      keywords: ["конвергентна програма", "еврозона"],
      fileSize: "2.1 MB",
      pages: 41,
      summary: "Анализ на програмата за присъединяване към еврозоната"
    },
    {
      id: 8,
      title: "Доклад за фискалното въздействие на COVID-19",
      date: "15.09.2022",
      type: "Специален доклад",
      keywords: ["COVID-19", "пандемия", "фискално въздействие"],
      fileSize: "2.8 MB",
      pages: 52,
      summary: "Анализ на фискалното въздействие на пандемията"
    }
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Доклад": return "bg-blue-100 text-blue-800";
      case "Становище": return "bg-green-100 text-green-800";
      case "Анализ": return "bg-purple-100 text-purple-800";
      case "Годишен доклад": return "bg-red-100 text-red-800";
      case "Специален доклад": return "bg-orange-100 text-orange-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const filteredReports = reports.filter(report => {
    const matchesSearch = report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.keywords.some(keyword => keyword.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesYear = selectedYear === "all" || report.date.includes(selectedYear);
    const matchesType = selectedType === "all" || report.type === selectedType;
    
    return matchesSearch && matchesYear && matchesType;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
          Доклади и публикации
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Анализи, доклади и становища на Фискалния съвет на България
        </p>
      </div>

      {/* Filters and Controls */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
                <Input
                  placeholder="Търсете по заглавие или ключови думи..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-4">
              <Select value={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Година" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Всички</SelectItem>
                  <SelectItem value="2024">2024</SelectItem>
                  <SelectItem value="2023">2023</SelectItem>
                  <SelectItem value="2022">2022</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Тип документ" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Всички типове</SelectItem>
                  <SelectItem value="Доклад">Доклад</SelectItem>
                  <SelectItem value="Становище">Становище</SelectItem>
                  <SelectItem value="Анализ">Анализ</SelectItem>
                  <SelectItem value="Годишен доклад">Годишен доклад</SelectItem>
                  <SelectItem value="Специален доклад">Специален доклад</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex border rounded-md">
                <Button
                  variant={viewMode === "table" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("table")}
                  className="rounded-r-none"
                >
                  Таблица
                </Button>
                <Button
                  variant={viewMode === "cards" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("cards")}
                  className="rounded-l-none"
                >
                  Карти
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results Count */}
      <div className="mb-6">
        <p className="text-muted-foreground">
          Показани {filteredReports.length} от {reports.length} документа
        </p>
      </div>

      {/* Table View */}
      {viewMode === "table" && (
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-1/2">Заглавие</TableHead>
                  <TableHead>Дата</TableHead>
                  <TableHead>Тип</TableHead>
                  <TableHead>Страници</TableHead>
                  <TableHead>Размер</TableHead>
                  <TableHead>Действия</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredReports.map((report) => (
                  <TableRow key={report.id} className="hover:bg-muted/50">
                    <TableCell>
                      <div>
                        <p className="font-medium">{report.title}</p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {report.keywords.slice(0, 3).map((keyword, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {keyword}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Calendar size={14} className="mr-1 text-muted-foreground" />
                        {report.date}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getTypeColor(report.type)}>
                        {report.type}
                      </Badge>
                    </TableCell>
                    <TableCell>{report.pages} стр.</TableCell>
                    <TableCell>{report.fileSize}</TableCell>
                    <TableCell>
                      <Button size="sm" variant="outline">
                        <Download size={14} className="mr-1" />
                        PDF
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {/* Cards View */}
      {viewMode === "cards" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReports.map((report) => (
            <Card key={report.id} className="group hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <Badge className={getTypeColor(report.type)}>
                    {report.type}
                  </Badge>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar size={14} className="mr-1" />
                    {report.date}
                  </div>
                </div>
                <CardTitle className="text-lg leading-tight group-hover:text-primary transition-colors">
                  {report.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm mb-4">
                  {report.summary}
                </CardDescription>
                
                <div className="flex flex-wrap gap-1 mb-4">
                  {report.keywords.map((keyword, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      <Tag size={10} className="mr-1" />
                      {keyword}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                  <span>{report.pages} страници</span>
                  <span>{report.fileSize}</span>
                </div>

                <Button className="w-full" variant="outline">
                  <Download size={14} className="mr-2" />
                  Изтегли PDF
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* No Results */}
      {filteredReports.length === 0 && (
        <div className="text-center py-12">
          <FileText className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">Няма намерени документи</h3>
          <p className="text-muted-foreground">
            Опитайте с различни критерии за търсене или филтриране
          </p>
        </div>
      )}
    </div>
  );
};

export default Reports;