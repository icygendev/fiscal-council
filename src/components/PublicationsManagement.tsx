import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Plus, Edit2, Trash2, Calendar, Eye, FileText, RefreshCw } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

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

export default function PublicationsManagement() {
  const [publications, setPublications] = useState<Publication[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPublication, setEditingPublication] = useState<Publication | null>(null);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    title_bg: '',
    title_en: '',
    description_bg: '',
    description_en: '',
    content_bg: '',
    content_en: '',
    publication_type: 'публикация',
    document_url: '',
    published: false,
    featured: false,
  });

  useEffect(() => {
    fetchPublications();
  }, []);

  const fetchPublications = async () => {
    try {
      const { data, error } = await supabase
        .from('publications')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPublications(data || []);
    } catch (error: any) {
      toast({
        title: "Грешка",
        description: "Неуспешно зареждане на публикациите: " + error.message,
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
      content_bg: '',
      content_en: '',
      publication_type: 'публикация',
      document_url: '',
      published: false,
      featured: false,
    });
    setEditingPublication(null);
  };

  const handleEdit = (publication: Publication) => {
    setEditingPublication(publication);
    setFormData({
      title_bg: publication.title_bg,
      title_en: publication.title_en || '',
      description_bg: publication.description_bg || '',
      description_en: publication.description_en || '',
      content_bg: publication.content_bg || '',
      content_en: publication.content_en || '',
      publication_type: publication.publication_type,
      document_url: publication.document_url || '',
      published: publication.published,
      featured: publication.featured,
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title_bg.trim()) {
      toast({
        title: "Грешка",
        description: "Моля, попълнете заглавието на български език.",
        variant: "destructive",
      });
      return;
    }

    try {
      if (editingPublication) {
        const { error } = await supabase
          .from('publications')
          .update(formData)
          .eq('id', editingPublication.id);

        if (error) throw error;

        toast({
          title: "Успех",
          description: "Публикацията беше успешно обновена!",
        });
      } else {
        const { error } = await supabase
          .from('publications')
          .insert([formData]);

        if (error) throw error;

        toast({
          title: "Успех",
          description: "Публикацията беше успешно създадена!",
        });
      }

      resetForm();
      setIsDialogOpen(false);
      fetchPublications();
    } catch (error: any) {
      toast({
        title: "Грешка",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Сигурни ли сте, че искате да изтриете тази публикация?')) {
      return;
    }

    try {
      const { error } = await supabase
        .from('publications')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Успех",
        description: "Публикацията беше успешно изтрита!",
      });

      fetchPublications();
    } catch (error: any) {
      toast({
        title: "Грешка",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "доклад": return "bg-blue-100 text-blue-800";
      case "анализ": return "bg-purple-100 text-purple-800";
      case "изследване": return "bg-green-100 text-green-800";
      case "препоръки": return "bg-orange-100 text-orange-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div>Зареждане...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Управление на публикации</h2>
          <p className="text-muted-foreground">Създавайте и управлявайте доклади, анализи и изследвания</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={fetchPublications} variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Обнови
          </Button>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={resetForm}>
                <Plus className="h-4 w-4 mr-2" />
                Добави публикация
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingPublication ? 'Редактиране на публикация' : 'Добавяне на нова публикация'}
                </DialogTitle>
                <DialogDescription>
                  Попълнете информацията за публикацията. Полетата с * са задължителни.
                </DialogDescription>
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

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="description_bg">Кратко описание (БГ)</Label>
                    <Textarea
                      id="description_bg"
                      value={formData.description_bg}
                      onChange={(e) => setFormData({ ...formData, description_bg: e.target.value })}
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label htmlFor="description_en">Кратко описание (EN)</Label>
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
                    <Label htmlFor="content_bg">Съдържание (БГ)</Label>
                    <Textarea
                      id="content_bg"
                      value={formData.content_bg}
                      onChange={(e) => setFormData({ ...formData, content_bg: e.target.value })}
                      rows={8}
                    />
                  </div>
                  <div>
                    <Label htmlFor="content_en">Съдържание (EN)</Label>
                    <Textarea
                      id="content_en"
                      value={formData.content_en}
                      onChange={(e) => setFormData({ ...formData, content_en: e.target.value })}
                      rows={8}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="publication_type">Тип</Label>
                    <Select value={formData.publication_type} onValueChange={(value) => setFormData({ ...formData, publication_type: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="публикация">Публикация</SelectItem>
                        <SelectItem value="доклад">Доклад</SelectItem>
                        <SelectItem value="анализ">Анализ</SelectItem>
                        <SelectItem value="изследване">Изследване</SelectItem>
                        <SelectItem value="препоръки">Препоръки</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="document_url">URL на документ (PDF)</Label>
                    <Input
                      id="document_url"
                      type="url"
                      value={formData.document_url}
                      onChange={(e) => setFormData({ ...formData, document_url: e.target.value })}
                      placeholder="https://example.com/document.pdf"
                    />
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="published"
                      checked={formData.published}
                      onCheckedChange={(checked) => setFormData({ ...formData, published: checked })}
                    />
                    <Label htmlFor="published">Публикувана</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="featured"
                      checked={formData.featured}
                      onCheckedChange={(checked) => setFormData({ ...formData, featured: checked })}
                    />
                    <Label htmlFor="featured">Важна публикация</Label>
                  </div>
                </div>

                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Отказ
                  </Button>
                  <Button type="submit">
                    {editingPublication ? 'Обнови' : 'Създай'}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Всички публикации ({publications.length})</CardTitle>
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
              {publications.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{item.title_bg}</p>
                      {item.description_bg && (
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {item.description_bg}
                        </p>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getTypeColor(item.publication_type)}>
                      {item.publication_type}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      {item.published && (
                        <Badge variant="secondary">
                          <Eye className="h-3 w-3 mr-1" />
                          Публикувана
                        </Badge>
                      )}
                      {item.featured && (
                        <Badge variant="default">Важна</Badge>
                      )}
                      {!item.published && (
                        <Badge variant="outline">Чернова</Badge>
                      )}
                      {item.document_url && (
                        <Badge variant="outline">
                          <FileText className="h-3 w-3 mr-1" />
                          PDF
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4 mr-1" />
                      {new Date(item.created_at).toLocaleDateString('bg-BG')}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(item)}
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {publications.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">Все още няма добавени публикации.</p>
              <Button className="mt-2" onClick={() => setIsDialogOpen(true)}>
                Добави първата публикация
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}