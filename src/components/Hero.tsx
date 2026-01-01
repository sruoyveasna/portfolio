import { Github, Linkedin, Mail } from "lucide-react";
import {
  motion,
  useReducedMotion,
  type TargetAndTransition,
  type Variants,
} from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { useTheme } from "@/context/theme";

type BrandToken = {
  bg: string; // hover background
  fg: string; // hover foreground (text/icon)
  border?: string; // hover border
  glow?: string; // hover shadow color
};

const BRANDS: Record<string, BrandToken> = {
  // Skills
  HTML: {
    bg: "#E34F26",
    fg: "#FFFFFF",
    border: "#E34F26",
    glow: "rgba(227,79,38,.35)",
  },
  CSS: {
    bg: "#1572B6",
    fg: "#FFFFFF",
    border: "#1572B6",
    glow: "rgba(21,114,182,.35)",
  },
  JavaScript: {
    bg: "#F7DF1E",
    fg: "#111827",
    border: "#F7DF1E",
    glow: "rgba(247,223,30,.35)",
  },
  PHP: {
    bg: "#777BB4",
    fg: "#FFFFFF",
    border: "#777BB4",
    glow: "rgba(119,123,180,.35)",
  },
  Laravel: {
    bg: "#FF2D20",
    fg: "#FFFFFF",
    border: "#FF2D20",
    glow: "rgba(255,45,32,.35)",
  },
  "C#.NET": {
    bg: "#512BD4",
    fg: "#FFFFFF",
    border: "#512BD4",
    glow: "rgba(81,43,212,.35)",
  },

  // Social
  GitHub: {
    bg: "#0B0F19",
    fg: "#FFFFFF",
    border: "#0B0F19",
    glow: "rgba(11,15,25,.35)",
  },
  LinkedIn: {
    bg: "#0A66C2",
    fg: "#FFFFFF",
    border: "#0A66C2",
    glow: "rgba(10,102,194,.35)",
  },
  Email: {
    bg: "#EA4335",
    fg: "#FFFFFF",
    border: "#EA4335",
    glow: "rgba(234,67,53,.35)",
  },
};

const brandStyle = (key: string) => {
  const t = BRANDS[key];
  if (!t) return undefined;

  // CSS vars so Tailwind can reference them in hover classes
  return {
    ["--brand-bg" as any]: t.bg,
    ["--brand-fg" as any]: t.fg,
    ["--brand-border" as any]: t.border ?? t.bg,
    ["--brand-glow" as any]: t.glow ?? "rgba(59,130,246,.28)",
  } as React.CSSProperties;
};

