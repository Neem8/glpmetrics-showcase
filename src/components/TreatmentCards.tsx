const treatments = [
  {
    name: "Compounded semaglutide",
    description: "Requires medical necessity",
    price: "Start at $79/mo",
    gradient: "from-teal-900/60 to-teal-950/80",
  },
  {
    name: "Compounded tirzepatide",
    description: "Requires medical necessity",
    price: "Start at $186/mo",
    gradient: "from-sky-900/60 to-sky-950/80",
  },
  {
    name: "Wegovy Pill",
    description: "FDA approved oral tablet for weight loss",
    price: "Find a provider",
    gradient: "from-violet-900/60 to-violet-950/80",
  },
  {
    name: "Ozempic",
    description: "FDA approved for diabetes and chronic kidney disease",
    price: "Find a provider",
    gradient: "from-rose-900/60 to-rose-950/80",
  },
  {
    name: "Zepbound",
    description: "FDA approved for weight loss and sleep apnea",
    price: "Find a provider",
    gradient: "from-amber-900/60 to-amber-950/80",
  },
];

const TreatmentCards = () => {
  return (
    <section className="py-20">
      <div className="container">
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground">
          Find <span className="text-primary">doctor-trusted</span> weight loss
          <br />treatment options.
        </h2>

        <div className="mt-10 flex gap-4 overflow-x-auto pb-4 scrollbar-none">
          {treatments.map((t) => (
            <button
              key={t.name}
              className={`flex-shrink-0 w-56 rounded-2xl bg-gradient-to-br ${t.gradient} p-6 text-left transition-transform hover:scale-[1.02] border border-border/30`}
            >
              <h3 className="text-xl font-heading font-bold text-foreground leading-tight">
                {t.name}
              </h3>
              <p className="mt-2 text-sm text-secondary-foreground">{t.description}</p>
              <p className="mt-4 text-sm font-medium text-primary">{t.price}</p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TreatmentCards;
