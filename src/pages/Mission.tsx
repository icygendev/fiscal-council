const Mission = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-primary mb-8">Мисия и цели</h1>
        
        <div className="prose prose-lg max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-primary mb-4">Мисия</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Фискалният съвет на България е независим орган, който осъществява мониторинг върху спазването на 
              фискалните правила и оценява устойчивостта на публичните финанси на страната.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-primary mb-4">Основни цели</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-secondary/20 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-3">Независим мониторинг</h3>
                <p className="text-muted-foreground">
                  Осъществяване на независим мониторинг върху спазването на фискалните правила
                </p>
              </div>
              <div className="bg-secondary/20 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-3">Оценка на устойчивостта</h3>
                <p className="text-muted-foreground">
                  Оценка на устойчивостта на публичните финанси на България
                </p>
              </div>
              <div className="bg-secondary/20 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-3">Прозрачност</h3>
                <p className="text-muted-foreground">
                  Осигуряване на прозрачност в бюджетния процес и фискалната политика
                </p>
              </div>
              <div className="bg-secondary/20 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-3">Експертни становища</h3>
                <p className="text-muted-foreground">
                  Предоставяне на експертни становища по фискални въпроси
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Mission;