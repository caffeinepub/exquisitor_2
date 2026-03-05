import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useSearch } from "@tanstack/react-router";
import { Building2, Check, CheckCircle, Loader2, X } from "lucide-react";
import { type Variants, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { useGetPartners } from "../hooks/useQueries";
import { supabase } from "../lib/supabaseClient";

// Tech stack combobox options
const TECH_STACK_OPTIONS = [
  // Roles
  "Full-Stack",
  "Front-End",
  "Back-End",
  "Mobile",
  "Game",
  "DevOps",
  "Cloud",
  "AI",
  "Machine Learning",
  "Data Engineer",
  "Blockchain",
  "Automation QA",
  // Technologies
  "React",
  "Angular",
  "Vue.js",
  "TypeScript",
  "JavaScript",
  "Next.js",
  "Tailwind CSS",
  "Node.js",
  "Python",
  "Django",
  "Java",
  "Spring Boot",
  ".NET Core",
  "C#",
  "Go",
  "Rust",
  "Ruby on Rails",
  "AWS",
  "Azure",
  "GCP",
  "Kubernetes",
  "Docker",
  "Terraform",
  "CI/CD",
  "OpenAI API",
  "TensorFlow",
  "PyTorch",
  "SQL/NoSQL",
  "iOS",
  "Android",
  "React Native",
  "Flutter",
  "Solidity",
  "Smart Contracts",
  "web3.js",
];

const OTHER_OPTION = "Other (Type Custom Stack)";

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.25, 0.1, 0.25, 1] },
  },
};

const inputClass =
  "w-full h-14 px-4 text-sm text-white rounded bg-[#0a0a0a] outline-none transition-all duration-200 placeholder:text-white/25";
const inputStyle = {
  border: "1px solid rgba(255,255,255,0.08)",
};
const labelClass =
  "block text-[10px] tracking-[0.35em] uppercase font-semibold mb-2.5";

// Model strings used as URL params
const MODEL_EMBEDDED = "Exquisitor Embedded (Starting from £5,250/mo)";
const MODEL_DIRECT = "Exquisitor Direct (20% of First-Year Salary)";
const MODEL_PROJECT = "Exquisitor Project (Project-Based Billing)";

const partnerEngagementModels = [
  {
    tag: "Signature Service",
    featured: true,
    title: "Exquisitor Embedded",
    subtitle: "Staff Augmentation",
    modelParam: MODEL_EMBEDDED,
    pricingStartingFrom: true,
    price: "£5,250 / month",
    priceNote: "Monthly Retainer",
    body: "Dedicated, senior engineering talent seamlessly integrated into your internal workflow. Full-time commitment, zero recruitment overhead.",
  },
  {
    tag: null,
    featured: false,
    title: "Exquisitor Direct",
    subtitle: "Executive Search",
    modelParam: MODEL_DIRECT,
    pricingStartingFrom: false,
    price: "20% of First-Year Salary",
    priceNote: "One-Time Fee",
    body: "Executive search for permanent, high-impact leadership roles. We find the exact talent you'll work with.",
  },
  {
    tag: null,
    featured: false,
    title: "Exquisitor Project",
    subtitle: "End-to-End Delivery",
    modelParam: MODEL_PROJECT,
    pricingStartingFrom: false,
    price: "Project-Based Billing",
    priceNote: null,
    body: "End-to-end delivery of complex technical products managed by our internal elite teams.",
  },
];

const competitiveAdvantages = [
  {
    number: "01",
    title: "Beyond the Gig Economy.",
    body: "Unlike Toptal or Lemon.io, we do not provide distracted freelancers juggling multiple clients. Our 'Bench Fund' guarantees you get 100% dedicated, fully retained engineers who are embedded deeply into your culture.",
  },
  {
    number: "02",
    title: "Zero Bait-and-Switch.",
    body: "Massive global system integrators sell you their senior architects but deploy junior associates. With Exquisitor, you interview and approve the exact engineers from The Top 5% of Indian Engineering Talent you will work with. Complete transparency, zero corporate bloat.",
  },
  {
    number: "03",
    title: "Enterprise-Grade Compliance.",
    body: "We aren't a typical offshore shop. We operate with strict Western legal compliance, industrial-scale technical vetting, and bulletproof IP security protocols that standard boutique agencies simply cannot match.",
  },
];

interface PartnerLeadFormProps {
  selectedModel: string;
  onSelectedModelChange: (model: string) => void;
}

