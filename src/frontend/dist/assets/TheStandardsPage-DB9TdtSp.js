import { c as createLucideIcon, j as jsxRuntimeExports, m as motion } from "./index-CXQjwYJi.js";
import { a as Clock, C as CircleCheck } from "./clock-DWWw-y16.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526",
      key: "1yiouv"
    }
  ],
  ["circle", { cx: "12", cy: "8", r: "6", key: "1vp47v" }]
];
const Award = createLucideIcon("award", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M3 3v16a2 2 0 0 0 2 2h16", key: "c24i48" }],
  ["path", { d: "M18 17V9", key: "2bz60n" }],
  ["path", { d: "M13 17V5", key: "1frdt8" }],
  ["path", { d: "M8 17v-3", key: "17ska0" }]
];
const ChartColumn = createLucideIcon("chart-column", __iconNode);
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } }
};
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }
  }
};
const vettingSteps = [
  {
    step: "01",
    title: "Initial Screening",
    duration: "Day 1",
    description: "A 60-minute structured conversation with a senior Exquisitor partner. We evaluate communication clarity, career trajectory, and initial technical breadth."
  },
  {
    step: "02",
    title: "Technical Depth Assessment",
    duration: "Days 2–4",
    description: "Domain-specific evaluation conducted by active practitioners. Covers architectural judgment, problem-solving approach, and knowledge currency."
  },
  {
    step: "03",
    title: "Reference Investigation",
    duration: "Days 4–6",
    description: "We speak directly with former managers, peers, and reports — not just provided references. We probe for leadership in adversity, conflict resolution, and growth trajectory."
  },
  {
    step: "04",
    title: "Background & Credential Verification",
    duration: "Days 5–7",
    description: "Independent verification of education, certifications, employment history, and where applicable, professional standing."
  },
  {
    step: "05",
    title: "Cultural & Judgment Evaluation",
    duration: "Day 7",
    description: "A situational judgment interview that assesses alignment with organizational values, decision-making under ambiguity, and leadership philosophy."
  },
  {
    step: "06",
    title: "Partner Sign-Off",
    duration: "Day 8",
    description: "No candidate enters our active roster without unanimous approval from a senior partner panel. Every recommendation carries our institutional guarantee."
  }
];
const guarantees = [
  {
    icon: Clock,
    title: "72-Hour Curation",
    description: "Within 3 days of your inquiry, we deliver 3–5 meticulously vetted, blind candidate profiles from The Top 5% of Indian Engineering Talent, tailored precisely to your tech stack and company culture."
  },
  {
    icon: CircleCheck,
    title: "90-Day Replacement Guarantee",
    description: "If any placed candidate departs within the first 90 days for performance reasons, we provide a replacement at no additional fee."
  },
  {
    icon: Award,
    title: "Quality Score Commitment",
    description: "Every placement is followed up at 30, 60, and 90 days. We maintain a 96% client satisfaction score across all engagements."
  },
  {
    icon: ChartColumn,
    title: "Transparent Reporting",
    description: "Regular engagement updates including pipeline status, candidate feedback, and market intelligence relevant to your search."
  }
];
function TheStandardsPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-32 lg:py-40 px-6 bg-background border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-[1200px] mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.p,
        {
          initial: { opacity: 0, y: 10 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.5 },
          className: "text-xs tracking-[0.4em] uppercase text-muted-foreground font-semibold mb-5",
          children: "Our Process"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.h1,
        {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, delay: 0.1 },
          className: "text-5xl sm:text-6xl font-bold tracking-tight text-foreground",
          children: "The Standards"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.p,
        {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, delay: 0.2 },
          className: "mt-6 text-lg text-muted-foreground max-w-xl leading-relaxed",
          children: "Our vetting methodology is the most rigorous in the industry. Here is exactly what every associate endures before we recommend them to a client."
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-24 lg:py-32 px-6 bg-background", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-[1200px] mx-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: "hidden",
        whileInView: "visible",
        viewport: { once: true, margin: "-60px" },
        variants: stagger,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.p,
            {
              variants: fadeUp,
              className: "text-xs tracking-[0.4em] uppercase text-muted-foreground font-semibold mb-5",
              children: "Vetting Process"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.h2,
            {
              variants: fadeUp,
              className: "text-4xl font-bold tracking-tight text-foreground mb-16",
              children: "Eight-Day Evaluation Protocol"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative space-y-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute left-8 top-0 bottom-0 w-px bg-foreground/10 hidden sm:block" }),
            vettingSteps.map((step, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                variants: fadeUp,
                className: "relative flex gap-6 sm:gap-8 pb-10 last:pb-0",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative flex-shrink-0 w-16 h-16 rounded-full bg-card border border-border flex flex-col items-center justify-center z-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground font-mono", children: step.step }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 pt-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-3 flex-wrap", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-bold tracking-wider uppercase text-foreground", children: step.title }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] tracking-wider uppercase text-muted-foreground bg-foreground/8 px-2 py-0.5 rounded-full", children: step.duration })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed", children: step.description }),
                    i < vettingSteps.length - 1 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 section-divider sm:hidden" })
                  ] })
                ]
              },
              step.step
            ))
          ] })
        ]
      }
    ) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-24 lg:py-32 px-6 bg-card border-y border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-[1200px] mx-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: "hidden",
        whileInView: "visible",
        viewport: { once: true, margin: "-60px" },
        variants: stagger,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.p,
            {
              variants: fadeUp,
              className: "text-xs tracking-[0.4em] uppercase text-muted-foreground font-semibold mb-5",
              children: "Guarantees"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.h2,
            {
              variants: fadeUp,
              className: "text-4xl font-bold tracking-tight text-foreground mb-16",
              children: "Our Quality Commitments"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-2 gap-6", children: guarantees.map((g) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              variants: fadeUp,
              className: "luxury-card p-8 rounded group",
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-3 rounded bg-foreground/8 text-foreground group-hover:bg-foreground/12 transition-colors shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(g.icon, { className: "h-5 w-5" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-bold tracking-wider uppercase text-foreground mb-3", children: g.title }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed", children: g.description })
                ] })
              ] })
            },
            g.title
          )) })
        ]
      }
    ) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-24 lg:py-32 px-6 bg-background", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-[1200px] mx-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: "hidden",
        whileInView: "visible",
        viewport: { once: true, margin: "-60px" },
        variants: stagger,
        className: "grid md:grid-cols-2 gap-16",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.p,
              {
                variants: fadeUp,
                className: "text-xs tracking-[0.4em] uppercase text-muted-foreground font-semibold mb-5",
                children: "Methodology"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.h2,
              {
                variants: fadeUp,
                className: "text-3xl font-bold tracking-tight text-foreground mb-8",
                children: "How We Work"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.ul,
              {
                variants: fadeUp,
                className: "space-y-5 text-sm text-muted-foreground leading-relaxed",
                children: [
                  "Dedicated partner assigned to every engagement — not a team of junior recruiters",
                  "Weekly written status reports including market feedback and candidate intelligence",
                  "Parallel processing: we never pause a search while awaiting one candidate's outcome",
                  "Closed-loop feedback: every candidate receives a structured debrief regardless of outcome"
                ].map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-4 w-4 text-foreground/60 mt-0.5 shrink-0" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: item })
                ] }, item))
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.p,
              {
                variants: fadeUp,
                className: "text-xs tracking-[0.4em] uppercase text-muted-foreground font-semibold mb-5",
                children: "SLA Commitments"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.h2,
              {
                variants: fadeUp,
                className: "text-3xl font-bold tracking-tight text-foreground mb-8",
                children: "Service Level Agreements"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { variants: fadeUp, className: "space-y-0", children: [
              { label: "Initial Response", value: "< 4 hours" },
              { label: "Candidate Profile Curation", value: "72 hours" },
              {
                label: "Full Deployment Timeline",
                value: "14 days"
              },
              { label: "Weekly Status Reports", value: "Every Friday" },
              {
                label: "Post-Placement Follow-Up",
                value: "30 / 60 / 90 days"
              }
            ].map((sla) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex items-center justify-between gap-4 py-4 border-b border-border last:border-0",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: sla.label }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold text-foreground", children: sla.value })
                ]
              },
              sla.label
            )) })
          ] })
        ]
      }
    ) }) })
  ] });
}
export {
  TheStandardsPage as default
};
