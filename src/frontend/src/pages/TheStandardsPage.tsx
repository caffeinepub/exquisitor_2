import { Award, BarChart3, CheckCircle2, Clock } from "lucide-react";
import { type Variants, motion } from "motion/react";

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
  },
};

const vettingSteps = [
  {
    step: "01",
    title: "Initial Screening",
    duration: "Day 1",
    description:
      "A 60-minute structured conversation with a senior Exquisitor partner. We evaluate communication clarity, career trajectory, and initial technical breadth.",
  },
  {
    step: "02",
    title: "Technical Depth Assessment",
    duration: "Days 2–4",
    description:
      "Domain-specific evaluation conducted by active practitioners. Covers architectural judgment, problem-solving approach, and knowledge currency.",
  },
  {
    step: "03",
    title: "Reference Investigation",
    duration: "Days 4–6",
    description:
      "We speak directly with former managers, peers, and reports — not just provided references. We probe for leadership in adversity, conflict resolution, and growth trajectory.",
  },
  {
    step: "04",
    title: "Background & Credential Verification",
    duration: "Days 5–7",
    description:
      "Independent verification of education, certifications, employment history, and where applicable, professional standing.",
  },
  {
    step: "05",
    title: "Cultural & Judgment Evaluation",
    duration: "Day 7",
    description:
      "A situational judgment interview that assesses alignment with organizational values, decision-making under ambiguity, and leadership philosophy.",
  },
  {
    step: "06",
    title: "Partner Sign-Off",
    duration: "Day 8",
    description:
      "No candidate enters our active roster without unanimous approval from a senior partner panel. Every recommendation carries our institutional guarantee.",
  },
];

const guarantees = [
  {
    icon: Clock,
    title: "72-Hour Curation",
    description:
      "Within 3 days of your inquiry, we deliver 3–5 meticulously vetted, blind candidate profiles from The Top 5% of Indian Engineering Talent, tailored precisely to your tech stack and company culture.",
  },
  {
    icon: CheckCircle2,
    title: "90-Day Replacement Guarantee",
    description:
      "If any placed candidate departs within the first 90 days for performance reasons, we provide a replacement at no additional fee.",
  },
  {
    icon: Award,
    title: "Quality Score Commitment",
    description:
      "Every placement is followed up at 30, 60, and 90 days. We maintain a 96% client satisfaction score across all engagements.",
  },
  {
    icon: BarChart3,
    title: "Transparent Reporting",
    description:
      "Regular engagement updates including pipeline status, candidate feedback, and market intelligence relevant to your search.",
  },
];

