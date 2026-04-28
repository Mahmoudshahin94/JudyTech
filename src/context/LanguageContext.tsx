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
    hero_title: "The Future of Digital Experience",
    hero_subtitle: "Crafting premium 3D interfaces and immersive digital experiences that captivate and inspire.",
    hero_cta: "Get Started",
    hero_badge: "✨ Next Generation",
    scroll_explore: "Scroll to explore",
    features_title: "Premium Services",
    features_subtitle: "Pushing the boundaries of what's possible in digital design and technology",
    feature_web_title: "Interactive Design",
    feature_web_desc: "Engaging 3D elements that respond to user interaction",
    feature_system_title: "Smooth Animations",
    feature_system_desc: "Perfectly timed motions powered by GSAP ScrollTrigger",
    feature_ai_title: "Premium UX",
    feature_ai_desc: "Thoughtful interactions that delight at every touchpoint",
    feature_ui_title: "Performance First",
    feature_ui_desc: "Optimized rendering pipelines ensuring 60fps animations and exceptional Lighthouse scores.",
    showcase_title: "Showcase",
    showcase_subtitle: "Discover what excellence looks like in motion",
    cta_title: "Ready?",
    cta_subtitle: "Let's create something extraordinary together",
    cta_button: "Start Project",
    contact_title: "Get In Touch",
    contact_subtitle: "We'd love to hear about your next big idea.",
    contact_form_first_name: "First name",
    contact_form_last_name: "Last name",
    contact_form_email: "Email",
    contact_form_phone: "Phone number",
    contact_form_subject: "Subject",
    contact_form_description: "Project details",
    contact_form_description_hint: "Tell us about your vision",
    contact_form_submit: "Send Message",
    contact_form_submitting: "Sending…",
    contact_form_success: "Thank you — we'll be in touch soon.",
    contact_form_error: "Something went wrong. Please try again.",
    contact_map_heading: "Our location",
    contact_address: "Jerusalem",
    contact_open_maps: "Open in Google Maps",
    footer_connect: "Connect",
    footer_quick_links: "Quick Links",
    footer_follow: "Follow us for the latest updates and insights.",
    footer_tagline: "Crafting premium digital experiences with cutting-edge technology.",
    footer_privacy: "Privacy",
    footer_terms: "Terms",
    footer_cookies: "Cookies",
    footer_rights: "All rights reserved.",
  },
  ar: {
    nav_home: "الرئيسية",
    nav_features: "الخدمات",
    nav_showcase: "المعرض",
    nav_contact: "تواصل معنا",
    hero_title: "مستقبل التجربة الرقمية",
    hero_subtitle: "صياغة واجهات ثلاثية الأبعاد ممتازة وتجارب رقمية غامرة تأسر وتلهم.",
    hero_cta: "ابدأ الآن",
    hero_badge: "✨ الجيل التالي",
    scroll_explore: "اسحب للاستكشاف",
    features_title: "الخدمات المتميزة",
    features_subtitle: "دفع حدود ما هو ممكن في التصميم الرقمي والتكنولوجيا",
    feature_web_title: "التصميم التفاعلي",
    feature_web_desc: "عناصر ثلاثية الأبعاد جذابة تستجيب لتفاعل المستخدم",
    feature_system_title: "الرسوم المتحركة السلسة",
    feature_system_desc: "حركات مؤقتة بشكل مثالي مدعومة بـ GSAP ScrollTrigger",
    feature_ai_title: "تجربة المستخدم المتميزة",
    feature_ai_desc: "تفاعلات مدروسة تسعد المستخدم في كل نقطة تلامس",
    feature_ui_title: "الأداء أولاً",
    feature_ui_desc: "خطوط أنابيب عرض محسنة لضمان رسوم متحركة بسرعة 60fps ودرجات ممتازة.",
    showcase_title: "المعرض",
    showcase_subtitle: "اكتشف ما يبدو عليه التميز في الحركة",
    cta_title: "هل أنت مستعد؟",
    cta_subtitle: "دعنا ننشئ شيئاً غير عادي معاً",
    cta_button: "ابدأ المشروع",
    contact_title: "تواصل معنا",
    contact_subtitle: "نود أن نسمع عن فكرتك الرائعة التالية.",
    contact_form_first_name: "الاسم الأول",
    contact_form_last_name: "اسم العائلة",
    contact_form_email: "البريد الإلكتروني",
    contact_form_phone: "رقم الهاتف",
    contact_form_subject: "الموضوع",
    contact_form_description: "تفاصيل المشروع",
    contact_form_description_hint: "أخبرنا عن رؤيتك",
    contact_form_submit: "إرسال الرسالة",
    contact_form_submitting: "جاري الإرسال…",
    contact_form_success: "شكراً لك — سنتواصل معك قريباً.",
    contact_form_error: "حدث خطأ. حاول مرة أخرى.",
    contact_map_heading: "موقعنا",
    contact_address: "القدس",
    contact_open_maps: "فتح في خرائط جوجل",
    footer_connect: "تواصل",
    footer_quick_links: "روابط سريعة",
    footer_follow: "تابعنا للحصول على أحدث التحديثات والرؤى.",
    footer_tagline: "صياغة تجارب رقمية متميزة باستخدام أحدث التكنولوجيا.",
    footer_privacy: "الخصوصية",
    footer_terms: "الشروط",
    footer_cookies: "ملفات تعريف الارتباط",
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
