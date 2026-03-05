import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type Timestamp = bigint;
export type AssociateId = bigint;
export interface Partner {
    id: PartnerId;
    name: string;
    description: string;
    logoUrl: string;
    addedAt: Timestamp;
    industry: string;
}
export type PartnerLeadId = bigint;
export interface AssociateApplication {
    id: AssociateApplicationId;
    cvBlobKey: string;
    status: InquiryStatus;
    yearsOfExperience: string;
    fullName: string;
    submittedAt: Timestamp;
    email: string;
    techStackOrRole: string;
}
export interface Associate {
    id: AssociateId;
    bio: string;
    name: string;
    role: string;
    availability: string;
    addedAt: Timestamp;
    skills: Array<string>;
}
export type InquiryId = bigint;
export interface PartnerLead {
    id: PartnerLeadId;
    selectedModel: string;
    status: InquiryStatus;
    monthlyBudget: string;
    submittedAt: Timestamp;
    corporateEmail: string;
    companyName: string;
    techStackNeeded: string;
}
export interface Inquiry {
    id: InquiryId;
    status: InquiryStatus;
    serviceType: string;
    name: string;
    submittedAt: Timestamp;
    email: string;
    company: string;
    message: string;
    phone: string;
}
export type AssociateApplicationId = bigint;
export type PartnerId = bigint;
export interface UserProfile {
    name: string;
}
export enum InquiryStatus {
    new_ = "new",
    closed = "closed",
    reviewed = "reviewed"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addAssociate(name: string, role: string, skills: Array<string>, bio: string, availability: string): Promise<string>;
    addPartner(name: string, industry: string, description: string, logoUrl: string): Promise<string>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    deleteAssociate(id: AssociateId): Promise<string>;
    deleteAssociateApplication(id: AssociateApplicationId): Promise<string>;
    deleteInquiry(id: InquiryId): Promise<string>;
    deletePartner(id: PartnerId): Promise<string>;
    deletePartnerLead(id: PartnerLeadId): Promise<string>;
    getAssociateApplications(): Promise<Array<AssociateApplication>>;
    getAssociates(): Promise<Array<Associate>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getInquiries(): Promise<Array<Inquiry>>;
    getPartnerLeads(): Promise<Array<PartnerLead>>;
    getPartners(): Promise<Array<Partner>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    submitAssociateApplication(fullName: string, email: string, techStackOrRole: string, yearsOfExperience: string, cvBlobKey: string): Promise<string>;
    submitInquiry(name: string, company: string, email: string, phone: string, message: string, serviceType: string): Promise<string>;
    submitPartnerLead(companyName: string, corporateEmail: string, techStackNeeded: string, monthlyBudget: string, selectedModel: string): Promise<string>;
    updateAssociate(id: AssociateId, name: string, role: string, skills: Array<string>, bio: string, availability: string): Promise<string>;
    updateAssociateApplicationStatus(id: AssociateApplicationId, status: InquiryStatus): Promise<string>;
    updateInquiryStatus(id: InquiryId, status: InquiryStatus): Promise<string>;
    updatePartner(id: PartnerId, name: string, industry: string, description: string, logoUrl: string): Promise<string>;
    updatePartnerLeadStatus(id: PartnerLeadId, status: InquiryStatus): Promise<string>;
}
