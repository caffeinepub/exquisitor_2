import { Toaster } from "@/components/ui/sonner";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
  useNavigate,
  useRouterState,
} from "@tanstack/react-router";
import { Suspense, lazy, useEffect, useRef, useState } from "react";
import Footer from "./components/layout/Footer";
import InquiryDrawer from "./components/layout/InquiryDrawer";
import Navbar from "./components/layout/Navbar";
import { supabase } from "./lib/supabaseClient";
import HomePage from "./pages/HomePage";

// ─── Lazy-loaded routes (each becomes its own JS chunk) ────────────────────
const PartnersPage = lazy(() => import("./pages/PartnersPage"));
const AssociatesPage = lazy(() => import("./pages/AssociatesPage"));
const AdminPage = lazy(() => import("./pages/AdminPage"));
const OurDnaPage = lazy(() => import("./pages/OurDnaPage"));
const TheStandardsPage = lazy(() => import("./pages/TheStandardsPage"));

// ─── Pulsing "E" route-transition fallback ─────────────────────────────────
function RouteLoadingFallback() {
  return (
    <div
      className="min-h-[80vh] flex items-center justify-center"
      style={{ backgroundColor: "#050505" }}
    >
      <span
        style={{
          fontFamily: "'Inter', 'SF Pro Display', 'Helvetica Neue', sans-serif",
          fontSize: "3rem",
          fontWeight: 700,
          color: "#A1A1AA",
          letterSpacing: "-0.04em",
          animation: "exquisitor-pulse 1.6s ease-in-out infinite",
        }}
      >
        E
      </span>
      <style>{`
        @keyframes exquisitor-pulse {
          0%, 100% { opacity: 0.25; }
          50% { opacity: 0.8; }
        }
      `}</style>
    </div>
  );
}

// Fine-line grid SVG as data URI
const gridSvg = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60'%3E%3Cpath d='M 60 0 L 0 0 0 60' fill='none' stroke='rgba(255%2C255%2C255%2C0.04)' stroke-width='0.5'/%3E%3C/svg%3E")`;

const ADMIN_EMAIL = "admin@exquisitor.agency";

// Scrolls the window to the top instantly on every route change
function ScrollToTop() {
  const routerState = useRouterState();
  const pathname = routerState.location.pathname;

  // biome-ignore lint/correctness/useExhaustiveDependencies: pathname is intentionally the trigger
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  return null;
}

// Root layout with drawer state
function RootLayout() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;
  // Track current path in a ref so the idle callback can read latest value
  const currentPathRef = useRef(currentPath);
  currentPathRef.current = currentPath;

  // Defer the Supabase auth listener until after the first paint
  // so it never blocks the critical rendering path.
  useEffect(() => {
    if (!supabase) return;

    let subscription: { unsubscribe: () => void } | null = null;

    const register = () => {
      if (!supabase) return;
      const { data } = supabase.auth.onAuthStateChange((_event, session) => {
        const email = session?.user?.email;
        if (email === ADMIN_EMAIL && currentPathRef.current !== "/admin") {
          navigate({ to: "/admin" });
        }
      });
      subscription = data.subscription;
    };

    // Use requestIdleCallback when available (Chrome/Firefox), fall back to
    // setTimeout(0) for Safari — both defer past the first paint.
    if (typeof window !== "undefined" && "requestIdleCallback" in window) {
      (
        window as Window & { requestIdleCallback: (cb: () => void) => void }
      ).requestIdleCallback(register);
    } else {
      setTimeout(register, 0);
    }

    return () => {
      subscription?.unsubscribe();
    };
  }, [navigate]);

  return (
    <div
      className="min-h-screen flex flex-col relative"
      style={{ backgroundColor: "#050505" }}
    >
      {/* Background layers — fixed, behind everything */}
      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
        {/* Fine-line grid */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: gridSvg,
            backgroundRepeat: "repeat",
          }}
        />
        {/* Midnight blue glow — top right */}
        <div
          className="absolute"
          style={{
            top: "-20%",
            right: "-10%",
            width: "60vw",
            height: "60vw",
            background:
              "radial-gradient(circle, rgba(15,23,42,0.65) 0%, transparent 70%)",
          }}
        />
        {/* Charcoal glow — bottom left */}
        <div
          className="absolute"
          style={{
            bottom: "-20%",
            left: "-10%",
            width: "60vw",
            height: "60vw",
            background:
              "radial-gradient(circle, rgba(31,32,34,0.55) 0%, transparent 70%)",
          }}
        />
      </div>

      {/* Content */}
      <div
        className="relative flex flex-col min-h-screen"
        style={{ zIndex: 1 }}
      >
        <ScrollToTop />
        <Navbar onOpenDrawer={() => setDrawerOpen(true)} />
        <InquiryDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
        <main className="flex-1 pt-[76px]">
          {/* Suspense boundary — shows pulsing E while lazy chunks load */}
          <Suspense fallback={<RouteLoadingFallback />}>
            <Outlet />
          </Suspense>
        </main>
        <Footer />
        <Toaster
          theme="dark"
          toastOptions={{
            style: {
              background: "oklch(0.11 0 0)",
              border: "1px solid oklch(0.18 0 0)",
              color: "oklch(1 0 0)",
            },
          }}
        />
      </div>
    </div>
  );
}

