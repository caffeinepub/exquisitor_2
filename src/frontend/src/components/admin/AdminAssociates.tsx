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
import { Loader2, Pencil, Plus, Trash2, UserRound } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import type { Associate } from "../../backend.d";
import {
  useAddAssociate,
  useDeleteAssociate,
  useGetAssociates,
  useUpdateAssociate,
} from "../../hooks/useQueries";

interface AssociateForm {
  name: string;
  role: string;
  skills: string; // comma-separated in UI
  bio: string;
  availability: string;
}

const emptyForm: AssociateForm = {
  name: "",
  role: "",
  skills: "",
  bio: "",
  availability: "",
};

export default function AdminAssociates() {
  const { data: associates, isLoading } = useGetAssociates();
  const addAssociate = useAddAssociate();
  const updateAssociate = useUpdateAssociate();
  const deleteAssociate = useDeleteAssociate();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingAssociate, setEditingAssociate] = useState<Associate | null>(
    null,
  );
  const [form, setForm] = useState<AssociateForm>(emptyForm);
  const [deletingId, setDeletingId] = useState<bigint | null>(null);

  const openAdd = () => {
    setEditingAssociate(null);
    setForm(emptyForm);
    setDialogOpen(true);
  };

  const openEdit = (associate: Associate) => {
    setEditingAssociate(associate);
    setForm({
      name: associate.name,
      role: associate.role,
      skills: associate.skills.join(", "),
      bio: associate.bio,
      availability: associate.availability,
    });
    setDialogOpen(true);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const parseSkills = (skillsStr: string): string[] =>
    skillsStr
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

  const handleSubmit = async () => {
    try {
      const skills = parseSkills(form.skills);
      if (editingAssociate) {
        await updateAssociate.mutateAsync({
          id: editingAssociate.id,
          name: form.name,
          role: form.role,
          skills,
          bio: form.bio,
          availability: form.availability,
        });
        toast.success("Associate updated");
      } else {
        await addAssociate.mutateAsync({
          name: form.name,
          role: form.role,
          skills,
          bio: form.bio,
          availability: form.availability,
        });
        toast.success("Associate added");
      }
      setDialogOpen(false);
    } catch {
      toast.error("Operation failed");
    }
  };

  const handleDelete = async (id: bigint) => {
    setDeletingId(id);
    try {
      await deleteAssociate.mutateAsync(id);
      toast.success("Associate removed");
    } catch {
      toast.error("Failed to delete associate");
    } finally {
      setDeletingId(null);
    }
  };

  const isSaving = addAssociate.isPending || updateAssociate.isPending;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-sm font-semibold tracking-wider uppercase text-muted-foreground">
          {associates?.length ?? 0} Associates
        </h2>
        <Button
          onClick={openAdd}
          size="sm"
          className="bg-primary text-primary-foreground font-semibold tracking-widest uppercase text-[10px] gap-1.5 hover:bg-primary/90"
        >
          <Plus className="h-3.5 w-3.5" />
          Add Associate
        </Button>
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {["a", "b", "c", "d"].map((id) => (
            <Skeleton key={id} className="h-20 w-full animate-shimmer" />
          ))}
        </div>
      ) : !associates || associates.length === 0 ? (
        <div className="text-center py-20 bg-card rounded border border-border">
          <UserRound className="h-8 w-8 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground text-sm">No associates yet.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {associates.map((associate) => (
            <div
              key={associate.id.toString()}
              className="luxury-card p-5 rounded flex items-center gap-4"
            >
              <div className="h-10 w-10 rounded-full bg-foreground/8 border border-foreground/10 flex items-center justify-center text-foreground font-bold shrink-0">
                {associate.name.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm text-foreground truncate">
                  {associate.name}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {associate.role}
                </p>
              </div>
              <div className="hidden sm:flex gap-1 flex-wrap max-w-xs">
                {associate.skills.slice(0, 3).map((skill) => (
                  <span
                    key={skill}
                    className="text-[10px] px-1.5 py-0.5 rounded-full bg-foreground/6 text-muted-foreground border border-foreground/10"
                  >
                    {skill}
                  </span>
                ))}
                {associate.skills.length > 3 && (
                  <span className="text-[10px] text-muted-foreground px-1">
                    +{associate.skills.length - 3}
                  </span>
                )}
              </div>
              <span className="hidden md:block text-xs text-muted-foreground whitespace-nowrap">
                {associate.availability}
              </span>
              <div className="flex items-center gap-2 shrink-0">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => openEdit(associate)}
                  className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground"
                >
                  <Pencil className="h-3.5 w-3.5" />
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      disabled={deletingId === associate.id}
                      className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
                    >
                      {deletingId === associate.id ? (
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      ) : (
                        <Trash2 className="h-3.5 w-3.5" />
                      )}
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="bg-card border-border">
                    <AlertDialogHeader>
                      <AlertDialogTitle>Remove Associate</AlertDialogTitle>
                      <AlertDialogDescription className="text-muted-foreground">
                        Remove {associate.name} from the roster? This cannot be
                        undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel className="bg-background border-border">
                        Cancel
                      </AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleDelete(associate.id)}
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
              {editingAssociate ? "Edit Associate" : "Add Associate"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-5 py-2">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-xs tracking-wider uppercase text-muted-foreground">
                  Name *
                </Label>
                <Input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="bg-background border-border h-10"
                  placeholder="Dr. James Whitfield"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-xs tracking-wider uppercase text-muted-foreground">
                  Role *
                </Label>
                <Input
                  name="role"
                  value={form.role}
                  onChange={handleChange}
                  className="bg-background border-border h-10"
                  placeholder="Principal Architect"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-xs tracking-wider uppercase text-muted-foreground">
                Skills (comma-separated)
              </Label>
              <Input
                name="skills"
                value={form.skills}
                onChange={handleChange}
                className="bg-background border-border h-10"
                placeholder="Kubernetes, Go, Distributed Systems"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs tracking-wider uppercase text-muted-foreground">
                Availability *
              </Label>
              <Input
                name="availability"
                value={form.availability}
                onChange={handleChange}
                className="bg-background border-border h-10"
                placeholder="Available — 2 weeks notice"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs tracking-wider uppercase text-muted-foreground">
                Bio
              </Label>
              <Textarea
                name="bio"
                value={form.bio}
                onChange={handleChange}
                className="bg-background border-border resize-none"
                rows={4}
                placeholder="Professional background..."
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
              disabled={
                isSaving || !form.name || !form.role || !form.availability
              }
              className="bg-primary text-primary-foreground font-semibold tracking-widest uppercase text-xs hover:bg-primary/90"
            >
              {isSaving ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : null}
              {editingAssociate ? "Update" : "Add"} Associate
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
