import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ExternalLink, Inbox, Loader2, RefreshCw, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { supabase } from "../../lib/supabaseClient";

interface SupabaseApplication {
  id: string;
  created_at: string;
  full_name: string;
  email: string;
  role: string;
  years_experience: string;
  cv_url: string | null;
  status: string;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function statusBadgeClass(status: string) {
  switch (status) {
    case "reviewed":
      return "bg-blue-500/15 text-blue-400 border-0";
    case "closed":
      return "bg-white/6 text-white/40 border-0";
    default:
      return "bg-amber-500/15 text-amber-400 border-0";
  }
}

export default function AdminAssociateApplications() {
  const [applications, setApplications] = useState<SupabaseApplication[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchApplications = async () => {
    if (!supabase) {
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    const { data, error } = await supabase
      .from("associate_applications")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) {
      toast.error("Failed to load applications");
    } else {
      setApplications(data ?? []);
    }
    setIsLoading(false);
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: fetchApplications is stable and only needs to run once on mount
  useEffect(() => {
    fetchApplications();
  }, []);

  const handleStatusChange = async (id: string, status: string) => {
    if (!supabase) return;
    setUpdatingId(id);
    const { error } = await supabase
      .from("associate_applications")
      .update({ status })
      .eq("id", id);
    if (error) {
      toast.error("Failed to update status");
    } else {
      setApplications((prev) =>
        prev.map((a) => (a.id === id ? { ...a, status } : a)),
      );
      toast.success("Status updated");
    }
    setUpdatingId(null);
  };

  const handleDelete = async (id: string) => {
    if (!supabase) return;
    setDeletingId(id);
    const { error } = await supabase
      .from("associate_applications")
      .delete()
      .eq("id", id);
    if (error) {
      toast.error("Failed to delete application");
    } else {
      setApplications((prev) => prev.filter((a) => a.id !== id));
      toast.success("Application deleted");
    }
    setDeletingId(null);
  };

  if (!supabase) {
    return (
      <div
        className="text-center py-20 rounded"
        style={{
          background: "#111111",
          border: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <Inbox className="h-8 w-8 mx-auto mb-4" style={{ color: "#A1A1AA" }} />
        <p className="text-sm" style={{ color: "#A1A1AA" }}>
          Supabase is not configured. Add environment variables to activate this
          panel.
        </p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="space-y-3">
        {["a", "b", "c", "d", "e"].map((id) => (
          <Skeleton key={id} className="h-14 w-full animate-shimmer" />
        ))}
      </div>
    );
  }

  if (applications.length === 0) {
    return (
      <div
        className="text-center py-20 rounded"
        data-ocid="admin.applications.empty_state"
        style={{
          background: "#111111",
          border: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <Inbox className="h-8 w-8 mx-auto mb-4" style={{ color: "#A1A1AA" }} />
        <p className="text-sm mb-4" style={{ color: "#A1A1AA" }}>
          No applications submitted yet.
        </p>
        <button
          type="button"
          onClick={fetchApplications}
          className="inline-flex items-center gap-2 text-xs text-white/50 hover:text-white/80 transition-colors"
        >
          <RefreshCw className="h-3.5 w-3.5" />
          Refresh
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-end mb-4">
        <button
          type="button"
          onClick={fetchApplications}
          data-ocid="admin.applications.refresh_button"
          className="inline-flex items-center gap-2 text-xs px-3 py-1.5 rounded transition-colors"
          style={{
            border: "1px solid rgba(255,255,255,0.1)",
            color: "#A1A1AA",
            background: "transparent",
          }}
        >
          <RefreshCw className="h-3 w-3" />
          Refresh
        </button>
      </div>
      <div
        className="rounded overflow-hidden"
        style={{ border: "1px solid rgba(255,255,255,0.08)" }}
      >
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow
                className="hover:bg-transparent"
                style={{
                  background: "#111111",
                  borderBottom: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                {[
                  "Full Name",
                  "Email",
                  "Tech Stack / Role",
                  "Experience",
                  "Submitted",
                  "CV",
                  "Status",
                  "Actions",
                ].map((h) => (
                  <TableHead
                    key={h}
                    className="text-[10px] tracking-[0.12em] uppercase font-semibold whitespace-nowrap"
                    style={{ color: "#A1A1AA" }}
                  >
                    {h}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {applications.map((app, idx) => (
                <TableRow
                  key={app.id}
                  data-ocid={`admin.applications.row.${idx + 1}`}
                  className="transition-colors"
                  style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}
                >
                  <TableCell className="font-medium text-sm text-white whitespace-nowrap">
                    {app.full_name}
                  </TableCell>
                  <TableCell
                    className="text-sm whitespace-nowrap"
                    style={{ color: "#A1A1AA" }}
                  >
                    {app.email}
                  </TableCell>
                  <TableCell
                    className="text-sm max-w-[160px] truncate"
                    style={{ color: "#A1A1AA" }}
                  >
                    {app.role}
                  </TableCell>
                  <TableCell
                    className="text-sm whitespace-nowrap"
                    style={{ color: "#A1A1AA" }}
                  >
                    {app.years_experience}
                  </TableCell>
                  <TableCell
                    className="text-sm whitespace-nowrap"
                    style={{ color: "#A1A1AA" }}
                  >
                    {formatDate(app.created_at)}
                  </TableCell>
                  <TableCell>
                    {app.cv_url ? (
                      <a
                        href={app.cv_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-ocid={`admin.applications.cv_link.${idx + 1}`}
                        className="inline-flex items-center gap-1 text-xs font-medium text-white/70 hover:text-white transition-colors"
                      >
                        Download CV
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    ) : (
                      <span
                        className="text-xs"
                        style={{ color: "rgba(255,255,255,0.2)" }}
                      >
                        —
                      </span>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Badge className={statusBadgeClass(app.status)}>
                        {app.status || "new"}
                      </Badge>
                      {updatingId === app.id ? (
                        <Loader2
                          className="h-3.5 w-3.5 animate-spin"
                          style={{ color: "#A1A1AA" }}
                        />
                      ) : (
                        <select
                          value={app.status || "new"}
                          onChange={(e) =>
                            handleStatusChange(app.id, e.target.value)
                          }
                          data-ocid={`admin.applications.status.${idx + 1}`}
                          className="h-7 text-xs rounded px-2 outline-none cursor-pointer"
                          style={{
                            background: "#0a0a0a",
                            border: "1px solid rgba(255,255,255,0.1)",
                            color: "white",
                          }}
                        >
                          <option value="new">New</option>
                          <option value="reviewed">Reviewed</option>
                          <option value="closed">Closed</option>
                        </select>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          data-ocid={`admin.applications.delete_button.${idx + 1}`}
                          className="h-7 w-7 p-0 text-white/30 hover:text-red-400 hover:bg-transparent"
                          disabled={deletingId === app.id}
                        >
                          {deletingId === app.id ? (
                            <Loader2 className="h-3.5 w-3.5 animate-spin" />
                          ) : (
                            <Trash2 className="h-3.5 w-3.5" />
                          )}
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent
                        style={{
                          background: "#111111",
                          border: "1px solid rgba(255,255,255,0.1)",
                        }}
                      >
                        <AlertDialogHeader>
                          <AlertDialogTitle className="text-white">
                            Delete Application
                          </AlertDialogTitle>
                          <AlertDialogDescription style={{ color: "#A1A1AA" }}>
                            Delete application from {app.full_name}? This action
                            cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel
                            data-ocid="admin.applications.delete_cancel_button"
                            style={{
                              background: "#0a0a0a",
                              border: "1px solid rgba(255,255,255,0.1)",
                              color: "white",
                            }}
                          >
                            Cancel
                          </AlertDialogCancel>
                          <AlertDialogAction
                            data-ocid="admin.applications.delete_confirm_button"
                            onClick={() => handleDelete(app.id)}
                            className="bg-destructive hover:bg-destructive/90 text-white"
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
