import lifestyleSunset from "@/assets/lifestyle-sunset.jpg";
import lifestyleSchedule from "@/assets/lifestyle-schedule.jpg";

const LifestyleSection = () => {
  return (
    <section className="py-20 space-y-16">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground">
              Responsive care,<br />
              <span className="text-primary">fast shipping.</span>
            </h2>
            <p className="mt-4 text-muted-foreground">
              Most qualified patients receive the shipment within 2-7 days.
              Get overnight shipping via FedEx or UPS to your home.
            </p>
            <button className="mt-6 inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity">
              Find a provider
            </button>
          </div>
          <img
            src={lifestyleSunset}
            alt="Healthy lifestyle"
            className="rounded-2xl object-cover w-full aspect-[3/2]"
          />
        </div>
      </div>

      <div className="container">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <img
            src={lifestyleSchedule}
            alt="Schedule your care"
            className="rounded-2xl object-cover w-full aspect-[3/2] md:order-first order-last"
          />
          <div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground">
              Care that works<br />
              <span className="text-primary">around your schedule.</span>
            </h2>
            <p className="mt-4 text-muted-foreground">
              Connect with providers who have video, phone, and messaging options for care.
            </p>
            <button className="mt-6 inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity">
              Find a provider
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LifestyleSection;
