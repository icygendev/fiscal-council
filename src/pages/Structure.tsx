const Structure = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-primary mb-8">Структура</h1>
        
        <div className="prose prose-lg max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-primary mb-4">Организационна структура</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Фискалният съвет се състои от председател и четирима членове, които се назначават за срок от пет години.
            </p>
          </section>

          <div className="grid gap-6">
            <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-primary mb-3">Председател</h3>
              <p className="text-muted-foreground mb-4">
                Ръководи дейността на Фискалния съвет и представлява института пред обществото
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>Организира работата на Съвета</li>
                <li>Представлява института публично</li>
                <li>Координира изготвянето на доклади</li>
              </ul>
            </div>

            <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-primary mb-3">Членове</h3>
              <p className="text-muted-foreground mb-4">
                Четирима членове с висока квалификация в областта на икономиката и финансите
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>Участват в анализите и оценките</li>
                <li>Взимат участие в решенията на Съвета</li>
                <li>Специализирани в различни области на фискалната политика</li>
              </ul>
            </div>

            <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-primary mb-3">Секретариат</h3>
              <p className="text-muted-foreground mb-4">
                Административно и експертно звено, което подпомага дейността на Съвета
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>Техническа и аналитична подкрепа</li>
                <li>Изследователска дейност</li>
                <li>Административно обслужване</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Structure;