import { useNavigate } from "@tanstack/react-router";
import {
  BarChart2,
  Brain,
  Cloud,
  Cpu,
  Database,
  FlaskConical,
  Gamepad2,
  GitBranch,
  Layers,
  Link2,
  Monitor,
  Server,
  Smartphone,
  TestTube2,
} from "lucide-react";
import { type Variants, motion } from "motion/react";
import { useState } from "react";

const bentoItems = [
  {
    metric: "Top 5%",
    title: "Indian Engineering Talent",
    description:
      "The Top 5% of Indian Engineering Talent — every engineer clears a rigorous 6-stage evaluation covering technical depth, system design, cultural alignment, and executive references.",
    wide: true,
  },
  {
    metric: "72 Hours",
    title: "72-Hour Curation",
    description:
      "Within 3 days of your inquiry, we deliver 3–5 meticulously vetted, blind candidate profiles tailored precisely to your tech stack and company culture.",
    wide: false,
  },
  {
    metric: "14 Days",
    title: "14-Day Seamless Deployment",
    description:
      "We don't rush excellence. Our 14-day timeline encompasses rigorous internal screening and multiple client-side interview rounds, ensuring the developer is perfectly integrated into your live workflow.",
    wide: false,
  },
  {
    metric: "ISO 27001",
    title: "Enterprise-Grade Security",
    description:
      "Compliance-ready engineers. Full background verification, NDA-standard confidentiality, and security clearance support.",
    wide: true,
  },
];

// Model param strings
const MODEL_EMBEDDED = "Exquisitor Embedded (Starting from £5,250/mo)";
const MODEL_DIRECT = "Exquisitor Direct (20% of First-Year Salary)";
const MODEL_PROJECT = "Exquisitor Project (Project-Based Billing)";

const engagementModels = [
  {
    tag: "Signature Service",
    title: "Exquisitor Embedded",
    subtitle: "Staff Augmentation",
    pricingStartingFrom: true,
    pricing: "£5,250 / month",
    pricingNote: "Monthly Retainer",
    body: "Dedicated elite developers seamlessly integrated into your internal engineering team. Full-time commitment, zero recruitment overhead.",
    featured: true,
    modelParam: MODEL_EMBEDDED,
  },
  {
    tag: null,
    title: "Exquisitor Direct",
    subtitle: "Executive Search",
    pricingStartingFrom: false,
    pricing: "20% of First-Year Salary",
    pricingNote: "One-Time Fee",
    body: "Permanent, high-impact placements for your core leadership and senior engineering roles.",
    featured: false,
    modelParam: MODEL_DIRECT,
  },
  {
    tag: null,
    title: "Exquisitor Project",
    subtitle: "End-to-End Delivery",
    pricingStartingFrom: false,
    pricing: "Project-Based Billing",
    pricingNote: null,
    body: "Complete scope, build, and handover of complex technical products managed entirely by our elite internal teams.",
    featured: false,
    modelParam: MODEL_PROJECT,
  },
];

const uncompromisedStandards = [
  {
    title: "Vetted for Enterprise",
    body: "The Top 5% of Indian Engineering Talent — subject to rigorous technical evaluation, behavioural assessment, and executive-level reference verification.",
  },
  {
    title: "72-Hour Curation",
    body: "Within 3 days of your inquiry, we deliver 3–5 meticulously vetted, blind candidate profiles tailored precisely to your tech stack and company culture.",
  },
  {
    title: "14-Day Seamless Deployment",
    body: "We don't rush excellence. Our 14-day timeline encompasses rigorous internal screening and multiple client-side interview rounds, ensuring the developer is perfectly integrated into your live workflow.",
  },
];

// ─── Tech Capabilities Data ──────────────────────────────────
type TechTab =
  | "Front-End"
  | "Back-End"
  | "Mobile"
  | "Cloud & DevOps"
  | "AI & Data"
  | "Blockchain/Web3";

const techTabs: TechTab[] = [
  "Front-End",
  "Back-End",
  "Mobile",
  "Cloud & DevOps",
  "AI & Data",
  "Blockchain/Web3",
];

