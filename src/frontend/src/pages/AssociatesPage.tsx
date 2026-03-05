import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  CheckCircle,
  CheckCircle2,
  Clock,
  Loader2,
  UploadCloud,
  UserRound,
  X,
} from "lucide-react";
import { type Variants, motion } from "motion/react";
import { useCallback, useState } from "react";
import { toast } from "sonner";
import { useGetAssociates } from "../hooks/useQueries";
import { supabase } from "../lib/supabaseClient";

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
const inputStyle = { border: "1px solid rgba(255,255,255,0.08)" };
const labelClass =
  "block text-[10px] tracking-[0.35em] uppercase font-semibold mb-2.5";

function AvailabilityBadge({ availability }: { availability: string }) {
  const isAvailable =
    availability.toLowerCase().includes("available") ||
    availability.toLowerCase() === "immediate" ||
    availability.toLowerCase() === "open";

  return (
    <Badge
      className={`text-[10px] tracking-wider uppercase border-0 gap-1 ${
        isAvailable
          ? "bg-emerald-500/15 text-emerald-400"
          : "bg-amber-500/15 text-amber-400"
      }`}
    >
      {isAvailable ? (
        <CheckCircle2 className="h-2.5 w-2.5" />
      ) : (
        <Clock className="h-2.5 w-2.5" />
      )}
      {availability}
    </Badge>
  );
}

function formatFileSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function AssociateApplicationForm() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    techStackOrRole: "",
    yearsOfExperience: "",
  });
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isDragOver, setIsDragOver] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileSelect = useCallback((file: File) => {
    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    if (!allowedTypes.includes(file.type)) {
      toast.error("Please upload a PDF, DOC, or DOCX file.");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      toast.error("File size must be under 10MB.");
      return;
    }
    setCvFile(file);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragOver(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFileSelect(file);
    },
    [handleFileSelect],
  );

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => setIsDragOver(false);

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFileSelect(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.yearsOfExperience) {
      toast.error("Please select years of experience.");
      return;
    }
    if (!cvFile) {
      toast.error("Please upload your CV/Resume.");
      return;
    }

    setIsSubmitting(true);
    setUploadProgress(10);

    try {
      let cvUrl = "";

      if (supabase) {
        // Upload CV to Supabase Storage bucket "resumes"
        const fileExt = cvFile.name.split(".").pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${fileExt}`;

        setUploadProgress(30);

        const { error: uploadError } = await supabase.storage
          .from("resumes")
          .upload(fileName, cvFile, {
            cacheControl: "3600",
            upsert: false,
            contentType: cvFile.type,
          });

        if (uploadError) throw uploadError;

        setUploadProgress(70);

        // Get the public URL
        const { data: urlData } = supabase.storage
          .from("resumes")
          .getPublicUrl(fileName);

        cvUrl = urlData.publicUrl;

        setUploadProgress(85);

        // Insert into associate_applications table
        const { error: insertError } = await supabase
          .from("associate_applications")
          .insert({
            full_name: form.fullName,
            email: form.email,
            role: form.techStackOrRole,
            years_experience: form.yearsOfExperience,
            cv_url: cvUrl,
          });

        if (insertError) throw insertError;
      } else {
        // Supabase not configured
        console.warn(
          "[Supabase] Not configured — application submission skipped.",
        );
      }

      setUploadProgress(100);
      setSubmitted(true);
    } catch {
      toast.error("Submission failed. Please try again.");
    } finally {
      setIsSubmitting(false);
      setUploadProgress(0);
    }
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.45 }}
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
          Application Received
        </h3>
        <p className="text-sm leading-relaxed" style={{ color: "#A1A1AA" }}>
          Your application has been submitted. Our talent team will review your
          profile and reach out if you meet our standards — typically within 3
          business days.
        </p>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded p-10 space-y-8"
      style={{
        background: "#111111",
        border: "1px solid rgba(255,255,255,0.1)",
      }}
    >
      {/* Full Name */}
      <div>
        <label
          htmlFor="aa-fullName"
          className={labelClass}
          style={{ color: "rgba(255,255,255,0.4)" }}
        >
          Full Name *
        </label>
        <input
          id="aa-fullName"
          name="fullName"
          type="text"
          required
          value={form.fullName}
          onChange={handleChange}
          placeholder="Alexandra Chen"
          className={inputClass}
          style={inputStyle}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)";
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
          }}
        />
      </div>

      {/* Email */}
      <div>
        <label
          htmlFor="aa-email"
          className={labelClass}
          style={{ color: "rgba(255,255,255,0.4)" }}
        >
          Email Address *
        </label>
        <input
          id="aa-email"
          name="email"
          type="email"
          required
          value={form.email}
          onChange={handleChange}
          placeholder="a.chen@email.com"
          className={inputClass}
          style={inputStyle}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)";
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
          }}
        />
      </div>

      {/* Tech Stack / Role */}
      <div>
        <label
          htmlFor="aa-techStack"
          className={labelClass}
          style={{ color: "rgba(255,255,255,0.4)" }}
        >
          Primary Tech Stack / Current Role *
        </label>
        <input
          id="aa-techStack"
          name="techStackOrRole"
          type="text"
          required
          value={form.techStackOrRole}
          onChange={handleChange}
          placeholder="Senior React Engineer / AWS Solutions Architect"
          className={inputClass}
          style={inputStyle}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)";
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
          }}
        />
      </div>

      {/* Years of Experience */}
      <div>
        <label
          htmlFor="aa-experience"
          className={labelClass}
          style={{ color: "rgba(255,255,255,0.4)" }}
        >
          Years of Experience *
        </label>
        <select
          id="aa-experience"
          name="yearsOfExperience"
          required
          value={form.yearsOfExperience}
          onChange={handleChange}
          className="w-full h-14 px-4 text-sm rounded outline-none transition-all duration-200 appearance-none cursor-pointer"
          style={{
            background: "#0a0a0a",
            border: "1px solid rgba(255,255,255,0.08)",
            color: form.yearsOfExperience ? "white" : "rgba(255,255,255,0.25)",
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
            Select experience range
          </option>
          <option
            value="1-3 years"
            style={{ background: "#111111", color: "white" }}
          >
            1–3 years
          </option>
          <option
            value="3-5 years"
            style={{ background: "#111111", color: "white" }}
          >
            3–5 years
          </option>
          <option
            value="5-10 years"
            style={{ background: "#111111", color: "white" }}
          >
            5–10 years
          </option>
          <option
            value="10+ years"
            style={{ background: "#111111", color: "white" }}
          >
            10+ years
          </option>
        </select>
      </div>

      {/* CV Upload */}
      <div>
        <label
          htmlFor="cv-upload"
          className={labelClass}
          style={{ color: "rgba(255,255,255,0.4)" }}
        >
          CV / Resume *
        </label>
        {cvFile ? (
          <div
            className="flex items-center justify-between rounded p-4"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.12)",
            }}
          >
            <div className="flex items-center gap-3 min-w-0">
              <div
                className="p-2 rounded flex-shrink-0"
                style={{ background: "rgba(255,255,255,0.06)" }}
              >
                <UploadCloud className="h-4 w-4 text-white/60" />
              </div>
              <div className="min-w-0">
                <p className="text-sm text-white font-medium truncate">
                  {cvFile.name}
                </p>
                <p className="text-xs" style={{ color: "#A1A1AA" }}>
                  {formatFileSize(cvFile.size)}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setCvFile(null)}
              className="p-1.5 rounded transition-colors flex-shrink-0 ml-3"
              style={{ color: "rgba(255,255,255,0.4)" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "white";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "rgba(255,255,255,0.4)";
              }}
              aria-label="Remove file"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <div
            className="relative rounded cursor-pointer transition-all duration-200"
            style={{
              border: `2px dashed ${isDragOver ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.15)"}`,
              background: isDragOver ? "rgba(255,255,255,0.03)" : "transparent",
            }}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
          >
            <label
              htmlFor="cv-upload"
              className="flex flex-col items-center justify-center p-12 text-center cursor-pointer"
            >
              <UploadCloud
                className="h-8 w-8 mb-4 transition-colors"
                style={{
                  color: isDragOver ? "white" : "rgba(255,255,255,0.3)",
                }}
              />
              <p className="text-base font-medium text-white mb-1.5">
                Drop your CV here
              </p>
              <p className="text-xs" style={{ color: "#A1A1AA" }}>
                PDF, DOC, DOCX up to 10MB
              </p>
              <p
                className="text-xs mt-2"
                style={{ color: "rgba(255,255,255,0.25)" }}
              >
                or click to browse
              </p>
            </label>
            <input
              id="cv-upload"
              type="file"
              accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              onChange={handleFileInputChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              aria-label="Upload CV"
            />
          </div>
        )}
      </div>

      {/* Upload progress */}
      {isSubmitting && uploadProgress > 0 && uploadProgress < 100 && (
        <div className="space-y-2">
          <div
            className="flex justify-between text-xs"
            style={{ color: "#A1A1AA" }}
          >
            <span>Uploading CV...</span>
            <span>{uploadProgress}%</span>
          </div>
          <div
            className="h-0.5 rounded-full overflow-hidden"
            style={{ background: "rgba(255,255,255,0.08)" }}
          >
            <div
              className="h-full bg-white rounded-full transition-all duration-300"
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full h-14 font-semibold tracking-widest uppercase text-xs rounded transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-60"
        style={{
          border: "1px solid white",
          color: "white",
          background: "transparent",
        }}
        onMouseEnter={(e) => {
          if (!isSubmitting) {
            e.currentTarget.style.background = "white";
            e.currentTarget.style.color = "black";
          }
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "transparent";
          e.currentTarget.style.color = "white";
        }}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Submitting...
          </>
        ) : (
          "Apply for the Bench"
        )}
      </button>
    </form>
  );
}

