import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { supabase } from '@/integrations/supabase/client';

interface Member {
  id: string;
  name_bg: string;
  position_bg: string;
  photo_url?: string;
  biography_bg?: string;
  category: string;
  order_index: number;
  active: boolean;
}

const Structure = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const { data, error } = await supabase
        .from('members')
        .select('*')
        .eq('category', 'member')
        .eq('active', true)
        .order('order_index', { ascending: true });

      if (error) throw error;
      setMembers(data || []);
    } catch (error) {
      console.error('Error fetching members:', error);
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
        <h1 className="text-4xl font-bold text-primary mb-8 text-center">Членове на Фискалния съвет</h1>
        
        <div className="prose prose-lg max-w-none">
          <section className="mb-12">
            <p className="text-lg text-muted-foreground leading-relaxed mb-8 text-center max-w-4xl mx-auto">
              Фискалният съвет се състои от председател и четирима членове, които се назначават за срок от шест години. 
              Всички членове притежават висока квалификация и дългогодишен опит в областта на икономиката, финансите и публичните политики.
            </p>
          </section>

          <div className="grid gap-8">
            {members.map((member) => (
              <Card key={member.id} className="bg-card border border-border shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex flex-col lg:flex-row">
                  <div className="lg:w-1/3 p-6 flex justify-center lg:justify-start">
                    <img 
                      src={member.photo_url || ''} 
                      alt={member.name_bg}
                      className="w-48 h-64 object-cover rounded-lg shadow-md"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop&crop=face';
                      }}
                    />
                  </div>
                  <div className="lg:w-2/3 p-6">
                    <CardHeader className="p-0 mb-4">
                      <CardTitle className="text-2xl text-primary mb-2">{member.name_bg}</CardTitle>
                      <Badge variant="secondary" className="w-fit text-sm px-3 py-1">
                        {member.position_bg}
                      </Badge>
                    </CardHeader>
                    <CardContent className="p-0">
                      <p className="text-muted-foreground leading-relaxed text-base">
                        {member.biography_bg}
                      </p>
                    </CardContent>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <section className="mt-12 bg-secondary/20 p-8 rounded-lg">
            <h2 className="text-2xl font-semibold text-primary mb-6 text-center">Организационна структура</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-primary mb-3">Председател</h3>
                <p className="text-muted-foreground text-sm">
                  Ръководи дейността на Фискалния съвет и представлява института пред обществото
                </p>
              </div>
              <div className="text-center">
                <h3 className="text-lg font-semibold text-primary mb-3">Членове</h3>
                <p className="text-muted-foreground text-sm">
                  Четирима членове с висока квалификация в областта на икономиката и финансите
                </p>
              </div>
              <div className="text-center">
                <h3 className="text-lg font-semibold text-primary mb-3">Секретариат</h3>
                <p className="text-muted-foreground text-sm">
                  Административно и експертно звено, което подпомага дейността на Съвета
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Structure;