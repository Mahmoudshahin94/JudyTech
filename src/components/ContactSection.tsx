"use client";

import { useCallback, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

type FormStatus = "idle" | "loading" | "success" | "error";

const inputClass =
  "w-full rounded-xl border border-white/10 bg-slate-950/50 px-4 py-3 text-sm text-white placeholder:text-slate-500 outline-none transition focus:border-primary/50 focus:ring-2 focus:ring-primary/20 text-start";

const labelClass = "mb-1.5 block text-xs font-medium uppercase tracking-wider text-slate-400";

export default function ContactSection() {
  const { t } = useLanguage();
  const hpRef = useRef<HTMLInputElement>(null);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorDetail, setErrorDetail] = useState<string | null>(null);

  const resetForm = useCallback(() => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setPhone("");
    setTitle("");
    setDescription("");
    if (hpRef.current) hpRef.current.value = "";
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          phone,
          title,
          description,
          _hp: hpRef.current?.value ?? "",
        }),
      });

      if (!res.ok) {
        let detail: string | null = null;
        try {
          const data = (await res.json()) as { detail?: unknown };
          if (typeof data.detail === "string" && data.detail.trim()) {
            detail = data.detail.trim();
          }
        } catch {
          /* ignore */
        }
        setErrorDetail(detail);
        setStatus("error");
        return;
      }

      setErrorDetail(null);
      setStatus("success");
      resetForm();
    } catch {
      setErrorDetail(null);
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="relative py-32 px-6 overflow-hidden">
      {/* Background orbs */}
      <motion.div
        className="absolute top-1/3 -left-40 w-80 h-80 rounded-full bg-primary/10 blur-[120px] pointer-events-none"
        animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-1/4 -right-40 w-80 h-80 rounded-full bg-accent/10 blur-[120px] pointer-events-none"
        animate={{ x: [0, -30, 0], y: [0, 20, 0] }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      <div className="mx-auto max-w-4xl relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl gradient-text inline-block">
            {t("contact_title")}
          </h2>
          <p className="mt-4 text-lg text-slate-400 max-w-xl mx-auto">
            {t("contact_subtitle")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Contact form */}
          <motion.form
            onSubmit={handleSubmit}
            onFocus={() => {
              if (status === "success" || status === "error") setStatus("idle");
              setErrorDetail(null);
            }}
            className="md:col-span-2 group relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900/40 p-6 sm:p-10 shadow-[0_0_0_1px_rgba(255,255,255,0.04)] backdrop-blur-sm"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-focus-within:opacity-100"
              style={{
                background: "linear-gradient(135deg, rgba(99,102,241,0.08), rgba(6,182,212,0.04))",
              }}
            />

            <div className="relative z-10">
              <input
                ref={hpRef}
                type="text"
                name="_hp"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden
                className="pointer-events-none absolute h-px w-px overflow-hidden opacity-0"
              />

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="contact-first-name" className={labelClass}>
                    {t("contact_form_first_name")}
                  </label>
                  <input
                    id="contact-first-name"
                    name="firstName"
                    type="text"
                    required
                    autoComplete="given-name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label htmlFor="contact-last-name" className={labelClass}>
                    {t("contact_form_last_name")}
                  </label>
                  <input
                    id="contact-last-name"
                    name="lastName"
                    type="text"
                    required
                    autoComplete="family-name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className={labelClass}>
                    {t("contact_form_email")}
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label htmlFor="contact-phone" className={labelClass}>
                    {t("contact_form_phone")}
                  </label>
                  <input
                    id="contact-phone"
                    name="phone"
                    type="tel"
                    required
                    autoComplete="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="mt-5">
                <label htmlFor="contact-subject" className={labelClass}>
                  {t("contact_form_subject")}
                </label>
                <input
                  id="contact-subject"
                  name="title"
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className={inputClass}
                />
              </div>

              <div className="mt-5">
                <label htmlFor="contact-description" className={labelClass}>
                  {t("contact_form_description")}{" "}
                  <span className="font-normal normal-case tracking-normal text-slate-500">
                    ({t("contact_form_description_hint")})
                  </span>
                </label>
                <textarea
                  id="contact-description"
                  name="description"
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className={`${inputClass} min-h-[120px] resize-y`}
                />
              </div>

              {status === "success" && (
                <p className="mt-4 text-sm font-medium text-emerald-400" role="status">
                  {t("contact_form_success")}
                </p>
              )}
              {status === "error" && (
                <div className="mt-4 space-y-2" role="alert">
                  <p className="text-sm font-medium text-rose-400">{t("contact_form_error")}</p>
                  {errorDetail && (
                    <p className="text-xs leading-relaxed text-slate-400 break-words">{errorDetail}</p>
                  )}
                </div>
              )}

              <div className="mt-6 flex flex-wrap items-center gap-4">
                <motion.button
                  type="submit"
                  disabled={status === "loading"}
                  className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-primary to-accent px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition disabled:cursor-not-allowed disabled:opacity-60"
                  whileHover={status === "loading" ? undefined : { scale: 1.03 }}
                  whileTap={status === "loading" ? undefined : { scale: 0.98 }}
                >
                  {status === "loading" ? t("contact_form_submitting") : t("contact_form_submit")}
                </motion.button>
              </div>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
