import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LogOut, ShieldAlert } from "lucide-react";
import { motion } from "motion/react";
import { useEffect } from "react";
import AdminAssociateApplications from "../components/admin/AdminAssociateApplications";
import AdminAssociates from "../components/admin/AdminAssociates";
import AdminInquiries from "../components/admin/AdminInquiries";
import AdminPartnerLeads from "../components/admin/AdminPartnerLeads";
import AdminPartners from "../components/admin/AdminPartners";
import { useSupabaseAuth } from "../hooks/useSupabaseAuth";
import { supabase } from "../lib/supabaseClient";

const tabs = [
  { value: "inquiries", label: "Inquiries" },
  { value: "partner-leads", label: "Partner Leads" },
  { value: "applications", label: "Applications" },
  { value: "partners", label: "Partners" },
  { value: "associates", label: "Associates" },
] as const;

// Google "G" SVG icon
function GoogleIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-4 w-4 mr-2 flex-shrink-0"
    >
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  );
}

export default function AdminPage() {
  const { user, isLoading, isAdmin, isUnavailable, signInWithGoogle, signOut } =
    useSupabaseAuth();

  // Safety net: if Google redirects directly to /admin (instead of /auth/callback),
  // consume the session from the URL fragment and clean the URL.
  useEffect(() => {
    if (!supabase) return;
    supabase.auth.getSession().then(() => {
      // Strip any hash/query params left over from the OAuth redirect
      if (
        window.location.hash ||
        window.location.search.includes("code=") ||
        window.location.search.includes("access_token=")
      ) {
        window.history.replaceState(
          {},
          document.title,
          window.location.pathname,
        );
      }
    });
  }, []);

  // Supabase not configured
  if (isUnavailable) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-md"
        >
          <div
            className="inline-flex p-5 rounded-full mb-8"
            style={{
              background: "#111111",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <ShieldAlert className="h-8 w-8" style={{ color: "#A1A1AA" }} />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-white mb-4">
            Configuration Required
          </h1>
          <p
            className="text-sm mb-6 leading-relaxed"
            style={{ color: "#A1A1AA" }}
          >
            Authentication is not yet configured. Please add the Supabase
            environment variables to activate login.
          </p>
        </motion.div>
      </div>
    );
  }

  // Loading auth state
  if (isLoading) {
    return (
      <div className="max-w-[1200px] mx-auto px-6 py-20 space-y-6">
        <Skeleton className="h-10 w-48 animate-shimmer" />
        <Skeleton className="h-5 w-72 animate-shimmer" />
        <div className="space-y-4 mt-8">
          {["a", "b", "c", "d", "e"].map((id) => (
            <Skeleton key={id} className="h-12 w-full animate-shimmer" />
          ))}
        </div>
      </div>
    );
  }

  // Not signed in
  if (!user) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-md"
          data-ocid="admin.login.panel"
        >
          <div
            className="inline-flex p-5 rounded-full mb-8"
            style={{
              background: "#111111",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <ShieldAlert className="h-8 w-8" style={{ color: "#A1A1AA" }} />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-white mb-4">
            Admin Access Required
          </h1>
          <p
            className="text-sm mb-10 leading-relaxed"
            style={{ color: "#A1A1AA" }}
          >
            Please sign in with your administrator Google account to access the
            dashboard.
          </p>
          <button
            type="button"
            onClick={signInWithGoogle}
            data-ocid="admin.login.button"
            className="inline-flex items-center justify-center h-12 px-8 rounded text-sm font-medium text-white transition-colors"
            style={{
              border: "1px solid #333333",
              background: "transparent",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.4)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "#333333";
            }}
          >
            <GoogleIcon />
            Continue with Google
          </button>
        </motion.div>
      </div>
    );
  }

  // Signed in but not admin
  if (!isAdmin) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-md"
        >
          <div
            className="inline-flex p-5 rounded-full mb-8"
            style={{
              background: "rgba(239,68,68,0.08)",
              border: "1px solid rgba(239,68,68,0.2)",
            }}
          >
            <ShieldAlert className="h-8 w-8 text-red-400" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-white mb-4">
            Access Denied
          </h1>
          <p
            className="text-sm leading-relaxed mb-8"
            style={{ color: "#A1A1AA" }}
          >
            The account <span className="text-white/60">{user.email}</span> does
            not have administrator privileges.
          </p>
          <button
            type="button"
            onClick={signOut}
            data-ocid="admin.access_denied.signout_button"
            className="inline-flex items-center gap-2 h-10 px-6 rounded text-sm font-medium transition-colors"
            style={{
              border: "1px solid rgba(255,255,255,0.15)",
              color: "#A1A1AA",
              background: "transparent",
            }}
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </button>
        </motion.div>
      </div>
    );
  }

  // Admin dashboard
  return (
    <div className="max-w-[1200px] mx-auto px-6 py-16">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-12 flex items-start justify-between gap-4">
          <div>
            <p
              className="text-xs tracking-[0.4em] uppercase font-semibold mb-3"
              style={{ color: "#A1A1AA" }}
            >
              Control Panel
            </p>
            <h1 className="text-4xl font-bold tracking-tight text-white">
              Admin Dashboard
            </h1>
            <p className="text-xs mt-2" style={{ color: "#A1A1AA" }}>
              Signed in as <span className="text-white/70">{user.email}</span>
            </p>
          </div>
          <button
            type="button"
            onClick={signOut}
            data-ocid="admin.dashboard.signout_button"
            className="inline-flex items-center gap-2 h-9 px-4 rounded text-xs font-medium transition-colors flex-shrink-0 mt-1"
            style={{
              border: "1px solid rgba(255,255,255,0.1)",
              color: "#A1A1AA",
              background: "transparent",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)";
              e.currentTarget.style.color = "white";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
              e.currentTarget.style.color = "#A1A1AA";
            }}
          >
            <LogOut className="h-3.5 w-3.5" />
            Sign Out
          </button>
        </div>

        <Tabs defaultValue="inquiries" className="w-full">
          <TabsList
            className="p-1 h-auto inline-flex flex-wrap gap-0.5"
            style={{
              background: "#111111",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                data-ocid={`admin.tabs.${tab.value}.tab`}
                className="text-xs tracking-widest uppercase px-5 py-2 data-[state=active]:bg-white data-[state=active]:text-black data-[state=inactive]:text-white/40 data-[state=inactive]:hover:text-white/70 transition-all"
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="inquiries" className="mt-8">
            <AdminInquiries />
          </TabsContent>

          <TabsContent value="partner-leads" className="mt-8">
            <AdminPartnerLeads />
          </TabsContent>

          <TabsContent value="applications" className="mt-8">
            <AdminAssociateApplications />
          </TabsContent>

          <TabsContent value="partners" className="mt-8">
            <AdminPartners />
          </TabsContent>

          <TabsContent value="associates" className="mt-8">
            <AdminAssociates />
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
}
