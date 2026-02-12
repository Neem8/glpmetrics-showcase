const Footer = () => {
  return (
    <footer className="border-t border-border py-12 mt-10">
      <div className="container">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <span className="font-heading text-lg font-bold text-foreground">glp metrics</span>
            <p className="mt-2 text-sm text-muted-foreground">
              Compare GLP-1 weight loss providers. Find doctor-trusted treatment options.
            </p>
          </div>
          <div>
            <h4 className="font-heading font-semibold text-sm text-foreground mb-3">Medications</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors">Semaglutide</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Tirzepatide</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Ozempic</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Wegovy</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Zepbound</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-heading font-semibold text-sm text-foreground mb-3">Resources</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors">Insights</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Reviews</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Pharmacies</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Providers</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-heading font-semibold text-sm text-foreground mb-3">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors">About</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Privacy</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Terms</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-border text-center text-xs text-muted-foreground">
          © 2026 GLPMetrics. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
