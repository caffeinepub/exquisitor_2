import { c as createLucideIcon, j as jsxRuntimeExports, m as motion, B as Badge, r as reactExports, u as ue, C as CircleCheckBig, X, L as LoaderCircle, s as supabase } from "./index-CXQjwYJi.js";
import { u as useGetAssociates, S as Skeleton, U as UserRound } from "./useQueries-BuXk6vYx.js";
import { C as CircleCheck, a as Clock } from "./clock-DWWw-y16.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M12 13v8", key: "1l5pq0" }],
  ["path", { d: "M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242", key: "1pljnt" }],
  ["path", { d: "m8 17 4-4 4 4", key: "1quai1" }]
];
const CloudUpload = createLucideIcon("cloud-upload", __iconNode);
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } }
};
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.25, 0.1, 0.25, 1] }
  }
};
const inputClass = "w-full h-14 px-4 text-sm text-white rounded bg-[#0a0a0a] outline-none transition-all duration-200 placeholder:text-white/25";
const inputStyle = { border: "1px solid rgba(255,255,255,0.08)" };
const labelClass = "block text-[10px] tracking-[0.35em] uppercase font-semibold mb-2.5";
function AvailabilityBadge({ availability }) {
  const isAvailable = availability.toLowerCase().includes("available") || availability.toLowerCase() === "immediate" || availability.toLowerCase() === "open";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Badge,
    {
      className: `text-[10px] tracking-wider uppercase border-0 gap-1 ${isAvailable ? "bg-emerald-500/15 text-emerald-400" : "bg-amber-500/15 text-amber-400"}`,
      children: [
        isAvailable ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-2.5 w-2.5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-2.5 w-2.5" }),
        availability
      ]
    }
  );
}
function formatFileSize(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
function AssociateApplicationForm() {
  const [form, setForm] = reactExports.useState({
    fullName: "",
    email: "",
    techStackOrRole: "",
    yearsOfExperience: ""
  });
  const [cvFile, setCvFile] = reactExports.useState(null);
  const [uploadProgress, setUploadProgress] = reactExports.useState(0);
  const [isDragOver, setIsDragOver] = reactExports.useState(false);
  const [submitted, setSubmitted] = reactExports.useState(false);
  const [isSubmitting, setIsSubmitting] = reactExports.useState(false);
  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleFileSelect = reactExports.useCallback((file) => {
    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ];
    if (!allowedTypes.includes(file.type)) {
      ue.error("Please upload a PDF, DOC, or DOCX file.");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      ue.error("File size must be under 10MB.");
      return;
    }
    setCvFile(file);
  }, []);
  const handleDrop = reactExports.useCallback(
    (e) => {
      e.preventDefault();
      setIsDragOver(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFileSelect(file);
    },
    [handleFileSelect]
  );
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };
  const handleDragLeave = () => setIsDragOver(false);
  const handleFileInputChange = (e) => {
    var _a;
    const file = (_a = e.target.files) == null ? void 0 : _a[0];
    if (file) handleFileSelect(file);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.yearsOfExperience) {
      ue.error("Please select years of experience.");
      return;
    }
    if (!cvFile) {
      ue.error("Please upload your CV/Resume.");
      return;
    }
    setIsSubmitting(true);
    setUploadProgress(10);
    try {
      let cvUrl = "";
      if (supabase) {
        const fileExt = cvFile.name.split(".").pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${fileExt}`;
        setUploadProgress(30);
        const { error: uploadError } = await supabase.storage.from("resumes").upload(fileName, cvFile, {
          cacheControl: "3600",
          upsert: false,
          contentType: cvFile.type
        });
        if (uploadError) throw uploadError;
        setUploadProgress(70);
        const { data: urlData } = supabase.storage.from("resumes").getPublicUrl(fileName);
        cvUrl = urlData.publicUrl;
        setUploadProgress(85);
        const { error: insertError } = await supabase.from("associate_applications").insert({
          full_name: form.fullName,
          email: form.email,
          role: form.techStackOrRole,
          years_experience: form.yearsOfExperience,
          cv_url: cvUrl
        });
        if (insertError) throw insertError;
      } else {
        console.warn(
          "[Supabase] Not configured — application submission skipped."
        );
      }
      setUploadProgress(100);
      setSubmitted(true);
    } catch {
      ue.error("Submission failed. Please try again.");
    } finally {
      setIsSubmitting(false);
      setUploadProgress(0);
    }
  };
  if (submitted) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, scale: 0.97 },
        animate: { opacity: 1, scale: 1 },
        transition: { duration: 0.45 },
        className: "flex flex-col items-start justify-center h-full py-16 px-10 rounded",
        style: {
          background: "#111111",
          border: "1px solid rgba(255,255,255,0.1)"
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "p-3 rounded mb-6",
              style: { background: "rgba(255,255,255,0.06)" },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "h-6 w-6 text-white" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-bold text-white mb-3 tracking-tight", children: "Application Received" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm leading-relaxed", style: { color: "#A1A1AA" }, children: "Your application has been submitted. Our talent team will review your profile and reach out if you meet our standards — typically within 3 business days." })
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "form",
    {
      onSubmit: handleSubmit,
      className: "rounded p-10 space-y-8",
      style: {
        background: "#111111",
        border: "1px solid rgba(255,255,255,0.1)"
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "label",
            {
              htmlFor: "aa-fullName",
              className: labelClass,
              style: { color: "rgba(255,255,255,0.4)" },
              children: "Full Name *"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              id: "aa-fullName",
              name: "fullName",
              type: "text",
              required: true,
              value: form.fullName,
              onChange: handleChange,
              placeholder: "Alexandra Chen",
              className: inputClass,
              style: inputStyle,
              onFocus: (e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)";
              },
              onBlur: (e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
              }
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "label",
            {
              htmlFor: "aa-email",
              className: labelClass,
              style: { color: "rgba(255,255,255,0.4)" },
              children: "Email Address *"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              id: "aa-email",
              name: "email",
              type: "email",
              required: true,
              value: form.email,
              onChange: handleChange,
              placeholder: "a.chen@email.com",
              className: inputClass,
              style: inputStyle,
              onFocus: (e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)";
              },
              onBlur: (e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
              }
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "label",
            {
              htmlFor: "aa-techStack",
              className: labelClass,
              style: { color: "rgba(255,255,255,0.4)" },
              children: "Primary Tech Stack / Current Role *"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              id: "aa-techStack",
              name: "techStackOrRole",
              type: "text",
              required: true,
              value: form.techStackOrRole,
              onChange: handleChange,
              placeholder: "Senior React Engineer / AWS Solutions Architect",
              className: inputClass,
              style: inputStyle,
              onFocus: (e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)";
              },
              onBlur: (e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
              }
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "label",
            {
              htmlFor: "aa-experience",
              className: labelClass,
              style: { color: "rgba(255,255,255,0.4)" },
              children: "Years of Experience *"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "select",
            {
              id: "aa-experience",
              name: "yearsOfExperience",
              required: true,
              value: form.yearsOfExperience,
              onChange: handleChange,
              className: "w-full h-14 px-4 text-sm rounded outline-none transition-all duration-200 appearance-none cursor-pointer",
              style: {
                background: "#0a0a0a",
                border: "1px solid rgba(255,255,255,0.08)",
                color: form.yearsOfExperience ? "white" : "rgba(255,255,255,0.25)"
              },
              onFocus: (e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)";
              },
              onBlur: (e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "option",
                  {
                    value: "",
                    disabled: true,
                    style: { background: "#111111", color: "rgba(255,255,255,0.4)" },
                    children: "Select experience range"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "option",
                  {
                    value: "1-3 years",
                    style: { background: "#111111", color: "white" },
                    children: "1–3 years"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "option",
                  {
                    value: "3-5 years",
                    style: { background: "#111111", color: "white" },
                    children: "3–5 years"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "option",
                  {
                    value: "5-10 years",
                    style: { background: "#111111", color: "white" },
                    children: "5–10 years"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "option",
                  {
                    value: "10+ years",
                    style: { background: "#111111", color: "white" },
                    children: "10+ years"
                  }
                )
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "label",
            {
              htmlFor: "cv-upload",
              className: labelClass,
              style: { color: "rgba(255,255,255,0.4)" },
              children: "CV / Resume *"
            }
          ),
          cvFile ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex items-center justify-between rounded p-4",
              style: {
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.12)"
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "p-2 rounded flex-shrink-0",
                      style: { background: "rgba(255,255,255,0.06)" },
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(CloudUpload, { className: "h-4 w-4 text-white/60" })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-white font-medium truncate", children: cvFile.name }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs", style: { color: "#A1A1AA" }, children: formatFileSize(cvFile.size) })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => setCvFile(null),
                    className: "p-1.5 rounded transition-colors flex-shrink-0 ml-3",
                    style: { color: "rgba(255,255,255,0.4)" },
                    onMouseEnter: (e) => {
                      e.currentTarget.style.color = "white";
                    },
                    onMouseLeave: (e) => {
                      e.currentTarget.style.color = "rgba(255,255,255,0.4)";
                    },
                    "aria-label": "Remove file",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" })
                  }
                )
              ]
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "relative rounded cursor-pointer transition-all duration-200",
              style: {
                border: `2px dashed ${isDragOver ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.15)"}`,
                background: isDragOver ? "rgba(255,255,255,0.03)" : "transparent"
              },
              onDrop: handleDrop,
              onDragOver: handleDragOver,
              onDragLeave: handleDragLeave,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "label",
                  {
                    htmlFor: "cv-upload",
                    className: "flex flex-col items-center justify-center p-12 text-center cursor-pointer",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        CloudUpload,
                        {
                          className: "h-8 w-8 mb-4 transition-colors",
                          style: {
                            color: isDragOver ? "white" : "rgba(255,255,255,0.3)"
                          }
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base font-medium text-white mb-1.5", children: "Drop your CV here" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs", style: { color: "#A1A1AA" }, children: "PDF, DOC, DOCX up to 10MB" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "p",
                        {
                          className: "text-xs mt-2",
                          style: { color: "rgba(255,255,255,0.25)" },
                          children: "or click to browse"
                        }
                      )
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    id: "cv-upload",
                    type: "file",
                    accept: ".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                    onChange: handleFileInputChange,
                    className: "absolute inset-0 w-full h-full opacity-0 cursor-pointer",
                    "aria-label": "Upload CV"
                  }
                )
              ]
            }
          )
        ] }),
        isSubmitting && uploadProgress > 0 && uploadProgress < 100 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex justify-between text-xs",
              style: { color: "#A1A1AA" },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Uploading CV..." }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                  uploadProgress,
                  "%"
                ] })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "h-0.5 rounded-full overflow-hidden",
              style: { background: "rgba(255,255,255,0.08)" },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "h-full bg-white rounded-full transition-all duration-300",
                  style: { width: `${uploadProgress}%` }
                }
              )
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "submit",
            disabled: isSubmitting,
            className: "w-full h-14 font-semibold tracking-widest uppercase text-xs rounded transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-60",
            style: {
              border: "1px solid white",
              color: "white",
              background: "transparent"
            },
            onMouseEnter: (e) => {
              if (!isSubmitting) {
                e.currentTarget.style.background = "white";
                e.currentTarget.style.color = "black";
              }
            },
            onMouseLeave: (e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "white";
            },
            children: isSubmitting ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }),
              "Submitting..."
            ] }) : "Apply for the Bench"
          }
        )
      ]
    }
  );
}
function AssociatesPage() {
  const { data: associates, isLoading } = useGetAssociates();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "py-32 lg:py-40 px-6",
        style: { borderBottom: "1px solid rgba(255,255,255,0.06)" },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-[1200px] mx-auto", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.p,
            {
              initial: { opacity: 0, y: 10 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.5 },
              className: "text-xs tracking-[0.4em] uppercase font-semibold mb-5",
              style: { color: "#A1A1AA" },
              children: "The Roster"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.h1,
            {
              initial: { opacity: 0, y: 20 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.6, delay: 0.1 },
              className: "text-5xl sm:text-6xl font-bold tracking-tight text-white",
              children: "Our Associates"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.p,
            {
              initial: { opacity: 0, y: 20 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.6, delay: 0.2 },
              className: "mt-6 text-lg max-w-xl leading-relaxed",
              style: { color: "#A1A1AA" },
              children: "A curated collective of technologists, architects, and executives who have earned distinction in their disciplines."
            }
          )
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-24 lg:py-32 px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-[1200px] mx-auto", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6", children: ["a", "b", "c", "d", "e", "f"].map((id) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "rounded p-8 space-y-3",
        style: {
          background: "#111111",
          border: "1px solid rgba(255,255,255,0.08)"
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-12 w-12 rounded-full animate-shimmer" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-2/3 animate-shimmer" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-1/2 animate-shimmer" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-16 w-full animate-shimmer" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-16 animate-shimmer" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-20 animate-shimmer" })
          ] })
        ]
      },
      id
    )) }) : !associates || associates.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        className: "text-center py-24",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "inline-flex p-5 rounded-full mb-6",
              style: {
                background: "#111111",
                border: "1px solid rgba(255,255,255,0.08)"
              },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(UserRound, { className: "h-8 w-8", style: { color: "#A1A1AA" } })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl", style: { color: "#A1A1AA" }, children: "Our associate roster is curated — contact us to learn more." })
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: "hidden",
        animate: "visible",
        variants: stagger,
        className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6",
        children: associates.map((associate) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            variants: fadeUp,
            className: "luxury-card p-8 rounded group flex flex-col",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4 mb-5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "h-12 w-12 rounded-full flex items-center justify-center font-bold text-base text-white flex-shrink-0",
                    style: {
                      background: "rgba(255,255,255,0.06)",
                      border: "1px solid rgba(255,255,255,0.1)"
                    },
                    children: associate.name.charAt(0)
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-white truncate", children: associate.name }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      className: "text-xs truncate mt-0.5",
                      style: { color: "#A1A1AA" },
                      children: associate.role
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AvailabilityBadge, { availability: associate.availability }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: "text-sm leading-relaxed mb-6 flex-1 line-clamp-3",
                  style: { color: "#A1A1AA" },
                  children: associate.bio
                }
              ),
              associate.skills.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-1.5 mt-auto", children: [
                associate.skills.slice(0, 5).map((skill) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "text-[10px] px-2 py-0.5 rounded-full",
                    style: {
                      background: "rgba(255,255,255,0.05)",
                      color: "#A1A1AA",
                      border: "1px solid rgba(255,255,255,0.08)"
                    },
                    children: skill
                  },
                  skill
                )),
                associate.skills.length > 5 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "span",
                  {
                    className: "text-[10px] px-2 py-0.5 rounded-full",
                    style: {
                      background: "rgba(255,255,255,0.05)",
                      color: "#A1A1AA",
                      border: "1px solid rgba(255,255,255,0.08)"
                    },
                    children: [
                      "+",
                      associate.skills.length - 5
                    ]
                  }
                )
              ] })
            ]
          },
          associate.id.toString()
        ))
      }
    ) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "py-32 lg:py-40 px-6",
        style: { borderTop: "1px solid rgba(255,255,255,0.06)" },
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-[1200px] mx-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 24 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              transition: { duration: 0.6 },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "text-xs tracking-[0.4em] uppercase font-semibold mb-5",
                    style: { color: "#A1A1AA" },
                    children: "Join the Bench"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-4xl sm:text-5xl font-bold tracking-tight text-white mb-6", children: "Apply to Exquisitor" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "text-lg leading-relaxed mb-10",
                    style: { color: "#A1A1AA" },
                    children: "We only place the top 5% of engineering talent. If you meet our standards, we want to hear from you."
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: [
                  "Minimum 3 years of professional experience",
                  "Strong portfolio of delivered projects",
                  "Excellent communication & remote discipline",
                  "Willingness to integrate with client teams"
                ].map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "h-1.5 w-1.5 rounded-full flex-shrink-0",
                      style: { background: "rgba(255,255,255,0.35)" }
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", style: { color: "#A1A1AA" }, children: item })
                ] }, item)) })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0, y: 24 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              transition: { duration: 0.6, delay: 0.15 },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(AssociateApplicationForm, {})
            }
          )
        ] }) })
      }
    )
  ] });
}
export {
  AssociatesPage as default
};
