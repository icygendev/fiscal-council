import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Plus, Edit, Trash2, Eye, FileText, Calendar } from 'lucide-react';

interface Report {
  id: string;
  title_bg: string;
  title_en?: string;
  description_bg?: string;
  description_en?: string;
  report_type: string;
  keywords_bg?: string[];
  keywords_en?: string[];
  document_url?: string;
  published: boolean;
  created_at: string;
  updated_at: string;
}

const reportTypes = [
  'Доклад',
  'Становище', 
  'Анализ',
  'Годишен доклад',
  'Специален доклад'
];

export default function ReportsManagement() {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingReport, setEditingReport] = useState<Report | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    title_bg: '',
    title_en: '',
    description_bg: '',
    description_en: '',
    report_type: 'Доклад',
    keywords_bg: '',
    keywords_en: '',
    document_url: '',
    published: false,
  });

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const { data, error } = await supabase
        .from('reports')
        .select('*')
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

  const resetForm = () => {
    setFormData({
      title_bg: '',
      title_en: '',
      description_bg: '',
      description_en: '',
      report_type: 'Доклад',
      keywords_bg: '',
      keywords_en: '',
      document_url: '',
      published: false,
    });
    setEditingReport(null);
  };

  const openCreateDialog = () => {
    resetForm();
    setIsDialogOpen(true);
  };

  const openEditDialog = (report: Report) => {
    setEditingReport(report);
    setFormData({
      title_bg: report.title_bg,
      title_en: report.title_en || '',
      description_bg: report.description_bg || '',
      description_en: report.description_en || '',
      report_type: report.report_type,
      keywords_bg: report.keywords_bg?.join(', ') || '',
      keywords_en: report.keywords_en?.join(', ') || '',
      document_url: report.document_url || '',
      published: report.published,
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title_bg.trim()) {
      toast({
        title: "Грешка",
        description: "Заглавието на български е задължително.",
        variant: "destructive",
      });
      return;
    }

    try {
      const reportData = {
        title_bg: formData.title_bg,
        title_en: formData.title_en || null,
        description_bg: formData.description_bg || null,
        description_en: formData.description_en || null,
        report_type: formData.report_type,
        keywords_bg: formData.keywords_bg ? formData.keywords_bg.split(',').map(k => k.trim()).filter(k => k) : null,
        keywords_en: formData.keywords_en ? formData.keywords_en.split(',').map(k => k.trim()).filter(k => k) : null,
        document_url: formData.document_url || null,
        published: formData.published,
      };

      if (editingReport) {
        const { error } = await supabase
          .from('reports')
          .update(reportData)
          .eq('id', editingReport.id);

        if (error) throw error;

        toast({
          title: "Успех",
          description: "Докладът е актуализиран успешно.",
        });
      } else {
        const { error } = await supabase
          .from('reports')
          .insert([reportData]);

        if (error) throw error;

        toast({
          title: "Успех",
          description: "Докладът е създаден успешно.",
        });
      }

      setIsDialogOpen(false);
      resetForm();
      fetchReports();
    } catch (error: any) {
      toast({
        title: "Грешка",
        description: "Възникна проблем при запазването на доклада.",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Сигурни ли сте, че искате да изтриете този доклад?')) {
      return;
    }

    try {
      const { error } = await supabase
        .from('reports')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Успех",
        description: "Докладът е изтрит успешно.",
      });
      
      fetchReports();
    } catch (error: any) {
      toast({
        title: "Грешка",
        description: "Възникна проблем при изтриването на доклада.",
        variant: "destructive",
      });
    }
  };

  const togglePublished = async (id: string, published: boolean) => {
    try {
      const { error } = await supabase
        .from('reports')
        .update({ published: !published })
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Успех",
        description: `Докладът е ${!published ? 'публикуван' : 'скрит'}.`,
      });
      
      fetchReports();
    } catch (error: any) {
      toast({
        title: "Грешка",
        description: "Възникна проблем при актуализирането на статуса.",
        variant: "destructive",
      });
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
    return new Date(dateString).toLocaleDateString('bg-BG', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return <div>Зареждане...</div>;
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Управление на доклади
        </CardTitle>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openCreateDialog}>
              <Plus className="h-4 w-4 mr-2" />
              Добави доклад
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingReport ? 'Редактиране на доклад' : 'Добавяне на нов доклад'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title_bg">Заглавие (БГ) *</Label>
                  <Input
                    id="title_bg"
                    value={formData.title_bg}
                    onChange={(e) => setFormData({ ...formData, title_bg: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="title_en">Заглавие (EN)</Label>
                  <Input
                    id="title_en"
                    value={formData.title_en}
                    onChange={(e) => setFormData({ ...formData, title_en: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="report_type">Тип доклад</Label>
                <Select value={formData.report_type} onValueChange={(value) => setFormData({ ...formData, report_type: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {reportTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="description_bg">Описание (БГ)</Label>
                  <Textarea
                    id="description_bg"
                    value={formData.description_bg}
                    onChange={(e) => setFormData({ ...formData, description_bg: e.target.value })}
                    rows={3}
                  />
                </div>
                <div>
                  <Label htmlFor="description_en">Описание (EN)</Label>
                  <Textarea
                    id="description_en"
                    value={formData.description_en}
                    onChange={(e) => setFormData({ ...formData, description_en: e.target.value })}
                    rows={3}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="keywords_bg">Ключови думи (БГ)</Label>
                  <Input
                    id="keywords_bg"
                    value={formData.keywords_bg}
                    onChange={(e) => setFormData({ ...formData, keywords_bg: e.target.value })}
                    placeholder="Разделени със запетая"
                  />
                </div>
                <div>
                  <Label htmlFor="keywords_en">Ключови думи (EN)</Label>
                  <Input
                    id="keywords_en"
                    value={formData.keywords_en}
                    onChange={(e) => setFormData({ ...formData, keywords_en: e.target.value })}
                    placeholder="Разделени със запетая"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="document_url">URL на документ</Label>
                <Input
                  id="document_url"
                  value={formData.document_url}
                  onChange={(e) => setFormData({ ...formData, document_url: e.target.value })}
                  placeholder="https://..."
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="published"
                  checked={formData.published}
                  onCheckedChange={(checked) => setFormData({ ...formData, published: checked })}
                />
                <Label htmlFor="published">Публикуван</Label>
              </div>

              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Отказ
                </Button>
                <Button type="submit">
                  {editingReport ? 'Актуализирай' : 'Създай'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Заглавие</TableHead>
              <TableHead>Тип</TableHead>
              <TableHead>Статус</TableHead>
              <TableHead>Дата</TableHead>
              <TableHead>Действия</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reports.map((report) => (
              <TableRow key={report.id}>
                <TableCell>
                  <div>
                    <p className="font-medium">{report.title_bg}</p>
                    {report.title_en && <p className="text-sm text-muted-foreground">{report.title_en}</p>}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className={getTypeColor(report.report_type)}>
                    {report.report_type}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={report.published}
                      onCheckedChange={() => togglePublished(report.id, report.published)}
                    />
                    <span className="text-sm">
                      {report.published ? 'Публикуван' : 'Чернова'}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar size={14} className="mr-1" />
                    {formatDate(report.created_at)}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => openEditDialog(report)}
                    >
                      <Edit size={14} />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleDelete(report.id)}
                    >
                      <Trash2 size={14} />
                    </Button>
                    {report.document_url && (
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => window.open(report.document_url, '_blank')}
                      >
                        <Eye size={14} />
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {reports.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            Няма добавени доклади
          </div>
        )}
      </CardContent>
    </Card>
  );
}