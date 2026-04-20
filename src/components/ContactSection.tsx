"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

const MAP_LAT = 31.7731317;
const MAP_LNG = 35.2572497;
const MAP_EMBED_SRC = `https://maps.google.com/maps?q=${MAP_LAT},${MAP_LNG}&z=16&output=embed`;
const MAP_OPEN_HREF = `https://www.google.com/maps/@${MAP_LAT},${MAP_LNG},16z`;

export default function ContactSection() {
  const { t } = useLanguage();

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
          {/* WhatsApp */}
          <motion.a
            href="https://wa.me/972524171936"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex flex-col items-center gap-4 rounded-2xl p-10 glass overflow-hidden cursor-pointer"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            whileHover={{
              y: -6,
              scale: 1.02,
              transition: { type: "spring", stiffness: 300 },
            }}
          >
            <motion.div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                background: "linear-gradient(135deg, rgba(37,211,102,0.1), rgba(37,211,102,0.02))",
              }}
            />

            <motion.div
              className="flex items-center justify-center w-16 h-16 rounded-2xl bg-[#25D366]/10"
              whileHover={{ rotate: 5 }}
            >
              <svg viewBox="0 0 24 24" className="w-8 h-8 text-[#25D366]" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
              </svg>
            </motion.div>

            <h3 className="text-xl font-semibold text-white relative z-10">
              {t("contact_whatsapp")}
            </h3>
            <p className="text-sm text-slate-400 relative z-10">+972 52-417-1936</p>
          </motion.a>

          {/* Email */}
          <motion.a
            href="mailto:mahmoudria94@gmail.com"
            className="group relative flex flex-col items-center gap-4 rounded-2xl p-10 glass overflow-hidden cursor-pointer"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            whileHover={{
              y: -6,
              scale: 1.02,
              transition: { type: "spring", stiffness: 300 },
            }}
          >
            <motion.div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                background: "linear-gradient(135deg, rgba(99,102,241,0.1), rgba(6,182,212,0.05))",
              }}
            />

            <motion.div
              className="flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10"
              whileHover={{ rotate: -5 }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8 text-primary">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
              </svg>
            </motion.div>

            <h3 className="text-xl font-semibold text-white relative z-10">
              {t("contact_email")}
            </h3>
            <p className="text-sm text-slate-400 relative z-10">mahmoudria94@gmail.com</p>
          </motion.a>

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
