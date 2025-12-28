import React, { useMemo } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import {
  ArrowUpRight,
  Github,
  Mail,
  MessageCircle,
  MapPin,
  Heart,
} from "lucide-react";
import { useTheme } from "@/context/theme";

const Footer: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const { isDark } = useTheme();

  const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

  const wrap: Variants = useMemo(
    () => ({
      hidden: { opacity: 0, y: 14, filter: "blur(10px)" },
      show: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: shouldReduceMotion
          ? { duration: 0 }
          : { duration: 0.8, ease },
      },
    }),
    [shouldReduceMotion]
  );

  const details = {
    name: "Sruoy Veasna",
    email: "veasnagva@gmail.com",
    telegram: "veasnasruoy",
    location: "Chroy Changvar, Phnom Penh, Cambodia",
    // ✅ replace with your real links
    github: "https://github.com/your-username",
  };

  const navLinks = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Certification", href: "#certification" },
    { label: "Experience", href: "#experience" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
  ];

  const SocialPill = ({
    href,
    label,
    icon,
  }: {
    href: string;
    label: string;
    icon: React.ReactNode;
  }) => (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noreferrer" : undefined}
      className={`group inline-flex items-center gap-2 rounded-full px-3 py-2 text-xs font-bold ring-1 transition-all ${
        isDark
          ? "bg-white/5 text-white/75 ring-white/10 hover:bg-white/10 hover:ring-white/20"
          : "bg-white/70 text-slate-700 ring-slate-200 hover:bg-white hover:ring-slate-300"
      }`}
    >
      <span
        className={`inline-flex h-8 w-8 items-center justify-center rounded-full ${
          isDark ? "bg-white/5" : "bg-slate-900/5"
        }`}
      >
        {icon}
      </span>
      <span className="whitespace-nowrap">{label}</span>
      <ArrowUpRight
        className={`${
          isDark ? "text-white/40" : "text-slate-400"
        } h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5`}
      />
    </a>
  );

  const ScrollTop = () => (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-extrabold ring-1 transition-all ${
        isDark
          ? "bg-white/5 text-white ring-white/10 hover:bg-white/10 hover:ring-white/20"
          : "bg-white/70 text-slate-800 ring-slate-200 hover:bg-white hover:ring-slate-300"
      }`}
    >
      Back to top
      <ArrowUpRight className="h-4 w-4 -rotate-45" />
    </button>
  );

  return (
    <footer className="relative overflow-hidden">
      {/* top divider */}
      <div
        className={`h-px w-full ${isDark ? "bg-white/10" : "bg-slate-200"}`}
      />

      {/* subtle footer glow */}
      <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 -bottom-24 h-72 w-72 rounded-full bg-purple-500/10 blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <motion.div
          variants={wrap}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid gap-8 lg:grid-cols-3"
        >
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div
                className={`inline-flex h-10 w-10 items-center justify-center rounded-2xl border ${
                  isDark
                    ? "border-white/10 bg-white/5"
                    : "border-slate-200 bg-white/80"
                }`}
              >
                {/* ✅ Replaced SV text with /icon.png */}
                <img
                  src="/icon.png"
                  alt="Logo"
                  className="h-7 w-7 rounded-xl object-contain"
                  loading="lazy"
                  onError={(e) => {
                    // fallback: hide image if missing
                    (e.currentTarget as HTMLImageElement).style.display =
                      "none";
                  }}
                />
              </div>

              <div>
                <div
                  className={`${
                    isDark ? "text-white" : "text-slate-900"
                  } font-extrabold`}
                >
                  {details.name}
                </div>
                <div
                  className={`${
                    isDark ? "text-white/55" : "text-slate-600"
                  } text-sm`}
                >
                  Junior Web Developer • Phnom Penh
                </div>
              </div>
            </div>

            <p
              className={`${
                isDark ? "text-white/60" : "text-slate-600"
              } text-sm leading-relaxed max-w-md`}
            >
              Building clean UI, reliable APIs, and full systems. Available for
              internships, freelance client work, and collaboration.
            </p>

            <ScrollTop />
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <div
              className={`${
                isDark ? "text-white/60" : "text-slate-500"
              } text-xs font-bold uppercase tracking-widest`}
            >
              Sections
            </div>

            <div className="grid grid-cols-2 gap-2">
              {navLinks.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className={`group inline-flex items-center justify-between rounded-xl border px-3 py-2 text-sm font-semibold transition-all ${
                    isDark
                      ? "border-white/10 bg-white/5 text-white/75 hover:bg-white/10 hover:border-white/20"
                      : "border-slate-200 bg-white/70 text-slate-700 hover:bg-white hover:border-slate-300"
                  }`}
                >
                  <span>{l.label}</span>
                  <ArrowUpRight
                    className={`${
                      isDark ? "text-white/40" : "text-slate-400"
                    } h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5`}
                  />
                </a>
              ))}
            </div>
          </div>

          {/* Contact / Social */}
          <div className="space-y-4">
            <div
              className={`${
                isDark ? "text-white/60" : "text-slate-500"
              } text-xs font-bold uppercase tracking-widest`}
            >
              Contact
            </div>

            <div className="flex flex-wrap gap-2">
              <SocialPill
                href={`mailto:${details.email}`}
                label="Email"
                icon={<Mail className="h-4 w-4 text-cyan-400" />}
              />
              <SocialPill
                href={`https://t.me/${details.telegram}`}
                label="Telegram"
                icon={<MessageCircle className="h-4 w-4 text-sky-400" />}
              />
              <SocialPill
                href={details.github}
                label="GitHub"
                icon={<Github className="h-4 w-4 text-white/80" />}
              />
              <SocialPill
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  details.location
                )}`}
                label="Location"
                icon={<MapPin className="h-4 w-4 text-purple-400" />}
              />
            </div>

            <div
              className={`rounded-2xl border p-4 ${
                isDark
                  ? "border-white/10 bg-white/5"
                  : "border-slate-200 bg-white/70"
              }`}
            >
              <div
                className={`${
                  isDark ? "text-white/60" : "text-slate-600"
                } text-sm`}
              >
                Email:{" "}
                <a
                  className={`${
                    isDark ? "text-white" : "text-slate-900"
                  } font-semibold`}
                  href={`mailto:${details.email}`}
                >
                  {details.email}
                </a>
              </div>
              <div
                className={`${
                  isDark ? "text-white/60" : "text-slate-600"
                } mt-1 text-sm`}
              >
                Telegram:{" "}
                <a
                  className={`${
                    isDark ? "text-white" : "text-slate-900"
                  } font-semibold`}
                  href={`https://t.me/${details.telegram}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  @{details.telegram}
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* bottom bar */}
        <div
          className={`mt-10 flex flex-col gap-3 border-t pt-6 sm:flex-row sm:items-center sm:justify-between ${
            isDark ? "border-white/10" : "border-slate-200"
          }`}
        >
          <div
            className={`${isDark ? "text-white/45" : "text-slate-500"} text-xs`}
          >
            © {new Date().getFullYear()} {details.name}. All rights reserved.
          </div>

          <div
            className={`${
              isDark ? "text-white/45" : "text-slate-500"
            } text-xs flex items-center gap-1`}
          >
            Built with <Heart className="h-3.5 w-3.5 text-rose-400" /> React +
            Tailwind + Framer Motion
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
