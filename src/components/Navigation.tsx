import { useState, useEffect, useMemo } from "react";
import { Menu, X, Download, Moon, Sun } from "lucide-react";
import { useTheme } from "@/context/theme";

const CV_URL = "/CV/SruoyVeasna_CV.pdf";
const CV_FILE_NAME = "SruoyVeasna_CV.pdf";

const navLinks: { id: string; label: string; extraDown?: number }[] = [
  { id: "home", label: "Home", extraDown: 0 },
  { id: "about", label: "About", extraDown: 40 },
  { id: "certificates", label: "Certification", extraDown: 0 },
  { id: "experience", label: "Experience", extraDown: 60 },
  { id: "projects", label: "Projects", extraDown: 50 },
  { id: "contact", label: "Contact", extraDown: 0 },
];

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const { isDark, toggleTheme } = useTheme();

  // --- Typing logo ---
  const logoSegments = useMemo(
    () => [
      { text: "SRUOY ", className: isDark ? "text-white" : "text-slate-900" },
      { text: "VEASNA", className: "text-blue-400" },
    ],
    [isDark]
  );

  const fullLogoText = useMemo(
    () => logoSegments.map((s) => s.text).join(""),
    [logoSegments]
  );

  const [logoIndex, setLogoIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const TYPE_SPEED = 110;
    const DELETE_SPEED = 70;
    const END_PAUSE = 1600;
    const START_PAUSE = 700;

    const atEnd = logoIndex >= fullLogoText.length;
    const atStart = logoIndex <= 0;

    let delay = isDeleting ? DELETE_SPEED : TYPE_SPEED;
    if (!isDeleting && atEnd) delay = END_PAUSE;
    if (isDeleting && atStart) delay = START_PAUSE;

    const t = setTimeout(() => {
      if (!isDeleting) {
        if (atEnd) setIsDeleting(true);
        else setLogoIndex((v) => v + 1);
      } else {
        if (atStart) setIsDeleting(false);
        else setLogoIndex((v) => v - 1);
      }
    }, delay);

    return () => clearTimeout(t);
  }, [logoIndex, isDeleting, fullLogoText.length]);

  const renderTypedLogo = () => {
    let remaining = logoIndex;

    return logoSegments.map((seg, i) => {
      const take = Math.max(0, Math.min(seg.text.length, remaining));
      remaining -= take;

      return (
        <span key={i} className={seg.className}>
          {seg.text.slice(0, take)}
        </span>
      );
    });
  };

  // ✅ Helper: get real navbar height
  const getHeaderHeight = () => {
    const nav = document.getElementById("site-nav");
    return nav?.offsetHeight ?? 80;
  };

  const scrollToId = (
    id: string,
    extraDown = 0,
    behavior: ScrollBehavior = "smooth"
  ) => {
    const el = document.getElementById(id);
    if (!el) return;

    const headerH = getHeaderHeight();
    const y =
      el.getBoundingClientRect().top + window.scrollY - headerH + extraDown;

    window.scrollTo({ top: y, behavior });

    setIsOpen(false);
    history.replaceState(null, "", `#${id}`);
  };

  // --- Scroll spy ---
  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 10);

      const sections = navLinks.map((link) => document.getElementById(link.id));
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      for (const section of sections) {
        if (
          section &&
          scrollPosition >= section.offsetTop &&
          scrollPosition < section.offsetTop + section.offsetHeight
        ) {
          setActiveSection(section.id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ✅ Direct hash navigation support
  useEffect(() => {
    const run = () => {
      const hash = window.location.hash?.replace("#", "");
      if (!hash) return;

      const item = navLinks.find((x) => x.id === hash);
      const extraDown = item?.extraDown ?? 0;

      requestAnimationFrame(() => scrollToId(hash, extraDown, "auto"));
    };

    run();
    window.addEventListener("hashchange", run);
    return () => window.removeEventListener("hashchange", run);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <nav
      id="site-nav"
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        hasScrolled
          ? isDark
            ? "bg-slate-950/75 backdrop-blur-md border-b border-white/10"
            : "bg-white/75 backdrop-blur-md border-b border-slate-200"
          : "bg-transparent"
      }`}
    >
      <style>{`
        @keyframes blink { 50% { opacity: 0; } }
      `}</style>

      <div className="mx-auto w-full max-w-7xl px-4 pt-3 sm:px-6 lg:px-8">
        {/* ✅ iPad-friendly layout: allow wrapping on md */}
        <div className="flex flex-wrap items-center justify-between gap-3 py-2 md:gap-4">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              scrollToId("home", 0);
            }}
            className="group inline-flex items-center gap-2 text-xl font-extrabold tracking-tight"
            aria-label="Go to Home"
          >
            <span className="text-blue-400">{`<`}</span>

            <span className="relative inline-flex items-center whitespace-nowrap tabular-nums">
              <span className="invisible">
                <span className={isDark ? "text-white" : "text-slate-900"}>
                  SRUOY{" "}
                </span>
                <span className="text-blue-400">VEASNA</span>
              </span>

              <span className="absolute inset-0 inline-flex items-center">
                {renderTypedLogo()}
                <span
                  className="ml-0.5 inline-block h-5 w-[2px] bg-blue-400 opacity-90"
                  style={{ animation: "blink 1.1s step-end infinite" }}
                />
              </span>
            </span>

            <span className="text-blue-400">{`/>`}</span>
          </a>

          {/* ✅ Tablet+ links (md+) — compact + wraps if needed */}
          <div className="hidden md:flex flex-1 flex-wrap items-center justify-center gap-2 lg:gap-6">
            {navLinks.map((l) => (
              <button
                key={l.id}
                onClick={() => scrollToId(l.id, l.extraDown ?? 0)}
                className={`relative rounded-md px-2 py-2 text-[13px] lg:text-sm font-medium transition
                  ${
                    isDark
                      ? "text-white/75 hover:text-white"
                      : "text-slate-700 hover:text-slate-900"
                  }
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/70`}
              >
                {l.label}
                {activeSection === l.id && (
                  <span className="absolute inset-x-2 -bottom-0.5 h-0.5 rounded-full bg-blue-400/90" />
                )}
              </button>
            ))}
          </div>

          {/* ✅ Right actions (md+) — tablet version uses icon CV button */}
          <div className="hidden md:flex items-center gap-2 lg:gap-3">
            <button
              type="button"
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className={`inline-flex items-center justify-center rounded-full border px-3 py-2 backdrop-blur transition
                ${
                  isDark
                    ? "border-white/10 bg-white/5 text-white/80 hover:bg-white/10 hover:text-white"
                    : "border-slate-200 bg-white/70 text-slate-700 hover:bg-white hover:text-slate-900"
                }
                focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/70`}
            >
              {isDark ? <Moon size={18} /> : <Sun size={18} />}
            </button>

            {/* ✅ iPad: icon-only, Desktop: full text */}
            <a
              href={CV_URL}
              download={CV_FILE_NAME}
              className={`inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-pink-500 to-fuchsia-500 text-white
                shadow-[0_18px_60px_rgba(236,72,153,0.25)]
                transition hover:-translate-y-0.5 hover:brightness-110 active:translate-y-0
                focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-300/70
                px-3 py-2 lg:px-4 lg:py-2`}
              aria-label="Download CV"
              title="Download CV"
            >
              <Download size={16} />
              <span className="hidden lg:inline text-sm font-semibold">
                Download CV
              </span>
            </a>
          </div>

          {/* Mobile Toggle */}
          <button
            className={`md:hidden rounded-lg p-2 transition ${
              isDark
                ? "text-white/85 hover:bg-white/10"
                : "text-slate-800 hover:bg-slate-100"
            }`}
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`transition-all duration-300 ease-in-out md:hidden overflow-hidden ${
            isOpen ? "max-h-[560px] pb-6" : "max-h-0"
          }`}
        >
          <div
            className={`mt-2 rounded-xl border p-3 backdrop-blur ${
              isDark
                ? "border-white/10 bg-white/5"
                : "border-slate-200 bg-white/70"
            }`}
          >
            <div className="space-y-2">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToId(link.id, link.extraDown ?? 0)}
                  className={`block w-full rounded-lg px-4 py-2 text-left text-sm font-medium transition
                    ${
                      activeSection === link.id
                        ? isDark
                          ? "bg-white/10 text-white"
                          : "bg-slate-100 text-slate-900"
                        : isDark
                        ? "text-white/80 hover:bg-white/10 hover:text-white"
                        : "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                    }`}
                >
                  {link.label}
                </button>
              ))}
            </div>

            <div className="mt-4 space-y-3 px-2">
              <button
                type="button"
                onClick={toggleTheme}
                className={`w-full inline-flex items-center justify-center gap-2 rounded-lg border px-3 py-2 backdrop-blur transition
                  ${
                    isDark
                      ? "border-white/10 bg-white/5 text-white/80 hover:bg-white/10 hover:text-white"
                      : "border-slate-200 bg-white/70 text-slate-700 hover:bg-white hover:text-slate-900"
                  }`}
              >
                {isDark ? <Moon size={18} /> : <Sun size={18} />}
                <span className="text-sm font-semibold">
                  {isDark ? "Dark" : "Light"} Mode
                </span>
              </button>

              <a
                href={CV_URL}
                download={CV_FILE_NAME}
                className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-pink-500 to-fuchsia-500 px-4 py-2 text-sm font-semibold text-white
                  shadow-[0_18px_60px_rgba(236,72,153,0.25)]
                  transition hover:brightness-110"
              >
                Download CV <Download size={16} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
