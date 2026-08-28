"use client";

import { FormEvent, useState } from "react";
import { CheckCircle2 } from "lucide-react";

import { business, cta } from "@/data/business";
import { serviceOptions } from "@/data/services";
import { Button } from "@/components/ui/Button";

type FormState = "idle" | "loading" | "success" | "error";

const inputClassName =
  "mt-2 w-full border border-charcoal/20 bg-white px-4 py-3.5 text-[0.96rem] text-charcoal outline-none transition-colors placeholder:text-muted/80 focus:border-forest focus:ring-2 focus:ring-gold/50";

export function EstimateForm() {
  const [state, setState] = useState<FormState>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("loading");
    setMessage("");

    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = (await response.json()) as { message?: string };

      if (!response.ok) {
        setState("error");
        setMessage(result.message ?? "We could not send the request. Please call us instead.");
        return;
      }

      form.reset();
      setState("success");
      setMessage(result.message ?? "Your request is in. We will be in touch shortly.");
    } catch {
      setState("error");
      setMessage(`Connection failed. Please call ${business.phone} instead.`);
    }
  }

  if (state === "success") {
    return (
      <div className="border border-forest/20 bg-white p-7 sm:p-10" role="status">
        <CheckCircle2 className="size-8 text-forest" aria-hidden="true" strokeWidth={1.8} />
        <h2 className="mt-6 font-display text-3xl font-extrabold tracking-tight text-charcoal">Request received.</h2>
        <p className="mt-4 max-w-[38rem] text-[0.98rem] leading-relaxed text-muted">{message}</p>
        <button type="button" onClick={() => setState("idle")} className="mt-7 font-display text-[0.72rem] font-bold tracking-[0.12em] text-forest uppercase underline decoration-gold underline-offset-4 hover:text-gold-deep">
          Send another request
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="border border-charcoal/10 bg-white p-6 shadow-[0_16px_60px_rgba(23,28,25,0.08)] sm:p-9">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="text-[0.82rem] font-semibold text-charcoal">
          Name
          <input className={inputClassName} name="name" required autoComplete="name" placeholder="Your name" />
        </label>
        <label className="text-[0.82rem] font-semibold text-charcoal">
          Phone
          <input className={inputClassName} name="phone" required autoComplete="tel" inputMode="tel" placeholder="Your phone number" />
        </label>
        <label className="text-[0.82rem] font-semibold text-charcoal">
          Email <span className="font-normal text-muted">(optional)</span>
          <input className={inputClassName} name="email" type="email" autoComplete="email" placeholder="you@example.com" />
        </label>
        <label className="text-[0.82rem] font-semibold text-charcoal">
          Property city
          <input className={inputClassName} name="city" required autoComplete="address-level2" placeholder="Houston" />
        </label>
      </div>

      <label className="mt-5 block text-[0.82rem] font-semibold text-charcoal">
        What do you need help with?
        <select className={inputClassName} name="service" required defaultValue="">
          <option value="" disabled>Select a service</option>
          {serviceOptions.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
      </label>

      <label className="mt-5 block text-[0.82rem] font-semibold text-charcoal">
        Tell us about the project
        <textarea className={`${inputClassName} min-h-36 resize-y`} name="details" required minLength={12} placeholder="What glass or mirror work do you need, and where is the opening?" />
      </label>

      <label className="sr-only" aria-hidden="true">
        Company
        <input name="company" tabIndex={-1} autoComplete="off" />
      </label>

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-[24rem] text-[0.78rem] leading-relaxed text-muted">
          Appointments by request. Prefer to talk now? Call {business.phone}.
        </p>
        <Button type="submit" variant="secondary" withArrow disabled={state === "loading"}>
          {state === "loading" ? "Sending request" : cta.estimateSubmit}
        </Button>
      </div>

      {state === "error" && (
        <p className="mt-5 border-l-2 border-gold bg-gold/10 px-4 py-3 text-[0.88rem] leading-relaxed text-charcoal" role="alert">
          {message}
        </p>
      )}
    </form>
  );
}
