import { Link } from "@tanstack/react-router";

export default function Footer() {
  const year = new Date().getFullYear();
  const hostname = encodeURIComponent(window.location.hostname);

  return (
    <footer className="bg-background border-t border-border py-16">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <span className="text-base font-black tracking-[0.3em] text-foreground uppercase">
              EXQUISITOR
            </span>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              Boutique IT staffing for organizations that refuse to compromise
              on talent.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-xs font-semibold tracking-[0.15em] uppercase text-muted-foreground mb-5">
              Navigate
            </h4>
            <ul className="space-y-3">
              {[
                { to: "/" as const, label: "Home" },
                { to: "/partners" as const, label: "Partners" },
                { to: "/associates" as const, label: "Associates" },
                { to: "/our-dna" as const, label: "Our DNA" },
                { to: "/the-standards" as const, label: "The Standards" },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* HQ Address */}
          <div>
            <h4 className="text-xs font-semibold tracking-[0.15em] uppercase text-muted-foreground mb-5">
              Global Headquarters
            </h4>
            <address className="not-italic text-sm text-muted-foreground leading-relaxed space-y-0.5">
              <p className="text-foreground font-semibold">Exquisitor</p>
              <p>Office 933, 60 Tottenham Court Road</p>
              <p>Fitzrovia, London, W1T 2EW</p>
              <p>United Kingdom</p>
            </address>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border pt-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
            <span>© {year} Exquisitor. All rights reserved.</span>
            <span>
              Built with <span className="text-muted-foreground">♥</span> using{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${hostname}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground transition-colors"
              >
                caffeine.ai
              </a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
