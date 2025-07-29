import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Download, Search, FileText, Calendar, Tag } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const Reports = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedYear, setSelectedYear] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [viewMode, setViewMode] = useState<"table" | "cards">("table");
  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const { data, error } = await supabase
        .from('reports')
        .select('*')
        .eq('published', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setReports(data || []);
    } catch (error: any) {
      toast({
        title: "Грешка",
        description: "Възникна проблем при зареждането на докладите.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('bg-BG');
  };

  const getYear = (dateString: string) => {
    return new Date(dateString).getFullYear().toString();
  };

  const filteredReports = reports.filter(report => {
    const matchesSearch = report.title_bg.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (report.keywords_bg && report.keywords_bg.some((keyword: string) => keyword.toLowerCase().includes(searchTerm.toLowerCase())));
    const matchesYear = selectedYear === "all" || getYear(report.created_at) === selectedYear;
    const matchesType = selectedType === "all" || report.report_type === selectedType;
    
    return matchesSearch && matchesYear && matchesType;
  });

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Зареждане...</div>
      </div>
    );
  }

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
                        <p className="font-medium">{report.title_bg}</p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {report.keywords_bg?.slice(0, 3).map((keyword: string, index: number) => (
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
                        {formatDate(report.created_at)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getTypeColor(report.report_type)}>
                        {report.report_type}
                      </Badge>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => report.document_url && window.open(report.document_url, '_blank')}
                        disabled={!report.document_url}
                      >
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
                  <Badge className={getTypeColor(report.report_type)}>
                    {report.report_type}
                  </Badge>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar size={14} className="mr-1" />
                    {formatDate(report.created_at)}
                  </div>
                </div>
                <CardTitle className="text-lg leading-tight group-hover:text-primary transition-colors">
                  {report.title_bg}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm mb-4">
                  {report.description_bg}
                </CardDescription>
                
                <div className="flex flex-wrap gap-1 mb-4">
                  {report.keywords_bg?.map((keyword: string, index: number) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      <Tag size={10} className="mr-1" />
                      {keyword}
                    </Badge>
                  ))}
                </div>

                <Button 
                  className="w-full" 
                  variant="outline"
                  onClick={() => report.document_url && window.open(report.document_url, '_blank')}
                  disabled={!report.document_url}
                >
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