export default function TheStandardsPage() {
  return (
    <>
      {/* Page Hero */}
      <section className="py-32 lg:py-40 px-6 bg-background border-b border-border">
        <div className="max-w-[1200px] mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-xs tracking-[0.4em] uppercase text-muted-foreground font-semibold mb-5"
          >
            Our Process
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl sm:text-6xl font-bold tracking-tight text-foreground"
          >
            The Standards
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-lg text-muted-foreground max-w-xl leading-relaxed"
          >
            Our vetting methodology is the most rigorous in the industry. Here
            is exactly what every associate endures before we recommend them to
            a client.
          </motion.p>
        </div>
      </section>

      {/* Vetting Process */}
      <section className="py-24 lg:py-32 px-6 bg-background">
        <div className="max-w-[1200px] mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
          >
            <motion.p
              variants={fadeUp}
              className="text-xs tracking-[0.4em] uppercase text-muted-foreground font-semibold mb-5"
            >
              Vetting Process
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="text-4xl font-bold tracking-tight text-foreground mb-16"
            >
              Eight-Day Evaluation Protocol
            </motion.h2>

            <div className="relative space-y-0">
              {/* Vertical line */}
              <div className="absolute left-8 top-0 bottom-0 w-px bg-foreground/10 hidden sm:block" />

              {vettingSteps.map((step, i) => (
                <motion.div
                  key={step.step}
                  variants={fadeUp}
                  className="relative flex gap-6 sm:gap-8 pb-10 last:pb-0"
                >
                  {/* Step indicator */}
                  <div className="relative flex-shrink-0 w-16 h-16 rounded-full bg-card border border-border flex flex-col items-center justify-center z-10">
                    <span className="text-[10px] text-muted-foreground font-mono">
                      {step.step}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex-1 pt-3">
                    <div className="flex items-center gap-3 mb-3 flex-wrap">
                      <h3 className="text-sm font-bold tracking-wider uppercase text-foreground">
                        {step.title}
                      </h3>
                      <span className="text-[10px] tracking-wider uppercase text-muted-foreground bg-foreground/8 px-2 py-0.5 rounded-full">
                        {step.duration}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                    {i < vettingSteps.length - 1 && (
                      <div className="mt-6 section-divider sm:hidden" />
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quality Guarantees */}
      <section className="py-24 lg:py-32 px-6 bg-card border-y border-border">
        <div className="max-w-[1200px] mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
          >
            <motion.p
              variants={fadeUp}
              className="text-xs tracking-[0.4em] uppercase text-muted-foreground font-semibold mb-5"
            >
              Guarantees
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="text-4xl font-bold tracking-tight text-foreground mb-16"
            >
              Our Quality Commitments
            </motion.h2>

            <div className="grid sm:grid-cols-2 gap-6">
              {guarantees.map((g) => (
                <motion.div
                  key={g.title}
                  variants={fadeUp}
                  className="luxury-card p-8 rounded group"
                >
                  <div className="flex items-start gap-5">
                    <div className="p-3 rounded bg-foreground/8 text-foreground group-hover:bg-foreground/12 transition-colors shrink-0">
                      <g.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold tracking-wider uppercase text-foreground mb-3">
                        {g.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {g.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* SLA / Methodology */}
      <section className="py-24 lg:py-32 px-6 bg-background">
        <div className="max-w-[1200px] mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
            className="grid md:grid-cols-2 gap-16"
          >
            <div>
              <motion.p
                variants={fadeUp}
                className="text-xs tracking-[0.4em] uppercase text-muted-foreground font-semibold mb-5"
              >
                Methodology
              </motion.p>
              <motion.h2
                variants={fadeUp}
                className="text-3xl font-bold tracking-tight text-foreground mb-8"
              >
                How We Work
              </motion.h2>
              <motion.ul
                variants={fadeUp}
                className="space-y-5 text-sm text-muted-foreground leading-relaxed"
              >
                {[
                  "Dedicated partner assigned to every engagement — not a team of junior recruiters",
                  "Weekly written status reports including market feedback and candidate intelligence",
                  "Parallel processing: we never pause a search while awaiting one candidate's outcome",
                  "Closed-loop feedback: every candidate receives a structured debrief regardless of outcome",
                ].map((item) => (
                  <li key={item} className="flex gap-3">
                    <CheckCircle2 className="h-4 w-4 text-foreground/60 mt-0.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </motion.ul>
            </div>

            <div>
              <motion.p
                variants={fadeUp}
                className="text-xs tracking-[0.4em] uppercase text-muted-foreground font-semibold mb-5"
              >
                SLA Commitments
              </motion.p>
              <motion.h2
                variants={fadeUp}
                className="text-3xl font-bold tracking-tight text-foreground mb-8"
              >
                Service Level Agreements
              </motion.h2>
              <motion.div variants={fadeUp} className="space-y-0">
                {[
                  { label: "Initial Response", value: "< 4 hours" },
                  { label: "Candidate Profile Curation", value: "72 hours" },
                  {
                    label: "Full Deployment Timeline",
                    value: "14 days",
                  },
                  { label: "Weekly Status Reports", value: "Every Friday" },
                  {
                    label: "Post-Placement Follow-Up",
                    value: "30 / 60 / 90 days",
                  },
                ].map((sla) => (
                  <div
                    key={sla.label}
                    className="flex items-center justify-between gap-4 py-4 border-b border-border last:border-0"
                  >
                    <span className="text-sm text-muted-foreground">
                      {sla.label}
                    </span>
                    <span className="text-sm font-semibold text-foreground">
                      {sla.value}
                    </span>
                  </div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
