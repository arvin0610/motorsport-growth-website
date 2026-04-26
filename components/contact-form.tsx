"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  name:       z.string().min(2, "Required"),
  company:    z.string().min(2, "Required"),
  email:      z.string().email("Valid email required"),
  type:       z.enum(["Performance Ads", "Lead Gen", "Creative", "Web", "Brand"]),
  budget:     z.enum(["<5k/mo", "5–15k/mo", "15–40k/mo", "40k+/mo"]),
  message:    z.string().min(10, "Tell us a little more"),
});

type FormValues = z.infer<typeof schema>;

const types = ["Performance Ads", "Lead Gen", "Creative", "Web", "Brand"] as const;
const budgets = ["<5k/mo", "5–15k/mo", "15–40k/mo", "40k+/mo"] as const;

export function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>();
  const [status, setStatus] = useState<"idle" | "ok" | "err">("idle");

  async function onSubmit(values: FormValues) {
    const parsed = schema.safeParse(values);
    if (!parsed.success) return;
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      if (!res.ok) throw new Error("send_failed");
      setStatus("ok");
      reset();
    } catch {
      setStatus("err");
    }
  }

  if (status === "ok") {
    return (
      <div className="hairline p-10">
        <p className="t-mono text-[11px] uppercase tracking-[0.22em] text-mg-ash">
          [ TRANSMITTED ]
        </p>
        <h3 className="t-display t-display-md mt-4 text-mg-white">
          Brief received.
        </h3>
        <p className="t-body mt-4 max-w-md text-mg-bone">
          We reply within 24 hours. If it&apos;s urgent,{" "}
          <a href="mailto:info@motorsportgrowth.com" className="link-draw text-mg-white">
            info@motorsportgrowth.com
          </a>{" "}
          is the fastest line.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="grid grid-cols-12 gap-x-5 gap-y-8">
      <div className={`field col-span-12 md:col-span-6 ${errors.name ? "is-error" : ""}`}>
        <label htmlFor="name" className="field-label">/ Name</label>
        <input
          id="name"
          autoComplete="name"
          placeholder="First and last"
          {...register("name", { required: true, minLength: 2 })}
        />
        {errors.name && <span className="field-error">{errors.name.message ?? "Required"}</span>}
      </div>

      <div className={`field col-span-12 md:col-span-6 ${errors.company ? "is-error" : ""}`}>
        <label htmlFor="company" className="field-label">/ Company</label>
        <input
          id="company"
          autoComplete="organization"
          placeholder="Brand or shop"
          {...register("company", { required: true, minLength: 2 })}
        />
        {errors.company && <span className="field-error">{errors.company.message ?? "Required"}</span>}
      </div>

      <div className={`field col-span-12 md:col-span-6 ${errors.email ? "is-error" : ""}`}>
        <label htmlFor="email" className="field-label">/ Email</label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          placeholder="you@brand.com"
          {...register("email", { required: true })}
        />
        {errors.email && <span className="field-error">{errors.email.message ?? "Required"}</span>}
      </div>

      <div className={`field col-span-12 md:col-span-6 ${errors.type ? "is-error" : ""}`}>
        <label htmlFor="type" className="field-label">/ Project Type</label>
        <select id="type" defaultValue="" {...register("type", { required: true })}>
          <option value="" disabled>Select</option>
          {types.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
        {errors.type && <span className="field-error">Required</span>}
      </div>

      <div className={`field col-span-12 md:col-span-6 ${errors.budget ? "is-error" : ""}`}>
        <label htmlFor="budget" className="field-label">/ Monthly Budget</label>
        <select id="budget" defaultValue="" {...register("budget", { required: true })}>
          <option value="" disabled>Select</option>
          {budgets.map((b) => (
            <option key={b} value={b}>${b}</option>
          ))}
        </select>
        {errors.budget && <span className="field-error">Required</span>}
      </div>

      <div className={`field col-span-12 ${errors.message ? "is-error" : ""}`}>
        <label htmlFor="message" className="field-label">/ Brief</label>
        <textarea
          id="message"
          rows={4}
          placeholder="What are you trying to move?"
          {...register("message", { required: true, minLength: 10 })}
        />
        {errors.message && <span className="field-error">{errors.message.message ?? "Required"}</span>}
      </div>

      <div className="col-span-12 mt-2 flex flex-wrap items-center justify-between gap-4">
        <p className="t-mono text-[10px] uppercase tracking-[0.22em] text-mg-ash">
          We reply within 24 hours.
        </p>
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-primary"
          data-cursor="SEND"
        >
          {isSubmitting ? "Transmitting…" : "Send Brief"}
          <span className="arrow">→</span>
        </button>
      </div>

      {status === "err" && (
        <p className="col-span-12 t-mono text-[11px] uppercase tracking-[0.22em] text-mg-red">
          Transmission failed. Email info@motorsportgrowth.com instead.
        </p>
      )}
    </form>
  );
}
