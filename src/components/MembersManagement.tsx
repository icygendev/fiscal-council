import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Plus, Edit, Trash2, Upload } from 'lucide-react';

interface Member {
  id: string;
  name_bg: string;
  name_en?: string | null;
  position_bg: string;
  position_en?: string | null;
  biography_bg?: string | null;
  biography_en?: string | null;
  photo_url?: string | null;
  category: string;
  order_index: number;
  active: boolean;
  created_at: string;
  updated_at: string;
}

export default function MembersManagement() {
  const [members, setMembers] = useState<Member[]>([]);
  const [experts, setExperts] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingMember, setEditingMember] = useState<Member | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name_bg: '',
    name_en: '',
    position_bg: '',
    position_en: '',
    biography_bg: '',
    biography_en: '',
    photo_url: '',
    category: 'member' as 'member' | 'expert',
    order_index: 1,
    active: true
  });

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const { data, error } = await supabase
        .from('members')
        .select('*')
        .order('category', { ascending: true })
        .order('order_index', { ascending: true });

      if (error) throw error;

      const membersData = (data?.filter(m => m.category === 'member') || []) as Member[];
      const expertsData = (data?.filter(m => m.category === 'expert') || []) as Member[];
      
      setMembers(membersData);
      setExperts(expertsData);
    } catch (error: any) {
      toast({
        title: "Грешка",
        description: "Възникна проблем при зареждането на членовете.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (editingMember) {
        const { error } = await supabase
          .from('members')
          .update(formData)
          .eq('id', editingMember.id);

        if (error) throw error;

        toast({
          title: "Успех",
          description: "Членът беше успешно обновен.",
        });
      } else {
        const { error } = await supabase
          .from('members')
          .insert([formData]);

        if (error) throw error;

        toast({
          title: "Успех",
          description: "Членът беше успешно добавен.",
        });
      }

      setIsDialogOpen(false);
      resetForm();
      fetchMembers();
    } catch (error: any) {
      toast({
        title: "Грешка",
        description: "Възникна проблем при запазването.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (member: Member) => {
    setEditingMember(member);
    setFormData({
      name_bg: member.name_bg,
      name_en: member.name_en || '',
      position_bg: member.position_bg,
      position_en: member.position_en || '',
      biography_bg: member.biography_bg || '',
      biography_en: member.biography_en || '',
      photo_url: member.photo_url || '',
      category: member.category as 'member' | 'expert',
      order_index: member.order_index,
      active: member.active
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Сигурни ли сте, че искате да изтриете този член?')) return;

    try {
      const { error } = await supabase
        .from('members')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Успех",
        description: "Членът беше успешно изтрит.",
      });

      fetchMembers();
    } catch (error: any) {
      toast({
        title: "Грешка",
        description: "Възникна проблем при изтриването.",
        variant: "destructive",
      });
    }
  };

  const resetForm = () => {
    setFormData({
      name_bg: '',
      name_en: '',
      position_bg: '',
      position_en: '',
      biography_bg: '',
      biography_en: '',
      photo_url: '',
      category: 'member',
      order_index: 1,
      active: true
    });
    setEditingMember(null);
  };

  const MemberCard = ({ member }: { member: Member }) => (
    <Card className="mb-4">
      <CardContent className="p-4">
        <div className="flex items-start gap-4">
          {member.photo_url && (
            <img
              src={member.photo_url}
              alt={member.name_bg}
              className="w-16 h-20 object-cover rounded"
            />
          )}
          <div className="flex-1">
            <h3 className="font-semibold text-lg">{member.name_bg}</h3>
            <Badge variant="secondary" className="mb-2">
              {member.position_bg}
            </Badge>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {member.biography_bg}
            </p>
            <div className="flex gap-2 mt-3">
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleEdit(member)}
              >
                <Edit className="h-4 w-4 mr-1" />
                Редактирай
              </Button>
              <Button
                size="sm"
                variant="destructive"
                onClick={() => handleDelete(member.id)}
              >
                <Trash2 className="h-4 w-4 mr-1" />
                Изтрий
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  if (loading && members.length === 0 && experts.length === 0) {
    return <div>Зареждане...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Управление на членове</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="h-4 w-4 mr-2" />
              Добави член
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingMember ? 'Редактиране на член' : 'Добавяне на нов член'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name_bg">Име (БГ) *</Label>
                  <Input
                    id="name_bg"
                    value={formData.name_bg}
                    onChange={(e) => setFormData({ ...formData, name_bg: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="name_en">Име (EN)</Label>
                  <Input
                    id="name_en"
                    value={formData.name_en}
                    onChange={(e) => setFormData({ ...formData, name_en: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="position_bg">Позиция (БГ) *</Label>
                  <Input
                    id="position_bg"
                    value={formData.position_bg}
                    onChange={(e) => setFormData({ ...formData, position_bg: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="position_en">Позиция (EN)</Label>
                  <Input
                    id="position_en"
                    value={formData.position_en}
                    onChange={(e) => setFormData({ ...formData, position_en: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="photo_url">URL на снимката</Label>
                <Input
                  id="photo_url"
                  value={formData.photo_url}
                  onChange={(e) => setFormData({ ...formData, photo_url: e.target.value })}
                  placeholder="https://example.com/photo.jpg"
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="category">Категория *</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value: 'member' | 'expert') => 
                      setFormData({ ...formData, category: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="member">Член на съвета</SelectItem>
                      <SelectItem value="expert">Експертен състав</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="order_index">Поредност</Label>
                  <Input
                    id="order_index"
                    type="number"
                    value={formData.order_index}
                    onChange={(e) => setFormData({ ...formData, order_index: parseInt(e.target.value) || 1 })}
                    min="1"
                  />
                </div>
                <div className="flex items-center space-x-2 mt-6">
                  <input
                    type="checkbox"
                    id="active"
                    checked={formData.active}
                    onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                  />
                  <Label htmlFor="active">Активен</Label>
                </div>
              </div>

              <div>
                <Label htmlFor="biography_bg">Биография (БГ)</Label>
                <Textarea
                  id="biography_bg"
                  value={formData.biography_bg}
                  onChange={(e) => setFormData({ ...formData, biography_bg: e.target.value })}
                  rows={4}
                />
              </div>

              <div>
                <Label htmlFor="biography_en">Биография (EN)</Label>
                <Textarea
                  id="biography_en"
                  value={formData.biography_en}
                  onChange={(e) => setFormData({ ...formData, biography_en: e.target.value })}
                  rows={4}
                />
              </div>

              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Отказ
                </Button>
                <Button type="submit" disabled={loading}>
                  {loading ? 'Запазване...' : editingMember ? 'Обнови' : 'Добави'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="members" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="members">Членове на съвета ({members.length})</TabsTrigger>
          <TabsTrigger value="experts">Експертен състав ({experts.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="members" className="space-y-4">
          {members.length === 0 ? (
            <Card>
              <CardContent className="p-6 text-center">
                <p className="text-muted-foreground">Няма добавени членове на съвета.</p>
              </CardContent>
            </Card>
          ) : (
            members.map((member) => (
              <MemberCard key={member.id} member={member} />
            ))
          )}
        </TabsContent>

        <TabsContent value="experts" className="space-y-4">
          {experts.length === 0 ? (
            <Card>
              <CardContent className="p-6 text-center">
                <p className="text-muted-foreground">Няма добавени експерти.</p>
              </CardContent>
            </Card>
          ) : (
            experts.map((expert) => (
              <MemberCard key={expert.id} member={expert} />
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}