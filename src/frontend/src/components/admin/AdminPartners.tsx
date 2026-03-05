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
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { Building2, Loader2, Pencil, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import type { Partner } from "../../backend.d";
import {
  useAddPartner,
  useDeletePartner,
  useGetPartners,
  useUpdatePartner,
} from "../../hooks/useQueries";

interface PartnerForm {
  name: string;
  industry: string;
  description: string;
  logoUrl: string;
}

const emptyForm: PartnerForm = {
  name: "",
  industry: "",
  description: "",
  logoUrl: "",
};

export default function AdminPartners() {
  const { data: partners, isLoading } = useGetPartners();
  const addPartner = useAddPartner();
  const updatePartner = useUpdatePartner();
  const deletePartner = useDeletePartner();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingPartner, setEditingPartner] = useState<Partner | null>(null);
  const [form, setForm] = useState<PartnerForm>(emptyForm);
  const [deletingId, setDeletingId] = useState<bigint | null>(null);

  const openAdd = () => {
    setEditingPartner(null);
    setForm(emptyForm);
    setDialogOpen(true);
  };

  const openEdit = (partner: Partner) => {
    setEditingPartner(partner);
    setForm({
      name: partner.name,
      industry: partner.industry,
      description: partner.description,
      logoUrl: partner.logoUrl,
    });
    setDialogOpen(true);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    try {
      if (editingPartner) {
        await updatePartner.mutateAsync({
          id: editingPartner.id,
          ...form,
        });
        toast.success("Partner updated");
      } else {
        await addPartner.mutateAsync(form);
        toast.success("Partner added");
      }
      setDialogOpen(false);
    } catch {
      toast.error("Operation failed");
    }
  };

  const handleDelete = async (id: bigint) => {
    setDeletingId(id);
    try {
      await deletePartner.mutateAsync(id);
      toast.success("Partner removed");
    } catch {
      toast.error("Failed to delete partner");
    } finally {
      setDeletingId(null);
    }
  };

  const isSaving = addPartner.isPending || updatePartner.isPending;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-sm font-semibold tracking-wider uppercase text-muted-foreground">
          {partners?.length ?? 0} Partners
        </h2>
        <Button
          onClick={openAdd}
          size="sm"
          className="bg-primary text-primary-foreground font-semibold tracking-widest uppercase text-[10px] gap-1.5 hover:bg-primary/90"
        >
          <Plus className="h-3.5 w-3.5" />
          Add Partner
        </Button>
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {["a", "b", "c", "d"].map((id) => (
            <Skeleton key={id} className="h-20 w-full animate-shimmer" />
          ))}
        </div>
      ) : !partners || partners.length === 0 ? (
        <div className="text-center py-20 bg-card rounded border border-border">
          <Building2 className="h-8 w-8 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground text-sm">No partners yet.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {partners.map((partner) => (
            <div
              key={partner.id.toString()}
              className="luxury-card p-5 rounded flex items-center gap-4"
            >
              {partner.logoUrl ? (
                <img
                  src={partner.logoUrl}
                  alt={partner.name}
                  className="h-10 w-10 rounded object-contain bg-background border border-border p-1 shrink-0"
                />
              ) : (
                <div className="h-10 w-10 rounded bg-foreground/8 border border-foreground/10 flex items-center justify-center text-foreground font-bold shrink-0">
                  {partner.name.charAt(0)}
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm text-foreground truncate">
                  {partner.name}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {partner.industry}
                </p>
              </div>
              <p className="hidden sm:block text-xs text-muted-foreground max-w-xs truncate flex-1">
                {partner.description}
              </p>
              <div className="flex items-center gap-2 shrink-0">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => openEdit(partner)}
                  className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground"
                >
                  <Pencil className="h-3.5 w-3.5" />
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      disabled={deletingId === partner.id}
                      className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
                    >
                      {deletingId === partner.id ? (
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      ) : (
                        <Trash2 className="h-3.5 w-3.5" />
                      )}
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="bg-card border-border">
                    <AlertDialogHeader>
                      <AlertDialogTitle>Remove Partner</AlertDialogTitle>
                      <AlertDialogDescription className="text-muted-foreground">
                        Remove {partner.name} from the partners list? This
                        cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel className="bg-background border-border">
                        Cancel
                      </AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleDelete(partner.id)}
                        className="bg-destructive hover:bg-destructive/90 text-destructive-foreground"
                      >
                        Remove
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="bg-card border-border max-w-md">
          <DialogHeader>
            <DialogTitle className="text-base font-bold tracking-wider uppercase">
              {editingPartner ? "Edit Partner" : "Add Partner"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-5 py-2">
            <div className="space-y-2">
              <Label className="text-xs tracking-wider uppercase text-muted-foreground">
                Name *
              </Label>
              <Input
                name="name"
                value={form.name}
                onChange={handleChange}
                className="bg-background border-border h-10"
                placeholder="Meridian Capital Partners"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs tracking-wider uppercase text-muted-foreground">
                Industry *
              </Label>
              <Input
                name="industry"
                value={form.industry}
                onChange={handleChange}
                className="bg-background border-border h-10"
                placeholder="Financial Services"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs tracking-wider uppercase text-muted-foreground">
                Description
              </Label>
              <Textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                className="bg-background border-border resize-none"
                rows={3}
                placeholder="Brief description..."
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs tracking-wider uppercase text-muted-foreground">
                Logo URL
              </Label>
              <Input
                name="logoUrl"
                value={form.logoUrl}
                onChange={handleChange}
                className="bg-background border-border h-10"
                placeholder="https://..."
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDialogOpen(false)}
              className="border-border bg-transparent"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={isSaving || !form.name || !form.industry}
              className="bg-primary text-primary-foreground font-semibold tracking-widest uppercase text-xs hover:bg-primary/90"
            >
              {isSaving ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : null}
              {editingPartner ? "Update" : "Add"} Partner
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
