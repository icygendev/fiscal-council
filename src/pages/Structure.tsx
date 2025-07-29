import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Structure = () => {
  const members = [
    {
      name: "Симеон Дянков",
      position: "Председател на Фискалния съвет",
      image: "https://www.fiscal-council.bg/medias/uploads/team/2025/simeon-dyankov.jpg",
      bio: "Симеон Дянков става магистър по икономика в Мичиганския университет през 1995 г., а през 1997 г. получава научната степен доктор по икономика от същия университет. Той е министър на финансите на България между 2009 и 2013 г., а след това е избран за председател на Борда на директорите на Европейската банка за възстановяване и развитие. Симеон Дянков е сред първите 1% икономисти в света по брой публикации и цитирания в класацията на RePEc. Симеон Дянков e #194 в световната листа на най-изтъкнатите икономисти и финансисти към октомври 2023 година, #23 в Обединеното Кралство и #1 в България. Дянков има 70 хиляди цитирания в научни издания."
    },
    {
      name: "Проф. д-р Богомил Борисов Манов",
      position: "Член на Фискалния съвет",
      image: "https://www.fiscal-council.bg/medias/uploads/team/2025/bogomil-manov-2.jpg",
      bio: "Проф. д-р Богомил Борисов Манов завършил висшето си образование в СА Д.А. Ценов гр. Свищов. От 1985 г. е преподавател в УНСС, като за периода от 2012 г. до 2024 година е и преподавател в ПУ Паисий Хилендарски. Чете лекции по Основи на финансите, Корпоративни финанси и Финанси на социалното осигуряване. Има две издадени книги, над 60 публикувани статии и доклади. Проф. д-р Манов има 16 годишен практически стаж. Управлявал е две дружества с ограничена отговорност, предприятие в чужбина и две пенсионни компании."
    },
    {
      name: "Д-р Десислава Калчева",
      position: "Член на Фискалния съвет",
      image: "https://www.fiscal-council.bg/medias/uploads/team/2025/desislava-kalcheva.jpg",
      bio: "Десислава Калчева придобива магистърска степен по Публични финанси в УНСС през 2010 година. През 2016 г. защитава дисертационен труд на тема Фискална децентрализация и инвестиционен капацитет на общините в България, като придобива докторска степен по Финанси. Д-р Калчева е преподавател в катедра Икономика и управление по отрасли на Стопански факултет на СУ Св. Климент Охридски. Притежава повече от 15 години опит в сферата на публичните финанси, работила е като експерт по общински финанси във Фонд за органите на местното самоуправление в България (ФЛАГ) и като главен експерт към Фискалния съвет на България."
    },
    {
      name: "Атанас Атанасов",
      position: "Член на Фискалния съвет",
      image: "https://www.fiscal-council.bg/medias/uploads/team/2025/atanas-atanasov.jpg",
      bio: "Атанас Атанасов е магистър по Финанси от УНСС, гр. София. Придобива също магистратура по икономика от Фламандския университет Vrije Universiteit Brussel и магистратура Счетоводство и контрол от Стопанска академия Д. А. Ценов, гр. Свищов. Притежава сертификат Вътрешен одитор в публичния сектор. Заемал е различни длъжности в държавната администрация, като началник Финансов контрол, счетоводител и финансист в екипи за управление на инфраструктурни проекти по оперативните програми, финансирани със средства от ЕС. Атанас Атанасов е във Фискалния съвет от самото му създаване, полагайки основите на тази нова за България институцията."
    },
    {
      name: "Любомир Дацов",
      position: "Член на Фискалния съвет",
      image: "https://www.fiscal-council.bg/medias/uploads/team/2025/l.datzov.jpg",
      bio: "Любомир Дацов е бивш зам. финансов министър, отговарял за бюджета, структурните реформи и координацията на еврофондовете. Бил е член на икономическия и финансов комитет към съвета на финансовите министри в ЕС. Инициатор и координатор на въвеждането на програмното бюджетиране в България. Работил е за Министерство на финансите от 1992-2009г. От 2009 г. е консултант по макроикономически, финансови и банкови въпроси. Бил е хоноруван асистент по публични финанси към стопанския факултет на СУ Климент Охридски. Редовно публикува анализи в различни медии. Завършил е УНСС- София и има редица специализации по макроикономика и бюджетен мениджмънт."
    }
  ];

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
            {members.map((member, index) => (
              <Card key={index} className="bg-card border border-border shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex flex-col lg:flex-row">
                  <div className="lg:w-1/3 p-6 flex justify-center lg:justify-start">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-48 h-64 object-cover rounded-lg shadow-md"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop&crop=face';
                      }}
                    />
                  </div>
                  <div className="lg:w-2/3 p-6">
                    <CardHeader className="p-0 mb-4">
                      <CardTitle className="text-2xl text-primary mb-2">{member.name}</CardTitle>
                      <Badge variant="secondary" className="w-fit text-sm px-3 py-1">
                        {member.position}
                      </Badge>
                    </CardHeader>
                    <CardContent className="p-0">
                      <p className="text-muted-foreground leading-relaxed text-base">
                        {member.bio}
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