import { Shield, Eye, Star } from "lucide-react";

const trustItems = [
  {
    icon: Shield,
    title: "Trusted providers",
    description: "Medications prescribed by licensed clinicians and filled by licensed pharmacies.",
    cta: "Find a provider",
  },
  {
    icon: Eye,
    title: "Transparent sourcing",
    description: "See compounding pharmacies used and verify their licensing.",
    cta: "Browse pharmacies",
  },
  {
    icon: Star,
    title: "Real patient reviews",
    description: "Learn about customer experiences - not just weight loss stories.",
    cta: "Read reviews",
  },
];

const TrustSection = () => {
  return (
    <section className="py-20">
      <div className="container">
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground">
          Choose care<br />you can <span className="text-primary">trust.</span>
        </h2>

        <div className="mt-10 grid md:grid-cols-3 gap-4">
          {trustItems.map((item) => (
            <div
              key={item.title}
              className="group rounded-2xl border border-border bg-card p-6 hover:border-primary/30 transition-colors cursor-pointer"
            >
              <item.icon className="h-8 w-8 text-primary" />
              <h3 className="mt-4 text-lg font-heading font-bold text-foreground">{item.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
              <span className="mt-4 inline-block text-sm text-primary font-medium group-hover:underline">
                {item.cta} →
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
