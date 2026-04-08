import { Mail, MapPin, Phone, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect } from "react";

interface InquiryDrawerProps {
  open: boolean;
  onClose: () => void;
}

const CALENDLY_DISCOVERY =
  "https://calendly.com/founders-exquisitor/new-meeting";
const CALENDLY_STRATEGY =
  "https://calendly.com/founders-exquisitor/strategic-seesion";

function openCalendly(url: string) {
  if ((window as any).Calendly?.initPopupWidget) {
    (window as any).Calendly.initPopupWidget({ url });
  } else {
    window.open(url, "_blank", "noopener,noreferrer");
  }
}

export default function InquiryDrawer({ open, onClose }: InquiryDrawerProps) {
  // Load Calendly widget assets once on mount
  useEffect(() => {
    const CALENDLY_CSS =
      "https://assets.calendly.com/assets/external/widget.css";
    const CALENDLY_JS = "https://assets.calendly.com/assets/external/widget.js";

    if (!document.querySelector(`link[href="${CALENDLY_CSS}"]`)) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = CALENDLY_CSS;
      document.head.appendChild(link);
    }

    if (!document.querySelector(`script[src="${CALENDLY_JS}"]`)) {
      const script = document.createElement("script");
      script.src = CALENDLY_JS;
      script.async = true;
      document.head.appendChild(script);
    }
  }, []);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 280 }}
            className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-md flex flex-col"
            style={{
              background: "#050505",
              borderLeft: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            {/* Header */}
            <div
              className="flex items-start justify-between p-8"
              style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
            >
              <div>
                <p className="text-[10px] tracking-[0.4em] uppercase text-white/30 font-semibold mb-2">
                  Contact &amp; Inquiries
                </p>
                <h2 className="text-xl font-bold tracking-tight text-white">
                  Get in Touch
                </h2>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="p-2 text-white/40 hover:text-white transition-colors rounded"
                aria-label="Close drawer"
                data-ocid="drawer.close_button"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Scrollable Body */}
            <div className="flex-1 overflow-y-auto p-8">
              {/* ── Section 1: Direct Contact Directory ───────── */}
              <div className="space-y-8">
                <p className="text-[10px] tracking-[0.4em] uppercase text-white/30 font-semibold mb-6">
                  Direct Contact
                </p>

                {/* HQ Address */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-3.5 w-3.5 text-white/30" />
                    <span className="text-[10px] tracking-[0.35em] uppercase text-white/30 font-semibold">
                      Global HQ
                    </span>
                  </div>
                  <address className="not-italic text-base font-medium text-white leading-snug space-y-0.5">
                    <p className="font-semibold">Exquisitor</p>
                    <p>Office 933, 60 Tottenham Court Road</p>
                    <p>Fitzrovia, London, W1T 2EW</p>
                    <p>United Kingdom</p>
                  </address>
                  {/* Google Maps iframe — only rendered when drawer is open to avoid blocking initial paint */}
                  {open && (
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2482.3485!2d-0.136439!3d51.520837!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48761b2e0e3f71cd%3A0x9cf8b0e38b4e8cb0!2s60%20Tottenham%20Court%20Rd%2C%20London%20W1T%202EW!5e0!3m2!1sen!2suk!4v1700000000000"
                      width="100%"
                      height="160"
                      style={{
                        border: 0,
                        borderRadius: 4,
                        marginTop: 12,
                        filter:
                          "grayscale(100%) invert(90%) contrast(85%) brightness(0.4)",
                        display: "block",
                      }}
                      allowFullScreen={false}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Exquisitor HQ"
                    />
                  )}
                </div>

                {/* Phone */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Phone className="h-3.5 w-3.5 text-white/30" />
                    <span className="text-[10px] tracking-[0.35em] uppercase text-white/30 font-semibold">
                      Phone
                    </span>
                  </div>
                  <a
                    href="tel:+447348952735"
                    data-ocid="drawer.phone.button"
                    className="block text-lg font-medium text-white hover:text-white/70 transition-colors group"
                  >
                    +44 7348 952735
                    <span className="inline-block ml-1.5 opacity-0 group-hover:opacity-60 transition-opacity text-sm">
                      →
                    </span>
                  </a>
                </div>

                {/* WhatsApp */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] tracking-[0.35em] uppercase text-white/30 font-semibold">
                      WhatsApp
                    </span>
                  </div>
                  <a
                    href="https://wa.me/447348952735"
                    target="_blank"
                    rel="noopener noreferrer"
                    data-ocid="drawer.whatsapp.button"
                    className="inline-flex items-center gap-2.5 px-5 h-12 rounded text-sm font-semibold text-white transition-colors hover:bg-[#064e3b]/30"
                    style={{
                      border: "1px solid #064e3b",
                      background: "transparent",
                    }}
                  >
                    {/* WhatsApp SVG icon */}
                    <svg
                      viewBox="0 0 24 24"
                      className="h-4 w-4 fill-current"
                      aria-hidden="true"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                    </svg>
                    Chat on WhatsApp
                  </a>
                </div>
              </div>

              {/* ── 64px Gap ───────────────────────────────────── */}
              <div style={{ height: 64 }} />

              {/* ── Section: Schedule a Call ─────────────────── */}
              <div>
                <p className="text-[10px] tracking-[0.4em] uppercase text-white/30 font-semibold mb-6">
                  Schedule a Call
                </p>
                <p className="text-sm text-white/40 leading-relaxed mb-8">
                  Book a dedicated session with our founders.
                </p>
                <div className="flex flex-col gap-4">
                  <button
                    type="button"
                    data-ocid="drawer.book_discovery.button"
                    className="w-full h-12 rounded text-sm font-semibold tracking-wide text-white transition-colors hover:bg-white/5"
                    style={{
                      border: "1px solid rgba(255,255,255,0.15)",
                      background: "transparent",
                    }}
                    onClick={() => openCalendly(CALENDLY_DISCOVERY)}
                  >
                    Book 15-Min Discovery Briefing
                  </button>
                  <button
                    type="button"
                    data-ocid="drawer.book_strategy.button"
                    className="w-full h-12 rounded text-sm font-semibold tracking-wide text-white transition-colors hover:bg-white/5"
                    style={{
                      border: "1px solid rgba(255,255,255,0.15)",
                      background: "transparent",
                    }}
                    onClick={() => openCalendly(CALENDLY_STRATEGY)}
                  >
                    Book 50-Min Architecture Strategy
                  </button>
                </div>
              </div>

              {/* ── Divider ──── */}
              <div
                style={{
                  height: "1px",
                  background: "rgba(255,255,255,0.06)",
                  margin: "40px 0",
                }}
              />

              {/* ── Section 2: Existing Contact Info ──────────── */}
              <div className="space-y-10">
                {/* Email */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Mail className="h-3.5 w-3.5 text-white/30" />
                    <span className="text-[10px] tracking-[0.35em] uppercase text-white/30 font-semibold">
                      Email
                    </span>
                  </div>
                  <a
                    href="mailto:founders@exquisitor.tech"
                    className="block text-lg font-medium text-white hover:text-white/70 transition-colors group"
                  >
                    founders@exquisitor.tech
                    <span className="inline-block ml-1.5 opacity-0 group-hover:opacity-60 transition-opacity text-sm">
                      →
                    </span>
                  </a>
                  <p className="text-sm text-white/40 leading-relaxed">
                    We respond to all inquiries within one business day.
                  </p>
                </div>

                {/* Divider */}
                <div
                  style={{
                    height: "1px",
                    background: "rgba(255,255,255,0.06)",
                  }}
                />

                {/* Global Presence */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-3.5 w-3.5 text-white/30" />
                    <span className="text-[10px] tracking-[0.35em] uppercase text-white/30 font-semibold">
                      Global Presence
                    </span>
                  </div>
                  <p className="text-lg font-medium text-white">
                    Serving the UK, USA, Australia, and the EU.
                  </p>
                  <p className="text-sm text-white/40 leading-relaxed">
                    Elite engineering talent placed across four markets,
                    timezone-aligned for your team.
                  </p>
                </div>
              </div>
            </div>

            {/* Footer CTA */}
            <div
              className="p-8"
              style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
            >
              <a
                href="mailto:founders@exquisitor.tech"
                className="flex items-center justify-center w-full h-14 bg-white text-black font-bold tracking-widest uppercase text-xs hover:bg-white/90 transition-colors rounded"
              >
                Send an Email
              </a>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
