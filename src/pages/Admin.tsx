import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { User } from '@supabase/supabase-js';
import { LogOut, FileText, Users, Newspaper, Settings } from 'lucide-react';
import { AnimatedCounter } from '@/components/AnimatedCounter';
import NewsManagement from '@/components/NewsManagement';
import PublicationsManagement from '@/components/PublicationsManagement';
import ReportsManagement from '@/components/ReportsManagement';

export default function Admin() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [counts, setCounts] = useState({
    news: 0,
    reports: 0,
    publications: 0,
    members: 0
  });
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
      
      // Fetch counts
      await fetchCounts();
    };

    checkAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        navigate('/auth');
      } else {
        setUser(session.user);
        setLoading(false);
        fetchCounts();
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const fetchCounts = async () => {
    try {
      const [newsResult, reportsResult, publicationsResult, membersResult] = await Promise.all([
        supabase.from('news').select('id', { count: 'exact', head: true }),
        supabase.from('reports').select('id', { count: 'exact', head: true }),
        supabase.from('publications').select('id', { count: 'exact', head: true }),
        supabase.from('members').select('id', { count: 'exact', head: true })
      ]);

      setCounts({
        news: newsResult.count || 0,
        reports: reportsResult.count || 0,
        publications: publicationsResult.count || 0,
        members: membersResult.count || 0
      });
    } catch (error) {
      console.error('Error fetching counts:', error);
    }
  };

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
                  <AnimatedCounter value={counts.news.toString()} className="text-2xl font-bold" />
                  <p className="text-xs text-muted-foreground">публикувани статии</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Доклади</CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <AnimatedCounter value={counts.reports.toString()} className="text-2xl font-bold" />
                  <p className="text-xs text-muted-foreground">публикувани доклади</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Публикации</CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <AnimatedCounter value={counts.publications.toString()} className="text-2xl font-bold" />
                  <p className="text-xs text-muted-foreground">публикувани документи</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Членове</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <AnimatedCounter value={counts.members.toString()} className="text-2xl font-bold" />
                  <p className="text-xs text-muted-foreground">активни членове</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="news">
            <NewsManagement />
          </TabsContent>

          <TabsContent value="reports">
            <ReportsManagement />
          </TabsContent>

          <TabsContent value="publications">
            <PublicationsManagement />
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