// 404 component — redirects to /admin instead of showing 404
// (handles broken OAuth redirects and unknown routes)
function NotFound() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate({ to: "/admin", replace: true });
  }, [navigate]);

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ backgroundColor: "#050505" }}
    >
      <p className="text-sm" style={{ color: "#A1A1AA" }}>
        Redirecting…
      </p>
    </div>
  );
}

const ADMIN_EMAIL_CALLBACK = "admin@exquisitor.agency";

// Dedicated /auth/callback route — consumes the Supabase session from the
// URL hash or code param that Google returns after OAuth.
function AuthCallbackPage() {
  const navigate = useNavigate();
  const [status, setStatus] = useState<"loading" | "error">("loading");
  const handled = useRef(false);

  useEffect(() => {
    if (handled.current) return;
    handled.current = true;

    if (!supabase) {
      // Supabase not configured — bounce straight to admin login screen
      navigate({ to: "/admin", replace: true });
      return;
    }

    let timedOut = false;

    // 5-second timeout safety net
    const timer = setTimeout(() => {
      timedOut = true;
      setStatus("error");
      window.history.replaceState({}, document.title, "/admin");
      navigate({ to: "/admin", replace: true });
    }, 5000);

    const finish = (email?: string | null) => {
      if (timedOut) return;
      clearTimeout(timer);
      // Clean up the messy OAuth params/hash from the URL
      window.history.replaceState({}, document.title, "/admin");
      if (email === ADMIN_EMAIL_CALLBACK) {
        navigate({ to: "/admin", replace: true });
      } else {
        navigate({ to: "/", replace: true });
      }
    };

    // getSession() triggers Supabase to parse the URL hash / exchange the code
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        finish(session.user.email);
        return;
      }

      // If no session yet, listen for the auth state change event
      // (Supabase may still be exchanging the code in the background)
      const {
        data: { subscription },
      } = supabase!.auth.onAuthStateChange((_event, s) => {
        if (s?.user) {
          subscription.unsubscribe();
          finish(s.user.email);
        }
      });
    });

    return () => {
      clearTimeout(timer);
    };
  }, [navigate]);

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ backgroundColor: "#050505" }}
    >
      <div className="text-center">
        {status === "loading" ? (
          <>
            <div
              className="inline-block w-8 h-8 rounded-full border-2 border-t-transparent animate-spin mb-6"
              style={{
                borderColor: "rgba(255,255,255,0.15)",
                borderTopColor: "transparent",
              }}
            />
            <p
              className="text-sm tracking-widest uppercase font-medium"
              style={{ color: "#A1A1AA" }}
            >
              Completing sign in…
            </p>
          </>
        ) : (
          <p className="text-sm" style={{ color: "#A1A1AA" }}>
            Redirecting…
          </p>
        )}
      </div>
    </div>
  );
}

// Create routes
const rootRoute = createRootRoute({
  component: RootLayout,
  notFoundComponent: NotFound,
});

// HomePage is eagerly loaded — it's the first thing users see
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});

// All other routes are lazy — they only download when the user navigates there
const partnersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/partners",
  component: PartnersPage,
  validateSearch: (search: Record<string, unknown>) => ({
    model: typeof search.model === "string" ? search.model : "",
  }),
});

const associatesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/associates",
  component: AssociatesPage,
});

const ourDnaRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/our-dna",
  component: OurDnaPage,
});

const theStandardsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/the-standards",
  component: TheStandardsPage,
});

const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: AdminPage,
});

const authCallbackRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/auth/callback",
  component: AuthCallbackPage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  partnersRoute,
  associatesRoute,
  ourDnaRoute,
  theStandardsRoute,
  adminRoute,
  authCallbackRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
