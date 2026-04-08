import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link, useRouterState } from "@tanstack/react-router";
import { LogOut, Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { useSupabaseAuth } from "../../hooks/useSupabaseAuth";

interface NavbarProps {
  onOpenDrawer: () => void;
}

const navLinks = [
  { to: "/" as const, label: "Home", exact: true },
  { to: "/partners" as const, label: "Partners" },
  { to: "/associates" as const, label: "Associates" },
  { to: "/our-dna" as const, label: "Our DNA" },
  { to: "/the-standards" as const, label: "The Standards" },
];

function NavItem({
  to,
  label,
  exact,
  onClick,
}: { to: string; label: string; exact?: boolean; onClick?: () => void }) {
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;
  const isActive = exact
    ? currentPath === to
    : currentPath.startsWith(to) && to !== "/";

  return (
    <Link
      to={to}
      onClick={onClick}
      className={`px-3 py-2 text-[11px] font-semibold tracking-[0.14em] uppercase transition-colors duration-200 ${
        isActive ? "text-white" : "text-white/45 hover:text-white"
      }`}
    >
      {label}
    </Link>
  );
}

function MobileNavItem({
  to,
  label,
  exact,
  onClick,
}: { to: string; label: string; exact?: boolean; onClick?: () => void }) {
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;
  const isActive = exact
    ? currentPath === to
    : currentPath.startsWith(to) && to !== "/";

  return (
    <Link
      to={to}
      onClick={onClick}
      className={`block px-4 py-3 text-sm font-semibold tracking-[0.12em] uppercase transition-colors duration-200 rounded ${
        isActive
          ? "text-white bg-white/6"
          : "text-white/45 hover:text-white hover:bg-white/4"
      }`}
    >
      {label}
    </Link>
  );
}

export default function Navbar({ onOpenDrawer }: NavbarProps) {
  const { user, isAdmin, signOut } = useSupabaseAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const isLoggedIn = !!user;

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        background: "rgba(5, 5, 5, 0.6)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
      }}
    >
      <nav className="max-w-[1200px] mx-auto px-12 h-[76px] flex items-center relative">
        {/* Logo — far left */}
        <Link to="/" className="shrink-0" data-ocid="nav.link">
          <span
            style={{
              fontFamily:
                "'Inter', 'SF Pro Display', 'Helvetica Neue', sans-serif",
              fontWeight: 700,
              fontSize: "1.15rem",
              letterSpacing: "-0.045em",
              color: "#FFFFFF",
              lineHeight: 1,
              userSelect: "none",
            }}
            className="md:text-[1.15rem] text-[1rem]"
          >
            EXQUISITOR
          </span>
        </Link>

        {/* Desktop nav links — absolute center */}
        <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 items-center gap-10">
          {navLinks.map((link) => (
            <NavItem key={link.to} {...link} />
          ))}
          {isLoggedIn && isAdmin && <NavItem to="/admin" label="Admin" />}
        </div>

        {/* Right side actions — far right */}
        <div className="hidden lg:flex items-center gap-4 ml-auto">
          {isLoggedIn && isAdmin && (
            <Badge
              className="border text-[9px] tracking-widest uppercase px-2 py-0.5 font-semibold"
              style={{
                background: "rgba(255,255,255,0.06)",
                color: "rgba(255,255,255,0.7)",
                border: "1px solid rgba(255,255,255,0.12)",
              }}
            >
              Admin
            </Badge>
          )}

          <button
            type="button"
            onClick={onOpenDrawer}
            data-ocid="nav.button"
            className="text-[10px] font-semibold tracking-[0.2em] uppercase px-5 h-9 rounded transition-all duration-200"
            style={{
              border: "1px solid rgba(255,255,255,0.25)",
              color: "white",
              background: "transparent",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.6)";
              e.currentTarget.style.background = "rgba(255,255,255,0.04)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.25)";
              e.currentTarget.style.background = "transparent";
            }}
          >
            Inquire
          </button>

          {isLoggedIn && isAdmin && (
            <Button
              onClick={signOut}
              variant="ghost"
              size="sm"
              data-ocid="nav.secondary_button"
              className="text-white/40 hover:text-white gap-1.5 text-[10px] tracking-widest uppercase"
            >
              <LogOut className="h-3.5 w-3.5" />
              Logout
            </Button>
          )}
        </div>

        {/* Mobile: right side */}
        <div className="lg:hidden ml-auto flex items-center gap-3">
          <button
            type="button"
            onClick={onOpenDrawer}
            data-ocid="nav.mobile.button"
            className="text-[10px] font-semibold tracking-[0.18em] uppercase px-4 h-8 rounded transition-all duration-200"
            style={{
              border: "1px solid rgba(255,255,255,0.2)",
              color: "white",
              background: "transparent",
            }}
          >
            Inquire
          </button>
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 text-white/40 hover:text-white transition-colors"
            aria-label="Toggle menu"
            data-ocid="nav.toggle"
          >
            {mobileOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="lg:hidden overflow-hidden"
            style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
          >
            <div
              className="px-6 py-4 flex flex-col gap-1"
              style={{ background: "rgba(5,5,5,0.92)" }}
            >
              {navLinks.map((link) => (
                <MobileNavItem
                  key={link.to}
                  {...link}
                  onClick={() => setMobileOpen(false)}
                />
              ))}
              {isLoggedIn && isAdmin && (
                <MobileNavItem
                  to="/admin"
                  label="Admin"
                  onClick={() => setMobileOpen(false)}
                />
              )}
              {isLoggedIn && isAdmin && (
                <div
                  className="pt-3 flex flex-col gap-2 mt-2"
                  style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
                >
                  <Button
                    onClick={() => {
                      signOut();
                      setMobileOpen(false);
                    }}
                    variant="ghost"
                    data-ocid="nav.mobile.secondary_button"
                    className="text-white/40 hover:text-white gap-1.5 text-[10px] tracking-widest uppercase w-full"
                  >
                    <LogOut className="h-3.5 w-3.5" />
                    Logout
                  </Button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
