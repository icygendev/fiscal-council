import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, Target, Scale, Users, BookOpen, Gavel } from "lucide-react";

const About = () => {
  const members = [
    {
      name: "Проф. д-р Иван Петров",
      position: "Председател",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
      bio: "Професор по икономика с над 20 години опит в областта на публичните финанси и фискалната политика."
    },
    {
      name: "Д-р Мария Георгиева",
      position: "Заместник-председател",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b5bd?w=300&h=300&fit=crop&crop=face",
      bio: "Експерт по макроикономически анализ и бюджетно планиране с опит в Министерството на финансите."
    },
    {
      name: "Д-р Георги Димитров",
      position: "Член",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
      bio: "Специалист по статистика и икономически прогнози, бивш ръководител в НСИ."
    },
    {
      name: "Анна Стоянова",
      position: "Член",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face",
      bio: "Експерт по европейско право и фискални правила с опит в Европейската комисия."
    },
    {
      name: "Проф. д-р Любомир Василев",
      position: "Член",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&h=300&fit=crop&crop=face",
      bio: "Професор по финанси и банково дело, автор на множество публикации в областта на фискалната устойчивост."
    }
  ];

  const objectives = [
    {
      icon: Target,
      title: "Оценка на фискалните прогнози",
      description: "Анализ и оценка на макроикономическите прогнози, върху които се основават бюджетните проекции"
    },
    {
      icon: Shield,
      title: "Мониторинг на фискалните правила",
      description: "Наблюдение за спазването на националните и европейските фискални правила"
    },
    {
      icon: Scale,
      title: "Независима експертиза",
      description: "Предоставяне на независими становища по въпроси на фискалната политика"
    },
    {
      icon: BookOpen,
      title: "Публична отчетност",
      description: "Осигуряване на прозрачност чрез публикуване на анализи и доклади"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8 space-y-12">
      {/* Page Header */}
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
          За Фискалния съвет
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Независим орган за оценка и мониторинг на фискалната политика на България
        </p>
      </div>

      <Tabs defaultValue="mission" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="mission">Мисия и цели</TabsTrigger>
          <TabsTrigger value="composition">Състав</TabsTrigger>
          <TabsTrigger value="legal">Законова рамка</TabsTrigger>
        </TabsList>

        <TabsContent value="mission" className="space-y-8">
          {/* Mission Statement */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="text-primary" size={24} />
                Мисия
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-base leading-relaxed">
                Законът за Фискалния съвет и автоматичните корективни механизми създава Фискален съвет 
                като независим орган за оценка и мониторинг на фискалната политика. Той осъществява 
                независима оценка на прогнозите, върху които се основават държавният бюджет, бюджетите 
                на фондовете с обществено осигуряване и бюджетът на Европейския съюз, както и на спазването 
                на числените фискални правила.
              </p>
              <p className="text-base leading-relaxed">
                Фискалният съвет спомага за повишаване на прозрачността и отчетността при формирането и 
                провеждането на фискалната политика, както и за укрепване на фискалната дисциплина и 
                устойчивост на публичните финанси.
              </p>
            </CardContent>
          </Card>

          {/* Objectives */}
          <div>
            <h2 className="text-2xl font-bold text-primary mb-6 text-center">
              Основни цели и задачи
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {objectives.map((objective, index) => (
                <Card key={index} className="group hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                        <objective.icon className="text-primary" size={20} />
                      </div>
                      <span className="text-lg">{objective.title}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {objective.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="composition" className="space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-primary mb-6 text-center">
              Състав на Фискалния съвет
            </h2>
            <p className="text-base text-muted-foreground text-center mb-8 max-w-3xl mx-auto">
              Фискалният съвет се състои от пет члена с признат професионален опит в областта на 
              икономиката, публичните финанси или правото.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {members.map((member, index) => (
                <Card key={index} className="text-center group hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <div className="mx-auto mb-4">
                      <img 
                        src={member.image} 
                        alt={member.name}
                        className="w-24 h-24 rounded-full object-cover mx-auto border-4 border-primary/20 group-hover:border-primary/40 transition-colors"
                      />
                    </div>
                    <CardTitle className="text-lg">{member.name}</CardTitle>
                    <Badge variant="secondary" className="mx-auto w-fit">
                      {member.position}
                    </Badge>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm">
                      {member.bio}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="legal" className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Gavel className="text-primary" size={24} />
                Законова рамка
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-3">Основни нормативни актове</h3>
                <ul className="space-y-2 text-base">
                  <li className="flex items-start gap-2">
                    <Badge variant="outline" className="mt-1 text-xs">Закон</Badge>
                    <span>Закон за Фискалния съвет и автоматичните корективни механизми</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Badge variant="outline" className="mt-1 text-xs">ЕС</Badge>
                    <span>Регламент (ЕС) № 473/2013 относно общите разпоредби за мониторинга и оценката на проектите за бюджетни планове</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Badge variant="outline" className="mt-1 text-xs">ЕС</Badge>
                    <span>Директива 2011/85/ЕС относно изискванията за бюджетните рамки на държавите-членки</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Основни правомощия</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium text-primary">Оценъчни функции</h4>
                    <ul className="text-sm space-y-1 text-muted-foreground">
                      <li>• Оценка на макроикономическите прогнози</li>
                      <li>• Анализ на бюджетните проекции</li>
                      <li>• Мониторинг на фискалните правила</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium text-primary">Консултативни функции</h4>
                    <ul className="text-sm space-y-1 text-muted-foreground">
                      <li>• Становища по нормативни актове</li>
                      <li>• Препоръки за фискалната политика</li>
                      <li>• Публикуване на анализи и доклади</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Принципи на дейност</h3>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">Независимост</Badge>
                  <Badge variant="secondary">Прозрачност</Badge>
                  <Badge variant="secondary">Професионализъм</Badge>
                  <Badge variant="secondary">Обективност</Badge>
                  <Badge variant="secondary">Публичност</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default About;