function PartnerLeadForm({
  selectedModel,
  onSelectedModelChange,
}: PartnerLeadFormProps) {
  const [form, setForm] = useState({
    companyName: "",
    corporateEmail: "",
    techStackNeeded: "",
    monthlyBudget: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Multi-select combobox state
  const [selectedTechs, setSelectedTechs] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [customStack, setCustomStack] = useState("");
  const comboboxRef = useRef<HTMLDivElement>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Outside-click handler for the combobox dropdown
  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      if (
        comboboxRef.current &&
        !comboboxRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleMouseDown);
    return () => document.removeEventListener("mousedown", handleMouseDown);
  }, []);

  const handleToggleTech = (tech: string) => {
    if (tech === OTHER_OPTION) {
      setShowCustomInput(true);
      setDropdownOpen(false);
      return;
    }
    setSelectedTechs((prev) =>
      prev.includes(tech) ? prev.filter((t) => t !== tech) : [...prev, tech],
    );
  };

  const handleRemoveTech = (tech: string) => {
    setSelectedTechs((prev) => prev.filter((t) => t !== tech));
  };

  const filteredOptions = TECH_STACK_OPTIONS.filter((opt) =>
    opt.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedTechs.length === 0 && customStack.trim().length === 0) {
      toast.error("Please select at least one technology.");
      return;
    }
    if (!form.monthlyBudget) {
      toast.error("Please select a monthly budget range.");
      return;
    }
    const techStackArray = [
      ...selectedTechs,
      ...(customStack.trim() ? [customStack.trim()] : []),
    ];

    setIsSubmitting(true);
    try {
      if (supabase) {
        const { error } = await supabase.from("partner_inquiries").insert({
          company_name: form.companyName,
          corporate_email: form.corporateEmail,
          tech_stack: techStackArray,
          monthly_budget: form.monthlyBudget,
          selected_model: selectedModel,
        });
        if (error) throw error;
      } else {
        // Supabase not configured — log and treat as success so the UI stays functional
        console.warn("[Supabase] Not configured — form submission skipped.");
      }
      setSubmitted(true);
    } catch {
      toast.error("Submission failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.45 }}
        data-ocid="partners.form.success_state"
        className="flex flex-col items-start justify-center h-full py-16 px-10 rounded"
        style={{
          background: "#111111",
          border: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <div
          className="p-3 rounded mb-6"
          style={{ background: "rgba(255,255,255,0.06)" }}
        >
          <CheckCircle className="h-6 w-6 text-white" />
        </div>
        <h3 className="text-xl font-bold text-white mb-3 tracking-tight">
          Inquiry Received
        </h3>
        <p className="text-sm leading-relaxed" style={{ color: "#A1A1AA" }}>
          Your inquiry has been received. We'll respond within one business day
          with a shortlist of pre-vetted candidates matched to your exact
          requirements.
        </p>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded p-10 space-y-8"
      data-ocid="partners.form.panel"
      style={{
        background: "#111111",
        border: "1px solid rgba(255,255,255,0.1)",
      }}
    >
      {/* Selected Engagement Model — read-only, auto-filled */}
      <div>
        <label
          htmlFor="pl-selectedModel"
          className={labelClass}
          style={{ color: "rgba(255,255,255,0.4)" }}
        >
          Selected Engagement Model
        </label>
        <input
          id="pl-selectedModel"
          name="selectedModel"
          type="text"
          readOnly
          value={selectedModel}
          onChange={(e) => onSelectedModelChange(e.target.value)}
          placeholder="Select a model from above to auto-fill"
          className="w-full h-14 px-4 text-sm text-white rounded outline-none cursor-default"
          style={{
            background: "#0a1a14",
            border: "1px solid #064e3b",
          }}
          data-ocid="partners.selected_model.input"
        />
      </div>

      {/* Company Name */}
      <div>
        <label
          htmlFor="pl-companyName"
          className={labelClass}
          style={{ color: "rgba(255,255,255,0.4)" }}
        >
          Company Name *
        </label>
        <input
          id="pl-companyName"
          name="companyName"
          type="text"
          required
          value={form.companyName}
          onChange={handleChange}
          placeholder="Meridian Capital"
          className={inputClass}
          style={inputStyle}
          data-ocid="partners.company_name.input"
          onFocus={(e) => {
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)";
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
          }}
        />
      </div>

      {/* Corporate Email */}
      <div>
        <label
          htmlFor="pl-corporateEmail"
          className={labelClass}
          style={{ color: "rgba(255,255,255,0.4)" }}
        >
          Corporate Email *
        </label>
        <input
          id="pl-corporateEmail"
          name="corporateEmail"
          type="email"
          required
          value={form.corporateEmail}
          onChange={handleChange}
          placeholder="cto@meridian.com"
          className={inputClass}
          style={inputStyle}
          data-ocid="partners.corporate_email.input"
          onFocus={(e) => {
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)";
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
          }}
        />
      </div>

      {/* Primary Tech Stack — Multi-Select Combobox */}
      <div>
        <label
          htmlFor="pl-techStack-search"
          className={labelClass}
          style={{ color: "rgba(255,255,255,0.4)" }}
        >
          Primary Tech Stack Needed *
        </label>

        <div
          ref={comboboxRef}
          className="relative"
          data-ocid="partners.tech_stack_combobox.input"
        >
          {/* Trigger area */}
          {/* biome-ignore lint/a11y/useSemanticElements: composite combobox trigger — inner input handles keyboard */}
          {/* biome-ignore lint/a11y/useAriaPropsForRole: aria-controls is optional for this inline widget */}
          {/* biome-ignore lint/a11y/useKeyWithClickEvents: keyboard access handled by inner search input */}
          <div
            aria-expanded={dropdownOpen}
            aria-haspopup="listbox"
            className="relative min-h-14 w-full rounded px-4 py-2 cursor-text flex flex-wrap gap-2 items-center transition-all duration-200"
            style={{
              background: "#0a0a0a",
              border: dropdownOpen
                ? "1px solid rgba(255,255,255,0.3)"
                : "1px solid rgba(255,255,255,0.08)",
            }}
            onClick={() => setDropdownOpen(true)}
          >
            {/* Selected pills */}
            {selectedTechs.map((tech) => (
              <span
                key={tech}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs text-white"
                style={{
                  background: "#111111",
                  border: "1px solid #333333",
                }}
              >
                {tech}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveTech(tech);
                  }}
                  className="text-white/50 hover:text-white transition-colors ml-0.5 leading-none"
                  aria-label={`Remove ${tech}`}
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            ))}

            {/* Search input */}
            <input
              id="pl-techStack-search"
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setDropdownOpen(true);
              }}
              onFocus={() => setDropdownOpen(true)}
              placeholder={
                selectedTechs.length === 0
                  ? "Search roles & technologies..."
                  : ""
              }
              className="flex-1 min-w-[160px] text-sm text-white bg-transparent outline-none placeholder:text-white/25 py-1"
            />
          </div>

          {/* Dropdown panel */}
          {dropdownOpen && (
            <div
              className="absolute left-0 right-0 z-50 mt-1 rounded overflow-y-auto max-h-64"
              style={{
                background: "rgba(17,17,17,0.97)",
                border: "1px solid rgba(255,255,255,0.1)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
              }}
            >
              {filteredOptions.length === 0 ? (
                <p className="px-4 py-3 text-xs text-white/40">
                  No results for "{searchQuery}"
                </p>
              ) : (
                filteredOptions.map((opt) => {
                  const isSelected = selectedTechs.includes(opt);
                  return (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => handleToggleTech(opt)}
                      className="w-full flex items-center justify-between px-4 py-2.5 text-sm text-left transition-colors hover:bg-white/5"
                      style={{
                        color: isSelected
                          ? "rgba(255,255,255,0.5)"
                          : "rgba(255,255,255,0.85)",
                      }}
                    >
                      <span>{opt}</span>
                      {isSelected && (
                        <Check className="h-3.5 w-3.5 shrink-0 text-white/40" />
                      )}
                    </button>
                  );
                })
              )}

              {/* Divider + Other option */}
              {(filteredOptions.length > 0 ||
                OTHER_OPTION.toLowerCase().includes(
                  searchQuery.toLowerCase(),
                )) && (
                <>
                  <div
                    className="mx-4 my-1"
                    style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
                  />
                  <button
                    type="button"
                    onClick={() => handleToggleTech(OTHER_OPTION)}
                    className="w-full flex items-center px-4 py-2.5 text-sm text-left transition-colors hover:bg-white/5"
                    style={{ color: "rgba(255,255,255,0.5)" }}
                  >
                    {OTHER_OPTION}
                  </button>
                </>
              )}
            </div>
          )}
        </div>

        {/* Custom stack reveal */}
        {showCustomInput && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
            className="overflow-hidden mt-4"
          >
            <label
              htmlFor="pl-customStack"
              className={labelClass}
              style={{ color: "rgba(255,255,255,0.4)" }}
            >
              Please specify your required technologies
            </label>
            <input
              id="pl-customStack"
              type="text"
              value={customStack}
              onChange={(e) => setCustomStack(e.target.value)}
              placeholder="e.g. COBOL, SAP, Mainframe..."
              className={inputClass}
              style={inputStyle}
              data-ocid="partners.custom_stack.input"
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
              }}
            />
          </motion.div>
        )}
      </div>

      {/* Monthly Budget */}
      <div>
        <label
          htmlFor="pl-budget"
          className={labelClass}
          style={{ color: "rgba(255,255,255,0.4)" }}
        >
          Monthly Budget per Developer *
        </label>
        <select
          id="pl-budget"
          name="monthlyBudget"
          required
          value={form.monthlyBudget}
          onChange={handleChange}
          data-ocid="partners.budget.select"
          className="w-full h-14 px-4 text-sm rounded outline-none transition-all duration-200 appearance-none cursor-pointer"
          style={{
            background: "#0a0a0a",
            border: "1px solid rgba(255,255,255,0.08)",
            color: form.monthlyBudget ? "white" : "rgba(255,255,255,0.25)",
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)";
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
          }}
        >
          <option
            value=""
            disabled
            style={{ background: "#111111", color: "rgba(255,255,255,0.4)" }}
          >
            Select budget range
          </option>
          <option
            value="£5,000 - £7,000"
            style={{ background: "#111111", color: "white" }}
          >
            £5,000 – £7,000
          </option>
          <option
            value="£7,000 - £10,000"
            style={{ background: "#111111", color: "white" }}
          >
            £7,000 – £10,000
          </option>
          <option
            value="£10,000+"
            style={{ background: "#111111", color: "white" }}
          >
            £10,000+
          </option>
        </select>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        data-ocid="partners.form.submit_button"
        className="w-full h-14 bg-white text-black font-bold tracking-widest uppercase text-xs rounded hover:bg-white/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-60"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Submitting...
          </>
        ) : (
          "Request Elite Talent"
        )}
      </button>
    </form>
  );
}