const techData: Record<TechTab, string[]> = {
  "Front-End": [
    "React",
    "Angular",
    "Vue.js",
    "TypeScript",
    "JavaScript",
    "Next.js",
    "Tailwind CSS",
    "Redux",
    "Three.js",
    "WebGL",
  ],
  "Back-End": [
    "Node.js",
    "Python",
    "Django",
    "Java",
    "Spring Boot",
    ".NET Core",
    "C#",
    "Go (Golang)",
    "Rust",
    "Ruby on Rails",
    "PHP/Laravel",
  ],
  Mobile: [
    "iOS (Swift/Objective-C)",
    "Android (Kotlin)",
    "React Native",
    "Flutter",
  ],
  "Cloud & DevOps": [
    "AWS",
    "Azure",
    "GCP",
    "Kubernetes",
    "Docker",
    "Terraform",
    "CI/CD",
    "Jenkins",
    "Prometheus",
  ],
  "AI & Data": [
    "OpenAI API",
    "Machine Learning",
    "TensorFlow",
    "PyTorch",
    "Pandas",
    "Apache Spark",
    "SQL/NoSQL",
    "BigQuery",
  ],
  "Blockchain/Web3": [
    "Solidity",
    "Smart Contracts",
    "Ethereum",
    "web3.js",
    "Hyperledger",
  ],
};

// Role → Tab mapping
const roleToTab: Record<string, TechTab> = {
  "Full-Stack Developer": "Front-End",
  "Front-End Developer": "Front-End",
  "Back-End Developer": "Back-End",
  "Mobile Developer": "Mobile",
  "Game Developer": "Front-End",
  "DevOps Engineer": "Cloud & DevOps",
  "Cloud Engineer": "Cloud & DevOps",
  "AI Engineer": "AI & Data",
  "Machine Learning Engineer": "AI & Data",
  "Data Analyst": "AI & Data",
  "Data Engineer": "AI & Data",
  "Data Scientist": "AI & Data",
  "Blockchain Developer": "Blockchain/Web3",
  "Automation QA": "Back-End",
};

interface DisciplineRole {
  name: string;
  icon: React.ReactNode;
}

const disciplineRoles: DisciplineRole[] = [
  { name: "Full-Stack Developer", icon: <Layers className="h-6 w-6" /> },
  { name: "Front-End Developer", icon: <Monitor className="h-6 w-6" /> },
  { name: "Back-End Developer", icon: <Server className="h-6 w-6" /> },
  { name: "Mobile Developer", icon: <Smartphone className="h-6 w-6" /> },
  { name: "Game Developer", icon: <Gamepad2 className="h-6 w-6" /> },
  { name: "DevOps Engineer", icon: <GitBranch className="h-6 w-6" /> },
  { name: "Cloud Engineer", icon: <Cloud className="h-6 w-6" /> },
  { name: "AI Engineer", icon: <Brain className="h-6 w-6" /> },
  {
    name: "Machine Learning Engineer",
    icon: <Cpu className="h-6 w-6" />,
  },
  { name: "Data Analyst", icon: <BarChart2 className="h-6 w-6" /> },
  { name: "Data Engineer", icon: <Database className="h-6 w-6" /> },
  { name: "Data Scientist", icon: <FlaskConical className="h-6 w-6" /> },
  { name: "Blockchain Developer", icon: <Link2 className="h-6 w-6" /> },
  { name: "Automation QA", icon: <TestTube2 className="h-6 w-6" /> },
];

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
  },
};

