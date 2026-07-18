"use client";

import { useState, useTransition } from "react";
import { accessItems } from "@/lib/data";
import { submitInvestorRequest } from "@/app/actions";

const emptyForm = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  investorType: "",
  range: "",
  heard: "",
};

const labelStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 6,
  fontSize: 11,
  fontWeight: 600,
  letterSpacing: "0.1em",
  color: "#9C9C9C",
};

const inputStyle: React.CSSProperties = {
  background: "#0A0A0A",
  border: "1px solid #2E2E2E",
  borderRadius: 6,
  color: "#F2F2F0",
  fontFamily: "var(--font-inter), Inter, sans-serif",
  fontSize: 14,
  padding: 12,
};

export default function ContactForm() {
  const [f, setF] = useState(emptyForm);
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState("");
  const [isPending, startTransition] = useTransition();

  const set =
    (k: keyof typeof emptyForm) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >
    ) => {
      setF((prev) => ({ ...prev, [k]: e.target.value }));
      setFormError("");
    };

  const submitForm = () => {
    if (!f.firstName.trim() || !f.lastName.trim())
      return setFormError("First and last name are required.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email))
      return setFormError("Please enter a valid email address.");
    if (!f.investorType || !f.range)
      return setFormError("Please select an investor type and investment range.");
    startTransition(async () => {
      const result = await submitInvestorRequest(f);
      if (result.ok) {
        setSubmitted(true);
        setFormError("");
      } else {
        setFormError(result.error);
      }
    });
  };

  const resetForm = () => {
    setSubmitted(false);
    setF(emptyForm);
  };

  return (
    <section id="contact" style={{ background: "#0A0A0A" }}>
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "96px 32px",
          display: "flex",
          flexWrap: "wrap",
          gap: 64,
          alignItems: "flex-start",
        }}
      >
        <div
          data-reveal
          style={{
            flex: "1 1 340px",
            display: "flex",
            flexDirection: "column",
            gap: 20,
            position: "sticky",
            top: 100,
          }}
        >
          <div
            className="font-bebas"
            style={{ color: "#E11414", fontSize: 17, letterSpacing: "0.2em" }}
          >
            INVEST IN THE FUTURE OF BARBERING
          </div>
          <h2
            className="font-bebas"
            style={{
              margin: 0,
              fontSize: "clamp(48px, 5vw, 72px)",
              lineHeight: 0.95,
              fontWeight: 400,
            }}
          >
            REQUEST
            <br />
            INVESTOR
            <br />
            <span style={{ color: "#E11414" }}>ACCESS</span>
          </h2>
          <div style={{ width: 56, height: 3, background: "#E11414" }} />
          <p
            style={{
              margin: 0,
              color: "#C9C9C4",
              fontSize: 15,
              lineHeight: 1.75,
              maxWidth: 420,
            }}
          >
            Complete the form to access our investor deck, financials, and
            additional information about the opportunity ahead.
          </p>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 12,
              marginTop: 8,
            }}
          >
            {accessItems.map((a) => (
              <div key={a} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span
                  style={{
                    width: 26,
                    height: 26,
                    borderRadius: "50%",
                    border: "1.5px solid #E11414",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#E11414",
                    fontSize: 12,
                  }}
                >
                  ✓
                </span>
                <span style={{ fontSize: 13, fontWeight: 600, letterSpacing: "0.06em" }}>
                  {a}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div
          data-reveal
          style={{
            flex: "1 1 360px",
            maxWidth: 520,
            margin: "0 auto",
            background: "#111",
            border: "1px solid #262626",
            borderRadius: 12,
            padding: "36px 32px",
          }}
        >
          {submitted ? (
            <div
              style={{
                textAlign: "center",
                padding: "48px 12px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 16,
              }}
            >
              <span
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: "50%",
                  border: "2px solid #E11414",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#E11414",
                  fontSize: 24,
                }}
              >
                ✓
              </span>
              <div className="font-bebas" style={{ fontSize: 32, letterSpacing: 1 }}>
                REQUEST RECEIVED
              </div>
              <p
                style={{
                  margin: 0,
                  color: "#9C9C9C",
                  fontSize: 14,
                  lineHeight: 1.7,
                  maxWidth: 320,
                }}
              >
                Thank you for your interest in DirectCuts. Our team will reach
                out shortly with investor access details.
              </p>
              <button
                onClick={resetForm}
                className="btn-outline"
                style={{
                  background: "none",
                  border: "1px solid #3A3A3A",
                  color: "#F2F2F0",
                  fontFamily: "var(--font-inter), Inter, sans-serif",
                  fontSize: 12,
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                  padding: "10px 18px",
                  borderRadius: 4,
                  cursor: "pointer",
                }}
              >
                SUBMIT ANOTHER REQUEST
              </button>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div
                className="font-bebas"
                style={{
                  fontSize: 26,
                  letterSpacing: 1.5,
                  borderBottom: "2px solid #E11414",
                  paddingBottom: 12,
                  marginBottom: 6,
                }}
              >
                INVESTOR INFORMATION
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 12,
                }}
              >
                <label style={labelStyle}>
                  FIRST NAME *
                  <input value={f.firstName} onChange={set("firstName")} style={inputStyle} />
                </label>
                <label style={labelStyle}>
                  LAST NAME *
                  <input value={f.lastName} onChange={set("lastName")} style={inputStyle} />
                </label>
              </div>
              <label style={labelStyle}>
                EMAIL ADDRESS *
                <input type="email" value={f.email} onChange={set("email")} style={inputStyle} />
              </label>
              <label style={labelStyle}>
                PHONE NUMBER
                <input type="tel" value={f.phone} onChange={set("phone")} style={inputStyle} />
              </label>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 12,
                }}
              >
                <label style={labelStyle}>
                  INVESTOR TYPE *
                  <select
                    value={f.investorType}
                    onChange={set("investorType")}
                    style={{ ...inputStyle, appearance: "auto" }}
                  >
                    <option value="">Select…</option>
                    <option>Angel</option>
                    <option>VC</option>
                    <option>Individual</option>
                    <option>Other</option>
                  </select>
                </label>
                <label style={labelStyle}>
                  INVESTMENT RANGE *
                  <select
                    value={f.range}
                    onChange={set("range")}
                    style={{ ...inputStyle, appearance: "auto" }}
                  >
                    <option value="">Select…</option>
                    <option>Under $10k</option>
                    <option>$10k – $50k</option>
                    <option>$50k – $100k</option>
                    <option>$100k+</option>
                  </select>
                </label>
              </div>
              <label style={labelStyle}>
                HOW DID YOU HEAR ABOUT US?
                <textarea
                  rows={3}
                  value={f.heard}
                  onChange={set("heard")}
                  style={{ ...inputStyle, resize: "vertical" }}
                />
              </label>
              {formError && (
                <div
                  role="alert"
                  style={{
                    color: "#FF6B6B",
                    fontSize: 13,
                    border: "1px solid #4A1010",
                    background: "#1A0808",
                    borderRadius: 6,
                    padding: "10px 14px",
                  }}
                >
                  {formError}
                </div>
              )}
              <button
                onClick={submitForm}
                disabled={isPending}
                className="btn-red"
                style={{
                  background: "#E11414",
                  border: "none",
                  color: "#fff",
                  fontFamily: "var(--font-inter), Inter, sans-serif",
                  fontSize: 13,
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  padding: 16,
                  borderRadius: 6,
                  cursor: isPending ? "wait" : "pointer",
                  marginTop: 4,
                  opacity: isPending ? 0.7 : 1,
                }}
              >
                {isPending ? "SUBMITTING…" : "🔒 REQUEST ACCESS"}
              </button>
              <p
                style={{
                  margin: "4px 0 0",
                  color: "#6E6E6E",
                  fontSize: 11,
                  lineHeight: 1.6,
                  textAlign: "center",
                }}
              >
                All investor inquiries are kept confidential. Submitting this
                form does not constitute an offer to sell securities.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
