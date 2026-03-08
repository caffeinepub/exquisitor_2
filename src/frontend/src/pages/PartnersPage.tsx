import { useSearch } from "@tanstack/react-router";
import { CheckCircle, Loader2 } from "lucide-react";
import { type Variants, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { supabase } from "../lib/supabaseClient";

// Dropdown options
const TECH_STACK_OPTIONS = [
  "React.js / Frontend",
  "Node.js / Backend",
  "Python / Django",
  "Full Stack (MERN)",
  "Cloud/AWS Architecture",
  "Other",
];

const EXPERIENCE_LEVEL_OPTIONS = [
  "Senior Engineer (5+ Years)",
  "Engineering Lead",
  "Systems Architect",
];

const INDUSTRY_OPTIONS = [
  "B2B SaaS",
  "Fintech & Payments",
  "E-Commerce Infrastructure",
  "Healthtech",
  "Other",
];

const ENGAGEMENT_MODEL_OPTIONS = [
  "Dedicated Team",
  "Project-Based",
  "Staff Augmentation",
];

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
const MODEL_EMBEDDED = "Exquisitor Embedded (Starting from £5,500/mo)";
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
    price: "£5,500 / month",
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
    experienceLevel: "",
    industryVertical: "",
    engagement_model: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.techStackNeeded) {
      toast.error("Please select a primary tech stack.");
      return;
    }
    if (!form.experienceLevel) {
      toast.error("Please select a required experience level.");
      return;
    }
    if (!form.industryVertical) {
      toast.error("Please select an industry domain.");
      return;
    }
    if (!form.engagement_model) {
      toast.error("Please select a preferred engagement model.");
      return;
    }

    setIsSubmitting(true);
    try {
      if (supabase) {
        const { error } = await supabase.from("partner_inquiries").insert({
          company_name: form.companyName,
          corporate_email: form.corporateEmail,
          tech_stack: [form.techStackNeeded],
          experience_level: form.experienceLevel,
          industry_vertical: form.industryVertical,
          selected_model: selectedModel,
          engagement_model: form.engagement_model,
        });
        if (error) throw error;
      } else {
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

      {/* Dropdown 1: Primary Tech Stack Needed */}
      <div>
        <label
          htmlFor="pl-techStack"
          className={labelClass}
          style={{ color: "rgba(255,255,255,0.4)" }}
        >
          Primary Tech Stack Needed *
        </label>
        <select
          id="pl-techStack"
          name="techStackNeeded"
          required
          value={form.techStackNeeded}
          onChange={handleChange}
          data-ocid="partners.tech_stack.select"
          className="w-full h-14 px-4 text-sm rounded outline-none transition-all duration-200 appearance-none cursor-pointer"
          style={{
            background: "#0a0a0a",
            border: "1px solid rgba(255,255,255,0.08)",
            color: form.techStackNeeded ? "white" : "rgba(255,255,255,0.25)",
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
            Select primary tech stack
          </option>
          {TECH_STACK_OPTIONS.map((opt) => (
            <option
              key={opt}
              value={opt}
              style={{ background: "#111111", color: "white" }}
            >
              {opt}
            </option>
          ))}
        </select>
      </div>

      {/* Dropdown 2: Required Experience Level */}
      <div>
        <label
          htmlFor="pl-experienceLevel"
          className={labelClass}
          style={{ color: "rgba(255,255,255,0.4)" }}
        >
          Required Experience Level *
        </label>
        <select
          id="pl-experienceLevel"
          name="experienceLevel"
          required
          value={form.experienceLevel}
          onChange={handleChange}
          data-ocid="partners.experience_level.select"
          className="w-full h-14 px-4 text-sm rounded outline-none transition-all duration-200 appearance-none cursor-pointer"
          style={{
            background: "#0a0a0a",
            border: "1px solid rgba(255,255,255,0.08)",
            color: form.experienceLevel ? "white" : "rgba(255,255,255,0.25)",
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
            Select experience level
          </option>
          {EXPERIENCE_LEVEL_OPTIONS.map((opt) => (
            <option
              key={opt}
              value={opt}
              style={{ background: "#111111", color: "white" }}
            >
              {opt}
            </option>
          ))}
        </select>
      </div>

      {/* Dropdown 3: Industry Domain / Vertical */}
      <div>
        <label
          htmlFor="pl-industryVertical"
          className={labelClass}
          style={{ color: "rgba(255,255,255,0.4)" }}
        >
          Industry Domain / Vertical *
        </label>
        <select
          id="pl-industryVertical"
          name="industryVertical"
          required
          value={form.industryVertical}
          onChange={handleChange}
          data-ocid="partners.industry_vertical.select"
          className="w-full h-14 px-4 text-sm rounded outline-none transition-all duration-200 appearance-none cursor-pointer"
          style={{
            background: "#0a0a0a",
            border: "1px solid rgba(255,255,255,0.08)",
            color: form.industryVertical ? "white" : "rgba(255,255,255,0.25)",
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
            Select industry domain
          </option>
          {INDUSTRY_OPTIONS.map((opt) => (
            <option
              key={opt}
              value={opt}
              style={{ background: "#111111", color: "white" }}
            >
              {opt}
            </option>
          ))}
        </select>
      </div>

      {/* Dropdown 4: Preferred Engagement Model */}
      <div>
        <label
          htmlFor="pl-engagementModel"
          className={labelClass}
          style={{ color: "rgba(255,255,255,0.4)" }}
        >
          Preferred Engagement Model *
        </label>
        <select
          id="pl-engagementModel"
          name="engagement_model"
          required
          value={form.engagement_model}
          onChange={handleChange}
          data-ocid="partners.engagement_model.select"
          className="w-full h-14 px-4 text-sm rounded outline-none transition-all duration-200 appearance-none cursor-pointer"
          style={{
            background: "#0a0a0a",
            border: "1px solid rgba(255,255,255,0.08)",
            color: form.engagement_model ? "white" : "rgba(255,255,255,0.25)",
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
            Select engagement model
          </option>
          {ENGAGEMENT_MODEL_OPTIONS.map((opt) => (
            <option
              key={opt}
              value={opt}
              style={{ background: "#111111", color: "white" }}
            >
              {opt}
            </option>
          ))}
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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mt-10"
          >
            <button
              type="button"
              data-ocid="partners.hero.build_team.button"
              onClick={() => {
                const el = document.getElementById("partner-form");
                if (el)
                  el.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              className="bg-white text-black font-bold tracking-widest uppercase text-xs px-10 h-12 rounded hover:bg-white/90 transition-colors"
            >
              Build Your Team
            </button>
          </motion.div>
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

      {/* ─── Financial Advantage Rate Card ───────────────────── */}
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
            {/* Eyebrow */}
            <motion.p
              variants={fadeUp}
              style={{
                fontSize: 10,
                letterSpacing: "0.35em",
                textTransform: "uppercase",
                color: "#A1A1AA",
                fontWeight: 600,
                marginBottom: 16,
              }}
            >
              Geographic Arbitrage
            </motion.p>

            {/* Heading */}
            <motion.h2
              variants={fadeUp}
              className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-6"
            >
              The Financial Advantage of an Exquisitor Partnership
            </motion.h2>

            {/* Sub-header */}
            <motion.p
              variants={fadeUp}
              className="text-base leading-relaxed max-w-2xl mb-14"
              style={{ color: "#A1A1AA" }}
            >
              Extend your runway. Access the top 1% of Ex-Unicorn Indian
              engineers at a fraction of your local market rate. We handle 100%
              of the cross-border HR, payroll, and compliance. Your engineer is
              fully embedded into your daily operations and Slack channels.
            </motion.p>

            {/* Table */}
            <motion.div variants={fadeUp}>
              <div style={{ overflowX: "auto" }}>
                <div
                  style={{
                    background: "#111111",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: 4,
                    minWidth: 640,
                  }}
                >
                  <table
                    style={{ width: "100%", borderCollapse: "collapse" }}
                    aria-label="Global rate card"
                  >
                    <thead>
                      <tr
                        style={{
                          background: "rgba(255,255,255,0.03)",
                          borderBottom: "1px solid rgba(255,255,255,0.06)",
                        }}
                      >
                        {[
                          "Market",
                          "Exquisitor Monthly Rate",
                          "Average Local Cost",
                          "Client Savings",
                        ].map((heading) => (
                          <th
                            key={heading}
                            style={{
                              padding: "16px 24px",
                              textAlign: "left",
                              fontSize: 10,
                              letterSpacing: "0.35em",
                              textTransform: "uppercase",
                              color: "#A1A1AA",
                              fontWeight: 600,
                              whiteSpace: "nowrap",
                            }}
                          >
                            {heading}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        {
                          flag: "🇬🇧",
                          country: "United Kingdom",
                          rate: "£5,500+",
                          local: "£9,000 – £10,000 /mo",
                          savings: "~45% Savings",
                        },
                        {
                          flag: "🇺🇸",
                          country: "United States",
                          rate: "$7,000 – $8,500",
                          local: "$10,000 – $16,000 /mo",
                          savings: "~45–50% Savings",
                        },
                        {
                          flag: "🇦🇺",
                          country: "Australia",
                          rate: "AUD 9,000 – 11,500",
                          local: "AUD 13,000 – 16,000 /mo",
                          savings: "~35–40% Savings",
                        },
                        {
                          flag: "🇨🇭",
                          country: "Switzerland",
                          rate: "CHF 8,500 – 10,500",
                          local: "CHF 10,000 – 17,000 /mo",
                          savings: "~40–50% Savings",
                        },
                        {
                          flag: "🇩🇰",
                          country: "Denmark",
                          rate: "DKK 45,000 – 55,000",
                          local: "DKK 60,000 – 70,000 /mo",
                          savings: "~30–35% Savings",
                        },
                        {
                          flag: "🇸🇪",
                          country: "Sweden",
                          rate: "SEK 65,000 – 80,000",
                          local: "SEK 100,000 – 115,000 /mo",
                          savings: "~30–35% Savings",
                        },
                      ].map((row, idx) => (
                        <tr
                          key={row.country}
                          data-ocid={`partners.rate_card.row.${idx + 1}`}
                          style={{
                            borderBottom:
                              idx < 5
                                ? "1px solid rgba(255,255,255,0.05)"
                                : "none",
                            transition: "background 0.15s ease",
                          }}
                          onMouseEnter={(e) => {
                            (
                              e.currentTarget as HTMLTableRowElement
                            ).style.background = "rgba(255,255,255,0.02)";
                          }}
                          onMouseLeave={(e) => {
                            (
                              e.currentTarget as HTMLTableRowElement
                            ).style.background = "transparent";
                          }}
                        >
                          {/* Country */}
                          <td
                            style={{
                              padding: "20px 24px",
                              whiteSpace: "nowrap",
                            }}
                          >
                            <span
                              style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: 10,
                              }}
                            >
                              <span style={{ fontSize: "1.25rem" }}>
                                {row.flag}
                              </span>
                              <span
                                style={{
                                  color: "#FFFFFF",
                                  fontWeight: 700,
                                  fontSize: 14,
                                }}
                              >
                                {row.country}
                              </span>
                            </span>
                          </td>

                          {/* Exquisitor Rate */}
                          <td
                            style={{
                              padding: "20px 24px",
                              color: "#FFFFFF",
                              fontSize: 14,
                              fontWeight: 500,
                              whiteSpace: "nowrap",
                            }}
                          >
                            {row.rate}
                          </td>

                          {/* Local Cost — hidden on small screens */}
                          <td
                            className="hidden md:table-cell"
                            style={{
                              padding: "20px 24px",
                              color: "#A1A1AA",
                              fontSize: 14,
                              whiteSpace: "nowrap",
                            }}
                          >
                            {row.local}
                          </td>

                          {/* Client Savings — emerald badge */}
                          <td
                            style={{
                              padding: "20px 24px",
                              whiteSpace: "nowrap",
                            }}
                          >
                            <span
                              style={{
                                display: "inline-block",
                                background: "rgba(16, 185, 129, 0.1)",
                                border: "1px solid rgba(16, 185, 129, 0.25)",
                                color: "#10b981",
                                fontWeight: 700,
                                padding: "4px 12px",
                                borderRadius: 4,
                                fontSize: 13,
                                letterSpacing: "0.05em",
                              }}
                            >
                              {row.savings}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>

            {/* CTA Row */}
            <motion.div
              variants={fadeUp}
              className="flex flex-col sm:flex-row items-center justify-between gap-6 sm:gap-4"
              style={{ marginTop: 32 }}
            >
              <p
                className="text-sm text-center sm:text-left"
                style={{ color: "#A1A1AA" }}
              >
                Ready to extend your engineering runway?
              </p>
              <button
                type="button"
                data-ocid="partners.rate_card.build_team.button"
                onClick={() => {
                  const el = document.getElementById("partner-form");
                  if (el)
                    el.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
                className="bg-white text-black font-bold tracking-widest uppercase text-xs px-10 h-12 rounded hover:bg-white/90 transition-colors shrink-0"
              >
                Begin Partnership
              </button>
            </motion.div>
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