export default function PartnersPage() {
  const { data: partners, isLoading } = useGetPartners();
  const search = useSearch({ from: "/partners" });
  const [selectedModel, setSelectedModel] = useState(search.model ?? "");
  const formSectionRef = useRef<HTMLElement>(null);

  // Sync URL param to form state on mount / when URL param changes
  useEffect(() => {
    if (search.model) {
      setSelectedModel(search.model);
    }
  }, [search.model]);

  const handleSelectModel = (modelParam: string) => {
    setSelectedModel(modelParam);
    // Smooth scroll to the partner form
    const el = document.getElementById("partner-form");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      {/* Page Hero */}
      <section
        className="py-32 lg:py-40 px-6"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div className="max-w-[1200px] mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-xs tracking-[0.4em] uppercase font-semibold mb-5"
            style={{ color: "#A1A1AA" }}
          >
            Trusted By
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl sm:text-6xl font-bold tracking-tight text-white"
          >
            Our Partners
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-lg max-w-xl leading-relaxed"
            style={{ color: "#A1A1AA" }}
          >
            Organizations that have placed their trust in Exquisitor to deliver
            exceptional talent at the highest level.
          </motion.p>
        </div>
      </section>

      {/* ─── 7-Day Risk-Free Trial Guarantee ─────────────────── */}
      <section className="pt-20 pb-0 px-6" style={{ background: "#050505" }}>
        <div className="max-w-[1200px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
            style={{
              background: "#111111",
              borderLeft: "3px solid #064e3b",
              border: "1px solid rgba(255,255,255,0.07)",
              borderLeftWidth: "3px",
              borderLeftColor: "#064e3b",
              borderRadius: 4,
              padding: "40px 48px",
            }}
          >
            <p
              className="text-[10px] tracking-[0.4em] uppercase font-bold mb-3"
              style={{ color: "#4ade80" }}
            >
              Risk-Free Offer
            </p>
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-4">
              The Exquisitor Guarantee: 7-Day Risk-Free Trial.
            </h3>
            <p
              className="text-base leading-relaxed max-w-3xl"
              style={{ color: "#A1A1AA" }}
            >
              Deploy our elite Indian engineers directly into your active
              sprints. If their code, communication, or culture fit does not
              meet your absolute highest standards within the first week, you
              pay absolutely nothing. We bear the risk; you get the results.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ─── Engagement Models ────────────────────────────────── */}
      <section
        id="engagement-models"
        className="py-28 lg:py-36 px-6"
        style={{ background: "#050505" }}
      >
        <div className="max-w-[1200px] mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
          >
            <motion.p
              variants={fadeUp}
              className="text-xs tracking-[0.4em] uppercase font-semibold mb-4"
              style={{ color: "#A1A1AA" }}
            >
              How We Work
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-4"
            >
              Engagement Models
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="text-lg leading-relaxed max-w-xl mb-16"
              style={{ color: "#A1A1AA" }}
            >
              Three distinct engagement structures to match your exact
              requirements.
            </motion.p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
              {partnerEngagementModels.map((model) => (
                <motion.div
                  key={model.title}
                  variants={fadeUp}
                  className="rounded flex flex-col"
                  style={
                    model.featured
                      ? {
                          background: "#1a1a1a",
                          border: "1px solid rgba(255,255,255,0.25)",
                          padding: "40px",
                        }
                      : {
                          background: "#111111",
                          border: "1px solid rgba(255,255,255,0.08)",
                          padding: "40px",
                        }
                  }
                >
                  <div className="flex flex-col flex-1 space-y-5">
                    {model.tag && (
                      <p
                        className="text-[10px] font-bold tracking-[0.35em] uppercase"
                        style={{ color: "rgba(255,255,255,0.4)" }}
                      >
                        {model.tag}
                      </p>
                    )}
                    {/* Title & subtitle */}
                    <div>
                      <h3 className="text-xl font-bold tracking-tight text-white leading-snug">
                        {model.title}
                      </h3>
                      <p
                        className="text-xs font-semibold tracking-[0.25em] uppercase mt-1"
                        style={{ color: "#A1A1AA" }}
                      >
                        {model.subtitle}
                      </p>
                    </div>
                    {/* Pricing block — always same height structure */}
                    <div
                      className="pt-5 min-h-[72px]"
                      style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}
                    >
                      {model.pricingStartingFrom ? (
                        <>
                          <span
                            className="block text-sm font-normal"
                            style={{ color: "#A1A1AA" }}
                          >
                            Starting from
                          </span>
                          <p className="text-2xl font-bold text-white tracking-tight mt-0.5">
                            {model.price}
                          </p>
                        </>
                      ) : (
                        <>
                          <span className="block text-sm font-normal opacity-0 select-none">
                            &nbsp;
                          </span>
                          <p className="text-2xl font-bold text-white tracking-tight mt-0.5">
                            {model.price}
                          </p>
                        </>
                      )}
                      {model.priceNote && (
                        <p
                          className="text-xs mt-1 tracking-wide"
                          style={{ color: "#A1A1AA" }}
                        >
                          {model.priceNote}
                        </p>
                      )}
                    </div>
                    <p
                      className="text-sm leading-relaxed flex-1"
                      style={{ color: "#A1A1AA" }}
                    >
                      {model.body}
                    </p>

                    {/* Select This Model CTA */}
                    <button
                      type="button"
                      data-ocid={`partners.engagement.select_button.${partnerEngagementModels.indexOf(model) + 1}`}
                      onClick={() => handleSelectModel(model.modelParam)}
                      className="mt-4 w-full h-12 bg-white text-black font-bold tracking-widest uppercase text-xs rounded hover:bg-white/90 transition-colors"
                    >
                      Select This Model
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── The Exquisitor Advantage ─────────────────────────── */}
      <section
        className="py-28 lg:py-36 px-6"
        style={{
          background: "#050505",
          borderTop: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div className="max-w-[1200px] mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
          >
            <motion.p
              variants={fadeUp}
              className="text-xs tracking-[0.4em] uppercase font-semibold mb-4"
              style={{ color: "#A1A1AA" }}
            >
              The Difference
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-16"
            >
              Why Elite Teams Choose Us
            </motion.h2>

            <div className="space-y-10">
              {competitiveAdvantages.map((item) => (
                <motion.div
                  key={item.number}
                  variants={fadeUp}
                  className="flex gap-8 items-start"
                >
                  {/* Large number */}
                  <span
                    className="text-4xl font-black leading-none select-none flex-shrink-0"
                    style={{
                      color: "rgba(255,255,255,0.1)",
                      minWidth: 48,
                    }}
                    aria-hidden="true"
                  >
                    {item.number}
                  </span>
                  {/* Content */}
                  <div>
                    <h3 className="text-xl font-bold tracking-tight text-white mb-3">
                      {item.title}
                    </h3>
                    <p
                      className="text-base leading-relaxed max-w-2xl"
                      style={{ color: "#A1A1AA" }}
                    >
                      {item.body}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Partners Grid */}
      <section
        className="py-24 lg:py-32 px-6"
        style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div className="max-w-[1200px] mx-auto">
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {["a", "b", "c", "d", "e", "f"].map((id) => (
                <div
                  key={id}
                  className="rounded p-8 space-y-3"
                  style={{
                    background: "#111111",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  <Skeleton className="h-5 w-1/3 animate-shimmer" />
                  <Skeleton className="h-4 w-1/2 animate-shimmer" />
                  <Skeleton className="h-16 w-full animate-shimmer" />
                </div>
              ))}
            </div>
          ) : !partners || partners.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              data-ocid="partners.list.empty_state"
              className="text-center py-24"
            >
              <div
                className="inline-flex p-5 rounded-full mb-6"
                style={{
                  background: "#111111",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <Building2 className="h-8 w-8" style={{ color: "#A1A1AA" }} />
              </div>
              <p className="text-xl" style={{ color: "#A1A1AA" }}>
                Our partner network is growing — check back soon.
              </p>
            </motion.div>
          ) : (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={stagger}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {partners.map((partner, idx) => (
                <motion.div
                  key={partner.id.toString()}
                  variants={fadeUp}
                  data-ocid={`partners.list.item.${idx + 1}`}
                  className="luxury-card p-8 rounded group"
                >
                  {/* Logo / Initial */}
                  <div className="flex items-start gap-4 mb-6">
                    {partner.logoUrl ? (
                      <img
                        src={partner.logoUrl}
                        alt={partner.name}
                        className="h-12 w-12 rounded object-contain p-1.5"
                        style={{
                          background: "#050505",
                          border: "1px solid rgba(255,255,255,0.08)",
                        }}
                      />
                    ) : (
                      <div
                        className="h-12 w-12 rounded flex items-center justify-center font-bold text-lg text-white"
                        style={{
                          background: "rgba(255,255,255,0.05)",
                          border: "1px solid rgba(255,255,255,0.08)",
                        }}
                      >
                        {partner.name.charAt(0)}
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-white truncate">
                        {partner.name}
                      </h3>
                      <Badge
                        variant="secondary"
                        className="mt-1.5 text-[10px] tracking-wider uppercase border-0"
                        style={{
                          background: "rgba(255,255,255,0.06)",
                          color: "#A1A1AA",
                        }}
                      >
                        {partner.industry}
                      </Badge>
                    </div>
                  </div>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "#A1A1AA" }}
                  >
                    {partner.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* Partner Lead Form */}
      <section
        id="partner-form"
        ref={formSectionRef}
        className="py-32 lg:py-40 px-6"
        style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            {/* Left — heading */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p
                className="text-xs tracking-[0.4em] uppercase font-semibold mb-5"
                style={{ color: "#A1A1AA" }}
              >
                Work With Us
              </p>
              <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-6">
                Partner With Exquisitor
              </h2>
              <p
                className="text-lg leading-relaxed mb-10"
                style={{ color: "#A1A1AA" }}
              >
                Tell us about your engineering needs and we'll match you with
                The Top 5% of Indian Engineering Talent — meticulously vetted
                and curated for Western enterprise standards.
              </p>

              {/* Trust signals */}
              <div className="space-y-4">
                {[
                  "The Top 5% of Indian Engineering Talent",
                  "3–5 vetted candidate profiles within 72 hours",
                  "Timezone-aligned for UK, USA & Australia",
                  "14-day seamless deployment process",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <div
                      className="h-1.5 w-1.5 rounded-full flex-shrink-0"
                      style={{ background: "rgba(255,255,255,0.35)" }}
                    />
                    <span className="text-sm" style={{ color: "#A1A1AA" }}>
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right — form */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              <PartnerLeadForm
                selectedModel={selectedModel}
                onSelectedModelChange={setSelectedModel}
              />
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
