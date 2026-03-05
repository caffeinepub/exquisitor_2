import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { InquiryStatus } from "../backend";
import type {
  Associate,
  AssociateApplication,
  Inquiry,
  Partner,
  PartnerLead,
} from "../backend.d";
import { useActor } from "./useActor";

// ─── Partners ─────────────────────────────────────────────

export function useGetPartners() {
  return useQuery<Partner[]>({
    queryKey: ["partners"],
    queryFn: async () => [],
    staleTime: Number.POSITIVE_INFINITY,
  });
}

export function useAddPartner() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      name,
      industry,
      description,
      logoUrl,
    }: {
      name: string;
      industry: string;
      description: string;
      logoUrl: string;
    }) => {
      if (!actor) throw new Error("Not authenticated");
      return actor.addPartner(name, industry, description, logoUrl);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["partners"] });
    },
  });
}

export function useUpdatePartner() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      name,
      industry,
      description,
      logoUrl,
    }: {
      id: bigint;
      name: string;
      industry: string;
      description: string;
      logoUrl: string;
    }) => {
      if (!actor) throw new Error("Not authenticated");
      return actor.updatePartner(id, name, industry, description, logoUrl);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["partners"] });
    },
  });
}

export function useDeletePartner() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("Not authenticated");
      return actor.deletePartner(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["partners"] });
    },
  });
}

// ─── Associates ───────────────────────────────────────────

export function useGetAssociates() {
  return useQuery<Associate[]>({
    queryKey: ["associates"],
    queryFn: async () => [],
    staleTime: Number.POSITIVE_INFINITY,
  });
}

export function useAddAssociate() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      name,
      role,
      skills,
      bio,
      availability,
    }: {
      name: string;
      role: string;
      skills: string[];
      bio: string;
      availability: string;
    }) => {
      if (!actor) throw new Error("Not authenticated");
      return actor.addAssociate(name, role, skills, bio, availability);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["associates"] });
    },
  });
}

export function useUpdateAssociate() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      name,
      role,
      skills,
      bio,
      availability,
    }: {
      id: bigint;
      name: string;
      role: string;
      skills: string[];
      bio: string;
      availability: string;
    }) => {
      if (!actor) throw new Error("Not authenticated");
      return actor.updateAssociate(id, name, role, skills, bio, availability);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["associates"] });
    },
  });
}

export function useDeleteAssociate() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("Not authenticated");
      return actor.deleteAssociate(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["associates"] });
    },
  });
}

// ─── Inquiries ────────────────────────────────────────────

export function useGetInquiries() {
  const { actor, isFetching } = useActor();
  return useQuery<Inquiry[]>({
    queryKey: ["inquiries"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getInquiries();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useUpdateInquiryStatus() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      status,
    }: {
      id: bigint;
      status: InquiryStatus;
    }) => {
      if (!actor) throw new Error("Not authenticated");
      return actor.updateInquiryStatus(id, status);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["inquiries"] });
    },
  });
}

export function useDeleteInquiry() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("Not authenticated");
      return actor.deleteInquiry(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["inquiries"] });
    },
  });
}

// ─── Inquiry Submit (public) ──────────────────────────────

export function useSubmitInquiry() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async ({
      name,
      company,
      email,
      phone,
      message,
      serviceType,
    }: {
      name: string;
      company: string;
      email: string;
      phone: string;
      message: string;
      serviceType: string;
    }) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.submitInquiry(
        name,
        company,
        email,
        phone,
        message,
        serviceType,
      );
    },
  });
}

// ─── Partner Leads ────────────────────────────────────────

export function useSubmitPartnerLead() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async ({
      companyName,
      corporateEmail,
      techStackNeeded,
      monthlyBudget,
      selectedModel,
    }: {
      companyName: string;
      corporateEmail: string;
      techStackNeeded: string;
      monthlyBudget: string;
      selectedModel: string;
    }) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.submitPartnerLead(
        companyName,
        corporateEmail,
        techStackNeeded,
        monthlyBudget,
        selectedModel,
      );
    },
  });
}

export function useGetPartnerLeads() {
  const { actor, isFetching } = useActor();
  return useQuery<PartnerLead[]>({
    queryKey: ["partnerLeads"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getPartnerLeads();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useDeletePartnerLead() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("Not authenticated");
      return actor.deletePartnerLead(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["partnerLeads"] });
    },
  });
}

export function useUpdatePartnerLeadStatus() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      status,
    }: {
      id: bigint;
      status: InquiryStatus;
    }) => {
      if (!actor) throw new Error("Not authenticated");
      return actor.updatePartnerLeadStatus(id, status);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["partnerLeads"] });
    },
  });
}

// ─── Associate Applications ───────────────────────────────

export function useSubmitAssociateApplication() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async ({
      fullName,
      email,
      techStackOrRole,
      yearsOfExperience,
      cvBlobKey,
    }: {
      fullName: string;
      email: string;
      techStackOrRole: string;
      yearsOfExperience: string;
      cvBlobKey: string;
    }) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.submitAssociateApplication(
        fullName,
        email,
        techStackOrRole,
        yearsOfExperience,
        cvBlobKey,
      );
    },
  });
}

export function useGetAssociateApplications() {
  const { actor, isFetching } = useActor();
  return useQuery<AssociateApplication[]>({
    queryKey: ["associateApplications"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAssociateApplications();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useDeleteAssociateApplication() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("Not authenticated");
      return actor.deleteAssociateApplication(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["associateApplications"] });
    },
  });
}

export function useUpdateAssociateApplicationStatus() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      status,
    }: {
      id: bigint;
      status: InquiryStatus;
    }) => {
      if (!actor) throw new Error("Not authenticated");
      return actor.updateAssociateApplicationStatus(id, status);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["associateApplications"] });
    },
  });
}

// ─── Admin check ──────────────────────────────────────────

export function useIsCallerAdmin() {
  const { actor, isFetching } = useActor();
  return useQuery<boolean>({
    queryKey: ["isCallerAdmin"],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !isFetching,
  });
}
