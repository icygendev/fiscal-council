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
import { Plus, Edit2, Trash2, Calendar, Eye } from 'lucide-react';
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

export default function NewsManagement() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingNews, setEditingNews] = useState<NewsItem | null>(null);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    title_bg: '',
    title_en: '',
    content_bg: '',
    content_en: '',
    excerpt_bg: '',
    excerpt_en: '',
    category: 'новини',
    image_url: '',
    published: false,
    featured: false,
  });

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const { data, error } = await supabase
        .from('news')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setNews(data || []);
    } catch (error: any) {
      toast({
        title: "Грешка",
        description: "Неуспешно зареждане на новините: " + error.message,
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
      content_bg: '',
      content_en: '',
      excerpt_bg: '',
      excerpt_en: '',
      category: 'новини',
      image_url: '',
      published: false,
      featured: false,
    });
    setEditingNews(null);
  };

  const handleEdit = (newsItem: NewsItem) => {
    setEditingNews(newsItem);
    setFormData({
      title_bg: newsItem.title_bg,
      title_en: newsItem.title_en || '',
      content_bg: newsItem.content_bg,
      content_en: newsItem.content_en || '',
      excerpt_bg: newsItem.excerpt_bg || '',
      excerpt_en: newsItem.excerpt_en || '',
      category: newsItem.category,
      image_url: newsItem.image_url || '',
      published: newsItem.published,
      featured: newsItem.featured,
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title_bg.trim() || !formData.content_bg.trim()) {
      toast({
        title: "Грешка",
        description: "Моля, попълнете задължителните полета (заглавие и съдържание на български).",
        variant: "destructive",
      });
      return;
    }

    try {
      if (editingNews) {
        const { error } = await supabase
          .from('news')
          .update(formData)
          .eq('id', editingNews.id);

        if (error) throw error;

        toast({
          title: "Успех",
          description: "Новината беше успешно обновена!",
        });
      } else {
        const { error } = await supabase
          .from('news')
          .insert([formData]);

        if (error) throw error;

        toast({
          title: "Успех",
          description: "Новината беше успешно създадена!",
        });
      }

      resetForm();
      setIsDialogOpen(false);
      fetchNews();
    } catch (error: any) {
      toast({
        title: "Грешка",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Сигурни ли сте, че искате да изтриете тази новина?')) {
      return;
    }

    try {
      const { error } = await supabase
        .from('news')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Успех",
        description: "Новината беше успешно изтрита!",
      });

      fetchNews();
    } catch (error: any) {
      toast({
        title: "Грешка",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "доклад": return "bg-blue-100 text-blue-800";
      case "становище": return "bg-green-100 text-green-800";
      case "анализ": return "bg-purple-100 text-purple-800";
      case "прессъобщение": return "bg-orange-100 text-orange-800";
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
          <h2 className="text-3xl font-bold tracking-tight">Управление на новини</h2>
          <p className="text-muted-foreground">Създавайте и управлявайте новини, доклади и съобщения</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="h-4 w-4 mr-2" />
              Добави новина
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingNews ? 'Редактиране на новина' : 'Добавяне на нова новина'}
              </DialogTitle>
              <DialogDescription>
                Попълнете информацията за новината. Полетата с * са задължителни.
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
                  <Label htmlFor="excerpt_bg">Кратко описание (БГ)</Label>
                  <Textarea
                    id="excerpt_bg"
                    value={formData.excerpt_bg}
                    onChange={(e) => setFormData({ ...formData, excerpt_bg: e.target.value })}
                    rows={3}
                  />
                </div>
                <div>
                  <Label htmlFor="excerpt_en">Кратко описание (EN)</Label>
                  <Textarea
                    id="excerpt_en"
                    value={formData.excerpt_en}
                    onChange={(e) => setFormData({ ...formData, excerpt_en: e.target.value })}
                    rows={3}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="content_bg">Съдържание (БГ) *</Label>
                  <Textarea
                    id="content_bg"
                    value={formData.content_bg}
                    onChange={(e) => setFormData({ ...formData, content_bg: e.target.value })}
                    rows={6}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="content_en">Съдържание (EN)</Label>
                  <Textarea
                    id="content_en"
                    value={formData.content_en}
                    onChange={(e) => setFormData({ ...formData, content_en: e.target.value })}
                    rows={6}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="category">Категория</Label>
                  <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="новини">Новини</SelectItem>
                      <SelectItem value="доклад">Доклад</SelectItem>
                      <SelectItem value="становище">Становище</SelectItem>
                      <SelectItem value="анализ">Анализ</SelectItem>
                      <SelectItem value="прессъобщение">Прессъобщение</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="image_url">URL на изображение</Label>
                  <Input
                    id="image_url"
                    type="url"
                    value={formData.image_url}
                    onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                    placeholder="https://example.com/image.jpg"
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
                  <Label htmlFor="featured">Важна новина</Label>
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Отказ
                </Button>
                <Button type="submit">
                  {editingNews ? 'Обнови' : 'Създай'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Всички новини ({news.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Заглавие</TableHead>
                <TableHead>Категория</TableHead>
                <TableHead>Статус</TableHead>
                <TableHead>Дата</TableHead>
                <TableHead>Действия</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {news.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{item.title_bg}</p>
                      {item.excerpt_bg && (
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {item.excerpt_bg}
                        </p>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getCategoryColor(item.category)}>
                      {item.category}
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

          {news.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">Все още няма добавени новини.</p>
              <Button className="mt-2" onClick={() => setIsDialogOpen(true)}>
                Добави първата новина
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}