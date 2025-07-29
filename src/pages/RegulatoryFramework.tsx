const RegulatoryFramework = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-primary mb-8">Нормативна база</h1>
        
        <div className="prose prose-lg max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-primary mb-4">Основни нормативни актове</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Дейността на Фискалния съвет се основава на съвременната нормативна рамка за фискално управление.
            </p>
          </section>

          <div className="space-y-6">
            <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-primary mb-3">Закон за публичните финанси</h3>
              <p className="text-muted-foreground mb-4">
                Основният закон, който регламентира управлението на публичните финанси в България
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>Определя ролята и функциите на Фискалния съвет</li>
                <li>Установява фискалните правила</li>
                <li>Регламентира бюджетния процес</li>
              </ul>
            </div>

            <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-primary mb-3">Правилник за организацията и дейността</h3>
              <p className="text-muted-foreground mb-4">
                Вътрешен правилник, който детайлизира организацията и работните процеси
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>Структура и управление</li>
                <li>Работни процедури</li>
                <li>Вътрешни правила и стандарти</li>
              </ul>
            </div>

            <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-primary mb-3">Европейска нормативна рамка</h3>
              <p className="text-muted-foreground mb-4">
                Директиви и регламенти на ЕС в областта на фискалното управление
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>Директива 2011/85/ЕС за бюджетните рамки</li>
                <li>Регламент (ЕС) № 473/2013</li>
                <li>Фискален компакт</li>
              </ul>
            </div>

            <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-primary mb-3">Международни стандарти</h3>
              <p className="text-muted-foreground mb-4">
                Стандарти и препоръки на международни организации
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>Стандарти на МВФ</li>
                <li>Препоръки на ОИСР</li>
                <li>Насоки на Европейската комисия</li>
              </ul>
            </div>
          </div>

          <section className="mt-12">
            <h2 className="text-2xl font-semibold text-primary mb-4">Документи за изтегляне</h2>
            <div className="grid gap-4">
              <a href="#" className="flex items-center justify-between p-4 bg-secondary/20 rounded-lg hover:bg-secondary/30 transition-colors">
                <span className="font-medium">Закон за публичните финанси</span>
                <span className="text-sm text-muted-foreground">PDF</span>
              </a>
              <a href="#" className="flex items-center justify-between p-4 bg-secondary/20 rounded-lg hover:bg-secondary/30 transition-colors">
                <span className="font-medium">Правилник за организацията и дейността</span>
                <span className="text-sm text-muted-foreground">PDF</span>
              </a>
              <a href="#" className="flex items-center justify-between p-4 bg-secondary/20 rounded-lg hover:bg-secondary/30 transition-colors">
                <span className="font-medium">Кодекс на етичното поведение</span>
                <span className="text-sm text-muted-foreground">PDF</span>
              </a>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default RegulatoryFramework;