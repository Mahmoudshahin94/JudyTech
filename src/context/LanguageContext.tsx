"use client";

import React, { createContext, useContext, useState, useCallback, useEffect } from "react";

type Lang = "en" | "ar";
type Dir = "ltr" | "rtl";

const translations = {
  en: {
    nav_home: "Home",
    nav_features: "Features",
    nav_showcase: "Showcase",
    nav_contact: "Contact",
    hero_title: "JudyTech",
    hero_subtitle: "We craft digital experiences that push the boundaries of technology and design.",
    hero_cta: "Get Started",
    features_title: "What We Do",
    features_subtitle: "Empowering businesses with cutting-edge technology solutions",
    feature_web_title: "Web Development",
    feature_web_desc: "Building fast, scalable, and beautiful web applications with the latest technologies.",
    feature_system_title: "System Integration",
    feature_system_desc: "Seamlessly connecting your systems for maximum efficiency and performance.",
    feature_ai_title: "AI Solutions",
    feature_ai_desc: "Leveraging artificial intelligence to automate, predict, and transform your business.",
    feature_ui_title: "UI/UX Design",
    feature_ui_desc: "Creating intuitive and visually stunning interfaces that users love.",
    showcase_title: "Motion & Innovation",
    showcase_subtitle: "Experience the future of interactive design",
    contact_title: "Let's Connect",
    contact_subtitle: "Ready to bring your ideas to life? Reach out to us.",
    contact_whatsapp: "Chat on WhatsApp",
    contact_email: "Send an Email",
    footer_rights: "All rights reserved.",
  },
  ar: {
    nav_home: "الرئيسية",
    nav_features: "الخدمات",
    nav_showcase: "المعرض",
    nav_contact: "تواصل معنا",
    hero_title: "JudyTech",
    hero_subtitle: "نصنع تجارب رقمية تتخطى حدود التكنولوجيا والتصميم.",
    hero_cta: "ابدأ الآن",
    features_title: "ماذا نقدم",
    features_subtitle: "تمكين الأعمال بحلول تكنولوجية متطورة",
    feature_web_title: "تطوير المواقع",
    feature_web_desc: "بناء تطبيقات ويب سريعة وقابلة للتوسع وجميلة باستخدام أحدث التقنيات.",
    feature_system_title: "تكامل الأنظمة",
    feature_system_desc: "ربط أنظمتك بسلاسة لتحقيق أقصى كفاءة وأداء.",
    feature_ai_title: "حلول الذكاء الاصطناعي",
    feature_ai_desc: "الاستفادة من الذكاء الاصطناعي لأتمتة أعمالك والتنبؤ بها وتحويلها.",
    feature_ui_title: "تصميم واجهات المستخدم",
    feature_ui_desc: "إنشاء واجهات بديهية ومذهلة بصرياً يحبها المستخدمون.",
    showcase_title: "الحركة والابتكار",
    showcase_subtitle: "اختبر مستقبل التصميم التفاعلي",
    contact_title: "تواصل معنا",
    contact_subtitle: "مستعد لتحويل أفكارك إلى واقع؟ تواصل معنا.",
    contact_whatsapp: "تحدث عبر واتساب",
    contact_email: "أرسل بريداً إلكترونياً",
    footer_rights: "جميع الحقوق محفوظة.",
  },
} as const;

type TranslationKey = keyof typeof translations.en;

interface LanguageContextType {
  lang: Lang;
  dir: Dir;
  toggleLang: () => void;
  t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");
  const dir: Dir = lang === "ar" ? "rtl" : "ltr";

  const toggleLang = useCallback(() => {
    setLang((prev) => (prev === "en" ? "ar" : "en"));
  }, []);

  const t = useCallback(
    (key: TranslationKey): string => {
      return translations[lang][key];
    },
    [lang]
  );

  useEffect(() => {
    document.documentElement.setAttribute("dir", dir);
    document.documentElement.setAttribute("lang", lang);
  }, [dir, lang]);

  return (
    <LanguageContext.Provider value={{ lang, dir, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within LanguageProvider");
  return context;
}