export default function AssociatesPage() {
  const { data: associates, isLoading } = useGetAssociates();

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
            The Roster
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl sm:text-6xl font-bold tracking-tight text-white"
          >
            Our Associates
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-lg max-w-xl leading-relaxed"
            style={{ color: "#A1A1AA" }}
          >
            A curated collective of technologists, architects, and executives
            who have earned distinction in their disciplines.
          </motion.p>
        </div>
      </section>

      {/* Associates Grid */}
      <section className="py-24 lg:py-32 px-6">
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
                  <div className="flex gap-3">
                    <Skeleton className="h-12 w-12 rounded-full animate-shimmer" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-4 w-2/3 animate-shimmer" />
                      <Skeleton className="h-3 w-1/2 animate-shimmer" />
                    </div>
                  </div>
                  <Skeleton className="h-16 w-full animate-shimmer" />
                  <div className="flex gap-2">
                    <Skeleton className="h-5 w-16 animate-shimmer" />
                    <Skeleton className="h-5 w-20 animate-shimmer" />
                  </div>
                </div>
              ))}
            </div>
          ) : !associates || associates.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-24"
            >
              <div
                className="inline-flex p-5 rounded-full mb-6"
                style={{
                  background: "#111111",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <UserRound className="h-8 w-8" style={{ color: "#A1A1AA" }} />
              </div>
              <p className="text-xl" style={{ color: "#A1A1AA" }}>
                Our associate roster is curated — contact us to learn more.
              </p>
            </motion.div>
          ) : (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={stagger}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {associates.map((associate) => (
                <motion.div
                  key={associate.id.toString()}
                  variants={fadeUp}
                  className="luxury-card p-8 rounded group flex flex-col"
                >
                  {/* Header */}
                  <div className="flex items-start gap-4 mb-5">
                    <div
                      className="h-12 w-12 rounded-full flex items-center justify-center font-bold text-base text-white flex-shrink-0"
                      style={{
                        background: "rgba(255,255,255,0.06)",
                        border: "1px solid rgba(255,255,255,0.1)",
                      }}
                    >
                      {associate.name.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-white truncate">
                        {associate.name}
                      </h3>
                      <p
                        className="text-xs truncate mt-0.5"
                        style={{ color: "#A1A1AA" }}
                      >
                        {associate.role}
                      </p>
                    </div>
                  </div>

                  {/* Availability */}
                  <div className="mb-5">
                    <AvailabilityBadge availability={associate.availability} />
                  </div>

                  {/* Bio */}
                  <p
                    className="text-sm leading-relaxed mb-6 flex-1 line-clamp-3"
                    style={{ color: "#A1A1AA" }}
                  >
                    {associate.bio}
                  </p>

                  {/* Skills */}
                  {associate.skills.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-auto">
                      {associate.skills.slice(0, 5).map((skill) => (
                        <span
                          key={skill}
                          className="text-[10px] px-2 py-0.5 rounded-full"
                          style={{
                            background: "rgba(255,255,255,0.05)",
                            color: "#A1A1AA",
                            border: "1px solid rgba(255,255,255,0.08)",
                          }}
                        >
                          {skill}
                        </span>
                      ))}
                      {associate.skills.length > 5 && (
                        <span
                          className="text-[10px] px-2 py-0.5 rounded-full"
                          style={{
                            background: "rgba(255,255,255,0.05)",
                            color: "#A1A1AA",
                            border: "1px solid rgba(255,255,255,0.08)",
                          }}
                        >
                          +{associate.skills.length - 5}
                        </span>
                      )}
                    </div>
                  )}
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* Associate Application Form */}
      <section
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
                Join the Bench
              </p>
              <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-6">
                Apply to Exquisitor
              </h2>
              <p
                className="text-lg leading-relaxed mb-10"
                style={{ color: "#A1A1AA" }}
              >
                We only place the top 5% of engineering talent. If you meet our
                standards, we want to hear from you.
              </p>

              {/* Requirements */}
              <div className="space-y-4">
                {[
                  "Minimum 3 years of professional experience",
                  "Strong portfolio of delivered projects",
                  "Excellent communication & remote discipline",
                  "Willingness to integrate with client teams",
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
              <AssociateApplicationForm />
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
