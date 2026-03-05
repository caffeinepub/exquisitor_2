import { Globe2, Heart, Lock, Star, Zap } from "lucide-react";
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

const coreValues = [
  {
    icon: Star,
    title: "Uncompromising Excellence",
    description:
      "We hold every placement to the same standard we would demand for our own organizations. Mediocrity is not a failure mode we entertain.",
  },
  {
    icon: Lock,
    title: "Absolute Discretion",
    description:
      "Our clients and candidates trust us with sensitive transitions. That trust is sacred. We operate with the confidentiality of a law firm.",
  },
  {
    icon: Heart,
    title: "Long-Term Relationships",
    description:
      "We measure success not in placements made, but in relationships sustained. Our clients return because we've earned them.",
  },
  {
    icon: Zap,
    title: "Decisive Action",
    description:
      "The talent market moves in hours, not weeks. We operate with urgency and precision, delivering qualified candidates before opportunities close.",
  },
  {
    icon: Globe2,
    title: "Global Perspective",
    description:
      "Outstanding talent recognizes no borders. We source from global networks to find the right fit, regardless of geography.",
  },
];

export default function OurDnaPage() {
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
            Who We Are
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl sm:text-6xl font-bold tracking-tight text-foreground"
          >
            Our DNA
          </motion.h1>
        </div>
      </section>

      {/* Mission */}
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
              className="text-xs tracking-[0.4em] uppercase text-muted-foreground font-semibold mb-8"
            >
              Mission
            </motion.p>
            <motion.blockquote
              variants={fadeUp}
              className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-foreground leading-snug mb-10"
            >
              "To connect exceptional organizations with the technologists who
              will define their next chapter — with precision, discretion, and
              an unshakeable commitment to quality."
            </motion.blockquote>
            <motion.div
              variants={fadeUp}
              className="border-t border-border mb-10"
            />
            <motion.p
              variants={fadeUp}
              className="text-base text-muted-foreground leading-loose max-w-3xl"
            >
              Exquisitor operates on a conviction: that the world's most
              demanding technology organisations deserve access to The Top 5% of
              Indian Engineering Talent — rigorously vetted, culturally aligned,
              and committed to Western enterprise standards. We treat every
              placement as art. Every individual in our network has earned their
              place through an evaluation that measures not just technical
              depth, but judgment, leadership potential, and cultural
              adaptability.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Core Values */}
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
              Core Values
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="text-4xl font-bold tracking-tight text-foreground mb-16"
            >
              The Principles That Guide Us
            </motion.h2>

            <div className="space-y-6">
              {coreValues.map((value, i) => (
                <motion.div
                  key={value.title}
                  variants={fadeUp}
                  className="flex gap-6 luxury-card p-8 rounded group"
                >
                  <div className="shrink-0">
                    <div className="p-3 rounded bg-foreground/8 text-foreground group-hover:bg-foreground/12 transition-colors">
                      <value.icon className="h-5 w-5" />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-xs text-foreground/20 font-mono">
                        0{i + 1}
                      </span>
                      <h3 className="text-sm font-bold tracking-wider uppercase text-foreground">
                        {value.title}
                      </h3>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Origin Story */}
      <section className="py-24 lg:py-32 px-6 bg-background">
        <div className="max-w-[1200px] mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
            className="grid md:grid-cols-2 gap-16 items-start"
          >
            <div>
              <motion.p
                variants={fadeUp}
                className="text-xs tracking-[0.4em] uppercase text-muted-foreground font-semibold mb-5"
              >
                Origin
              </motion.p>
              <motion.h2
                variants={fadeUp}
                className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-8"
              >
                Built With Purpose
              </motion.h2>
              <motion.div
                variants={fadeUp}
                className="space-y-5 text-muted-foreground text-sm leading-loose"
              >
                <p>
                  Exquisitor was engineered to solve a singular, high-stakes
                  problem: bridging the gap between high-demand Western
                  enterprises and the absolute top-tier of India's engineering
                  sector. We bypass the noise of standard outsourcing to provide
                  a rigorously vetted, zero-risk talent pipeline.
                </p>
              </motion.div>
            </div>

            <div>
              <motion.p
                variants={fadeUp}
                className="text-xs tracking-[0.4em] uppercase text-muted-foreground font-semibold mb-5"
              >
                Philosophy
              </motion.p>
              <motion.h2
                variants={fadeUp}
                className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-8"
              >
                Team as Competitive Advantage
              </motion.h2>
              <motion.div
                variants={fadeUp}
                className="space-y-5 text-muted-foreground text-sm leading-loose"
              >
                <p>
                  We operate on a conviction that a single exceptional hire
                  changes the trajectory of a team — and a single ill-suited one
                  can unravel years of culture-building.
                </p>
                <p>
                  Our process is rigorous because the stakes are real. We ask
                  harder questions, investigate more thoroughly, and take longer
                  to recommend a candidate than any competitor — because our
                  reputation depends on every single placement, not just the
                  aggregate.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
