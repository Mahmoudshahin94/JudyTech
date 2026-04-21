"use client";

import { useCallback, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

const MAP_LAT = 31.7731317;
const MAP_LNG = 35.2572497;
const MAP_EMBED_SRC = `https://maps.google.com/maps?q=${MAP_LAT},${MAP_LNG}&z=16&output=embed`;
const MAP_OPEN_HREF = `https://www.google.com/maps/@${MAP_LAT},${MAP_LNG},16z`;

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
                <label htmlFor="contact-title" className={labelClass}>
                  {t("contact_form_title")}
                </label>
                <input
                  id="contact-title"
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
                  {status === "loading" ? t("contact_form_sending") : t("contact_form_send")}
                </motion.button>
              </div>
            </div>
          </motion.form>

          {/* Location + map */}
          <motion.div
            className="md:col-span-2 group relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900/40 shadow-[0_0_0_1px_rgba(255,255,255,0.04)]"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.1 }}
          >
            <div className="relative aspect-[4/3] min-h-[220px] sm:aspect-[21/9] sm:min-h-[260px]">
              <iframe
                title={t("contact_map_heading")}
                src={MAP_EMBED_SRC}
                className="absolute inset-0 h-full w-full border-0 grayscale-[25%] contrast-[1.05] transition duration-500 group-hover:grayscale-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#050510] via-[#050510]/40 to-transparent sm:via-transparent" />

              <div className="absolute inset-x-0 bottom-0 z-10 flex flex-col gap-4 p-5 sm:flex-row sm:items-end sm:justify-between sm:p-6">
                <div className="pointer-events-none max-w-lg sm:pointer-events-auto">
                  <p className="text-xs font-semibold uppercase tracking-widest text-accent-light/90">
                    {t("contact_map_heading")}
                  </p>
                  <p className="mt-1 text-lg font-semibold text-white sm:text-xl">{t("contact_address")}</p>
                </div>
                <motion.a
                  href={MAP_OPEN_HREF}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pointer-events-auto inline-flex items-center justify-center gap-2 self-start rounded-full bg-white/10 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur-md ring-1 ring-white/15 transition hover:bg-white/15 sm:self-end"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <svg className="h-4 w-4 text-accent-light" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {t("contact_open_maps")}
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
