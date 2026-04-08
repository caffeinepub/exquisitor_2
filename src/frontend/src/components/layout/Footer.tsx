import { Link } from "@tanstack/react-router";

export default function Footer() {
  const year = new Date().getFullYear();

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

          {/* HQ Address + Contact */}
          <div>
            <h4 className="text-xs font-semibold tracking-[0.15em] uppercase text-muted-foreground mb-5">
              Global Headquarters
            </h4>
            <address className="not-italic text-sm text-muted-foreground leading-relaxed space-y-0.5 mb-4">
              <p className="text-foreground font-semibold">Exquisitor</p>
              <p>Office 933, 60 Tottenham Court Road</p>
              <p>Fitzrovia, London, W1T 2EW</p>
              <p>United Kingdom</p>
            </address>
            <div className="space-y-1.5 text-sm">
              <a
                href="tel:+447348952735"
                className="block text-muted-foreground hover:text-foreground transition-colors"
                data-ocid="footer.phone.link"
              >
                +44 7348 952735
              </a>
              <a
                href="mailto:founders@exquisitor.tech"
                className="block text-muted-foreground hover:text-foreground transition-colors"
                data-ocid="footer.email.link"
              >
                founders@exquisitor.tech
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border pt-6">
          <div className="flex items-center justify-center gap-3 text-xs text-muted-foreground flex-wrap">
            <span>© {year} Exquisitor. All rights reserved.</span>
            <span style={{ color: "rgba(255,255,255,0.15)" }}>·</span>
            <Link
              to="/privacy-policy"
              className="hover:text-foreground transition-colors duration-200"
            >
              Privacy Policy
            </Link>
            <span style={{ color: "rgba(255,255,255,0.15)" }}>·</span>
            <Link
              to="/cookie-policy"
              className="hover:text-foreground transition-colors duration-200"
            >
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
