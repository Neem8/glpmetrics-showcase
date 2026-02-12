const reviews = [
  {
    provider: "MedVance",
    type: "pharmacy",
    date: "Feb 11, 2026",
    text: "Easily ordered meds. Notified when medication would arrive. Was well packaged and arrived as promised.",
    name: "Sandy",
    state: "TX",
    verified: true,
  },
  {
    provider: "HealthFirst",
    type: "provider",
    date: "Feb 12, 2026",
    text: "Was wonderful for first order and shipment from pharmacy. Answered questions quickly. Very responsive customer support.",
    name: "Maria",
    state: "OH",
    verified: false,
  },
  {
    provider: "ClearPath Pharmacy",
    type: "pharmacy",
    date: "Feb 10, 2026",
    text: "Same pharmacy for 7 months now. Always prompt, reliable, and consistent quality.",
    name: "Carole",
    state: "IL",
    verified: true,
  },
  {
    provider: "VitalCare",
    type: "provider",
    date: "Feb 12, 2026",
    text: "I filled out the intake form on Monday. Was approved Tuesday, meds arrived Wednesday. Two days start to finish. No hidden fees.",
    name: "Beth",
    state: "MA",
    verified: true,
  },
];

const ReviewsSection = () => {
  return (
    <section className="py-20" id="reviews">
      <div className="container">
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground">
          Help thousands<br />
          <span className="text-primary">make the right choice.</span>
        </h2>
        <p className="mt-2 text-muted-foreground">
          Share your experience on GLP Metrics, where real reviews make a difference.
        </p>

        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {reviews.map((review, i) => (
            <div
              key={i}
              className="rounded-2xl border border-border bg-card p-5 flex flex-col justify-between hover:border-primary/20 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-heading font-bold text-foreground text-sm">{review.provider}</p>
                    <p className="text-xs text-muted-foreground">({review.type})</p>
                  </div>
                  <span className="text-xs text-muted-foreground">{review.date}</span>
                </div>
                <p className="mt-3 text-sm text-secondary-foreground leading-relaxed line-clamp-4">
                  {review.text}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-border flex items-center justify-between">
                <span className="text-xs text-muted-foreground">
                  {review.name}, {review.state}
                </span>
                {review.verified && (
                  <span className="text-xs text-primary font-medium">Verified ✓</span>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <button className="rounded-lg border border-border bg-secondary px-6 py-3 text-sm font-medium text-foreground hover:bg-muted transition-colors">
            Browse Reviews
          </button>
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
