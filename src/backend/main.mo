import Map "mo:core/Map";
import Array "mo:core/Array";
import Iter "mo:core/Iter";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import Time "mo:core/Time";
import Nat "mo:core/Nat";
import Text "mo:core/Text";
import Order "mo:core/Order";

import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";
import MixinStorage "blob-storage/Mixin";


actor {
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);
  include MixinStorage();

  public type InquiryId = Nat;
  public type PartnerId = Nat;
  public type AssociateId = Nat;
  public type Timestamp = Time.Time;
  public type InquiryStatus = { #new; #reviewed; #closed };
  public type PartnerLeadId = Nat;
  public type AssociateApplicationId = Nat;

  public type Inquiry = {
    id : InquiryId;
    name : Text;
    company : Text;
    email : Text;
    phone : Text;
    message : Text;
    serviceType : Text;
    submittedAt : Timestamp;
    status : InquiryStatus;
  };

  public type Partner = {
    id : PartnerId;
    name : Text;
    industry : Text;
    description : Text;
    logoUrl : Text;
    addedAt : Timestamp;
  };

  public type Associate = {
    id : AssociateId;
    name : Text;
    role : Text;
    skills : [Text];
    bio : Text;
    availability : Text;
    addedAt : Timestamp;
  };

  public type PartnerLead = {
    id : PartnerLeadId;
    companyName : Text;
    corporateEmail : Text;
    techStackNeeded : Text;
    monthlyBudget : Text;
    selectedModel : Text;
    submittedAt : Timestamp;
    status : InquiryStatus;
  };

  public type AssociateApplication = {
    id : AssociateApplicationId;
    fullName : Text;
    email : Text;
    techStackOrRole : Text;
    yearsOfExperience : Text;
    cvBlobKey : Text;
    submittedAt : Timestamp;
    status : InquiryStatus;
  };

  public type UserProfile = {
    name : Text;
  };

  let inquiries = Map.empty<InquiryId, Inquiry>();
  let partners = Map.empty<PartnerId, Partner>();
  let associates = Map.empty<AssociateId, Associate>();
  let partnerLeads = Map.empty<PartnerLeadId, PartnerLead>();
  let associateApplications = Map.empty<AssociateApplicationId, AssociateApplication>();
  let userProfiles = Map.empty<Principal, UserProfile>();

  var inquiryCounter : InquiryId = 0;
  var partnerCounter : PartnerId = 0;
  var associateCounter : AssociateId = 0;
  var partnerLeadCounter : PartnerLeadId = 0;
  var associateApplicationCounter : AssociateApplicationId = 0;

  module Inquiry {
    public func compare(a : Inquiry, b : Inquiry) : Order.Order {
      Nat.compare(a.id, b.id);
    };
  };

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  public shared ({ caller }) func submitInquiry(
    name : Text,
    company : Text,
    email : Text,
    phone : Text,
    message : Text,
    serviceType : Text,
  ) : async Text {
    let id = inquiryCounter;
    let newInquiry : Inquiry = {
      id;
      name;
      company;
      email;
      phone;
      message;
      serviceType;
      submittedAt = Time.now();
      status = #new;
    };

    inquiries.add(id, newInquiry);
    inquiryCounter += 1;
    "Inquiry submitted successfully.";
  };

  public shared ({ caller }) func submitPartnerLead(
    companyName : Text,
    corporateEmail : Text,
    techStackNeeded : Text,
    monthlyBudget : Text,
    selectedModel : Text,
  ) : async Text {
    let id = partnerLeadCounter;
    let newLead : PartnerLead = {
      id;
      companyName;
      corporateEmail;
      techStackNeeded;
      monthlyBudget;
      selectedModel;
      submittedAt = Time.now();
      status = #new;
    };

    partnerLeads.add(id, newLead);
    partnerLeadCounter += 1;
    "Partner lead submitted successfully.";
  };

  public shared ({ caller }) func submitAssociateApplication(
    fullName : Text,
    email : Text,
    techStackOrRole : Text,
    yearsOfExperience : Text,
    cvBlobKey : Text,
  ) : async Text {
    let id = associateApplicationCounter;
    let newApplication : AssociateApplication = {
      id;
      fullName;
      email;
      techStackOrRole;
      yearsOfExperience;
      cvBlobKey;
      submittedAt = Time.now();
      status = #new;
    };

    associateApplications.add(id, newApplication);
    associateApplicationCounter += 1;
    "Associate application submitted successfully.";
  };

  public query ({ caller }) func getPartners() : async [Partner] {
    partners.values().toArray();
  };

  public query ({ caller }) func getAssociates() : async [Associate] {
    associates.values().toArray();
  };

  public query ({ caller }) func getInquiries() : async [Inquiry] {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can view inquiries");
    };
    inquiries.values().toArray().sort();
  };

  public query ({ caller }) func getPartnerLeads() : async [PartnerLead] {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can view partner leads");
    };
    partnerLeads.values().toArray();
  };

  public query ({ caller }) func getAssociateApplications() : async [AssociateApplication] {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can view associate applications");
    };
    associateApplications.values().toArray();
  };

  public shared ({ caller }) func updateInquiryStatus(id : InquiryId, status : InquiryStatus) : async Text {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can update inquiry status");
    };
    switch (inquiries.get(id)) {
      case (null) { Runtime.trap("Inquiry not found") };
      case (?inquiry) {
        let updatedInquiry = {
          inquiry with status;
        };
        inquiries.add(id, updatedInquiry);
        "Inquiry status updated successfully";
      };
    };
  };

  public shared ({ caller }) func updatePartnerLeadStatus(id : PartnerLeadId, status : InquiryStatus) : async Text {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can update partner lead status");
    };
    switch (partnerLeads.get(id)) {
      case (null) { Runtime.trap("Partner lead not found") };
      case (?lead) {
        let updatedLead = {
          lead with status;
        };
        partnerLeads.add(id, updatedLead);
        "Partner lead status updated successfully";
      };
    };
  };

  public shared ({ caller }) func updateAssociateApplicationStatus(id : AssociateApplicationId, status : InquiryStatus) : async Text {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can update associate application status");
    };
    switch (associateApplications.get(id)) {
      case (null) { Runtime.trap("Associate application not found") };
      case (?application) {
        let updatedApplication = {
          application with status;
        };
        associateApplications.add(id, updatedApplication);
        "Associate application status updated successfully";
      };
    };
  };

  public shared ({ caller }) func deleteInquiry(id : InquiryId) : async Text {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can delete inquiries");
    };
    if (inquiries.containsKey(id)) {
      inquiries.remove(id);
      "Inquiry deleted successfully";
    } else {
      Runtime.trap("Inquiry not found");
    };
  };

  public shared ({ caller }) func deletePartnerLead(id : PartnerLeadId) : async Text {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can delete partner leads");
    };
    if (partnerLeads.containsKey(id)) {
      partnerLeads.remove(id);
      "Partner lead deleted successfully";
    } else {
      Runtime.trap("Partner lead not found");
    };
  };

  public shared ({ caller }) func deleteAssociateApplication(id : AssociateApplicationId) : async Text {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can delete associate applications");
    };
    if (associateApplications.containsKey(id)) {
      associateApplications.remove(id);
      "Associate application deleted successfully";
    } else {
      Runtime.trap("Associate application not found");
    };
  };

  public shared ({ caller }) func addPartner(
    name : Text,
    industry : Text,
    description : Text,
    logoUrl : Text,
  ) : async Text {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can add partners");
    };
    let id = partnerCounter;
    let newPartner : Partner = {
      id;
      name;
      industry;
      description;
      logoUrl;
      addedAt = Time.now();
    };
    partners.add(id, newPartner);
    partnerCounter += 1;
    "Partner added successfully";
  };

  public shared ({ caller }) func updatePartner(
    id : PartnerId,
    name : Text,
    industry : Text,
    description : Text,
    logoUrl : Text,
  ) : async Text {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can update partners");
    };
    switch (partners.get(id)) {
      case (null) { Runtime.trap("Partner not found") };
      case (?existingPartner) {
        let updatedPartner = {
          existingPartner with name; industry; description; logoUrl;
        };
        partners.add(id, updatedPartner);
        "Partner updated successfully";
      };
    };
  };

  public shared ({ caller }) func deletePartner(id : PartnerId) : async Text {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can delete partners");
    };
    if (partners.containsKey(id)) {
      partners.remove(id);
      "Partner deleted successfully";
    } else {
      Runtime.trap("Partner not found");
    };
  };

  public shared ({ caller }) func addAssociate(
    name : Text,
    role : Text,
    skills : [Text],
    bio : Text,
    availability : Text,
  ) : async Text {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can add associates");
    };
    let id = associateCounter;
    let newAssociate : Associate = {
      id;
      name;
      role;
      skills;
      bio;
      availability;
      addedAt = Time.now();
    };
    associates.add(id, newAssociate);
    associateCounter += 1;
    "Associate added successfully";
  };

  public shared ({ caller }) func updateAssociate(
    id : AssociateId,
    name : Text,
    role : Text,
    skills : [Text],
    bio : Text,
    availability : Text,
  ) : async Text {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can update associates");
    };
    switch (associates.get(id)) {
      case (null) { Runtime.trap("Associate not found") };
      case (?existingAssociate) {
        let updatedAssociate = {
          existingAssociate with name; role; skills; bio; availability;
        };
        associates.add(id, updatedAssociate);
        "Associate updated successfully";
      };
    };
  };

  public shared ({ caller }) func deleteAssociate(id : AssociateId) : async Text {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can delete associates");
    };
    if (associates.containsKey(id)) {
      associates.remove(id);
      "Associate deleted successfully";
    } else {
      Runtime.trap("Associate not found");
    };
  };
};