export default function HomePage() {
  const [activeTechTab, setActiveTechTab] = useState<TechTab>("Front-End");
  const navigate = useNavigate();

  const handleRoleCardClick = (roleName: string) => {
    const targetTab = roleToTab[roleName] ?? "Front-End";
    setActiveTechTab(targetTab);
    setTimeout(() => {
      document
        .getElementById("tech-capabilities")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  };

  return (
    <>
      {/* ─── Hero ─────────────────────────────────────────────── */}
      <section
        className="relative min-h-[92vh] flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: `url('/assets/generated/hero-bg.dim_1920x1080.webp')`,
          backgroundSize: "cover",
          backgroundPosition: "center top",
        }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/70" />

        <div className="relative z-10 max-w-[1200px] mx-auto px-6 text-center py-40 lg:py-56">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="space-y-8"
          >
            <motion.p
              variants={fadeUp}
              className="text-xs tracking-[0.4em] uppercase text-muted-foreground font-semibold"
            >
              Boutique IT Staffing
            </motion.p>

            <motion.h1
              variants={fadeUp}
              className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight text-foreground leading-[1]"
            >
              Global Elite Talent.
              <br />
              Exceptional Results.
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
            >
              Bridging Western enterprises with India's most accomplished IT
              professionals. Not a talent marketplace — a trusted partner in
              building enduring teams.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2"
            >
              <button
                type="button"
                onClick={() =>
                  navigate({ to: "/partners", search: { model: "" } })
                }
                data-ocid="home.hero.initiate_inquiry.button"
                className="bg-white text-black font-bold tracking-widest uppercase text-xs px-10 h-12 rounded hover:bg-white/90 transition-colors"
              >
                Initiate Inquiry
              </button>
              <button
                type="button"
                className="text-muted-foreground hover:text-foreground tracking-wider text-sm h-12 border border-foreground/20 hover:border-foreground/40 bg-transparent transition-all px-8 rounded"
                onClick={() => {
                  document
                    .getElementById("tech-capabilities")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Explore Services
              </button>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <div className="w-px h-12 bg-gradient-to-b from-transparent via-foreground/20 to-transparent" />
        </motion.div>
      </section>

      {/* ─── Dual CTA Block ───────────────────────────────────── */}
      <section
        id="dual-cta"
        className="py-24 lg:py-32 px-6"
        style={{ background: "#050505" }}
      >
        <div className="max-w-[1200px] mx-auto">
          <div
            style={{
              background: "#111111",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 4,
              padding: "64px",
            }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 relative">
              {/* Left Column — Partner */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                variants={fadeUp}
                className="flex flex-col gap-6"
              >
                <p
                  style={{
                    fontSize: 10,
                    letterSpacing: "0.35em",
                    textTransform: "uppercase",
                    color: "#A1A1AA",
                    fontWeight: 600,
                  }}
                >
                  For Organizations
                </p>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                  Partner with Exquisitor
                </h2>
                <p
                  className="leading-relaxed text-sm sm:text-base"
                  style={{ color: "#A1A1AA" }}
                >
                  Access The Top 5% of Indian Engineering Talent. Pre-vetted,
                  immediately deployable, and fully aligned with your
                  organisation's culture and technical standards.
                </p>
                <div className="pt-2">
                  <a
                    href="/partners"
                    data-ocid="home.partner_cta.button"
                    className="inline-flex items-center justify-center bg-white text-black font-bold tracking-widest uppercase text-xs h-14 px-8 rounded hover:bg-white/90 transition-colors"
                  >
                    Request Elite Talent
                  </a>
                </div>
              </motion.div>

              {/* Vertical Divider */}
              <div
                className="hidden lg:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px"
                style={{ background: "rgba(255,255,255,0.1)" }}
              />

              {/* Right Column — Apply */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                variants={fadeUp}
                className="flex flex-col gap-6"
                style={{ transitionDelay: "0.1s" }}
              >
                <p
                  style={{
                    fontSize: 10,
                    letterSpacing: "0.35em",
                    textTransform: "uppercase",
                    color: "#A1A1AA",
                    fontWeight: 600,
                  }}
                >
                  For Engineers
                </p>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                  Apply to Exquisitor
                </h2>
                <p
                  className="leading-relaxed text-sm sm:text-base"
                  style={{ color: "#A1A1AA" }}
                >
                  We accept only The Top 5% of Indian Engineering Talent. If you
                  are a senior engineer with a proven track record, we want to
                  hear from you. Join the bench.
                </p>
                <div className="pt-2">
                  <a
                    href="/associates"
                    data-ocid="home.associate_cta.button"
                    className="inline-flex items-center justify-center border border-white text-white font-bold tracking-widest uppercase text-xs h-14 px-8 rounded hover:bg-white/10 transition-colors bg-transparent"
                  >
                    Apply for the Bench
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Engagement Models ────────────────────────────────── */}
      <section className="py-28 lg:py-36 px-6 bg-background">
        <div className="max-w-[1200px] mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
          >
            <motion.p
              variants={fadeUp}
              className="text-xs tracking-[0.4em] uppercase text-muted-foreground font-semibold mb-4"
            >
              How We Work
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground mb-16"
            >
              Engagement Models
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
              {engagementModels.map((model, idx) => (
                <motion.div
                  key={model.title}
                  variants={fadeUp}
                  className={`${model.featured ? "pricing-card-featured" : "pricing-card"} p-10 flex flex-col`}
                >
                  <div className="flex flex-col flex-1 space-y-5">
                    {model.tag && (
                      <p className="text-[10px] font-bold tracking-[0.35em] uppercase text-muted-foreground">
                        {model.tag}
                      </p>
                    )}
                    <div>
                      <h3 className="text-xl font-bold tracking-tight text-foreground leading-snug">
                        {model.title}
                      </h3>
                      <p className="text-xs font-semibold tracking-[0.25em] uppercase text-muted-foreground mt-1">
                        {model.subtitle}
                      </p>
                    </div>
                    {/* Pricing block — consistent height for alignment */}
                    <div className="border-t border-white/10 pt-5 min-h-[72px]">
                      {model.pricingStartingFrom ? (
                        <>
                          <span
                            className="block text-sm font-normal"
                            style={{ color: "#A1A1AA" }}
                          >
                            Starting from
                          </span>
                          <p className="text-2xl font-bold text-white tracking-tight mt-0.5">
                            {model.pricing}
                          </p>
                        </>
                      ) : (
                        <>
                          <span className="block text-sm font-normal opacity-0 select-none">
                            &nbsp;
                          </span>
                          <p className="text-2xl font-bold text-white tracking-tight mt-0.5">
                            {model.pricing}
                          </p>
                        </>
                      )}
                      {model.pricingNote && (
                        <p className="text-xs text-muted-foreground mt-1 tracking-wide">
                          {model.pricingNote}
                        </p>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                      {model.body}
                    </p>

                    {/* Select This Model CTA */}
                    <button
                      type="button"
                      data-ocid={`home.engagement.select_button.${idx + 1}`}
                      onClick={() =>
                        navigate({
                          to: "/partners",
                          search: { model: model.modelParam },
                        })
                      }
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

      <div className="section-divider max-w-[1200px] mx-auto" />

      {/* ─── Why Organizations Choose Us — Bento Box ─────────── */}
      <section className="py-28 lg:py-36 px-6 bg-background">
        <div className="max-w-[1200px] mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
          >
            <motion.p
              variants={fadeUp}
              className="text-xs tracking-[0.4em] uppercase text-muted-foreground font-semibold mb-4"
            >
              The Difference
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground mb-16"
            >
              Why Organizations Choose Us
            </motion.h2>

            {/* Bento Grid — 3 columns, alternating wide/narrow */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {/* Row 1: wide (col-span-2) + narrow (col-span-1) */}
              {[bentoItems[0], bentoItems[1]].map((item) => (
                <motion.div
                  key={item.title}
                  variants={fadeUp}
                  className={`bento-card p-10 flex flex-col justify-between min-h-[220px] ${
                    item.wide ? "md:col-span-2" : "md:col-span-1"
                  }`}
                >
                  <div>
                    <p className="text-5xl font-black tracking-tight text-foreground mb-3 leading-none">
                      {item.metric}
                    </p>
                    <p className="text-xs font-bold tracking-[0.3em] uppercase text-muted-foreground mb-4">
                      {item.title}
                    </p>
                    <p className="text-sm text-muted-foreground/70 leading-relaxed max-w-sm">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}

              {/* Row 2: narrow (col-span-1) + wide (col-span-2) */}
              {[bentoItems[2], bentoItems[3]].map((item) => (
                <motion.div
                  key={item.title}
                  variants={fadeUp}
                  className={`bento-card p-10 flex flex-col justify-between min-h-[220px] ${
                    item.wide ? "md:col-span-2" : "md:col-span-1"
                  }`}
                >
                  <div>
                    <p className="text-5xl font-black tracking-tight text-foreground mb-3 leading-none">
                      {item.metric}
                    </p>
                    <p className="text-xs font-bold tracking-[0.3em] uppercase text-muted-foreground mb-4">
                      {item.title}
                    </p>
                    <p className="text-sm text-muted-foreground/70 leading-relaxed max-w-sm">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── Dedicated Disciplines ───────────────────────────── */}
      <section
        className="py-28 lg:py-36 px-6"
        style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
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
              Specialized Engineering Roles
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-16"
            >
              Dedicated Disciplines
            </motion.h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {disciplineRoles.map((role, idx) => (
                <motion.button
                  key={role.name}
                  type="button"
                  variants={fadeUp}
                  data-ocid={`home.disciplines.item.${idx + 1}`}
                  onClick={() => handleRoleCardClick(role.name)}
                  className="text-left rounded p-6 cursor-pointer transition-all duration-200 group"
                  style={{
                    background: "#111111",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.border =
                      "1px solid rgba(255,255,255,0.2)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.border =
                      "1px solid rgba(255,255,255,0.06)";
                  }}
                >
                  <div className="mb-3" style={{ color: "#A1A1AA" }}>
                    {role.icon}
                  </div>
                  <p className="text-sm font-bold text-white leading-snug">
                    {role.name}
                  </p>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── Tech Capabilities ────────────────────────────────── */}
      <section
        id="tech-capabilities"
        className="py-28 lg:py-36 px-6"
        style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
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
              Our Technical Depth
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-12"
            >
              Tech Capabilities
            </motion.h2>

            {/* Tab Bar */}
            <motion.div variants={fadeUp} className="flex flex-wrap gap-2 mb-0">
              {techTabs.map((tab) => (
                <button
                  key={tab}
                  type="button"
                  data-ocid="home.tech_capabilities.tab"
                  onClick={() => setActiveTechTab(tab)}
                  className="text-xs tracking-widest uppercase px-5 py-2.5 rounded transition-colors"
                  style={
                    activeTechTab === tab
                      ? {
                          background: "white",
                          color: "black",
                          fontWeight: 700,
                        }
                      : {
                          background: "transparent",
                          color: "#A1A1AA",
                          fontWeight: 500,
                        }
                  }
                  onMouseEnter={(e) => {
                    if (activeTechTab !== tab) {
                      e.currentTarget.style.color = "white";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (activeTechTab !== tab) {
                      e.currentTarget.style.color = "#A1A1AA";
                    }
                  }}
                >
                  {tab}
                </button>
              ))}
            </motion.div>

            {/* Tech Pill Badges */}
            <motion.div
              key={activeTechTab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="flex flex-wrap gap-3 mt-10"
            >
              {techData[activeTechTab].map((tech) => (
                <span
                  key={tech}
                  className="transition-all duration-200 cursor-default"
                  style={{
                    background: "#111111",
                    border: "1px solid #333333",
                    color: "#A1A1AA",
                    padding: "8px 16px",
                    borderRadius: 4,
                    fontSize: 14,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor =
                      "rgba(255,255,255,0.25)";
                    e.currentTarget.style.color = "white";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "#333333";
                    e.currentTarget.style.color = "#A1A1AA";
                  }}
                >
                  {tech}
                </span>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ─── Uncompromising Standards ─────────────────────────── */}
      <section
        className="py-24 lg:py-32 px-6"
        style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
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
              The Exquisitor Standard
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-16"
            >
              Uncompromising Standards.
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {uncompromisedStandards.map((item) => (
                <motion.div
                  key={item.title}
                  variants={fadeUp}
                  className="flex flex-col"
                >
                  <h3 className="text-lg font-bold text-white mb-4 tracking-tight">
                    {item.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "#A1A1AA" }}
                  >
                    {item.body}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
