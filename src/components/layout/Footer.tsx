'use client';

import { motion } from 'framer-motion';
import AnimatedLogo from '@/components/AnimatedLogo';
import { useLanguage } from '@/context/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <motion.footer
      className="relative border-t border-white/5 py-16 px-4 md:px-6 bg-gradient-to-b from-background to-background/50"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <div className="mx-auto max-w-7xl">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <AnimatedLogo variant="footer" />
            <p className="text-sm text-foreground/60">
              Crafting premium digital experiences with cutting-edge technology.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="font-semibold text-foreground mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-foreground/60">
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#features" className="hover:text-primary transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="#showcase" className="hover:text-primary transition-colors">
                  Showcase
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-primary transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="font-semibold text-foreground mb-4">Connect</h4>
            <p className="text-sm text-foreground/60 mb-4">
              Follow us for the latest updates and insights.
            </p>
            <div className="flex gap-3">
              {['twitter', 'linkedin', 'github'].map(social => (
                <motion.a
                  key={social}
                  href="#"
                  className="w-10 h-10 rounded-lg glass-card flex items-center justify-center text-primary hover:text-accent transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {social === 'twitter' && 'X'}
                  {social === 'linkedin' && 'in'}
                  {social === 'github' && '◆'}
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <motion.div
          className="h-px w-full bg-gradient-to-r from-transparent via-primary/20 to-transparent my-8"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
        />

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-foreground/50">
          <p>&copy; 2026 JudyTech. {t('footer_rights')}</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-primary transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              Terms
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}
