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
import { Inbox, Loader2, RefreshCw, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { supabase } from "../../lib/supabaseClient";

interface SupabasePartnerLead {
  id: string;
  created_at: string;
  company_name: string;
  corporate_email: string;
  tech_stack: string[] | null;
  experience_level: string | null;
  industry_vertical: string | null;
  selected_model: string | null;
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

export default function AdminPartnerLeads() {
  const [leads, setLeads] = useState<SupabasePartnerLead[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchLeads = async () => {
    if (!supabase) {
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    const { data, error } = await supabase
      .from("partner_inquiries")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) {
      toast.error("Failed to load partner leads");
    } else {
      setLeads(data ?? []);
    }
    setIsLoading(false);
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: fetchLeads is stable and only needs to run once on mount
  useEffect(() => {
    fetchLeads();
  }, []);

  const handleStatusChange = async (id: string, status: string) => {
    if (!supabase) return;
    setUpdatingId(id);
    const { error } = await supabase
      .from("partner_inquiries")
      .update({ status })
      .eq("id", id);
    if (error) {
      toast.error("Failed to update status");
    } else {
      setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status } : l)));
      toast.success("Status updated");
    }
    setUpdatingId(null);
  };

  const handleDelete = async (id: string) => {
    if (!supabase) return;
    setDeletingId(id);
    const { error } = await supabase
      .from("partner_inquiries")
      .delete()
      .eq("id", id);
    if (error) {
      toast.error("Failed to delete lead");
    } else {
      setLeads((prev) => prev.filter((l) => l.id !== id));
      toast.success("Lead deleted");
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

  if (leads.length === 0) {
    return (
      <div
        className="text-center py-20 rounded"
        data-ocid="admin.partner_leads.empty_state"
        style={{
          background: "#111111",
          border: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <Inbox className="h-8 w-8 mx-auto mb-4" style={{ color: "#A1A1AA" }} />
        <p className="text-sm mb-4" style={{ color: "#A1A1AA" }}>
          No partner leads submitted yet.
        </p>
        <button
          type="button"
          onClick={fetchLeads}
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
          onClick={fetchLeads}
          data-ocid="admin.partner_leads.refresh_button"
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
                  "Company",
                  "Corporate Email",
                  "Tech Stack",
                  "Experience Level",
                  "Industry",
                  "Engagement Model",
                  "Submitted",
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
              {leads.map((lead, idx) => (
                <TableRow
                  key={lead.id}
                  data-ocid={`admin.partner_leads.row.${idx + 1}`}
                  className="transition-colors"
                  style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}
                >
                  <TableCell className="font-medium text-sm text-white whitespace-nowrap">
                    {lead.company_name}
                  </TableCell>
                  <TableCell
                    className="text-sm whitespace-nowrap"
                    style={{ color: "#A1A1AA" }}
                  >
                    {lead.corporate_email}
                  </TableCell>
                  <TableCell
                    className="text-sm max-w-[160px]"
                    style={{ color: "#A1A1AA" }}
                  >
                    {Array.isArray(lead.tech_stack)
                      ? lead.tech_stack.join(", ")
                      : (lead.tech_stack ?? "—")}
                  </TableCell>
                  <TableCell
                    className="text-sm whitespace-nowrap"
                    style={{ color: "#A1A1AA" }}
                  >
                    {lead.experience_level ?? "—"}
                  </TableCell>
                  <TableCell
                    className="text-sm whitespace-nowrap"
                    style={{ color: "#A1A1AA" }}
                  >
                    {lead.industry_vertical ?? "—"}
                  </TableCell>
                  <TableCell
                    data-ocid={`admin.partner_leads.engagement_model.${idx + 1}`}
                    className="text-sm whitespace-nowrap"
                  >
                    {lead.selected_model ? (
                      <span
                        style={{
                          background: "rgba(6,78,59,0.3)",
                          border: "1px solid #064e3b",
                          color: "#6ee7b7",
                          borderRadius: 4,
                          padding: "2px 10px",
                          fontSize: 11,
                          fontWeight: 600,
                          letterSpacing: "0.05em",
                          whiteSpace: "nowrap",
                          display: "inline-block",
                        }}
                      >
                        {lead.selected_model}
                      </span>
                    ) : (
                      <span style={{ color: "rgba(255,255,255,0.2)" }}>—</span>
                    )}
                  </TableCell>
                  <TableCell
                    className="text-sm whitespace-nowrap"
                    style={{ color: "#A1A1AA" }}
                  >
                    {formatDate(lead.created_at)}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Badge className={statusBadgeClass(lead.status || "new")}>
                        {lead.status || "new"}
                      </Badge>
                      {updatingId === lead.id ? (
                        <Loader2
                          className="h-3.5 w-3.5 animate-spin"
                          style={{ color: "#A1A1AA" }}
                        />
                      ) : (
                        <select
                          value={lead.status || "new"}
                          onChange={(e) =>
                            handleStatusChange(lead.id, e.target.value)
                          }
                          data-ocid={`admin.partner_leads.status.${idx + 1}`}
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
                          data-ocid={`admin.partner_leads.delete_button.${idx + 1}`}
                          className="h-7 w-7 p-0 text-white/30 hover:text-red-400 hover:bg-transparent"
                          disabled={deletingId === lead.id}
                        >
                          {deletingId === lead.id ? (
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
                            Delete Partner Lead
                          </AlertDialogTitle>
                          <AlertDialogDescription style={{ color: "#A1A1AA" }}>
                            Delete lead from {lead.company_name}? This action
                            cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel
                            data-ocid="admin.partner_leads.delete_cancel_button"
                            style={{
                              background: "#0a0a0a",
                              border: "1px solid rgba(255,255,255,0.1)",
                              color: "white",
                            }}
                          >
                            Cancel
                          </AlertDialogCancel>
                          <AlertDialogAction
                            data-ocid="admin.partner_leads.delete_confirm_button"
                            onClick={() => handleDelete(lead.id)}
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
