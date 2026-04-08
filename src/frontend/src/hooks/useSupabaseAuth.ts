import type { Session, User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { isSupabaseConfigured, supabase } from "../lib/supabaseClient";

const ADMIN_EMAIL = "admin@exquisitor.agency";

export function useSupabaseAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  // Start as false — UI renders immediately in the "not signed in" state.
  // The background session check will update state if a session is found,
  // without ever blocking the initial paint.
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!supabase) return;

    // Non-blocking background session check — fires after first paint.
    // Using requestIdleCallback (Chrome/Firefox) or setTimeout(0) (Safari)
    // ensures this never sits on the critical rendering path.
    const checkSession = () => {
      if (!supabase) return;
      supabase.auth.getSession().then(({ data: { session: s } }) => {
        if (s) {
          setSession(s);
          setUser(s.user ?? null);
        }
        setIsLoading(false);
      });
    };

    if (typeof window !== "undefined" && "requestIdleCallback" in window) {
      (
        window as Window & { requestIdleCallback: (cb: () => void) => void }
      ).requestIdleCallback(checkSession);
    } else {
      setTimeout(checkSession, 0);
    }

    // Listen for auth changes (login / logout events)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, s) => {
      setSession(s);
      setUser(s?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signInWithGoogle = () => {
    // Route the entire OAuth flow through the Cloudflare Tunnel proxy URL
    // (VITE_SUPABASE_URL) so the browser never contacts the ISP-blocked
    // direct Supabase domain. The anon key is handled by the Supabase client
    // (initialized with the same proxy URL) for all subsequent data calls.
    const proxyUrl = import.meta.env.VITE_SUPABASE_URL as string;
    const redirectTo = encodeURIComponent(`${window.location.origin}/admin`);
    window.location.href = `${proxyUrl}/auth/v1/authorize?provider=google&redirect_to=${redirectTo}`;
  };

  const signOut = async () => {
    if (!supabase) return;
    await supabase.auth.signOut();
  };

  const isAdmin = user?.email === ADMIN_EMAIL;
  const isUnavailable = !isSupabaseConfigured;

  return {
    user,
    session,
    isLoading,
    isAdmin,
    isUnavailable,
    signInWithGoogle,
    signOut,
  };
}
