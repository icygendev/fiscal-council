import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { supabase } from '@/integrations/supabase/client';

interface Expert {
  id: string;
  name_bg: string;
  position_bg: string;
  photo_url?: string;
  biography_bg?: string;
  category: string;
  order_index: number;
  active: boolean;
}

const ExpertCouncil = () => {
  const [experts, setExperts] = useState<Expert[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchExperts();
  }, []);

  const fetchExperts = async () => {
    try {
      const { data, error } = await supabase
        .from('members')
        .select('*')
        .eq('category', 'expert')
        .eq('active', true)
        .order('order_index', { ascending: true });

      if (error) throw error;
      setExperts(data || []);
    } catch (error) {
      console.error('Error fetching experts:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="container mx-auto px-4 py-8">Зареждане...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-primary mb-8 text-center">Експертен състав</h1>
        
        <div className="prose prose-lg max-w-none">
          <section className="mb-12">
            <p className="text-lg text-muted-foreground leading-relaxed mb-8 text-center max-w-4xl mx-auto">
              Експертният състав на Фискалния съвет се състои от високо квалифицирани специалисти с дългогодишен опит 
              в областта на публичните финанси, макроикономическия анализ и фискалната политика.
            </p>
          </section>

          <div className="grid gap-8">
            {experts.map((expert) => (
              <Card key={expert.id} className="bg-card border border-border shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex flex-col lg:flex-row">
                  <div className="lg:w-1/3 p-6 flex justify-center lg:justify-start">
                    <img 
                      src={expert.photo_url || ''} 
                      alt={expert.name_bg}
                      className="w-48 h-64 object-cover rounded-lg shadow-md"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop&crop=face';
                      }}
                    />
                  </div>
                  <div className="lg:w-2/3 p-6">
                    <CardHeader className="p-0 mb-4">
                      <CardTitle className="text-2xl text-primary mb-2">{expert.name_bg}</CardTitle>
                      <Badge variant="secondary" className="w-fit text-sm px-3 py-1">
                        {expert.position_bg}
                      </Badge>
                    </CardHeader>
                    <CardContent className="p-0">
                      <p className="text-muted-foreground leading-relaxed text-base">
                        {expert.biography_bg}
                      </p>
                    </CardContent>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <section className="mt-12 bg-secondary/20 p-8 rounded-lg">
            <h2 className="text-2xl font-semibold text-primary mb-6 text-center">Роля на експертния състав</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-primary mb-3">Аналитична дейност</h3>
                <p className="text-muted-foreground text-sm">
                  Подготвя анализи и становища по фискални въпроси в подкрепа на дейността на Съвета
                </p>
              </div>
              <div className="text-center">
                <h3 className="text-lg font-semibold text-primary mb-3">Експертна подкрепа</h3>
                <p className="text-muted-foreground text-sm">
                  Осигурява професионална и техническа подкрепа при изготвянето на доклади и оценки
                </p>
              </div>
              <div className="text-center">
                <h3 className="text-lg font-semibold text-primary mb-3">Изследователска работа</h3>
                <p className="text-muted-foreground text-sm">
                  Провежда специализирани изследвания в областта на публичните финанси
                </p>
              </div>
              <div className="text-center">
                <h3 className="text-lg font-semibold text-primary mb-3">Координация</h3>
                <p className="text-muted-foreground text-sm">
                  Координира работата с външни експерти и международни организации
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ExpertCouncil;