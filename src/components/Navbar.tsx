import { Search, ChevronDown } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="container flex h-14 items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <a href="/" className="font-heading text-lg font-bold tracking-tight text-foreground">
            glp metrics
          </a>
          <div className="hidden md:flex items-center gap-1 rounded-lg bg-secondary px-3 py-1.5">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search providers..."
              className="bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none w-40"
            />
          </div>
        </div>
        <div className="hidden md:flex items-center gap-6 text-sm text-secondary-foreground">
          <a href="#insights" className="hover:text-foreground transition-colors">Insights</a>
          <button className="flex items-center gap-1 hover:text-foreground transition-colors">
            Bulk <ChevronDown className="h-3 w-3" />
          </button>
          <button className="flex items-center gap-1 hover:text-foreground transition-colors">
            Telehealth Providers <ChevronDown className="h-3 w-3" />
          </button>
          <a href="#pharmacies" className="hover:text-foreground transition-colors">Compounding Pharmacies</a>
          <a href="#reviews" className="hover:text-foreground transition-colors">Reviews</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
