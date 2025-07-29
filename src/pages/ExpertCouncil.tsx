import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const ExpertCouncil = () => {
  const experts = [
    {
      name: "Дияна Металова",
      position: "Главен експертен сътрудник",
      image: "https://www.fiscal-council.bg/medias/uploads/team/2025/diana-metalova.jpg",
      bio: "Дияна Металова е главен експертен сътрудник към Фискалния съвет от 2018г., където участва активно при подготовката на становищата на Съвета по отношение на провежданата фискална политика в страната. Същевременно е преподавател в катедра Финанси към УНСС от 2009г. Научните й интереси са в областта на публичните финанси, анализът разходи-ползи, фискалната децентрализация, данъчното облагане. Завършва специалност Финанси в УНСС като последователно придобива бакалавърска, магистърска и докторска степен. През 2007г. придобива и магистърска степен по Право в ЮЗУ Неофит Рилски. Професионалният й опит започва през 2005г. в Министерство на финансите, а в периода 2011-2016г. работи като главен експерт по европейски програми и проекти в Министерство на околната среда и водите. Притежава солиден опит като консултант при изготвянето на анализи на разходите и ползите по европейски проекти."
    },
    {
      name: "Петър Игнатиев",
      position: "Главен експертен сътрудник",
      image: "https://www.fiscal-council.bg/medias/uploads/team/2025/petur-ignatev.jpg",
      bio: "Роден в София 13.09.1967 г. Завършил с отличие Софийска Математическа Гимназия и УНСС специалност Финанси. Защитил докторат по финанси в Икономическия институт на БАН на тема Българската банкова система през 90-те години на ХХ век. Работил в БНБ през 1992-1998 г. като анализатор в дирекция Икономически и паричен анализ и управление Банков надзор. Работил в ОББ през 1999-2024 г. като анализатор в дирекции Главен Икономист и Управление на риска. Обучение в Federal Reserve Board, Washington, Bank of England, London и JVI- Vienna."
    }
  ];

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
            {experts.map((expert, index) => (
              <Card key={index} className="bg-card border border-border shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex flex-col lg:flex-row">
                  <div className="lg:w-1/3 p-6 flex justify-center lg:justify-start">
                    <img 
                      src={expert.image} 
                      alt={expert.name}
                      className="w-48 h-64 object-cover rounded-lg shadow-md"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop&crop=face';
                      }}
                    />
                  </div>
                  <div className="lg:w-2/3 p-6">
                    <CardHeader className="p-0 mb-4">
                      <CardTitle className="text-2xl text-primary mb-2">{expert.name}</CardTitle>
                      <Badge variant="secondary" className="w-fit text-sm px-3 py-1">
                        {expert.position}
                      </Badge>
                    </CardHeader>
                    <CardContent className="p-0">
                      <p className="text-muted-foreground leading-relaxed text-base">
                        {expert.bio}
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