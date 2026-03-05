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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Inbox, Loader2, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { InquiryStatus } from "../../backend";
import {
  useDeleteInquiry,
  useGetInquiries,
  useUpdateInquiryStatus,
} from "../../hooks/useQueries";

function statusColor(status: InquiryStatus) {
  switch (status) {
    case InquiryStatus.new_:
      return "bg-blue-500/15 text-blue-400 border-0";
    case InquiryStatus.reviewed:
      return "bg-amber-500/15 text-amber-400 border-0";
    case InquiryStatus.closed:
      return "bg-muted text-muted-foreground border-0";
  }
}

function formatDate(ts: bigint) {
  const ms = Number(ts) / 1_000_000;
  return new Date(ms).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function AdminInquiries() {
  const { data: inquiries, isLoading } = useGetInquiries();
  const updateStatus = useUpdateInquiryStatus();
  const deleteInquiry = useDeleteInquiry();
  const [updatingId, setUpdatingId] = useState<bigint | null>(null);
  const [deletingId, setDeletingId] = useState<bigint | null>(null);

  const handleStatusChange = async (id: bigint, status: InquiryStatus) => {
    setUpdatingId(id);
    try {
      await updateStatus.mutateAsync({ id, status });
      toast.success("Status updated");
    } catch {
      toast.error("Failed to update status");
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDelete = async (id: bigint) => {
    setDeletingId(id);
    try {
      await deleteInquiry.mutateAsync(id);
      toast.success("Inquiry deleted");
    } catch {
      toast.error("Failed to delete inquiry");
    } finally {
      setDeletingId(null);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-3">
        {["a", "b", "c", "d", "e"].map((id) => (
          <Skeleton key={id} className="h-14 w-full animate-shimmer" />
        ))}
      </div>
    );
  }

  if (!inquiries || inquiries.length === 0) {
    return (
      <div className="text-center py-20 bg-card rounded border border-border">
        <Inbox className="h-8 w-8 text-muted-foreground mx-auto mb-4" />
        <p className="text-muted-foreground text-sm">
          No inquiries received yet.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded border border-border overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-card hover:bg-card border-border">
              {[
                "Name",
                "Company",
                "Email",
                "Service Type",
                "Submitted",
                "Status",
                "Actions",
              ].map((h) => (
                <TableHead
                  key={h}
                  className="text-[10px] tracking-[0.12em] uppercase text-muted-foreground font-semibold whitespace-nowrap"
                >
                  {h}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {inquiries.map((inquiry) => (
              <TableRow
                key={inquiry.id.toString()}
                className="border-border hover:bg-card/50 transition-colors"
              >
                <TableCell className="font-medium text-sm whitespace-nowrap">
                  {inquiry.name}
                </TableCell>
                <TableCell className="text-sm text-muted-foreground whitespace-nowrap">
                  {inquiry.company}
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {inquiry.email}
                </TableCell>
                <TableCell className="text-sm text-muted-foreground whitespace-nowrap">
                  {inquiry.serviceType}
                </TableCell>
                <TableCell className="text-sm text-muted-foreground whitespace-nowrap">
                  {formatDate(inquiry.submittedAt)}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Badge className={statusColor(inquiry.status)}>
                      {inquiry.status}
                    </Badge>
                    {updatingId === inquiry.id ? (
                      <Loader2 className="h-3.5 w-3.5 animate-spin text-muted-foreground" />
                    ) : (
                      <Select
                        value={inquiry.status}
                        onValueChange={(v) =>
                          handleStatusChange(inquiry.id, v as InquiryStatus)
                        }
                      >
                        <SelectTrigger className="h-7 w-28 bg-background border-border text-xs">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-card border-border">
                          <SelectItem
                            value={InquiryStatus.new_}
                            className="text-xs"
                          >
                            New
                          </SelectItem>
                          <SelectItem
                            value={InquiryStatus.reviewed}
                            className="text-xs"
                          >
                            Reviewed
                          </SelectItem>
                          <SelectItem
                            value={InquiryStatus.closed}
                            className="text-xs"
                          >
                            Closed
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-muted-foreground hover:text-destructive h-7 w-7 p-0"
                        disabled={deletingId === inquiry.id}
                      >
                        {deletingId === inquiry.id ? (
                          <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        ) : (
                          <Trash2 className="h-3.5 w-3.5" />
                        )}
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="bg-card border-border">
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Inquiry</AlertDialogTitle>
                        <AlertDialogDescription className="text-muted-foreground">
                          Delete inquiry from {inquiry.name}? This action cannot
                          be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel className="bg-background border-border">
                          Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDelete(inquiry.id)}
                          className="bg-destructive hover:bg-destructive/90 text-destructive-foreground"
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
  );
}
