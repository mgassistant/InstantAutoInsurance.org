"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, ShieldCheck, CheckCircle2 } from "lucide-react";

const QUOTE_ENDPOINT = "/api/quote";

type FormState = {
  name: string;
  email: string;
  phone: string;
  zip: string;
  vehicle: string;
  sr22: string;
};

const EMPTY: FormState = {
  name: "",
  email: "",
  phone: "",
  zip: "",
  vehicle: "",
  sr22: "",
};

export default function QuoteForm() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<FormState>(EMPTY);
  const [error, setError] = useState<string>("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  // Refs mirror form state so unload handlers read the latest values.
  const dataRef = useRef<FormState>(EMPTY);
  const partialSentRef = useRef(false);
  const submittedRef = useRef(false);

  useEffect(() => {
    dataRef.current = data;
  }, [data]);

  function update<K extends keyof FormState>(key: K, value: string) {
    setData((d) => ({ ...d, [key]: value }));
  }

  function hasContact(d: FormState): boolean {
    const nameOk = d.name.trim().length >= 2;
    const emailOk = d.email.includes("@");
    const phoneOk = d.phone.replace(/\D/g, "").length >= 10;
    return nameOk && (emailOk || phoneOk);
  }

  // Fire a partial lead once, when contact info is present. Uses sendBeacon
  // on unload (fetch is killed on unload) and keepalive fetch in-page.
  function firePartial(useBeacon: boolean) {
    if (partialSentRef.current || submittedRef.current) return;
    const d = dataRef.current;
    if (!hasContact(d)) return;
    partialSentRef.current = true;

    const payload = JSON.stringify({
      ...d,
      phone: d.phone.replace(/\D/g, ""),
      partial: true,
      lead_status: "partial",
      state: "CA",
    });

    try {
      if (useBeacon && typeof navigator !== "undefined" && navigator.sendBeacon) {
        const blob = new Blob([payload], { type: "application/json" });
        navigator.sendBeacon(QUOTE_ENDPOINT, blob);
        return;
      }
    } catch {
      /* fall through to fetch */
    }

    fetch(QUOTE_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: payload,
      keepalive: true,
    }).catch(() => {
      /* fail-open */
    });
  }

  // Abandonment fallback: pagehide + visibilitychange(hidden).
  useEffect(() => {
    const onPageHide = () => firePartial(true);
    const onVisibility = () => {
      if (document.visibilityState === "hidden") firePartial(true);
    };
    window.addEventListener("pagehide", onPageHide);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      window.removeEventListener("pagehide", onPageHide);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  async function verifyEmail(email: string): Promise<boolean> {
    try {
      const res = await fetch("/api/verify-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });
      const json = (await res.json()) as { ok?: boolean };
      return json.ok !== false; // fail-open: only block a definitive false
    } catch {
      return true; // fail-open on network error
    }
  }

  function nextStep() {
    setError("");
    if (step === 0) {
      if (data.name.trim().length < 2) {
        setError("Please enter your name.");
        return;
      }
      if (data.phone.replace(/\D/g, "").length < 10) {
        setError("Please enter a valid phone number.");
        return;
      }
    }
    // Fire partial on step advance once contact info is present.
    firePartial(false);
    setStep((s) => s + 1);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    submittedRef.current = true;

    if (data.name.trim().length < 2) {
      setError("Please enter your name.");
      submittedRef.current = false;
      return;
    }
    if (data.phone.replace(/\D/g, "").length < 10) {
      setError("Please enter a valid phone number.");
      submittedRef.current = false;
      return;
    }
    if (!data.email.includes("@") || !data.email.includes(".")) {
      setError("Please enter a valid email address so we can reach you.");
      submittedRef.current = false;
      return;
    }

    setSubmitting(true);

    // ZeroBounce verification before the real submit.
    const emailOk = await verifyEmail(data.email);
    if (!emailOk) {
      setError("Please enter a valid email address so we can reach you.");
      setSubmitting(false);
      submittedRef.current = false;
      return;
    }

    try {
      await fetch(QUOTE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          phone: data.phone.replace(/\D/g, ""),
          lead_status: "complete",
          state: "CA",
        }),
      });
    } catch {
      /* fail-open — still show success so we never lose the lead visually */
    }

    setSubmitting(false);
    setDone(true);
  }

  if (done) {
    return (
      <div className="heroPanel">
        <div className="panelHead">
          <span><CheckCircle2 size={26} /></span>
          <div><small>THANK YOU!</small><h2>We received your request</h2></div>
        </div>
        <p className="fine">
          A licensed agent will reach out shortly to help you review your auto
          insurance options. This is a request, not a bound policy — coverage is
          subject to underwriting and carrier approval.
        </p>
      </div>
    );
  }

  return (
    <form className="heroPanel" onSubmit={handleSubmit} noValidate>
      <div className="panelHead">
        <span><ShieldCheck size={26} /></span>
        <div><small>QUOTE IN MINUTES</small><h2>Get your auto insurance quote</h2></div>
      </div>

      {step === 0 && (
        <div className="quoteFields">
          <label className="field">
            <span>Name</span>
            <input
              type="text"
              value={data.name}
              onChange={(e) => update("name", e.target.value)}
              placeholder="Your name"
              autoComplete="name"
            />
          </label>
          <label className="field">
            <span>Phone</span>
            <input
              type="tel"
              value={data.phone}
              onChange={(e) => update("phone", e.target.value)}
              onBlur={() => firePartial(false)}
              placeholder="(000) 000-0000"
              autoComplete="tel"
            />
          </label>
        </div>
      )}

      {step === 1 && (
        <div className="quoteFields">
          <label className="field">
            <span>Email</span>
            <input
              type="email"
              value={data.email}
              onChange={(e) => update("email", e.target.value)}
              onBlur={() => firePartial(false)}
              placeholder="you@email.com"
              autoComplete="email"
            />
          </label>
          <label className="field">
            <span>ZIP code</span>
            <input
              type="text"
              value={data.zip}
              onChange={(e) => update("zip", e.target.value)}
              placeholder="90001"
              autoComplete="postal-code"
            />
          </label>
          <label className="field">
            <span>Vehicle (optional)</span>
            <input
              type="text"
              value={data.vehicle}
              onChange={(e) => update("vehicle", e.target.value)}
              placeholder="e.g. Honda Civic 2018"
            />
          </label>
          <label className="field">
            <span>Do you need an SR-22?</span>
            <select value={data.sr22} onChange={(e) => update("sr22", e.target.value)}>
              <option value="">Select an option</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
              <option value="not_sure">Not sure</option>
            </select>
          </label>
        </div>
      )}

      {error && (
        <p className="err" role="alert">
          {error}
        </p>
      )}

      {step === 0 ? (
        <button type="button" className="panelCta" onClick={nextStep}>
          Continue <ArrowRight size={18} />
        </button>
      ) : (
        <button type="submit" className="panelCta" disabled={submitting}>
          {submitting ? "Sending…" : "Get my quote"} <ArrowRight size={18} />
        </button>
      )}

      <div className="steps">
        <div><b>01</b><span><strong>Tell us what you need</strong><small>Basic driver, vehicle, and coverage details.</small></span></div>
        <div><b>02</b><span><strong>Review available options</strong><small>We help compare eligible carrier choices.</small></span></div>
        <div><b>03</b><span><strong>Choose your coverage</strong><small>Complete your purchase and get proof of insurance.</small></span></div>
      </div>
    </form>
  );
}
