const pressLogos = [
  { name: "QUARTZ", style: "font-heading font-bold tracking-[0.3em] text-lg" },
  { name: "npr", style: "font-body font-bold tracking-widest text-lg lowercase" },
  { name: "WSJ", style: "font-heading font-bold text-xl italic" },
  { name: "WIRED", style: "font-heading font-bold tracking-[0.4em] text-lg" },
  { name: "INDEPENDENT", style: "font-heading font-bold tracking-wider text-base" },
  { name: "USA TODAY", style: "font-heading font-bold text-base tracking-wide" },
];

const PressBanner = () => {
  return (
    <section className="border-y border-border py-8 overflow-hidden">
      <p className="text-center text-xs uppercase tracking-[0.25em] text-muted-foreground mb-6">
        GLP Metrics is mentioned in
      </p>
      <div className="relative overflow-hidden">
        <div className="flex animate-ticker items-center gap-16 whitespace-nowrap">
          {[...pressLogos, ...pressLogos].map((logo, i) => (
            <span
              key={i}
              className={`${logo.style} text-muted-foreground/50 select-none`}
            >
              {logo.name}
            </span>
          ))}
        </div>
      </div>
      <div className="mt-6 text-center">
        <a href="#" className="text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1">
          Learn more <span>›</span>
        </a>
      </div>
    </section>
  );
};

export default PressBanner;
