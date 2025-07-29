import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { User } from '@supabase/supabase-js';
import { LogOut, FileText, Users, Newspaper, Settings } from 'lucide-react';

export default function Admin() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check authentication
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/auth');
        return;
      }
      setUser(session.user);
      setLoading(false);
    };

    checkAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        navigate('/auth');
      } else {
        setUser(session.user);
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      toast({
        title: "Успешен изход",
        description: "Излязохте от админ панела.",
      });
      navigate('/');
    } catch (error: any) {
      toast({
        title: "Грешка",
        description: "Възникна проблем при излизането.",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div>Зареждане...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Админ Панел</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">
              Добре дошли, {user.email}
            </span>
            <Button variant="outline" onClick={handleSignOut}>
              <LogOut className="h-4 w-4 mr-2" />
              Изход
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Преглед</TabsTrigger>
            <TabsTrigger value="news">Новини</TabsTrigger>
            <TabsTrigger value="reports">Доклади</TabsTrigger>
            <TabsTrigger value="publications">Публикации</TabsTrigger>
            <TabsTrigger value="members">Членове</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Новини</CardTitle>
                  <Newspaper className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">0</div>
                  <p className="text-xs text-muted-foreground">публикувани статии</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Доклади</CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">0</div>
                  <p className="text-xs text-muted-foreground">публикувани доклади</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Публикации</CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">0</div>
                  <p className="text-xs text-muted-foreground">публикувани документи</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Членове</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">0</div>
                  <p className="text-xs text-muted-foreground">активни членове</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="news">
            <Card>
              <CardHeader>
                <CardTitle>Управление на новини</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Тук ще можете да добавяте, редактирате и изтривате новини.</p>
                <div className="mt-4">
                  <Button>Добави нова новина</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports">
            <Card>
              <CardHeader>
                <CardTitle>Управление на доклади</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Тук ще можете да добавяте, редактирате и изтривате доклади.</p>
                <div className="mt-4">
                  <Button>Добави нов доклад</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="publications">
            <Card>
              <CardHeader>
                <CardTitle>Управление на публикации</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Тук ще можете да добавяте, редактирате и изтривате публикации.</p>
                <div className="mt-4">
                  <Button>Добави нова публикация</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="members">
            <Card>
              <CardHeader>
                <CardTitle>Управление на членове</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Тук ще можете да добавяте, редактирате и изтривате информация за членовете на съвета.</p>
                <div className="mt-4">
                  <Button>Добави нов член</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}