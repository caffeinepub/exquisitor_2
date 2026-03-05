import type { Session, User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { isSupabaseConfigured, supabase } from "../lib/supabaseClient";

const ADMIN_EMAIL = "admin@exquisitor.agency";

export function useSupabaseAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!supabase) {
      setIsLoading(false);
      return;
    }

    // Get initial session
    supabase.auth.getSession().then(({ data: { session: s } }) => {
      setSession(s);
      setUser(s?.user ?? null);
      setIsLoading(false);
    });

    // Listen for auth changes
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
