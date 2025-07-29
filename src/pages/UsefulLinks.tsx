const UsefulLinks = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-primary mb-8">Полезни връзки</h1>
        
        <div className="prose prose-lg max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-primary mb-4">Национални институции</h2>
            <div className="grid gap-4">
              <a href="https://www.minfin.bg" target="_blank" rel="noopener noreferrer" 
                 className="flex items-center justify-between p-4 bg-card border border-border rounded-lg hover:shadow-md transition-shadow">
                <div>
                  <h3 className="font-semibold text-primary">Министерство на финансите</h3>
                  <p className="text-sm text-muted-foreground">Официален сайт на МФ на Република България</p>
                </div>
                <span className="text-xs text-muted-foreground">→</span>
              </a>
              
              <a href="https://www.bnb.bg" target="_blank" rel="noopener noreferrer"
                 className="flex items-center justify-between p-4 bg-card border border-border rounded-lg hover:shadow-md transition-shadow">
                <div>
                  <h3 className="font-semibold text-primary">Българска народна банка</h3>
                  <p className="text-sm text-muted-foreground">Централна банка на Република България</p>
                </div>
                <span className="text-xs text-muted-foreground">→</span>
              </a>
              
              <a href="https://www.nsi.bg" target="_blank" rel="noopener noreferrer"
                 className="flex items-center justify-between p-4 bg-card border border-border rounded-lg hover:shadow-md transition-shadow">
                <div>
                  <h3 className="font-semibold text-primary">Национален статистически институт</h3>
                  <p className="text-sm text-muted-foreground">Официална статистика на България</p>
                </div>
                <span className="text-xs text-muted-foreground">→</span>
              </a>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-primary mb-4">Европейски институции</h2>
            <div className="grid gap-4">
              <a href="https://ec.europa.eu" target="_blank" rel="noopener noreferrer"
                 className="flex items-center justify-between p-4 bg-card border border-border rounded-lg hover:shadow-md transition-shadow">
                <div>
                  <h3 className="font-semibold text-primary">Европейска комисия</h3>
                  <p className="text-sm text-muted-foreground">Изпълнителен орган на Европейския съюз</p>
                </div>
                <span className="text-xs text-muted-foreground">→</span>
              </a>
              
              <a href="https://www.ecb.europa.eu" target="_blank" rel="noopener noreferrer"
                 className="flex items-center justify-between p-4 bg-card border border-border rounded-lg hover:shadow-md transition-shadow">
                <div>
                  <h3 className="font-semibold text-primary">Европейска централна банка</h3>
                  <p className="text-sm text-muted-foreground">Централна банка на еврозоната</p>
                </div>
                <span className="text-xs text-muted-foreground">→</span>
              </a>
              
              <a href="https://www.europarl.europa.eu" target="_blank" rel="noopener noreferrer"
                 className="flex items-center justify-between p-4 bg-card border border-border rounded-lg hover:shadow-md transition-shadow">
                <div>
                  <h3 className="font-semibold text-primary">Европейски парламент</h3>
                  <p className="text-sm text-muted-foreground">Законодателен орган на ЕС</p>
                </div>
                <span className="text-xs text-muted-foreground">→</span>
              </a>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-primary mb-4">Международни организации</h2>
            <div className="grid gap-4">
              <a href="https://www.imf.org" target="_blank" rel="noopener noreferrer"
                 className="flex items-center justify-between p-4 bg-card border border-border rounded-lg hover:shadow-md transition-shadow">
                <div>
                  <h3 className="font-semibold text-primary">Международен валутен фонд</h3>
                  <p className="text-sm text-muted-foreground">Глобална финансова организация</p>
                </div>
                <span className="text-xs text-muted-foreground">→</span>
              </a>
              
              <a href="https://www.oecd.org" target="_blank" rel="noopener noreferrer"
                 className="flex items-center justify-between p-4 bg-card border border-border rounded-lg hover:shadow-md transition-shadow">
                <div>
                  <h3 className="font-semibold text-primary">ОИСР</h3>
                  <p className="text-sm text-muted-foreground">Организация за икономическо сътрудничество и развитие</p>
                </div>
                <span className="text-xs text-muted-foreground">→</span>
              </a>
              
              <a href="https://www.worldbank.org" target="_blank" rel="noopener noreferrer"
                 className="flex items-center justify-between p-4 bg-card border border-border rounded-lg hover:shadow-md transition-shadow">
                <div>
                  <h3 className="font-semibold text-primary">Световна банка</h3>
                  <p className="text-sm text-muted-foreground">Международна финансова институция</p>
                </div>
                <span className="text-xs text-muted-foreground">→</span>
              </a>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-primary mb-4">Други фискални съвети</h2>
            <div className="grid gap-4">
              <a href="https://www.euifis.eu" target="_blank" rel="noopener noreferrer"
                 className="flex items-center justify-between p-4 bg-card border border-border rounded-lg hover:shadow-md transition-shadow">
                <div>
                  <h3 className="font-semibold text-primary">EU Independent Fiscal Institutions</h3>
                  <p className="text-sm text-muted-foreground">Мрежа на независимите фискални институции в ЕС</p>
                </div>
                <span className="text-xs text-muted-foreground">→</span>
              </a>
              
              <a href="https://www.cbo.gov" target="_blank" rel="noopener noreferrer"
                 className="flex items-center justify-between p-4 bg-card border border-border rounded-lg hover:shadow-md transition-shadow">
                <div>
                  <h3 className="font-semibold text-primary">Congressional Budget Office (САЩ)</h3>
                  <p className="text-sm text-muted-foreground">Американски независим фискален орган</p>
                </div>
                <span className="text-xs text-muted-foreground">→</span>
              </a>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default UsefulLinks;