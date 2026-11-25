import { useState } from 'react';
import { motion } from 'framer-motion';
import { Linkedin, Github, Mail, MessageCircle, Copy, Check, Flag, Castle } from 'lucide-react';
import { CONTACT_LINKS, PROFILE } from '../../data/portfolio';

interface ContactSectionProps {
  onInteractSound: () => void;
}

const CONTACT_ICONS: Record<string, typeof Mail> = {
  linkedin: Linkedin,
  github: Github,
  email: Mail,
  whatsapp: MessageCircle
};

export function ContactSection({ onInteractSound }: ContactSectionProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    onInteractSound();
    if (navigator.clipboard && navigator.clipboard.writeText) {
      void navigator.clipboard.writeText('Arifkurniawan98@outlook.com').then(() => {
        setCopied(true);
        window.setTimeout(() => setCopied(false), 2200);
      });
    }
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="relative pt-20 sm:pt-28 pb-16 px-4 sm:px-6"
    >
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45 }}
          className="toon-panel p-6 sm:p-10 relative overflow-hidden"
        >
          {/* Castle Battlement Top Border */}
          <div className="absolute top-0 left-0 right-0 h-3 brick-pattern border-b-[3px] border-mario-ink" />

          {/* Goal Pole & Castle Header */}
          <div className="text-center max-w-2xl mx-auto mt-2 mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-mario-coin border-[3px] border-mario-ink font-pixel text-[10px] text-mario-ink shadow-toon-sm mb-4">
              <Flag className="w-3.5 h-3.5 text-mario-red fill-mario-red" />
              <span>WORLD 1-4 · GOAL POLE &amp; FINAL CASTLE</span>
              <Castle className="w-3.5 h-3.5 text-mario-brick" />
            </div>

            <h2
              id="contact-heading"
              className="font-pixel text-2xl sm:text-4xl text-mario-ink leading-snug mb-3"
            >
              Let&apos;s Work Together
            </h2>

            <p className="text-base sm:text-lg text-slate-700 font-semibold leading-relaxed">
              {PROFILE.contactSubtitle}
            </p>
          </div>

          {/* 4 Contact Portal Cards */}
          <div className="grid sm:grid-cols-2 gap-4">
            {CONTACT_LINKS.map((item) => {
              const Icon = CONTACT_ICONS[item.id] || Mail;
              const isEmail = item.id === 'email';

              return (
                <div
                  key={item.id}
                  className="bg-slate-50 border-[3px] border-mario-ink rounded-2xl p-4 shadow-toon-sm hover:-translate-y-1 transition-transform flex items-center justify-between gap-3"
                >
                  <a
                    href={item.href}
                    target={item.external ? '_blank' : undefined}
                    rel={item.external ? 'noopener noreferrer' : undefined}
                    onClick={onInteractSound}
                    className="flex items-center gap-3.5 min-w-0 flex-1 min-h-[44px]"
                  >
                    <span
                      className="w-12 h-12 rounded-xl border-[3px] border-mario-ink flex items-center justify-center text-white shrink-0 shadow-toon-sm"
                      style={{ backgroundColor: item.color }}
                    >
                      <Icon className="w-5 h-5" />
                    </span>
                    <div className="min-w-0">
                      <div className="font-arcade text-base font-bold text-mario-ink">
                        {item.label}
                      </div>
                      <div className="text-xs sm:text-sm font-bold text-slate-600 truncate">
                        {item.value}
                      </div>
                    </div>
                  </a>

                  {isEmail && (
                    <button
                      type="button"
                      onClick={handleCopyEmail}
                      className="toon-btn-gold !px-3 !py-2 !text-xs shrink-0"
                      aria-label="Copy email address"
                    >
                      {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      <span>{copied ? 'Copied!' : 'Copy'}</span>
                    </button>
                  )}
                </div>
              );
            })}
          </div>

          {/* Official Footer */}
          <footer className="mt-10 pt-6 border-t-2 border-dashed border-mario-ink/20 text-center">
            <p className="font-arcade text-xs sm:text-sm font-bold text-slate-700">
              {PROFILE.footerText}
            </p>
            <p className="font-pixel text-[9px] text-slate-500 mt-2">
              THANK YOU FOR PLAYING! TRY ↑↑↓↓←→←→BA FOR STAR POWER ★
            </p>
          </footer>
        </motion.div>
      </div>
    </section>
  );
}
