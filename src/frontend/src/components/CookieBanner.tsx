import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";

const STORAGE_KEY = "exquisitor_cookie_consent";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      setVisible(true);
    }
  }, []);

  const dismiss = (choice: "accepted" | "declined") => {
    localStorage.setItem(STORAGE_KEY, choice);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: "24px",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 9999,
        width: "min(92vw, 680px)",
        background: "rgba(10, 10, 12, 0.82)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: "12px",
        padding: "18px 24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "20px",
        boxShadow: "0 8px 40px rgba(0,0,0,0.6)",
        flexWrap: "wrap",
      }}
    >
      <p
        style={{
          margin: 0,
          fontSize: "13px",
          lineHeight: "1.6",
          color: "#a0a0a0",
          flex: "1 1 260px",
        }}
      >
        We use cookies to ensure you get the best experience on our website.{" "}
        <Link
          to="/cookie-policy"
          style={{
            color: "rgba(255,255,255,0.6)",
            textDecoration: "underline",
            textUnderlineOffset: "3px",
            whiteSpace: "nowrap",
          }}
        >
          Cookie Policy
        </Link>
      </p>

      <div style={{ display: "flex", gap: "10px", flexShrink: 0 }}>
        {/* Decline */}
        <button
          type="button"
          onClick={() => dismiss("declined")}
          style={{
            background: "transparent",
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: "6px",
            padding: "7px 16px",
            fontSize: "12px",
            fontWeight: 500,
            letterSpacing: "0.04em",
            color: "#666",
            cursor: "pointer",
            transition: "border-color 0.2s, color 0.2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.25)";
            e.currentTarget.style.color = "#a0a0a0";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
            e.currentTarget.style.color = "#666";
          }}
        >
          Decline
        </button>

        {/* Accept */}
        <button
          type="button"
          onClick={() => dismiss("accepted")}
          style={{
            background: "rgba(255,255,255,0.92)",
            border: "1px solid transparent",
            borderRadius: "6px",
            padding: "7px 18px",
            fontSize: "12px",
            fontWeight: 600,
            letterSpacing: "0.04em",
            color: "#050505",
            cursor: "pointer",
            transition: "background 0.2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#fff";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(255,255,255,0.92)";
          }}
        >
          Accept
        </button>
      </div>
    </div>
  );
}
