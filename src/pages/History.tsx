const History = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-primary mb-8">История</h1>
        
        <div className="prose prose-lg max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-primary mb-4">Създаване на Фискалния съвет</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Фискалният съвет на България е създаден в съответствие с изискванията на европейското законодателство 
              за фискално управление и прозрачност на публичните финанси.
            </p>
          </section>

          <div className="space-y-8">
            <div className="border-l-4 border-primary pl-6">
              <h3 className="text-xl font-semibold text-primary mb-2">2013 г.</h3>
              <p className="text-muted-foreground">
                Приемане на Закона за публичните финанси, който предвижда създаването на независим фискален съвет
              </p>
            </div>

            <div className="border-l-4 border-primary pl-6">
              <h3 className="text-xl font-semibold text-primary mb-2">2015 г.</h3>
              <p className="text-muted-foreground">
                Официално учредяване на Фискалния съвет и назначаване на първия му състав
              </p>
            </div>

            <div className="border-l-4 border-primary pl-6">
              <h3 className="text-xl font-semibold text-primary mb-2">2016 г.</h3>
              <p className="text-muted-foreground">
                Публикуване на първия годишен доклад за състоянието на публичните финанси
              </p>
            </div>

            <div className="border-l-4 border-primary pl-6">
              <h3 className="text-xl font-semibold text-primary mb-2">2020 г.</h3>
              <p className="text-muted-foreground">
                Назначаване на втория състав на Фискалния съвет и разширяване на компетенциите
              </p>
            </div>

            <div className="border-l-4 border-primary pl-6">
              <h3 className="text-xl font-semibold text-primary mb-2">Настояще</h3>
              <p className="text-muted-foreground">
                Продължаваща дейност по мониторинг на фискалните правила и оценка на устойчивостта на публичните финанси
              </p>
            </div>
          </div>

          <section className="mt-12">
            <h2 className="text-2xl font-semibold text-primary mb-4">Достижения</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-secondary/20 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-3">Публикации</h3>
                <p className="text-muted-foreground">
                  Над 50 публикувани доклада и становища по ключови фискални въпроси
                </p>
              </div>
              <div className="bg-secondary/20 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-3">Прозрачност</h3>
                <p className="text-muted-foreground">
                  Значително повишаване на прозрачността в бюджетния процес
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default History;