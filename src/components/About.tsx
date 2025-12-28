import React, { useMemo, useRef, useState } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import {
  Code2,
  Terminal,
  Zap,
  Activity,
  Laptop,
  Database,
  Layers,
} from "lucide-react";
import { useTheme } from "@/context/theme";

type TechIcon = {
  name: string;
  url: string;
  position: string;
  z: number;
  className?: string;
};

type Feature = {
  Icon: React.ElementType;
  title: string;
  desc: string;
  details: string[];
  color: string;
  bg: string;
  borderHover: string;
  line: string;
};

const About: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const { isDark } = useTheme();

  const containerRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50 });
  const [isHovering, setIsHovering] = useState(false);

  // flip state for feature cards
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});

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

  const headlineText =
    "I build practical products with clean UI and reliable logic.";
  const headlineWords = useMemo(() => headlineText.split(" "), [headlineText]);

  // 3D tilt (right card)
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion) return;
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -16;
    const rotateY = ((x - centerX) / centerX) * 16;

    setRotation({ x: rotateX, y: rotateY });
    setGlare({ x: (x / rect.width) * 100, y: (y / rect.height) * 100 });
  };

  const handleMouseEnter = () => setIsHovering(true);

  const handleMouseLeave = () => {
    setIsHovering(false);
    setRotation({ x: 0, y: 0 });
    setGlare({ x: 50, y: 50 });
  };

  const toggleCardFlip = (key: string) => {
    setFlippedCards((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const techIcons: TechIcon[] = [
    {
      name: "Laravel",
      url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/laravel/laravel-original.svg",
      position: "top-3 left-3 sm:-top-8 sm:-left-8",
      z: 70,
    },
    {
      name: "MySQL",
      url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg",
      position: "bottom-6 left-2 sm:bottom-24 sm:-left-10",
      z: 55,
    },
    {
      name: "React",
      url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
      position: "top-3 right-3 sm:-top-6 sm:-right-8",
      z: 90,
    },
    {
      name: "JavaScript",
      url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg",
      position: "top-24 right-2 sm:top-24 sm:-right-12",
      z: 60,
    },
    {
      name: "C#",
      url: "https://www.svgrepo.com/show/452184/csharp.svg",
      position: "bottom-3 right-3 sm:-bottom-8 sm:right-4",
      z: 80,
    },
    {
      name: "PHP",
      url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg",
      position: "top-16 left-2 sm:top-16 sm:-left-10",
      z: 45,
    },
    {
      name: "GitHub",
      url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg",
      position: "bottom-4 left-4 sm:-bottom-6 sm:left-10",
      z: 75,
      className: "dark:invert",
    },
  ];

  const features: Feature[] = [
    {
      Icon: Layers,
      title: "Frontend Engineering",
      desc: "Responsive, state-driven interfaces with smooth interactions.",
      details: [
        "Reusable components with clean design systems",
        "State management patterns (forms, modals, lists)",
        "Accessibility (keyboard, contrast, semantics)",
        "Animations that feel fast but never heavy",
      ],
      color: "text-blue-600 dark:text-blue-400",
      bg: "bg-blue-50 dark:bg-blue-500/10",
      borderHover: "group-hover:border-blue-500/30",
      line: "from-blue-500 to-cyan-500",
    },
    {
      Icon: Database,
      title: "Backend Architecture",
      desc: "Scalable APIs and data structures built for long-term stability.",
      details: [
        "REST APIs with clean validation + error handling",
        "Database schema design + query optimization",
        "Auth & permissions (roles, policies, guards)",
        "Logging, caching, and performance improvements",
      ],
      color: "text-emerald-600 dark:text-emerald-400",
      bg: "bg-emerald-50 dark:bg-emerald-500/10",
      borderHover: "group-hover:border-emerald-500/30",
      line: "from-emerald-500 to-teal-500",
    },
    {
      Icon: Laptop,
      title: "System Integration",
      desc: "Third-party services, gateways, and APIs connected reliably.",
      details: [
        "Payment, email, SMS, and file storage integrations",
        "Webhook handling + retry strategies",
        "Secure API keys, env setup, and secrets management",
        "Monitoring and edge-case handling in production",
      ],
      color: "text-purple-600 dark:text-purple-400",
      bg: "bg-purple-50 dark:bg-purple-500/10",
      borderHover: "group-hover:border-purple-500/30",
      line: "from-purple-500 to-pink-500",
    },
    {
      Icon: Code2,
      title: "Performance & Quality",
      desc: "Speed, accessibility, SEO, and maintainable code practices.",
      details: [
        "Improve Core Web Vitals and page load speed",
        "SEO basics: meta, structure, indexing readiness",
        "Code quality: naming, structure, reusability",
        "Testing mindset + fewer production bugs",
      ],
      color: "text-amber-600 dark:text-amber-400",
      bg: "bg-amber-50 dark:bg-amber-500/10",
      borderHover: "group-hover:border-amber-500/30",
      line: "from-amber-500 to-orange-500",
    },
  ];

  return (
    <section
      id="about"
      className="relative overflow-hidden min-h-[100svh] lg:min-h-screen"
    >
      <style>{`
        @keyframes floaty {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes scan {
          0% { transform: translateY(-120%); opacity: 0.0; }
          20% { opacity: 0.35; }
          50% { opacity: 0.18; }
          100% { transform: translateY(120%); opacity: 0.0; }
        }
        /* flip helpers (feature cards) */
        .flip-inner { transform-style: preserve-3d; }
        .flip-face { backface-visibility: hidden; -webkit-backface-visibility: hidden; }
        .flip-back { transform: rotateY(180deg); }

        /* hide scrollbar but keep scroll */
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* ✅ UPDATED: center content like Hero on lg+, keep padding on mobile */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 min-h-[100svh] lg:min-h-screen flex flex-col justify-center">
        <div className="w-full py-12 sm:py-16 lg:py-0">
          <motion.div
            variants={sectionWrap}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            className="grid items-center gap-10 sm:gap-12 lg:grid-cols-2 lg:gap-10"
          >
            {/* LEFT */}
            <motion.div variants={item} className="space-y-5 sm:space-y-6">
              <motion.div variants={item}>
                <div
                  className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-widest ring-1 ${
                    isDark
                      ? "bg-white/5 text-white/70 ring-white/10"
                      : "bg-slate-900/5 text-slate-700 ring-slate-900/10"
                  }`}
                >
                  <Activity className="h-4 w-4 text-cyan-400" />
                  About Me
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
                className={`max-w-xl text-sm leading-relaxed sm:text-base lg:text-lg ${
                  isDark ? "text-white/60" : "text-slate-600"
                }`}
              >
                I’m Veasna, a full-stack web developer who enjoys turning ideas
                into clean, working products. I care about thoughtful UX, stable
                APIs, and code that stays easy to maintain as features grow.
              </motion.p>

              {/* FEATURE CARDS */}
              <motion.div
                variants={item}
                className="grid gap-3 sm:gap-4 sm:grid-cols-2"
              >
                {features.map(
                  ({
                    Icon,
                    title,
                    desc,
                    details,
                    color,
                    bg,
                    borderHover,
                    line,
                  }) => {
                    const isFlipped = !!flippedCards[title];

                    return (
                      <motion.div
                        key={title}
                        variants={item}
                        whileHover={
                          shouldReduceMotion
                            ? undefined
                            : { y: -2, scale: 1.01 }
                        }
                        className="relative"
                      >
                        <div
                          role="button"
                          tabIndex={0}
                          aria-label={
                            isFlipped
                              ? `Close details for ${title}`
                              : `Open details for ${title}`
                          }
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                              e.preventDefault();
                              toggleCardFlip(title);
                            }
                          }}
                          onClick={() => toggleCardFlip(title)}
                          className="outline-none"
                          style={{ perspective: "1200px" }}
                        >
                          <motion.div
                            className="flip-inner relative min-h-[145px] sm:min-h-[160px] lg:min-h-[150px]"
                            animate={{ rotateY: isFlipped ? 180 : 0 }}
                            transition={
                              shouldReduceMotion
                                ? { duration: 0 }
                                : { duration: 0.6, ease }
                            }
                            style={{ transformStyle: "preserve-3d" }}
                          >
                            {/* FRONT */}
                            <div
                              className={`flip-face absolute inset-0 group overflow-hidden rounded-2xl border backdrop-blur transition-all duration-300
                              ${borderHover}
                              ${
                                isDark
                                  ? "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10 hover:shadow-xl hover:shadow-black/40"
                                  : "border-slate-200 bg-white/70 hover:bg-white hover:shadow-xl hover:shadow-slate-200/60"
                              }`}
                            >
                              <div className="h-full p-4 sm:p-5 lg:p-4">
                                <div className="flex items-center gap-3">
                                  <div
                                    className={`inline-flex h-11 w-11 items-center justify-center rounded-xl ${bg}
                                    transition-transform duration-300 group-hover:scale-110 sm:h-12 sm:w-12`}
                                  >
                                    <Icon className={`h-6 w-6 ${color}`} />
                                  </div>

                                  <h4
                                    className={`font-bold leading-tight ${
                                      isDark ? "text-white" : "text-slate-900"
                                    }`}
                                  >
                                    {title}
                                  </h4>
                                </div>

                                <p
                                  className={`mt-2 text-sm leading-relaxed ${
                                    isDark ? "text-white/60" : "text-slate-600"
                                  }`}
                                >
                                  {desc}
                                </p>

                                <div
                                  className={`absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r ${line}
                                  group-hover:w-full transition-all duration-500 ease-out`}
                                />
                              </div>
                            </div>

                            {/* BACK */}
                            <div
                              className={`flip-face flip-back absolute inset-0 overflow-hidden rounded-2xl border backdrop-blur ${
                                isDark
                                  ? "border-white/10 bg-white/5"
                                  : "border-slate-200 bg-white/80"
                              }`}
                            >
                              <div className="h-full p-4 sm:p-5 lg:p-4">
                                <div className="h-full overflow-y-auto no-scrollbar pr-1">
                                  <ul className="space-y-2.5">
                                    {details.map((d) => (
                                      <li
                                        key={d}
                                        className={`flex items-start gap-2 text-sm ${
                                          isDark
                                            ? "text-white/70"
                                            : "text-slate-600"
                                        }`}
                                      >
                                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-400 shrink-0" />
                                        <span>{d}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        </div>
                      </motion.div>
                    );
                  }
                )}
              </motion.div>
            </motion.div>

            {/* RIGHT: 3D Card */}
            <motion.div
              variants={{
                hidden: {
                  opacity: 0,
                  y: 18,
                  scale: 0.98,
                  filter: "blur(10px)",
                },
                show: {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  filter: "blur(0px)",
                  transition: shouldReduceMotion
                    ? { duration: 0 }
                    : { duration: 0.9, ease },
                },
              }}
              className="flex justify-center lg:justify-end"
            >
              <div
                ref={containerRef}
                className="w-full max-w-[320px] sm:max-w-[360px] lg:max-w-[380px] xl:max-w-[420px]"
                style={{ perspective: "1200px" }}
              >
                <div
                  onMouseMove={handleMouseMove}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  className="relative aspect-[4/5] w-full select-none transition-transform duration-200 ease-out"
                  style={{
                    transform: shouldReduceMotion
                      ? "none"
                      : `rotateX(${rotation.x}deg) rotateY(${
                          rotation.y
                        }deg) scale(${isHovering ? 1.02 : 1})`,
                    transformStyle: "preserve-3d",
                  }}
                >
                  {/* Floating Tech Icons */}
                  {techIcons.map((tech, idx) => (
                    <div
                      key={tech.name}
                      className={`absolute ${tech.position} z-20`}
                      style={{
                        transform: shouldReduceMotion
                          ? undefined
                          : `translateZ(${tech.z}px)`,
                      }}
                    >
                      <div
                        className={`rounded-2xl border p-2 sm:p-2.5 shadow-[0_18px_45px_rgba(0,0,0,0.22)] backdrop-blur transition-transform duration-300 hover:scale-110
                          ${
                            isDark
                              ? "border-white/10 bg-white/5 hover:border-white/20"
                              : "border-slate-200 bg-white/80 hover:bg-white"
                          }`}
                        style={{
                          animation: shouldReduceMotion
                            ? undefined
                            : `floaty 5s ease-in-out ${idx * 0.35}s infinite`,
                        }}
                      >
                        <img
                          src={tech.url}
                          alt={tech.name}
                          className={`h-6 w-6 sm:h-7 sm:w-7 object-contain ${
                            tech.className ?? ""
                          }`}
                        />
                      </div>
                    </div>
                  ))}

                  <div
                    className={`absolute inset-0 overflow-hidden rounded-2xl border shadow-2xl ${
                      isDark
                        ? "border-white/10 bg-slate-950"
                        : "border-slate-200 bg-white"
                    }`}
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    {/* Glare */}
                    <div
                      className="pointer-events-none absolute inset-0 z-50 mix-blend-overlay transition-opacity duration-300"
                      style={{
                        opacity: !shouldReduceMotion && isHovering ? 0.35 : 0,
                        background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,0.75) 0%, rgba(255,255,255,0) 60%)`,
                      }}
                    />

                    {/* Decorative gradients */}
                    <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" />
                    <div className="absolute -left-24 -bottom-24 h-72 w-72 rounded-full bg-purple-500/20 blur-3xl" />
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:22px_22px] opacity-60" />

                    {/* Content */}
                    <div className="absolute inset-0 z-10 flex flex-col justify-between p-5 sm:p-6">
                      <div
                        className="flex items-center justify-between"
                        style={{
                          transform: shouldReduceMotion
                            ? undefined
                            : "translateZ(40px)",
                        }}
                      >
                        <Terminal className="h-7 w-7 text-cyan-400" />
                        <div className="flex gap-1.5">
                          <div className="h-2.5 w-2.5 rounded-full bg-red-500 shadow-md" />
                          <div className="h-2.5 w-2.5 rounded-full bg-amber-500 shadow-md" />
                          <div className="h-2.5 w-2.5 rounded-full bg-green-500 shadow-md" />
                        </div>
                      </div>

                      <div
                        className={`relative rounded-lg border p-4 font-mono text-[11px] sm:text-xs shadow-2xl ${
                          isDark
                            ? "border-white/10 bg-black/55"
                            : "border-slate-200 bg-slate-900/90"
                        }`}
                        style={{
                          transform: shouldReduceMotion
                            ? undefined
                            : "translateZ(78px)",
                        }}
                      >
                        <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-lg opacity-25">
                          <div
                            className="absolute top-0 h-[2px] w-full bg-cyan-300"
                            style={{
                              animation: shouldReduceMotion
                                ? undefined
                                : "scan 3s linear infinite",
                            }}
                          />
                        </div>

                        <div className="mb-3 flex items-center justify-between text-[10px] uppercase tracking-wider text-white/60">
                          <span>// About Profile</span>
                          <Activity className="h-3.5 w-3.5 text-emerald-300" />
                        </div>

                        <div className="space-y-2 leading-relaxed text-white/85">
                          <div className="flex gap-2">
                            <span className="text-purple-300">const</span>
                            <span className="text-white">developer</span>
                            <span className="text-white/70">=</span>
                            <span className="text-cyan-200">{"{"}</span>
                          </div>

                          <div className="pl-4">
                            <span className="text-blue-200">name</span>
                            <span className="text-white/70">:</span>{" "}
                            <span className="text-emerald-200">
                              "Sruoy Veasna"
                            </span>
                            ,
                          </div>

                          <div className="pl-4">
                            <span className="text-blue-200">focus</span>
                            <span className="text-white/70">:</span>{" "}
                            <span className="text-emerald-200">
                              ["UI", "API", "Performance"]
                            </span>
                            ,
                          </div>

                          <div className="pl-4">
                            <span className="text-blue-200">stack</span>
                            <span className="text-white/70">:</span>{" "}
                            <span className="text-emerald-200">
                              ["Laravel", "React", "C#.Net"]
                            </span>
                            ,
                          </div>

                          <div className="pl-4">
                            <span className="text-blue-200">shipping</span>
                            <span className="text-white/70">:</span>{" "}
                            <span className="text-emerald-200">true</span>,
                          </div>

                          <div className="flex gap-2">
                            <span className="text-cyan-200">{"}"}</span>
                          </div>
                        </div>
                      </div>

                      <div
                        className="flex items-center gap-4 border-t border-white/10 pt-5"
                        style={{
                          transform: shouldReduceMotion
                            ? undefined
                            : "translateZ(52px)",
                        }}
                      >
                        <div className="rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 p-0.5 shadow-lg">
                          <div
                            className={`flex h-11 w-11 items-center justify-center rounded-full ${
                              isDark ? "bg-slate-950" : "bg-white"
                            }`}
                          >
                            <Zap
                              className="h-5 w-5 text-cyan-400"
                              fill="currentColor"
                            />
                          </div>
                        </div>
                        <div>
                          <div
                            className={`${
                              isDark ? "text-white" : "text-slate-900"
                            } text-sm font-bold`}
                          >
                            PREMIUM ENGINEERING
                          </div>
                          <div
                            className={`${
                              isDark ? "text-white/60" : "text-slate-600"
                            } text-[10px] uppercase tracking-wider`}
                          >
                            Build • Ship • Iterate
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pointer-events-none absolute -inset-x-8 -bottom-10 -z-10 h-16 rounded-full bg-black/20 blur-2xl" />
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
