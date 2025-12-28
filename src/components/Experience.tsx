import React, { useMemo } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Briefcase, Calendar, MapPin, ArrowUpRight } from "lucide-react";
import { useTheme } from "@/context/theme";

type Experience = {
  company: string;
  title: string;
  type: "Internship" | "Full-time" | "Part-time" | "Contract" | "Project";
  start: string;
  end: string;
  location?: string;
  logoUrl: string;
  stack: string[];
  highlights: string[];
  href?: string;
  accent: {
    color: string;
    bg: string;
    borderHover: string;
    line: string;
  };
};

const ExperienceSection: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const { isDark } = useTheme();

  const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

  const sectionWrap: Variants = useMemo(
    () => ({
      hidden: { opacity: 0, y: 20 },
      show: {
        opacity: 1,
        y: 0,
        transition: shouldReduceMotion
          ? { duration: 0 }
          : { duration: 0.9, ease, staggerChildren: 0.1, delayChildren: 0.1 },
      },
    }),
    [shouldReduceMotion]
  );

  const item: Variants = useMemo(
    () => ({
      hidden: { opacity: 0, y: 16, filter: "blur(10px)" },
      show: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: shouldReduceMotion
          ? { duration: 0 }
          : { duration: 0.75, ease },
      },
    }),
    [shouldReduceMotion]
  );

  const textReveal: Variants = useMemo(
    () => ({
      hidden: {
        opacity: 0,
        y: 14,
        filter: "blur(10px)",
        clipPath: "inset(0 0 100% 0)",
      },
      show: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        clipPath: "inset(0 0 0% 0)",
        transition: shouldReduceMotion
          ? { duration: 0 }
          : { duration: 0.85, ease },
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
          : { staggerChildren: 0.035, delayChildren: 0.08 },
      },
    }),
    [shouldReduceMotion]
  );

  const word: Variants = useMemo(
    () => ({
      hidden: { opacity: 0, y: 16, filter: "blur(10px)" },
      show: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: shouldReduceMotion
          ? { duration: 0 }
          : { duration: 0.55, ease },
      },
    }),
    [shouldReduceMotion]
  );

  const experiences: Experience[] = [
    {
      company: "DR Tech",
      title: "Frontend Developer Intern",
      type: "Internship",
      start: "Apr 2024",
      end: "Jul 2024",
      logoUrl: "experiences/dr-tech.png",
      stack: ["React.js", "UI Components", "i18n / Multi-language"],
      highlights: [
        "Built reusable card UI components and improved layout consistency.",
        "Helped implement multi-language translation for key screens.",
        "Worked in a React-based codebase and collaborated with the team to ship UI updates.",
      ],
      accent: {
        color: "text-blue-600 dark:text-blue-400",
        bg: "bg-blue-50 dark:bg-blue-500/10",
        borderHover: "group-hover:border-blue-500/30",
        line: "from-blue-500 to-cyan-500",
      },
    },
    {
      company: "Dolphintek",
      title: "WordPress Web Developer",
      type: "Contract",
      start: "Dec 2024",
      end: "Jan 2025",
      logoUrl: "experiences/dolphintek.png",
      stack: ["WordPress", "Elementor Pro", "E-commerce", "CMS", "UI Design"],
      highlights: [
        "Built e-commerce and CMS websites for clients using Elementor Pro.",
        "Designed UI sections and ensured responsive layout across devices.",
        "Delivered client-ready pages with reusable templates and consistent styling.",
      ],
      accent: {
        color: "text-emerald-600 dark:text-emerald-400",
        bg: "bg-emerald-50 dark:bg-emerald-500/10",
        borderHover: "group-hover:border-emerald-500/30",
        line: "from-emerald-500 to-teal-500",
      },
    },
    {
      company: "Norton University",
      title: "Cafe POS System (Thesis Project)",
      type: "Project",
      start: "2024",
      end: "2025",
      logoUrl: "experiences/norton.png",
      stack: [
        "Laravel",
        "Laravel WebSockets",
        "Chart.js",
        "QR Menu",
        "Bakong KHQR",
      ],
      highlights: [
        "Developed a full-featured POS system with cashier and admin roles.",
        "Implemented real-time order tracking using Laravel WebSockets.",
        "Integrated QR code menus and Bakong KHQR e-payment flow.",
        "Built dashboards with Chart.js for sales analytics.",
      ],
      accent: {
        color: "text-purple-600 dark:text-purple-400",
        bg: "bg-purple-50 dark:bg-purple-500/10",
        borderHover: "group-hover:border-purple-500/30",
        line: "from-purple-500 to-pink-500",
      },
    },
  ];

  const headlineText =
    "Experience from internships, client work, and real projects.";
  const headlineWords = useMemo(() => headlineText.split(" "), [headlineText]);

  return (
    <section
      id="experience"
      className="relative overflow-x-hidden overflow-y-visible"
    >
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <motion.div
          variants={sectionWrap}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="space-y-10"
        >
          {/* Header */}
          <motion.div variants={item} className="space-y-6">
            <motion.div variants={item}>
              <div
                className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-widest ring-1 ${
                  isDark
                    ? "bg-white/5 text-white/70 ring-white/10"
                    : "bg-slate-900/5 text-slate-700 ring-slate-900/10"
                }`}
              >
                <Briefcase className="h-4 w-4 text-cyan-400" />
                Experience
              </div>
            </motion.div>

            <motion.h2
              variants={headlineWrap}
              className={`text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl ${
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
              variants={textReveal}
              className={`max-w-2xl text-sm leading-relaxed sm:text-base lg:text-lg ${
                isDark ? "text-white/60" : "text-slate-600"
              }`}
            >
              My IT-related work includes frontend development, WordPress client
              builds, and a full thesis project shipped end-to-end.
            </motion.p>
          </motion.div>

          {/* Cards */}
          <motion.div
            variants={item}
            className="grid gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            {experiences.map((exp) => {
              const baseCard = (
                <motion.div
                  key={`${exp.company}-${exp.title}`}
                  variants={item}
                  whileHover={
                    shouldReduceMotion ? undefined : { y: -3, scale: 1.01 }
                  }
                  className={`group relative h-full flex flex-col overflow-hidden rounded-2xl border
                    p-4 sm:p-5 backdrop-blur transition-all duration-300 ${
                      exp.accent.borderHover
                    }
                    ${
                      isDark
                        ? "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10 hover:shadow-xl hover:shadow-black/40"
                        : "border-slate-200 bg-white/70 hover:bg-white hover:shadow-xl hover:shadow-slate-200/60"
                    }`}
                >
                  {/* Header: responsive layout */}
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex min-w-0 items-center gap-3">
                      <div
                        className={`flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-2xl border shrink-0 ${
                          isDark
                            ? "border-white/10 bg-white/5"
                            : "border-slate-200 bg-white"
                        }`}
                      >
                        <img
                          src={exp.logoUrl}
                          alt={`${exp.company} logo`}
                          className="h-6 w-6 sm:h-7 sm:w-7 object-contain"
                        />
                      </div>

                      <div className="min-w-0">
                        <div
                          className={`text-sm sm:text-base font-extrabold leading-tight ${
                            isDark ? "text-white" : "text-slate-900"
                          }`}
                        >
                          {/* allow wrap on mobile */}
                          <span className="block break-words">
                            {exp.company}
                          </span>
                        </div>
                        <div
                          className={`mt-0.5 text-xs sm:text-sm leading-snug ${
                            isDark ? "text-white/60" : "text-slate-600"
                          }`}
                        >
                          <span className="block break-words">{exp.title}</span>
                        </div>
                      </div>
                    </div>

                    <div
                      className={`self-start sm:self-auto shrink-0 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest ring-1 ${
                        isDark
                          ? "bg-white/5 text-white/70 ring-white/10"
                          : "bg-slate-900/5 text-slate-700 ring-slate-900/10"
                      }`}
                    >
                      {exp.type}
                    </div>
                  </div>

                  {/* Meta pills: full width on small screens */}
                  <div className="mt-4 grid gap-2 sm:flex sm:flex-wrap sm:items-center">
                    <div
                      className={`w-full sm:w-auto inline-flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold ${exp.accent.bg}`}
                    >
                      <Calendar className={`h-4 w-4 ${exp.accent.color}`} />
                      <span
                        className={`${
                          isDark ? "text-white/80" : "text-slate-700"
                        }`}
                      >
                        {exp.start} — {exp.end}
                      </span>
                    </div>

                    {exp.location && (
                      <div
                        className={`w-full sm:w-auto inline-flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold ${
                          isDark
                            ? "bg-white/5 text-white/70"
                            : "bg-slate-900/5 text-slate-700"
                        }`}
                      >
                        <MapPin className="h-4 w-4 text-cyan-400" />
                        {exp.location}
                      </div>
                    )}
                  </div>

                  {/* Stack chips: smaller on mobile + better wrapping */}
                  <div className="mt-4 flex flex-wrap gap-2">
                    {exp.stack.map((t) => (
                      <span
                        key={t}
                        className={`rounded-full px-2.5 py-1 text-[11px] sm:text-xs font-semibold ring-1 ${
                          isDark
                            ? "bg-white/5 text-white/70 ring-white/10"
                            : "bg-white text-slate-700 ring-slate-200"
                        }`}
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Highlights: tighter on mobile */}
                  <ul
                    className={`mt-4 flex-1 space-y-2 text-[13px] sm:text-sm ${
                      isDark ? "text-white/60" : "text-slate-600"
                    }`}
                  >
                    {exp.highlights.map((h) => (
                      <li key={h} className="flex gap-2">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400" />
                        <span className="leading-relaxed">{h}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Footer link (better on mobile than floating icon) */}
                  {exp.href && (
                    <div className="mt-4 flex items-center justify-between pt-3 border-t border-white/10">
                      <span
                        className={`text-xs font-semibold ${
                          isDark ? "text-white/70" : "text-slate-700"
                        }`}
                      >
                        View details
                      </span>
                      <ArrowUpRight
                        className={`${
                          isDark ? "text-white/50" : "text-slate-500"
                        } h-4 w-4`}
                      />
                    </div>
                  )}

                  {/* Bottom gradient line */}
                  <div
                    className={`absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r ${exp.accent.line}
                      group-hover:w-full transition-all duration-500 ease-out`}
                  />
                </motion.div>
              );

              return exp.href ? (
                <a
                  key={`${exp.company}-${exp.title}-link`}
                  href={exp.href}
                  className="block h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60 rounded-2xl"
                  aria-label={`Open ${exp.company}`}
                >
                  {baseCard}
                </a>
              ) : (
                <div key={`${exp.company}-${exp.title}`} className="h-full">
                  {baseCard}
                </div>
              );
            })}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ExperienceSection;
