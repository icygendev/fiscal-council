const Structure = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-primary mb-8 text-center">Структура на Фискалния съвет</h1>
        
        <div className="prose prose-lg max-w-none">
          <section className="mb-12">
            <p className="text-lg text-muted-foreground leading-relaxed mb-8 text-center">
              Фискалният съвет има ясна организационна структура, която осигурява ефективното изпълнение 
              на неговите функции и задачи в областта на фискалната политика.
            </p>
          </section>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-card border border-border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold text-primary mb-4">Членове на Фискалния съвет</h3>
              <p className="text-muted-foreground mb-4">
                Основният орган за вземане на решения, състоящ се от председател и четирима членове
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1 mb-4">
                <li>Председател на Фискалния съвет</li>
                <li>Четирима членове с висока квалификация</li>
                <li>Мандат от шест години</li>
                <li>Независимост в дейността</li>
              </ul>
              <a 
                href="/council-members" 
                className="inline-block bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark transition-colors"
              >
                Виж членовете
              </a>
            </div>

            <div className="bg-card border border-border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold text-primary mb-4">Експертен съвет</h3>
              <p className="text-muted-foreground mb-4">
                Специализирани експерти, които подпомагат дейността на Фискалния съвет
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1 mb-4">
                <li>Главни експертни сътрудници</li>
                <li>Аналитична и изследователска дейност</li>
                <li>Техническа подкрепа</li>
                <li>Международно сътрудничество</li>
              </ul>
              <a 
                href="/expert-council" 
                className="inline-block bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark transition-colors"
              >
                Виж експертите
              </a>
            </div>
          </div>

          <section className="bg-secondary/20 p-8 rounded-lg">
            <h2 className="text-2xl font-semibold text-primary mb-6 text-center">Основни функции</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-primary mb-3">Управление</h3>
                <p className="text-muted-foreground text-sm">
                  Вземане на стратегически решения и определяне на политиката на института
                </p>
              </div>
              <div className="text-center">
                <h3 className="text-lg font-semibold text-primary mb-3">Анализ</h3>
                <p className="text-muted-foreground text-sm">
                  Провеждане на задълбочени анализи на фискалната политика и публичните финанси
                </p>
              </div>
              <div className="text-center">
                <h3 className="text-lg font-semibold text-primary mb-3">Координация</h3>
                <p className="text-muted-foreground text-sm">
                  Координиране на дейностите и сътрудничеството с национални и международни институции
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