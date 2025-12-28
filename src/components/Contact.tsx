import React, { useMemo, useState } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Copy,
  Check,
  MessageCircle,
  Sparkles,
} from "lucide-react";
import { useTheme } from "@/context/theme";

type MobilePanel = "details" | "message";

const ContactSection: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const { isDark } = useTheme();

  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [mobilePanel, setMobilePanel] = useState<MobilePanel>("details");

  const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

  const sectionWrap: Variants = useMemo(
    () => ({
      hidden: { opacity: 0, y: 20 },
      show: {
        opacity: 1,
        y: 0,
        transition: shouldReduceMotion
          ? { duration: 0 }
          : { duration: 0.9, ease, staggerChildren: 0.08, delayChildren: 0.08 },
      },
    }),
    [shouldReduceMotion]
  );

  const item: Variants = useMemo(
    () => ({
      hidden: { opacity: 0, y: 14, filter: "blur(10px)" },
      show: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: shouldReduceMotion
          ? { duration: 0 }
          : { duration: 0.7, ease },
      },
    }),
    [shouldReduceMotion]
  );

  const headlineWrap: Variants = useMemo(
    () => ({
      hidden: {},
      show: {
        transition: shouldReduceMotion
          ? { duration: 0 }
          : { staggerChildren: 0.03, delayChildren: 0.06 },
      },
    }),
    [shouldReduceMotion]
  );

  const word: Variants = useMemo(
    () => ({
      hidden: { opacity: 0, y: 12, filter: "blur(10px)" },
      show: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: shouldReduceMotion
          ? { duration: 0 }
          : { duration: 0.5, ease },
      },
    }),
    [shouldReduceMotion]
  );

  const headlineText = "Let’s build something clean and useful together.";
  const headlineWords = useMemo(() => headlineText.split(" "), [headlineText]);

  const details = {
    name: "Sruoy Veasna",
    email: "veasnagva@gmail.com",
    phone: "+855 16841830",
    telegram: "veasnasruoy",
    location: "Chroy Changvar, Phnom Penh, Cambodia",
  };

  const copyToClipboard = async (key: string, value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedKey(key);
      window.setTimeout(() => setCopiedKey(null), 1200);
    } catch {
      // ignore
    }
  };

  const CardShell = ({
    children,
    className = "",
  }: {
    children: React.ReactNode;
    className?: string;
  }) => (
    <div
      className={`relative overflow-hidden rounded-2xl border backdrop-blur transition-all duration-300 ${className} ${
        isDark
          ? "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10 hover:shadow-xl hover:shadow-black/40"
          : "border-slate-200 bg-white/70 hover:bg-white hover:shadow-xl hover:shadow-slate-200/60"
      }`}
    >
      {children}
      <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-cyan-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -left-20 -bottom-20 h-56 w-56 rounded-full bg-purple-500/10 blur-3xl" />
    </div>
  );

  const ContactRow = ({
    icon,
    label,
    value,
    href,
    copyValue,
    copyKey,
  }: {
    icon: React.ReactNode;
    label: string;
    value: string;
    href?: string;
    copyValue?: string;
    copyKey?: string;
  }) => {
    const copied = copyKey && copiedKey === copyKey;

    return (
      <motion.div
        whileHover={shouldReduceMotion ? undefined : { y: -2, scale: 1.005 }}
        className={`flex items-center gap-3 rounded-xl border px-3 py-3 sm:px-4 ${
          isDark ? "border-white/10 bg-white/5" : "border-slate-200 bg-white/70"
        }`}
      >
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <div
            className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
              isDark ? "bg-white/5" : "bg-slate-900/5"
            }`}
          >
            {icon}
          </div>

          <div className="min-w-0">
            <div
              className={`${
                isDark ? "text-white/60" : "text-slate-500"
              } text-[11px] sm:text-xs font-bold uppercase tracking-widest`}
            >
              {label}
            </div>

            {href ? (
              <a
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noreferrer" : undefined}
                className={`block truncate font-semibold text-sm sm:text-base ${
                  isDark
                    ? "text-white hover:text-white"
                    : "text-slate-900 hover:text-slate-900"
                }`}
              >
                {value}
              </a>
            ) : (
              <div
                className={`${
                  isDark ? "text-white" : "text-slate-900"
                } truncate font-semibold text-sm sm:text-base`}
              >
                {value}
              </div>
            )}
          </div>
        </div>

        {copyValue && copyKey ? (
          <button
            type="button"
            onClick={() => copyToClipboard(copyKey, copyValue)}
            className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ring-1 transition-all ${
              isDark
                ? "bg-white/5 text-white/80 ring-white/10 hover:bg-white/10"
                : "bg-white text-slate-800 ring-slate-200 hover:bg-slate-50"
            }`}
            aria-label={`Copy ${label}`}
            title={`Copy ${label}`}
          >
            {copied ? (
              <Check className="h-5 w-5 text-emerald-400" />
            ) : (
              <Copy className="h-5 w-5" />
            )}
          </button>
        ) : null}
      </motion.div>
    );
  };

  // ✅ Improved active/hover tabs
  const MobileTabs = () => {
    const base =
      "relative flex-1 rounded-xl px-4 py-2.5 text-sm font-extrabold ring-1 transition-all select-none";
    const activeClass = isDark
      ? "text-white ring-white/20"
      : "text-slate-900 ring-slate-900/15";
    const inactiveClass = isDark
      ? "bg-white/5 text-white/70 ring-white/10 hover:bg-white/10 hover:text-white hover:ring-white/20"
      : "bg-white/70 text-slate-700 ring-slate-200 hover:bg-white hover:text-slate-900 hover:ring-slate-300";

    const ActiveBg = () => (
      <>
        <span
          aria-hidden="true"
          className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/25 via-blue-500/20 to-purple-500/25"
        />
        <span
          aria-hidden="true"
          className="absolute -inset-3 rounded-2xl bg-cyan-500/10 blur-xl"
        />
      </>
    );

    return (
      <div className="flex gap-2 lg:hidden">
        <motion.button
          type="button"
          onClick={() => setMobilePanel("details")}
          whileHover={shouldReduceMotion ? undefined : { y: -2, scale: 1.01 }}
          whileTap={shouldReduceMotion ? undefined : { scale: 0.99 }}
          className={`${base} ${
            mobilePanel === "details" ? activeClass : inactiveClass
          }`}
        >
          {mobilePanel === "details" ? <ActiveBg /> : null}
          <span className="relative z-10">Details</span>
        </motion.button>

        <motion.button
          type="button"
          onClick={() => setMobilePanel("message")}
          whileHover={shouldReduceMotion ? undefined : { y: -2, scale: 1.01 }}
          whileTap={shouldReduceMotion ? undefined : { scale: 0.99 }}
          className={`${base} ${
            mobilePanel === "message" ? activeClass : inactiveClass
          }`}
        >
          {mobilePanel === "message" ? <ActiveBg /> : null}
          <span className="relative z-10">Quick Message</span>
        </motion.button>
      </div>
    );
  };

  const DetailsCard = () => (
    <CardShell className="p-4 sm:p-5">
      <div className="space-y-3">
        <ContactRow
          icon={<Mail className="h-5 w-5 text-cyan-400" />}
          label="Email"
          value={details.email}
          href={`mailto:${details.email}`}
          copyKey="email"
          copyValue={details.email}
        />
        <ContactRow
          icon={<Phone className="h-5 w-5 text-emerald-400" />}
          label="Phone"
          value={details.phone}
          href={`tel:${details.phone.replace(/\s+/g, "")}`}
          copyKey="phone"
          copyValue={details.phone}
        />
        <ContactRow
          icon={<MessageCircle className="h-5 w-5 text-sky-400" />}
          label="Telegram"
          value={`@${details.telegram}`}
          href={`https://t.me/${details.telegram}`}
          copyKey="telegram"
          copyValue={details.telegram}
        />
        <ContactRow
          icon={<MapPin className="h-5 w-5 text-purple-400" />}
          label="Location"
          value={details.location}
          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
            details.location
          )}`}
          copyKey="location"
          copyValue={details.location}
        />
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 lg:hidden">
        <a
          href={`mailto:${details.email}`}
          className={`inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-extrabold ring-1 transition ${
            isDark
              ? "bg-white/5 text-white ring-white/10 hover:bg-white/10"
              : "bg-white text-slate-900 ring-slate-200 hover:bg-slate-50"
          }`}
        >
          <Mail className="h-4 w-4 text-cyan-400" />
          Email
        </a>
        <a
          href={`https://t.me/${details.telegram}`}
          target="_blank"
          rel="noreferrer"
          className={`inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-extrabold ring-1 transition ${
            isDark
              ? "bg-white/5 text-white ring-white/10 hover:bg-white/10"
              : "bg-white text-slate-900 ring-slate-200 hover:bg-slate-50"
          }`}
        >
          <MessageCircle className="h-4 w-4 text-sky-400" />
          Telegram
        </a>
      </div>
    </CardShell>
  );

  const QuickMessageCard = () => (
    <CardShell className="p-5 sm:p-7">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div
            className={`${
              isDark ? "text-white/60" : "text-slate-500"
            } text-[11px] sm:text-xs font-bold uppercase tracking-widest`}
          >
            Quick Message
          </div>
          <h3
            className={`${
              isDark ? "text-white" : "text-slate-900"
            } mt-2 text-lg sm:text-xl font-extrabold`}
          >
            Send an email in one click
          </h3>
          <p
            className={`${
              isDark ? "text-white/60" : "text-slate-600"
            } mt-2 text-sm leading-relaxed`}
          >
            Opens your mail app with a pre-filled subject and message.
          </p>
        </div>

        <div
          className={`hidden sm:flex h-12 w-12 items-center justify-center rounded-2xl border ${
            isDark
              ? "border-white/10 bg-white/5"
              : "border-slate-200 bg-white/70"
          }`}
        >
          <Send className="h-6 w-6 text-cyan-400" />
        </div>
      </div>

      <div className="mt-5 sm:mt-6 space-y-3">
        <div
          className={`rounded-xl border px-4 py-3 ${
            isDark
              ? "border-white/10 bg-white/5"
              : "border-slate-200 bg-white/70"
          }`}
        >
          <div
            className={`${
              isDark ? "text-white/60" : "text-slate-500"
            } text-[11px] sm:text-xs font-bold uppercase tracking-widest`}
          >
            To
          </div>
          <div
            className={`${
              isDark ? "text-white" : "text-slate-900"
            } mt-1 font-semibold break-words`}
          >
            {details.email}
          </div>
        </div>

        <div
          className={`rounded-xl border px-4 py-3 ${
            isDark
              ? "border-white/10 bg-white/5"
              : "border-slate-200 bg-white/70"
          }`}
        >
          <div
            className={`${
              isDark ? "text-white/60" : "text-slate-500"
            } text-[11px] sm:text-xs font-bold uppercase tracking-widest`}
          >
            Suggested subject
          </div>
          <div
            className={`${
              isDark ? "text-white" : "text-slate-900"
            } mt-1 font-semibold`}
          >
            Project Inquiry — Portfolio / System
          </div>
        </div>

        <a
          href={`mailto:${details.email}?subject=${encodeURIComponent(
            "Project Inquiry — Portfolio / System"
          )}&body=${encodeURIComponent(
            `Hi ${details.name},\n\nI’d like to discuss a project. Here are the details:\n- Project type:\n- Timeline:\n- Budget:\n\nThanks,\n`
          )}`}
          className={`mt-2 inline-flex w-full items-center justify-center gap-2 rounded-2xl px-4 py-3.5 text-sm font-extrabold ring-1 transition-all ${
            isDark
              ? "bg-white/5 text-white ring-white/10 hover:bg-white/10"
              : "bg-slate-900 text-white ring-slate-900/20 hover:bg-slate-800"
          }`}
        >
          <Send className="h-4 w-4" />
          Email Me
        </a>

        <div
          className={`${isDark ? "text-white/45" : "text-slate-500"} text-xs`}
        >
          Or message me on Telegram:{" "}
          <a
            className={`${
              isDark
                ? "text-white/70 hover:text-white"
                : "text-slate-700 hover:text-slate-900"
            } font-semibold`}
            href={`https://t.me/${details.telegram}`}
            target="_blank"
            rel="noreferrer"
          >
            @{details.telegram}
          </a>
        </div>
      </div>
    </CardShell>
  );

  return (
    <section id="contact" className="relative">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <motion.div
          variants={sectionWrap}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="space-y-6"
        >
          <motion.div variants={item} className="space-y-4">
            <div
              className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-widest ring-1 ${
                isDark
                  ? "bg-white/5 text-white/70 ring-white/10"
                  : "bg-slate-900/5 text-slate-700 ring-slate-900/10"
              }`}
            >
              <Sparkles className="h-4 w-4 text-cyan-400" />
              Contact
            </div>

            <motion.h2
              variants={headlineWrap}
              className={`text-3xl font-extrabold tracking-tight sm:text-5xl ${
                isDark ? "text-white" : "text-slate-900"
              }`}
            >
              {headlineWords.map((w, i) => (
                <motion.span
                  key={`${w}-${i}`}
                  variants={word}
                  className="mr-2 inline-block"
                >
                  {w}
                </motion.span>
              ))}
            </motion.h2>

            <motion.p
              variants={item}
              className={`max-w-xl text-sm leading-relaxed sm:text-lg ${
                isDark ? "text-white/60" : "text-slate-600"
              }`}
            >
              Want a portfolio site, a Laravel system, or a clean UI upgrade?
              Send me a message — I respond fast.
            </motion.p>
          </motion.div>

          {/* MOBILE */}
          <motion.div variants={item} className="space-y-4 lg:hidden">
            <MobileTabs />
            {mobilePanel === "details" ? <DetailsCard /> : <QuickMessageCard />}
          </motion.div>

          {/* DESKTOP */}
          <motion.div
            variants={item}
            className="hidden lg:grid gap-10 lg:grid-cols-2"
          >
            <div className="space-y-6">
              <DetailsCard />
            </div>

            <div className="lg:flex lg:justify-end">
              <div className="w-full max-w-xl">
                <QuickMessageCard />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