const Hero = () => {
  const shouldReduceMotion = useReducedMotion();
  const { isDark } = useTheme();

  const scrollToId = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const yOffset = -80;
    const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

  // Typing loop
  const TYPE_TEXT = "Full Stack Web Developer";
  const [typedText, setTypedText] = useState<string>(
    shouldReduceMotion ? TYPE_TEXT : ""
  );
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (shouldReduceMotion) {
      setTypedText(TYPE_TEXT);
      return;
    }

    let t: number;
    const typeSpeed = 70;
    const deleteSpeed = 45;
    const pauseAfterTyped = 1300;
    const pauseAfterDeleted = 450;

    if (!isDeleting) {
      if (typedText.length < TYPE_TEXT.length) {
        t = window.setTimeout(() => {
          setTypedText(TYPE_TEXT.slice(0, typedText.length + 1));
        }, typeSpeed);
      } else {
        t = window.setTimeout(() => setIsDeleting(true), pauseAfterTyped);
      }
    } else {
      if (typedText.length > 0) {
        t = window.setTimeout(() => {
          setTypedText(TYPE_TEXT.slice(0, typedText.length - 1));
        }, deleteSpeed);
      } else {
        t = window.setTimeout(() => setIsDeleting(false), pauseAfterDeleted);
      }
    }

    return () => window.clearTimeout(t);
  }, [typedText, isDeleting, shouldReduceMotion]);

  const container: Variants = useMemo(
    () => ({
      hidden: { opacity: 0, y: 18 },
      show: {
        opacity: 1,
        y: 0,
        transition: shouldReduceMotion
          ? { duration: 0 }
          : { duration: 0.9, ease, staggerChildren: 0.08, delayChildren: 0.05 },
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

  const popItem: Variants = useMemo(
    () => ({
      hidden: { opacity: 0, y: 18, scale: 0.98, filter: "blur(10px)" },
      show: {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
        transition: shouldReduceMotion
          ? { duration: 0 }
          : { duration: 0.85, ease },
      },
    }),
    [shouldReduceMotion]
  );

  const statsWrap: Variants = useMemo(
    () => ({
      hidden: { opacity: 0, y: 18 },
      show: {
        opacity: 1,
        y: 0,
        transition: shouldReduceMotion
          ? { duration: 0 }
          : {
              duration: 0.85,
              ease,
              staggerChildren: 0.08,
              delayChildren: 0.15,
            },
      },
    }),
    [shouldReduceMotion]
  );

  const statsItem: Variants = useMemo(
    () => ({
      hidden: { opacity: 0, y: 14, scale: 0.985 },
      show: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: shouldReduceMotion
          ? { duration: 0 }
          : { duration: 0.65, ease },
      },
    }),
    [shouldReduceMotion]
  );

  const floatAnim: TargetAndTransition | undefined = shouldReduceMotion
    ? undefined
    : {
        y: [0, -10, 0],
        transition: { duration: 4.8, repeat: Infinity, ease: "easeInOut" },
      };

  const ringRotate: TargetAndTransition | undefined = shouldReduceMotion
    ? undefined
    : {
        rotate: [0, 360],
        transition: { duration: 18, repeat: Infinity, ease: "linear" },
      };

  const ringPulse: TargetAndTransition | undefined = shouldReduceMotion
    ? undefined
    : {
        scale: [1, 1.03, 1],
        opacity: [0.78, 1, 0.78],
        transition: { duration: 3.6, repeat: Infinity, ease: "easeInOut" },
      };

  const nameShine: TargetAndTransition | undefined = shouldReduceMotion
    ? undefined
    : {
        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        transition: { duration: 6, repeat: Infinity, ease: "easeInOut" },
      };

  const badgeSweep: TargetAndTransition | undefined = shouldReduceMotion
    ? undefined
    : {
        backgroundPosition: ["0% 50%", "100% 50%"],
        transition: { duration: 3.2, repeat: Infinity, ease: "linear" },
      };

  return (
    <section
      id="home"
      className="relative overflow-x-hidden overflow-y-visible min-h-[100svh] lg:min-h-screen"
    >
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-x-0 top-0 h-40 -z-10 ${
          isDark
            ? "bg-gradient-to-b from-slate-950/70 via-slate-950/20 to-transparent"
            : "bg-gradient-to-b from-white/80 via-white/40 to-transparent"
        }`}
      />

      {!shouldReduceMotion && (
        <>
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute -left-24 top-28 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl"
            animate={{ x: [0, 18, 0], y: [0, -10, 0], scale: [1, 1.05, 1] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute -right-28 top-16 h-80 w-80 rounded-full bg-purple-500/16 blur-3xl"
            animate={{ x: [0, -18, 0], y: [0, 12, 0], scale: [1, 1.06, 1] }}
            transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
          />
        </>
      )}

      <style>{`
        @keyframes statsGlow {
          0%, 100% { opacity: .55; transform: scale(1); filter: blur(18px); }
          50% { opacity: .9; transform: scale(1.02); filter: blur(22px); }
        }
        @keyframes statsShimmer {
          0% { transform: translateX(-60%); opacity: 0; }
          15% { opacity: .35; }
          50% { opacity: .20; }
          100% { transform: translateX(60%); opacity: 0; }
        }
        @keyframes numberGradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>

      <div className="mx-auto max-w-7xl px-4 pt-20 pb-8 sm:px-6 lg:px-8 lg:min-h-screen lg:flex lg:flex-col lg:justify-center lg:pt-0 lg:pb-0">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid items-center gap-10 lg:grid-cols-2"
        >
          {/* LEFT */}
          <motion.div
            variants={item}
            className="relative flex justify-center lg:justify-start"
          >
            <motion.div
              className="relative h-[300px] w-[300px] sm:h-[360px] sm:w-[360px] lg:h-[380px] lg:w-[380px]"
              animate={floatAnim}
            >
              <div className="absolute -inset-6 rounded-full bg-blue-500/15 blur-2xl" />

              <motion.div className="absolute inset-0" animate={ringRotate}>
                <div className="absolute inset-4 rounded-full border border-blue-400/25" />
                <div className="absolute inset-10 rounded-full border border-cyan-300/20" />
                <div className="absolute inset-[3.25rem] rounded-full border border-purple-400/20" />
              </motion.div>

              <motion.div className="absolute inset-0" animate={ringPulse}>
                <div className="absolute inset-0 rounded-full bg-[conic-gradient(from_180deg,rgba(59,130,246,0.0),rgba(59,130,246,0.45),rgba(168,85,247,0.35),rgba(20,184,166,0.28),rgba(59,130,246,0.0))] blur-[1px]" />
                <div
                  className={`absolute inset-6 rounded-full ${
                    isDark ? "bg-slate-950/70" : "bg-white/70"
                  }`}
                />
              </motion.div>

              <div className="absolute inset-10 overflow-hidden rounded-full ring-4 ring-white/10 shadow-[0_24px_90px_rgba(0,0,0,0.55)]">
                <img
                  src="/profile.png"
                  alt="SRUOY VEASNA"
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="pointer-events-none absolute inset-10 rounded-full bg-gradient-to-tr from-white/10 via-transparent to-transparent" />
            </motion.div>
          </motion.div>

          {/* RIGHT */}
          <motion.div variants={item} className="text-center lg:text-left">
            <motion.p
              variants={item}
              className={`text-base font-medium ${
                isDark ? "text-white/70" : "text-slate-600"
              }`}
            >
              Hello, I&apos;m
            </motion.p>

            <motion.h1
              variants={popItem}
              className={`mt-2 text-4xl font-extrabold tracking-tight sm:text-5xl xl:text-6xl ${
                isDark ? "text-white" : "text-slate-900"
              }`}
            >
              <motion.span
                animate={nameShine}
                className="inline-block bg-[linear-gradient(90deg,rgba(255,255,255,0.85),rgba(96,165,250,0.95),rgba(168,85,247,0.95),rgba(255,255,255,0.85))] bg-[length:220%_100%] bg-clip-text text-transparent"
              >
                SRUOY VEASNA
              </motion.span>
            </motion.h1>

            <motion.h2
              variants={item}
              className={`mt-3 flex flex-wrap items-center gap-2 justify-center lg:justify-start text-2xl font-semibold sm:text-3xl ${
                isDark ? "text-white/90" : "text-slate-800"
              }`}
            >
              <span>And I&apos;m a</span>

              <motion.span
                animate={badgeSweep}
                className="relative inline-flex items-center rounded-full px-3 py-1
                           bg-[linear-gradient(90deg,rgba(59,130,246,0.35),rgba(34,211,238,0.28),rgba(168,85,247,0.30))]
                           bg-[length:180%_100%] ring-1 ring-white/10"
              >
                <span className="inline-flex items-center leading-none bg-gradient-to-r from-blue-500 via-cyan-500 to-purple-500 bg-clip-text text-transparent">
                  <span className="inline-block min-w-[23ch] whitespace-nowrap">
                    {typedText}
                  </span>

                  {!shouldReduceMotion && (
                    <motion.span
                      aria-hidden="true"
                      className="ml-0.5 inline-block"
                      animate={{ opacity: [0, 1, 0] }}
                      transition={{ duration: 0.9, repeat: Infinity }}
                    >
                      |
                    </motion.span>
                  )}
                </span>
              </motion.span>
            </motion.h2>

            <motion.p
              variants={item}
              className={`mt-4 max-w-xl text-base leading-relaxed sm:text-lg ${
                isDark ? "text-white/60" : "text-slate-600"
              }`}
            >
              I build modern, responsive web applications with clean UI and
              scalable backend systems.
            </motion.p>

            {/* ✅ Skills: brand hover */}
            <motion.div variants={item} className="mt-4">
              <p
                className={`text-sm sm:text-base ${
                  isDark ? "text-white/55" : "text-slate-500"
                }`}
              >
                Skills
              </p>

              <div className="mt-2 flex flex-wrap justify-center gap-2 lg:justify-start">
                {["HTML", "CSS", "JavaScript", "PHP", "Laravel", "C#.NET"].map(
                  (s) => (
                    <motion.span
                      key={s}
                      style={brandStyle(s)}
                      variants={item}
                      whileHover={
                        shouldReduceMotion ? undefined : { y: -2, scale: 1.02 }
                      }
                      className={`rounded-full border px-3 py-1 text-sm font-semibold backdrop-blur
                        transition-colors duration-200
                        hover:bg-[var(--brand-bg)] hover:text-[var(--brand-fg)] hover:border-[var(--brand-border)]
                        hover:shadow-[0_16px_50px_var(--brand-glow)]
                        ${
                          isDark
                            ? "border-white/10 bg-white/5 text-white/80"
                            : "border-slate-200 bg-white/70 text-slate-700"
                        }`}
                    >
                      {s}
                    </motion.span>
                  )
                )}
              </div>
            </motion.div>

            {/* ✅ Social icons: brand hover */}
            <motion.div
              variants={item}
              className="mt-6 flex items-center justify-center gap-4 lg:justify-start"
            >
              {[
                {
                  label: "GitHub",
                  href: "https://github.com/sruoyveasna",
                  Icon: Github,
                },
                {
                  label: "LinkedIn",
                  href: "https://www.linkedin.com/in/veasna-sruoy-8b11872b4/",
                  Icon: Linkedin,
                },
                {
                  label: "Email",
                  href: "mailto:veasnagva@gmail.com",
                  Icon: Mail,
                },
              ].map(({ label, href, Icon }) => (
                <motion.a
                  key={label}
                  style={brandStyle(label)}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    href.startsWith("http") ? "noopener noreferrer" : undefined
                  }
                  aria-label={label}
                  variants={item}
                  whileHover={
                    shouldReduceMotion ? undefined : { y: -3, scale: 1.03 }
                  }
                  whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
                  className={`group inline-flex items-center justify-center rounded-lg border px-3 py-3 shadow-sm backdrop-blur
                    transition-colors duration-200
                    hover:bg-[var(--brand-bg)] hover:text-[var(--brand-fg)] hover:border-[var(--brand-border)]
                    hover:shadow-[0_16px_50px_var(--brand-glow)]
                    ${
                      isDark
                        ? "border-white/10 bg-white/5 text-white/80 hover:text-[var(--brand-fg)]"
                        : "border-slate-200 bg-white/70 text-slate-700"
                    } focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/70`}
                >
                  <Icon
                    size={20}
                    className="transition-transform group-hover:scale-110"
                  />
                </motion.a>
              ))}
            </motion.div>

            <motion.div
              variants={item}
              className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start"
            >
              <motion.button
                onClick={() => scrollToId("contact")}
                whileHover={
                  shouldReduceMotion ? undefined : { y: -3, scale: 1.01 }
                }
                whileTap={shouldReduceMotion ? undefined : { scale: 0.99 }}
                className="w-full sm:w-auto rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 px-7 py-3.5 font-semibold text-white shadow-[0_20px_70px_rgba(59,130,246,0.22)]
                  transition hover:brightness-110
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/70"
              >
                Hire Me
              </motion.button>

              <motion.button
                onClick={() => scrollToId("contact")}
                whileHover={
                  shouldReduceMotion ? undefined : { y: -3, scale: 1.01 }
                }
                whileTap={shouldReduceMotion ? undefined : { scale: 0.99 }}
                className={`w-full sm:w-auto rounded-lg border px-7 py-3.5 font-semibold backdrop-blur transition ${
                  isDark
                    ? "border-white/20 bg-white/5 text-white/85 hover:border-white/30 hover:bg-white/10 hover:text-white"
                    : "border-slate-300 bg-white/70 text-slate-800 hover:bg-white"
                } focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400/70`}
              >
                Contact Me
              </motion.button>
            </motion.div>
          </motion.div>
        </motion.div>

        <div className="relative mt-10 lg:mt-6 lg:translate-y-[70px]">
          <motion.div
            variants={statsWrap}
            initial="hidden"
            animate="show"
            className={`relative overflow-hidden rounded-xl border px-4 py-5 sm:px-6 backdrop-blur ${
              isDark
                ? "border-white/10 bg-white/5"
                : "border-slate-200 bg-white/70"
            }`}
          >
            {!shouldReduceMotion && (
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -inset-8 opacity-70"
                style={{
                  animation: "statsGlow 4.2s ease-in-out infinite",
                  background:
                    "radial-gradient(520px 180px at 20% 40%, rgba(59,130,246,0.22), transparent 62%), radial-gradient(520px 180px at 80% 60%, rgba(168,85,247,0.18), transparent 62%)",
                }}
              />
            )}

            {!shouldReduceMotion && (
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0"
                style={{
                  animation: "statsShimmer 5.4s ease-in-out infinite",
                  background:
                    "linear-gradient(120deg, transparent 0%, rgba(255,255,255,0.10) 15%, rgba(34,211,238,0.10) 32%, rgba(168,85,247,0.10) 50%, rgba(255,255,255,0.10) 68%, transparent 100%)",
                }}
              />
            )}

            <div className="relative z-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { big: "2+", label: "Years of experience" },
                { big: "20+", label: "Projects completed" },
                { big: "6+", label: "Technologies" },
                { big: "100%", label: "Client satisfaction" },
              ].map((s, idx) => (
                <motion.div
                  key={s.label}
                  variants={statsItem}
                  whileHover={
                    shouldReduceMotion ? undefined : { y: -2, scale: 1.01 }
                  }
                  transition={
                    shouldReduceMotion ? undefined : { duration: 0.35, ease }
                  }
                  className={`flex items-center justify-center gap-4 text-center lg:justify-start ${
                    idx !== 0 ? "lg:border-l lg:border-white/10 lg:pl-6" : ""
                  }`}
                >
                  <div
                    className="text-4xl font-extrabold bg-[linear-gradient(90deg,rgba(96,165,250,1),rgba(34,211,238,1),rgba(168,85,247,1),rgba(96,165,250,1))] bg-[length:220%_100%] bg-clip-text text-transparent"
                    style={
                      shouldReduceMotion
                        ? undefined
                        : {
                            animation: "numberGradient 6s ease-in-out infinite",
                          }
                    }
                  >
                    {s.big}
                  </div>

                  <div
                    className={`${
                      isDark ? "text-white/70" : "text-slate-600"
                    } text-sm leading-snug`}
                  >
                    {s.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
