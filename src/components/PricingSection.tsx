import { Check } from "lucide-react";

const PricingSection = () => {
  return (
    <section className="py-20">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Compounded */}
          <div className="rounded-2xl border border-border bg-card p-8">
            <span className="text-xs uppercase tracking-[0.2em] text-primary font-medium">
              Cash pay and insurance support
            </span>
            <h3 className="mt-4 text-2xl font-heading font-bold text-foreground">
              Compounded Medication
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Compare telehealth providers with flexible cash-pay options and compounded medication
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {["Semaglutide", "Tirzepatide"].map((d) => (
                <span key={d} className="rounded-full bg-secondary px-3 py-1 text-xs text-secondary-foreground">
                  {d}
                </span>
              ))}
            </div>

            <div className="mt-6">
              <span className="text-xs text-muted-foreground">from</span>
              <p className="text-4xl font-heading font-bold text-foreground">
                $79<span className="text-lg text-muted-foreground">/mo.</span>
              </p>
            </div>

            <ul className="mt-6 space-y-3">
              {[
                "Monthly billing - cancel anytime",
                "Discounted rates for multi-month packages",
                "New patient starter packages",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-secondary-foreground">
                  <Check className="h-4 w-4 mt-0.5 text-primary flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>

            <button className="mt-8 w-full rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity">
              Compare Providers
            </button>
          </div>

          {/* Brand name */}
          <div className="rounded-2xl border border-border bg-card p-8">
            <span className="text-xs uppercase tracking-[0.2em] text-primary font-medium">
              Insurance coverage
            </span>
            <h3 className="mt-4 text-2xl font-heading font-bold text-foreground">
              Brand Name Medication
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Compare telehealth providers that take insurance and support prior authorization.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {["Ozempic", "Wegovy Pill", "Wegovy", "Mounjaro", "Zepbound"].map((d) => (
                <span key={d} className="rounded-full bg-secondary px-3 py-1 text-xs text-secondary-foreground">
                  {d}
                </span>
              ))}
            </div>

            <div className="mt-6">
              <p className="text-4xl font-heading font-bold text-foreground">
                $0–$25<span className="text-lg text-muted-foreground">/mo.</span>
              </p>
              <span className="text-xs text-muted-foreground">with insurance</span>
            </div>

            <ul className="mt-6 space-y-3">
              {[
                "Prior authorization support by specialists",
                "FDA approved for multiple treatments",
                "Insurance coverage for check-ins",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-secondary-foreground">
                  <Check className="h-4 w-4 mt-0.5 text-primary flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>

            <button className="mt-8 w-full rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity">
              Compare Providers
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
