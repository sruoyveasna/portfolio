import React, { useMemo, useState } from "react";
import {
  motion,
  useReducedMotion,
  type Variants,
  AnimatePresence,
} from "framer-motion";
import { Award, Calendar, Tag } from "lucide-react";
import { useTheme } from "@/context/theme";

type Certificate = {
  id: string;
  name: string;
  field: string;
  year: number;
  imageUrl: string;
  issuer?: string;
  href?: string;
  accent?: {
    bg: string;
    color: string;
    borderHover: string;
    line: string;
  };
};

const PAGE_SIZE = 4;

const Certificates: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const { isDark } = useTheme();

  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

  const sectionWrap: Variants = useMemo(
    () => ({
      hidden: { opacity: 0, y: 20 },
      show: {
        opacity: 1,
        y: 0,
        transition: shouldReduceMotion
          ? { duration: 0 }
          : { duration: 0.9, ease, staggerChildren: 0.08, delayChildren: 0.05 },
      },
    }),
    [shouldReduceMotion, ease]
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
          : { duration: 0.6, ease },
      },
    }),
    [shouldReduceMotion, ease]
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
    [shouldReduceMotion, ease]
  );

  const certificates: Certificate[] = useMemo(
    () => [
      {
        id: "aws-data-center-tour-1",
        name: "Uncovering Cloud Computing",
        field: "Cloud",
        year: 2024,
        issuer: "AWS Data Center Tour 1",
        imageUrl: "/certificates/img/aws_cloud.jpg",
        href: "/certificates/aws_cloud_computing.pdf",
        accent: {
          color: "text-blue-600 dark:text-blue-400",
          bg: "bg-blue-50 dark:bg-blue-500/10",
          borderHover: "group-hover:border-blue-500/30",
          line: "from-blue-500 to-cyan-500",
        },
      },
      {
        id: "basic-adv-ccpp-2023",
        name: "Basic/Advanced C /CPP /OOP &Prject",
        field: "Backend",
        year: 2023,
        issuer: "Engineering Of Technology & Electronic Center",
        imageUrl: "/certificates/img/back_end.jpg",
        href: "/certificates/backend_c_cpp_oop.pdf",
        accent: {
          color: "text-emerald-600 dark:text-emerald-400",
          bg: "bg-emerald-50 dark:bg-emerald-500/10",
          borderHover: "group-hover:border-emerald-500/30",
          line: "from-emerald-500 to-teal-500",
        },
      },
      {
        id: "react-internship-2024",
        name: "Frontend Developer Internship",
        field: "Frontend",
        year: 2024,
        issuer: "DR Tech",
        imageUrl: "/certificates/img/frontend_intern.jpg",
        href: "/certificates/frontend_internship.pdf",
        accent: {
          color: "text-purple-600 dark:text-purple-400",
          bg: "bg-purple-50 dark:bg-purple-500/10",
          borderHover: "group-hover:border-purple-500/30",
          line: "from-purple-500 to-pink-500",
        },
      },
      {
        id: "thesis-project-2025",
        name: "Fullstack Developer Thesis Project",
        field: "Fullstack",
        year: 2025,
        issuer: "Eden Cafe",
        imageUrl: "/certificates/img/eden_pos_thesis.png",
        href: "/certificates/fullstack_thesis_project.pdf",
        accent: {
          color: "text-amber-600 dark:text-amber-400",
          bg: "bg-amber-50 dark:bg-amber-500/10",
          borderHover: "group-hover:border-amber-500/30",
          line: "from-amber-500 to-orange-500",
        },
      },
      {
        id: "english-advanced-2020",
        name: "General English Program",
        field: "English",
        year: 2020,
        issuer: "Elite Tuition Center",
        imageUrl: "/certificates/img/English_general.jpg",
        href: "/certificates/English_general_program.pdf",
        accent: {
          color: "text-blue-600 dark:text-blue-400",
          bg: "bg-blue-50 dark:bg-blue-500/10",
          borderHover: "group-hover:border-blue-500/30",
          line: "from-blue-500 to-cyan-500",
        },
      },
      {
        id: "training-capacity-building-2023",
        name: "Capcity Building Training",
        field: "Training",
        year: 2020,
        issuer: "The Tribal Education Group",
        imageUrl: "/certificates/img/mindset_training.jpg",
        href: "/certificates/mindset_training.pdf",
        accent: {
          color: "text-emerald-600 dark:text-emerald-400",
          bg: "bg-emerald-50 dark:bg-emerald-500/10",
          borderHover: "group-hover:border-emerald-500/30",
          line: "from-emerald-500 to-teal-500",
        },
      },
      {
        id: "baccII-2020",
        name: "High School Diploma",
        field: "Education",
        year: 2020,
        issuer: "Ministry of Education",
        imageUrl: "/certificates/img/diploma_highschool.jpg",
        href: "/certificates/high_school_diploma.pdf",
        accent: {
          color: "text-emerald-600 dark:text-emerald-400",
          bg: "bg-emerald-50 dark:bg-emerald-500/10",
          borderHover: "group-hover:border-emerald-500/30",
          line: "from-emerald-500 to-teal-500",
        },
      },
    ],
    []
  );

  const displayed = useMemo(
    () => certificates.slice(0, visibleCount),
    [certificates, visibleCount]
  );

  const canShowMore = visibleCount < certificates.length;
  const canShowLess = visibleCount > PAGE_SIZE;

  return (
    <section
      id="certificates"
      className="relative overflow-x-hidden overflow-y-visible"
    >
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
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
                <Award className="h-4 w-4 text-cyan-400" />
                Certificates
              </div>
            </motion.div>

            <motion.h2
              variants={item}
              className="gradient-shine text-4xl font-extrabold tracking-tight sm:text-5xl"
            >
              Certificates that prove skills I’ve practiced and shipped.
            </motion.h2>

            <motion.p
              variants={textReveal}
              className={`max-w-2xl text-base leading-relaxed sm:text-lg ${
                isDark ? "text-white/60" : "text-slate-600"
              }`}
            >
              A curated list of certifications I’ve earned across frontend,
              backend, data, and performance.
            </motion.p>

            <div
              className={`text-sm ${
                isDark ? "text-white/45" : "text-slate-500"
              }`}
            >
              Showing {Math.min(visibleCount, certificates.length)} of{" "}
              {certificates.length}
            </div>
          </motion.div>

          {/* Cards (✅ equal height rows) */}
          <motion.div
            layout
            className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 [grid-auto-rows:1fr]"
          >
            <AnimatePresence initial={false}>
              {displayed.map((c) => {
                const accent = c.accent ?? {
                  color: "text-cyan-600 dark:text-cyan-400",
                  bg: "bg-cyan-50 dark:bg-cyan-500/10",
                  borderHover: "group-hover:border-cyan-500/30",
                  line: "from-cyan-500 to-blue-500",
                };

                const MotionEl: any = c.href ? motion.a : motion.div;

                return (
                  <MotionEl
                    key={c.id}
                    {...(c.href ? { href: c.href } : {})}
                    layout
                    variants={item}
                    initial={shouldReduceMotion ? false : "hidden"}
                    animate={shouldReduceMotion ? undefined : "show"}
                    exit={{ opacity: 0, y: 10 }}
                    whileHover={
                      shouldReduceMotion ? undefined : { y: -3, scale: 1.01 }
                    }
                    className={`group relative h-full overflow-hidden rounded-2xl border backdrop-blur transition-all duration-300 flex flex-col focus:outline-none ${
                      accent.borderHover
                    } ${
                      isDark
                        ? "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10 hover:shadow-xl hover:shadow-black/40"
                        : "border-slate-200 bg-white/70 hover:bg-white hover:shadow-xl hover:shadow-slate-200/60"
                    }`}
                    aria-label={
                      c.href ? `Open certificate: ${c.name}` : undefined
                    }
                  >
                    {/* Image */}
                    <div className="relative aspect-[16/9] w-full overflow-hidden">
                      <img
                        src={c.imageUrl}
                        alt={c.name}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.06]"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
                      <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-widest ring-1 ring-white/15 bg-black/25 text-white/85 backdrop-blur">
                        <Tag className="h-3.5 w-3.5 text-cyan-300" />
                        {c.field}
                      </div>
                    </div>

                    {/* Content (✅ stretch + bottom align) */}
                    <div className="p-5 flex flex-col flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <h3
                          className={`text-base font-extrabold tracking-tight line-clamp-2 ${
                            isDark ? "text-white" : "text-slate-900"
                          }`}
                        >
                          {c.name}
                        </h3>

                        <div
                          className={`shrink-0 inline-flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-bold ${accent.bg}`}
                          title="Year"
                        >
                          <Calendar className={`h-4 w-4 ${accent.color}`} />
                          <span
                            className={`${
                              isDark ? "text-white/80" : "text-slate-700"
                            }`}
                          >
                            {c.year}
                          </span>
                        </div>
                      </div>

                      {/* push issuer to bottom for consistent card height */}
                      <div className="mt-auto pt-3">
                        <span
                          className={`text-xs line-clamp-2 ${
                            isDark ? "text-white/55" : "text-slate-600"
                          }`}
                        >
                          {c.issuer ? (
                            <>
                              Issued by{" "}
                              <span className="font-semibold">{c.issuer}</span>
                            </>
                          ) : (
                            "Certificate details"
                          )}
                        </span>
                      </div>
                    </div>

                    {/* Bottom gradient line */}
                    <div
                      className={`absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r ${accent.line}
                      group-hover:w-full transition-all duration-500 ease-out`}
                    />
                  </MotionEl>
                );
              })}
            </AnimatePresence>
          </motion.div>

          {/* Show more / Show less */}
          {certificates.length > PAGE_SIZE && (
            <motion.div
              variants={item}
              className="flex justify-center gap-3 pt-2"
            >
              {canShowLess && (
                <button
                  type="button"
                  onClick={() => {
                    setVisibleCount(PAGE_SIZE);
                    setTimeout(() => {
                      document
                        .getElementById("certificates")
                        ?.scrollIntoView({ behavior: "smooth" });
                    }, 50);
                  }}
                  className={`rounded-2xl px-5 py-3 text-sm font-bold transition-all ring-1 ${
                    isDark
                      ? "bg-white/5 text-white/80 ring-white/10 hover:bg-white/10"
                      : "bg-white text-slate-800 ring-slate-200 hover:shadow-lg hover:shadow-slate-200/60"
                  }`}
                >
                  Show less
                </button>
              )}

              {canShowMore && (
                <button
                  type="button"
                  onClick={() =>
                    setVisibleCount((c) =>
                      Math.min(c + PAGE_SIZE, certificates.length)
                    )
                  }
                  className={`rounded-2xl px-5 py-3 text-sm font-bold transition-all ring-1 ${
                    isDark
                      ? "bg-white/5 text-white/80 ring-white/10 hover:bg-white/10"
                      : "bg-white text-slate-800 ring-slate-200 hover:shadow-lg hover:shadow-slate-200/60"
                  }`}
                >
                  Show more
                </button>
              )}
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Gradient Shine */}
      <style>{`
        .gradient-shine {
          background-image: linear-gradient(
            90deg,
            #22d3ee 0%,
            #3b82f6 35%,
            #a78bfa 70%,
            #22d3ee 100%
          );
          background-size: 220% 100%;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: gradientShine 2.6s linear infinite;
        }

        @keyframes gradientShine {
          0% { background-position: 0% 50%; }
          100% { background-position: 220% 50%; }
        }

        @media (prefers-reduced-motion: reduce) {
          .gradient-shine { animation: none; }
        }
      `}</style>
    </section>
  );
};

export default Certificates;
