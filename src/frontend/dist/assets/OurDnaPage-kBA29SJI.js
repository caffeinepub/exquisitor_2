import { c as createLucideIcon, j as jsxRuntimeExports, m as motion } from "./index-CXQjwYJi.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$4 = [
  ["path", { d: "M21.54 15H17a2 2 0 0 0-2 2v4.54", key: "1djwo0" }],
  [
    "path",
    {
      d: "M7 3.34V5a3 3 0 0 0 3 3a2 2 0 0 1 2 2c0 1.1.9 2 2 2a2 2 0 0 0 2-2c0-1.1.9-2 2-2h3.17",
      key: "1tzkfa"
    }
  ],
  ["path", { d: "M11 21.95V18a2 2 0 0 0-2-2a2 2 0 0 1-2-2v-1a2 2 0 0 0-2-2H2.05", key: "14pb5j" }],
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }]
];
const Earth = createLucideIcon("earth", __iconNode$4);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  [
    "path",
    {
      d: "M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z",
      key: "c3ymky"
    }
  ]
];
const Heart = createLucideIcon("heart", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["rect", { width: "18", height: "11", x: "3", y: "11", rx: "2", ry: "2", key: "1w4ew1" }],
  ["path", { d: "M7 11V7a5 5 0 0 1 10 0v4", key: "fwvmzm" }]
];
const Lock = createLucideIcon("lock", __iconNode$2);
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
      d: "M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z",
      key: "r04s7s"
    }
  ]
];
const Star = createLucideIcon("star", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",
      key: "1xq2db"
    }
  ]
];
const Zap = createLucideIcon("zap", __iconNode);
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
const coreValues = [
  {
    icon: Star,
    title: "Uncompromising Excellence",
    description: "We hold every placement to the same standard we would demand for our own organizations. Mediocrity is not a failure mode we entertain."
  },
  {
    icon: Lock,
    title: "Absolute Discretion",
    description: "Our clients and candidates trust us with sensitive transitions. That trust is sacred. We operate with the confidentiality of a law firm."
  },
  {
    icon: Heart,
    title: "Long-Term Relationships",
    description: "We measure success not in placements made, but in relationships sustained. Our clients return because we've earned them."
  },
  {
    icon: Zap,
    title: "Decisive Action",
    description: "The talent market moves in hours, not weeks. We operate with urgency and precision, delivering qualified candidates before opportunities close."
  },
  {
    icon: Earth,
    title: "Global Perspective",
    description: "Outstanding talent recognizes no borders. We source from global networks to find the right fit, regardless of geography."
  }
];
function OurDnaPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-32 lg:py-40 px-6 bg-background border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-[1200px] mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.p,
        {
          initial: { opacity: 0, y: 10 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.5 },
          className: "text-xs tracking-[0.4em] uppercase text-muted-foreground font-semibold mb-5",
          children: "Who We Are"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.h1,
        {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, delay: 0.1 },
          className: "text-5xl sm:text-6xl font-bold tracking-tight text-foreground",
          children: "Our DNA"
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
              className: "text-xs tracking-[0.4em] uppercase text-muted-foreground font-semibold mb-8",
              children: "Mission"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.blockquote,
            {
              variants: fadeUp,
              className: "text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-foreground leading-snug mb-10",
              children: '"To connect exceptional organizations with the technologists who will define their next chapter — with precision, discretion, and an unshakeable commitment to quality."'
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              variants: fadeUp,
              className: "border-t border-border mb-10"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.p,
            {
              variants: fadeUp,
              className: "text-base text-muted-foreground leading-loose max-w-3xl",
              children: "Exquisitor operates on a conviction: that the world's most demanding technology organisations deserve access to The Top 5% of Indian Engineering Talent — rigorously vetted, culturally aligned, and committed to Western enterprise standards. We treat every placement as art. Every individual in our network has earned their place through an evaluation that measures not just technical depth, but judgment, leadership potential, and cultural adaptability."
            }
          )
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
              children: "Core Values"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.h2,
            {
              variants: fadeUp,
              className: "text-4xl font-bold tracking-tight text-foreground mb-16",
              children: "The Principles That Guide Us"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-6", children: coreValues.map((value, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              variants: fadeUp,
              className: "flex gap-6 luxury-card p-8 rounded group",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-3 rounded bg-foreground/8 text-foreground group-hover:bg-foreground/12 transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx(value.icon, { className: "h-5 w-5" }) }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-foreground/20 font-mono", children: [
                      "0",
                      i + 1
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-bold tracking-wider uppercase text-foreground", children: value.title })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed", children: value.description })
                ] })
              ]
            },
            value.title
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
        className: "grid md:grid-cols-2 gap-16 items-start",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.p,
              {
                variants: fadeUp,
                className: "text-xs tracking-[0.4em] uppercase text-muted-foreground font-semibold mb-5",
                children: "Origin"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.h2,
              {
                variants: fadeUp,
                className: "text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-8",
                children: "Built With Purpose"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                variants: fadeUp,
                className: "space-y-5 text-muted-foreground text-sm leading-loose",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Exquisitor was engineered to solve a singular, high-stakes problem: bridging the gap between high-demand Western enterprises and the absolute top-tier of India's engineering sector. We bypass the noise of standard outsourcing to provide a rigorously vetted, zero-risk talent pipeline." })
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.p,
              {
                variants: fadeUp,
                className: "text-xs tracking-[0.4em] uppercase text-muted-foreground font-semibold mb-5",
                children: "Philosophy"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.h2,
              {
                variants: fadeUp,
                className: "text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-8",
                children: "Team as Competitive Advantage"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                variants: fadeUp,
                className: "space-y-5 text-muted-foreground text-sm leading-loose",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "We operate on a conviction that a single exceptional hire changes the trajectory of a team — and a single ill-suited one can unravel years of culture-building." }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Our process is rigorous because the stakes are real. We ask harder questions, investigate more thoroughly, and take longer to recommend a candidate than any competitor — because our reputation depends on every single placement, not just the aggregate." })
                ]
              }
            )
          ] })
        ]
      }
    ) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        "data-ocid": "dna.founder_section",
        className: "py-24 lg:py-32 px-6 bg-background border-t border-[#333333]",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-[1200px] mx-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: "hidden",
            whileInView: "visible",
            viewport: { once: true, margin: "-60px" },
            variants: stagger,
            className: "flex justify-center",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col justify-center max-w-[600px]", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.p,
                {
                  variants: fadeUp,
                  className: "text-xs tracking-[0.4em] uppercase text-muted-foreground font-semibold mb-8",
                  children: "The Architect of the Standard"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.p,
                {
                  variants: fadeUp,
                  className: "max-w-[480px] text-sm text-muted-foreground leading-loose",
                  children: `"Exquisitor was born from a singular obsession: the pursuit of the 1%. I founded this firm on the principle that technical brilliance and radical discipline are not mutually exclusive. My goal is simple—to build the world's most precise bridge between elite talent and global ambition. We don't just find engineers; we curate the fuel for the next generation of tech."`
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.div,
                {
                  variants: fadeUp,
                  className: "mt-10 text-right max-w-[480px]",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "p",
                      {
                        className: "font-serif italic text-lg tracking-tight",
                        style: { color: "#A1A1AA" },
                        children: "Shlok Chaurasia"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "p",
                      {
                        className: "text-xs tracking-widest uppercase mt-1 font-sans not-italic",
                        style: { color: "#555555" },
                        children: "Founder, Exquisitor"
                      }
                    )
                  ]
                }
              )
            ] })
          }
        ) })
      }
    )
  ] });
}
export {
  OurDnaPage as default
};
