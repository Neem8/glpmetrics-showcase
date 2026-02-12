const warnings = [
  "Research peptides",
  "Not prescribed by a doctor",
  "Experimental medications",
  "Unlicensed operations",
  "Difficult cancellation",
  "Misleading pricing",
];

const WarningBanner = () => {
  return (
    <section className="py-16">
      <div className="container mb-8">
        <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground">
          Avoid sketchy providers.
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Online ads sometimes show unsafe providers...
        </p>
      </div>
      <div className="relative overflow-hidden border-y border-destructive/20 bg-destructive/5 py-4">
        <div className="flex animate-warning-ticker items-center gap-10 whitespace-nowrap">
          {[...warnings, ...warnings].map((w, i) => (
            <span key={i} className="text-destructive/70 font-heading font-bold text-lg">
              ⚠ {w}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WarningBanner;
