import { ChevronRight } from "lucide-react";
import heroVialFruit from "@/assets/hero-vial-fruit.jpg";
import heroVialFridge from "@/assets/hero-vial-fridge.jpg";
import heroHandVial from "@/assets/hero-hand-vial.jpg";

const medications = [
  "Semaglutide", "Tirzepatide", "Ozempic", "Mounjaro", "Wegovy", "Wegovy Pill", "Zepbound"
];

const HeroSection = () => {
  return (
    <section className="relative pt-28 pb-20 overflow-hidden">
      <div className="container grid lg:grid-cols-2 gap-12 items-center">
        <div className="animate-fade-in-up">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold leading-tight text-foreground">
            Compare weight loss providers
          </h1>
          <p className="mt-4 text-lg text-secondary-foreground">
            Get <span className="font-semibold text-foreground">insurance</span> to pay
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {medications.map((med) => (
              <button
                key={med}
                className="rounded-full border border-border bg-secondary px-4 py-1.5 text-sm text-secondary-foreground hover:bg-muted hover:text-foreground transition-colors"
              >
                {med}
              </button>
            ))}
          </div>

          <button className="mt-8 inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-6 py-3 text-sm font-medium text-foreground hover:bg-muted transition-colors group">
            See providers in California
            <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>

        <div className="relative hidden lg:block">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-3">
              <img
                src={heroVialFruit}
                alt="GLP-1 medication with fruits"
                className="w-full rounded-2xl object-cover aspect-square"
              />
              <img
                src={heroVialFridge}
                alt="Medication storage"
                className="w-full rounded-2xl object-cover aspect-square"
              />
            </div>
            <div className="pt-8">
              <img
                src={heroHandVial}
                alt="Hand holding medication"
                className="w-full rounded-2xl object-cover h-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
