import React, { useEffect, useMemo, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import {
  Layers,
  Search,
  Filter,
  Globe,
  Github,
  Lock,
  X,
  Calendar,
  Tag,
  ExternalLink,
} from "lucide-react";
import { useTheme } from "@/context/theme";

type ProjectCategory =
  | "All"
  | "Laravel System"
  | "Laravel API"
  | "WordPress / Elementor"
  | "Vue Js"
  | "React Js"
  | "ASP.NET Core API"
  | "HTML/CSS/JS";

type Project = {
  title: string;
  category: Exclude<ProjectCategory, "All">;
  year: number | string;
  visibility?: "Public" | "Private/Client";
  imageUrl: string;
  summary: string;

  tech: string[];
  highlights?: string[];
  links?: {
    github?: string;
    live?: string;
    caseStudy?: string;
  };
};

const PAGE_SIZE = 8;

const ProjectsSection: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const { isDark } = useTheme();

  const [active, setActive] = useState<ProjectCategory>("All");
  const [q, setQ] = useState("");
  const [selected, setSelected] = useState<Project | null>(null);

  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  useEffect(() => {
    setSelected(null);
    setVisibleCount(PAGE_SIZE);
  }, [active, q]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelected(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

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
      hidden: { opacity: 0, y: 14, filter: "blur(10px)" },
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

  /**
   * ✅ Filled from your repositories list
   * Note: Years are best-effort placeholders where not specified by you.
   * You can adjust year/imageUrl anytime without changing the UI logic.
   */
  const projects: Project[] = [
    // ---------------------------
    // Laravel API
    // ---------------------------
    {
      title: "Cafe Eden POS API (Main)",
      category: "Laravel API",
      year: "2024–2025",
      imageUrl:
        "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1400&auto=format&fit=crop&q=60",
      summary:
        "POS backend API with multi-role flow, orders, products, and payment-ready structure.",
      tech: ["Laravel", "REST API", "Sanctum/JWT", "MySQL", "Validation"],
      highlights: [
        "Structured API endpoints for POS workflows",
        "Role-ready design (admin / cashier / customer)",
        "Clean CRUD + validation patterns",
      ],
      links: {
        github: "https://github.com/sruoyveasna/Cafe-Eden",
      },
      visibility: "Public",
    },

    // ---------------------------
    // Vue Js
    // ---------------------------
    {
      title: "Cafe Eden Frontend (Vue)",
      category: "Vue Js",
      year: 2024,
      imageUrl:
        "https://images.unsplash.com/photo-1556155092-490a1ba16284?w=1400&auto=format&fit=crop&q=60",
      summary:
        "Vue dashboard frontend consuming Laravel API, built for POS management workflows.",
      tech: ["Vue", "Vue Router", "Axios", "Auth", "UI Components"],
      highlights: ["API integration patterns", "Reusable dashboard components"],
      links: {
        github: "https://github.com/sruoyveasna/Cafe-Eden-Front-end",
      },
      visibility: "Public",
    },

    // ---------------------------
    // React Js
    // ---------------------------
    {
      title: "AngkorScience",
      category: "React Js",
      year: 2024,
      imageUrl: "/projects/angkor-science.png",
      summary:
        "React project showcasing a modern UI with reusable components and clean structure.",
      tech: ["React", "TypeScript/JS", "Component Design", "Routing"],
      highlights: ["Modular UI components", "Clean project structure"],
      links: {
        github: "https://github.com/Konthaina/AngkorScience",
        live: "https://angkorscience.vercel.app/#services",
      },
      visibility: "Public",
    },
    {
      title: "My Portfolio",
      category: "React Js",
      year: 2024,
      imageUrl: "/projects/my-portfolio.png",
      summary:
        "My personal portfolio built with React, featuring responsive sections, smooth UI interactions, and a clean component structure.",
      tech: ["React", "TypeScript/JS", "Component Design", "Routing"],
      highlights: ["Modular UI components", "Clean project structure"],
      links: {
        github: "https://github.com/sruoyveasna/portfolio",
        live: "https://sruoyveasna.vercel.app/",
      },
      visibility: "Public",
    },

    // ---------------------------
    // ASP.NET Core API
    // ---------------------------
    {
      title: "ContosoPizza API",
      category: "ASP.NET Core API",
      year: 2023,
      imageUrl:
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1400&auto=format&fit=crop&q=60",
      summary:
        "ASP.NET Core Web API sample for CRUD operations, routing, and REST patterns.",
      tech: ["ASP.NET Core", "C#", "REST API", "Swagger/OpenAPI"],
      highlights: ["Clean REST endpoints", "Swagger for testing API"],
      links: {
        github: "https://github.com/sruoyveasna/ContosoPizza",
      },
      visibility: "Public",
    },
    {
      title: "VideoGameCharacter API",
      category: "ASP.NET Core API",
      year: 2023,
      imageUrl:
        "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1400&auto=format&fit=crop&q=60",
      summary:
        "ASP.NET Core API for managing video game characters with CRUD + validation.",
      tech: ["ASP.NET Core", "C#", "Entity Framework", "REST API", "Swagger"],
      highlights: ["CRUD endpoints", "EF Core patterns"],
      links: {
        github: "https://github.com/sruoyveasna/VideoGameCharacterApi",
      },
      visibility: "Public",
    },

    // ---------------------------
    // Laravel System
    // ---------------------------
    {
      title: "Donuts POS System",
      category: "Laravel System",
      year: 2024,
      imageUrl:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1400&auto=format&fit=crop&q=60",
      summary:
        "Laravel system project for POS workflows with admin tools and management features.",
      tech: ["Laravel", "Blade", "MySQL", "RBAC", "CRUD"],
      highlights: ["Admin CRUD modules", "Role-friendly structure"],
      links: {
        github: "https://github.com/sruoyveasna/donuts-pos",
      },
      visibility: "Public",
    },
    {
      title: "Document Management System",
      category: "Laravel System",
      year: 2024,
      imageUrl:
        "https://images.unsplash.com/photo-1450101215322-bf5cd27642fc?w=1400&auto=format&fit=crop&q=60",
      summary:
        "Laravel system for managing documents, categories, and organized file records.",
      tech: ["Laravel", "Blade", "MySQL", "CRUD", "Auth"],
      highlights: ["Document organization", "Admin-ready structure"],
      links: {
        github: "https://github.com/sruoyveasna/doc-managements",
      },
      visibility: "Public",
    },
    {
      title: "PHP Final Project (E-commerce)",
      category: "Laravel System",
      year: 2024,
      imageUrl:
        "https://images.unsplash.com/photo-1515168833906-d2a3b82b302a?w=1400&auto=format&fit=crop&q=60",
      summary:
        "E-commerce website project with product listing, cart flow, and basic management pages.",
      tech: ["Laravel", "Blade", "MySQL", "Auth", "CRUD"],
      highlights: ["E-commerce flow", "Product & order structure"],
      links: {
        github: "https://github.com/sruoyveasna/Php_final_project",
      },
      visibility: "Public",
    },
    {
      title: "Student Management System",
      category: "Laravel System",
      year: 2024,
      imageUrl:
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1400&auto=format&fit=crop&q=60",
      summary:
        "Laravel system for managing students, classes, and admin operations (CRUD + reporting-ready).",
      tech: ["Laravel", "Blade", "MySQL", "CRUD", "Auth"],
      highlights: ["Student CRUD modules", "Admin-friendly UI structure"],
      links: {
        github: "https://github.com/sruoyveasna/Student_management_system",
      },
      visibility: "Public",
    },

    // ---------------------------
    // WordPress / Elementor
    // ---------------------------
    {
      title: "Peanich Phum Ecommerce",
      category: "WordPress / Elementor",
      year: 2025,
      imageUrl: "/projects/peanichphum.png",
      summary:
        "Elementor Pro e-commerce build with responsive sections and clean product layout.",
      tech: ["WordPress", "Elementor Pro", "WooCommerce", "UI Design"],
      highlights: ["Responsive UI sections", "Optimized Elementor templates"],
      links: {
        live: "https://peanichphum.com/",
      },
      visibility: "Private/Client",
    },
    // ---------------------------
    // WordPress / Elementor (Client Builds)
    // ---------------------------
    {
      title: "BSTNT Logistics Website",
      category: "WordPress / Elementor",
      year: 2025,
      imageUrl:
        "https://images.unsplash.com/photo-1580674285054-bed31e145f59?w=1400&auto=format&fit=crop&q=60",
      summary:
        "Client website for a logistics company with clean service sections and a professional company presence.",
      tech: ["WordPress", "Elementor", "UI Design", "Responsive Layout"],
      highlights: [
        "Service-focused layout",
        "Mobile-first responsive sections",
      ],
      links: {
        live: "https://bstnt.com/",
      },
      visibility: "Private/Client",
    },
    {
      title: "Vantha Natural Supplements (Activa France)",
      category: "WordPress / Elementor",
      year: 2025,
      imageUrl:
        "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=1400&auto=format&fit=crop&q=60",
      summary:
        "Company profile site showcasing natural supplement products (Activa from France) with product-related pages and brand presentation.",
      tech: ["WordPress", "Elementor", "UI Design", "Responsive Layout"],
      highlights: ["Product showcase pages", "Clean company profile structure"],
      links: {
        live: "https://vanthanaturalsupplements.com.kh/",
      },
      visibility: "Private/Client",
    },
    {
      title: "Mind56 Coaching & Soft Skills",
      category: "WordPress / Elementor",
      year: 2025,
      imageUrl:
        "https://images.unsplash.com/photo-1552581234-26160f608093?w=1400&auto=format&fit=crop&q=60",
      summary:
        "Personal service website promoting coaching and mind/soft-skill services with clear sections and strong readability.",
      tech: ["WordPress", "Elementor", "UI Design", "Responsive Layout"],
      highlights: ["Service + coaching presentation", "Simple and clear UX"],
      links: {
        live: "https://mind56.info/",
      },
      visibility: "Private/Client",
    },
    {
      title: "Bopha Agriculture Company Profile",
      category: "WordPress / Elementor",
      year: 2025,
      imageUrl:
        "https://images.unsplash.com/photo-1524593166156-312f362cada0?w=1400&auto=format&fit=crop&q=60",
      summary:
        "Company profile website showcasing agriculture-related products with structured pages and a professional brand layout.",
      tech: ["WordPress", "Elementor", "UI Design", "Responsive Layout"],
      highlights: [
        "Product-focused company profile",
        "Organized content sections",
      ],
      links: {
        live: "https://www.bopha.com.kh/",
      },
      visibility: "Private/Client",
    },
    {
      title: "CETA Advisory Logistics (KH)",
      category: "WordPress / Elementor",
      year: 2025,
      imageUrl:
        "https://images.unsplash.com/photo-1601598851547-4302969d0614?w=1400&auto=format&fit=crop&q=60",
      summary:
        "Company profile website for logistics services with Khmer content structure and service-oriented layout.",
      tech: ["WordPress", "Elementor", "UI Design", "Responsive Layout"],
      highlights: [
        "Localized (KH) page structure",
        "Service sections + contact flow",
      ],
      links: {
        live: "https://ceta-advisory.com/km/home2/",
      },
      visibility: "Private/Client",
    },
    {
      title: "EzeTechSoft Portfolio Website",
      category: "WordPress / Elementor",
      year: 2025,
      imageUrl:
        "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1400&auto=format&fit=crop&q=60",
      summary:
        "Personal portfolio website build with Elementor featuring services, projects, and a modern responsive layout.",
      tech: ["WordPress", "Elementor", "UI Design", "Responsive Layout"],
      highlights: ["Portfolio sections", "Clean responsive structure"],
      links: {
        live: "https://ezetechsoft.com/",
      },
      visibility: "Private/Client",
    },
    {
      title: "DolphinTek Services Template",
      category: "WordPress / Elementor",
      year: 2025,
      imageUrl:
        "https://images.unsplash.com/photo-1556761175-4b46a572b786?w=1400&auto=format&fit=crop&q=60",
      summary:
        "Template-based website showcasing services with reusable Elementor sections and consistent visual styling.",
      tech: ["WordPress", "Elementor", "Template Setup", "UI Design"],
      highlights: ["Reusable section templates", "Service blocks + CTA layout"],
      links: {
        live: "https://dolphintek.biz/",
      },
      visibility: "Private/Client",
    },
    {
      title: "KSDA Community Profile",
      category: "WordPress / Elementor",
      year: 2025,
      imageUrl:
        "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1400&auto=format&fit=crop&q=60",
      summary:
        "Community profile website with structured pages and content sections for community presence and updates.",
      tech: ["WordPress", "Elementor", "UI Design", "Responsive Layout"],
      highlights: ["Community profile structure", "Clean content hierarchy"],
      links: {
        live: "http://ksda.dolphintek.biz/",
      },
      visibility: "Private/Client",
    },

    // ---------------------------
    // HTML/CSS/JS
    // ---------------------------
    {
      title: "Jasmine’s Zone (E-commerce)",
      category: "HTML/CSS/JS",
      year: 2025,
      imageUrl: "/projects/jasmine's-zone.png",
      summary:
        "Static e-commerce website with product display and simple flow, deployed with a custom domain.",
      tech: ["HTML", "CSS", "JavaScript"],
      highlights: [
        "Fast static performance",
        "Deployed live with custom domain",
      ],
      links: {
        github: "https://github.com/sruoyveasna/Jasmine-s-zone",
        live: "https://www.jasmineszone.shop/",
      },
      visibility: "Private/Client",
    },
    {
      title: "SIS Store (E-commerce)",
      category: "HTML/CSS/JS",
      year: 2025,
      imageUrl: "/projects/sis-store.png",
      summary:
        "Mini e-commerce website built with HTML/CSS/JS and lightweight dynamic sections.",
      tech: ["HTML", "CSS", "JavaScript"],
      highlights: ["Static + lightweight interactions", "Responsive pages"],
      links: {
        github: "https://github.com/sruoyveasna/Sis-store",
        live: "https://sruoyveasna.github.io/Sis-store/",
      },
      visibility: "Private/Client",
    },
    {
      title: "Vistha Portfolio Website",
      category: "HTML/CSS/JS",
      year: 2025,
      imageUrl: "/projects/vistha.png",
      summary:
        "Portfolio-style company site with clean sections and static deployment.",
      tech: ["HTML", "CSS", "JavaScript"],
      highlights: ["Fast static pages", "Clean portfolio layout"],
      links: {
        github: "https://github.com/sruoyveasna/vistha",
        live: "https://sruoyveasna.github.io/vistha/",
      },
      visibility: "Public",
    },
    {
      title: "Tour Prototype",
      category: "HTML/CSS/JS",
      year: 2024,
      imageUrl:
        "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1400&auto=format&fit=crop&q=60",
      summary:
        "Prototype landing pages for a tour/travel website with responsive sections.",
      tech: ["HTML", "CSS", "JavaScript"],
      highlights: ["Responsive layout", "UI prototype structure"],
      links: {
        github: "https://github.com/sruoyveasna/tour-prototype",
        live: "https://sruoyveasna.github.io/tour-prototype/",
      },
      visibility: "Public",
    },
    {
      title: "Mastering Git",
      category: "HTML/CSS/JS",
      year: 2024,
      imageUrl:
        "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1400&auto=format&fit=crop&q=60",
      summary:
        "Learning repository for Git & GitHub practice with notes, examples, and workflow experiments.",
      tech: ["Git", "GitHub", "HTML", "CSS", "JavaScript"],
      highlights: ["Git workflow practice", "Useful learning reference"],
      links: {
        github: "https://github.com/sruoyveasna/mastering-git",
        live: "https://sruoyveasna.github.io/mastering-git/",
      },
      visibility: "Public",
    },
    {
      title: "Facebook Clone (UI)",
      category: "HTML/CSS/JS",
      year: 2023,
      imageUrl:
        "https://images.unsplash.com/photo-1556745757-8d76bdb6984b?w=1400&auto=format&fit=crop&q=60",
      summary:
        "Frontend UI practice project replicating familiar social feed layout and components.",
      tech: ["HTML", "CSS", "JavaScript"],
      highlights: ["UI layout practice", "Component-like sections"],
      links: {
        github: "https://github.com/sruoyveasna/FacebookClone",
        live: "https://sruoyveasna.github.io/FacebookClone/",
      },
      visibility: "Public",
    },
    {
      title: "Sample Assignment",
      category: "HTML/CSS/JS",
      year: 2023,
      imageUrl:
        "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1400&auto=format&fit=crop&q=60",
      summary:
        "Small assignment projects for practicing layout, DOM, and basic frontend logic.",
      tech: ["HTML", "CSS", "JavaScript"],
      highlights: ["Simple UI tasks", "DOM practice"],
      links: {
        github: "https://github.com/sruoyveasna/SampleAssigment",
        live: "https://sruoyveasna.github.io/SampleAssigment/",
      },
      visibility: "Public",
    },
    {
      title: "Add to Cart Demo",
      category: "HTML/CSS/JS",
      year: 2023,
      imageUrl: "/projects/add-to-cart.png",
      summary:
        "Mini cart UI + JavaScript interactions for adding/removing items and updating totals.",
      tech: ["HTML", "CSS", "JavaScript"],
      highlights: ["Cart interaction logic", "State update practice"],
      links: {
        github: "https://github.com/sruoyveasna/Addtocart",
        live: "https://sruoyveasna.github.io/Addtocart/",
      },
      visibility: "Public",
    },
    {
      title: "GB Converter",
      category: "HTML/CSS/JS",
      year: 2023,
      imageUrl:
        "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=1400&auto=format&fit=crop&q=60",
      summary:
        "Small converter tool for practicing JavaScript logic and input/output UI.",
      tech: ["HTML", "CSS", "JavaScript"],
      highlights: ["Utility tool", "Simple JS logic practice"],
      links: {
        github: "https://github.com/sruoyveasna/GB_converter",
        live: "https://sruoyveasna.github.io/GB_converter/",
      },
      visibility: "Public",
    },
    {
      title: "Sabay Template (Static News)",
      category: "HTML/CSS/JS",
      year: 2023,
      imageUrl:
        "https://images.unsplash.com/photo-1523287562758-66c7fc58967f?w=1400&auto=format&fit=crop&q=60",
      summary:
        "Static news website template project inspired by Sabay-style layout and sections.",
      tech: ["HTML", "CSS", "JavaScript"],
      highlights: ["News layout practice", "Responsive sections"],
      links: {
        github: "https://github.com/sruoyveasna/sabayTempelte",
        live: "https://sruoyveasna.github.io/sabayTempelte/",
      },
      visibility: "Public",
    },
    {
      title: "Testing Sandbox",
      category: "HTML/CSS/JS",
      year: 2024,
      imageUrl:
        "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1400&auto=format&fit=crop&q=60",
      summary:
        "Sandbox repository for experimenting with small ideas, layouts, and quick tests.",
      tech: ["HTML", "CSS", "JavaScript", "GitHub"],
      highlights: ["Quick experiments", "Practice + iteration space"],
      links: {
        github: "https://github.com/sruoyveasna/Testing",
        live: "https://sruoyveasna.github.io/Testing/",
      },
      visibility: "Public",
    },
  ];

  const categories: { key: ProjectCategory; label: string }[] = [
    { key: "All", label: "All" },
    { key: "Laravel System", label: "Laravel System" },
    { key: "Laravel API", label: "Laravel API" },
    { key: "WordPress / Elementor", label: "WordPress / Elementor" },
    { key: "Vue Js", label: "Vue Js" },
    { key: "React Js", label: "React Js" },
    { key: "ASP.NET Core API", label: "ASP.NET Core API" },
    { key: "HTML/CSS/JS", label: "HTML/CSS/JS" },
  ];

  const counts = useMemo(() => {
    const base: Record<ProjectCategory, number> = {
      All: projects.length,
      "Laravel System": 0,
      "Laravel API": 0,
      "WordPress / Elementor": 0,
      "Vue Js": 0,
      "React Js": 0,
      "ASP.NET Core API": 0,
      "HTML/CSS/JS": 0,
    };
    projects.forEach((p) => (base[p.category] += 1));
    return base;
  }, [projects]);

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();

    const out = projects
      .filter((p) => (active === "All" ? true : p.category === active))
      .filter((p) => {
        if (!s) return true;
        const hay = `${p.title} ${p.summary} ${p.category} ${p.year} ${
          p.visibility ?? ""
        }`.toLowerCase();
        return hay.includes(s);
      });

    return out.sort((a, b) => String(b.year).localeCompare(String(a.year)));
  }, [projects, active, q]);

  const visible = useMemo(
    () => filtered.slice(0, visibleCount),
    [filtered, visibleCount]
  );

  const canShowMore = filtered.length > visibleCount;
  const canShowLess = visibleCount > PAGE_SIZE;

  const showMore = () =>
    setVisibleCount((n) => Math.min(n + PAGE_SIZE, filtered.length));
  const showLess = () =>
    setVisibleCount((n) => Math.max(PAGE_SIZE, n - PAGE_SIZE));

  const headlineText = "Clean project gallery with details on click.";
  const headlineWords = useMemo(() => headlineText.split(" "), [headlineText]);

  const lineFor = (cat: Project["category"]) => {
    const map: Record<Project["category"], string> = {
      "Laravel System": "from-purple-500 to-pink-500",
      "Laravel API": "from-fuchsia-500 to-violet-500",
      "WordPress / Elementor": "from-emerald-500 to-teal-500",
      "Vue Js": "from-green-500 to-emerald-500",
      "React Js": "from-cyan-500 to-blue-500",
      "ASP.NET Core API": "from-blue-500 to-indigo-500",
      "HTML/CSS/JS": "from-amber-500 to-orange-500",
    };
    return map[cat] ?? "from-cyan-500 to-blue-500";
  };

  const pillClass = (on: boolean) =>
    `rounded-full px-3 py-1 text-xs font-semibold ring-1 transition-all ${
      on
        ? isDark
          ? "bg-white/10 text-white ring-white/20"
          : "bg-slate-900/10 text-slate-900 ring-slate-900/15"
        : isDark
        ? "bg-white/5 text-white/70 ring-white/10 hover:bg-white/10"
        : "bg-white/70 text-slate-700 ring-slate-200 hover:bg-white"
    }`;

  const visibilityPill = (p: Project) => {
    const v = p.visibility ?? (p.links?.github ? "Public" : "Private/Client");
    return (
      <span
        className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest ring-1 ring-white/15 backdrop-blur ${
          v === "Public"
            ? "bg-emerald-500/20 text-white"
            : "bg-rose-500/20 text-white"
        }`}
      >
        {v !== "Public" ? <Lock className="h-3.5 w-3.5" /> : null}
        {v}
      </span>
    );
  };

  const isValidLink = (u?: string) =>
    Boolean(u && u.trim() && u.trim() !== "#");
  const hasDemo = (p: Project) => isValidLink(p.links?.live);
  const hasRepo = (p: Project) => isValidLink(p.links?.github);

  const btnBase =
    "inline-flex items-center justify-center gap-2 rounded-xl px-3 py-2 text-xs font-extrabold " +
    "ring-1 transition-all duration-300 focus:outline-none focus-visible:ring-2 " +
    "active:scale-[0.98]";

  const btnGithub = (full = false) =>
    [
      btnBase,
      full ? "w-full" : "",
      isDark
        ? "bg-white/5 text-white/85 ring-white/10 hover:bg-white hover:text-slate-950 hover:ring-white/30 hover:shadow-[0_18px_55px_rgba(255,255,255,0.12)]"
        : "bg-white text-slate-900 ring-slate-200 hover:bg-slate-950 hover:text-white hover:ring-slate-900/25 hover:shadow-[0_18px_55px_rgba(2,6,23,0.22)]",
      "hover:-translate-y-0.5",
    ].join(" ");

  const btnDemo = (full = false) =>
    [
      btnBase,
      full ? "w-full" : "",
      isDark
        ? "bg-white/5 text-white/85 ring-white/10 hover:bg-gradient-to-r hover:from-cyan-500/35 hover:to-blue-500/35 hover:ring-cyan-300/20 hover:shadow-[0_18px_55px_rgba(34,211,238,0.14)]"
        : "bg-white text-slate-900 ring-slate-200 hover:bg-gradient-to-r hover:from-cyan-500 hover:to-blue-500 hover:text-white hover:ring-cyan-400/30 hover:shadow-[0_18px_55px_rgba(59,130,246,0.18)]",
      "hover:-translate-y-0.5",
    ].join(" ");

  const loadMoreBtnClass =
    `inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm font-extrabold ring-1 transition-all ` +
    (isDark
      ? "bg-white/5 text-white/85 ring-white/10 hover:bg-white/10"
      : "bg-white text-slate-900 ring-slate-200 hover:bg-slate-50");

  return (
    <section id="projects" className="relative overflow-hidden">
      <style>{`
        @keyframes pop {
          0% { transform: scale(0.98); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>

      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <motion.div
          variants={sectionWrap}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
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
                <Layers className="h-4 w-4 text-cyan-400" />
                Projects
              </div>
            </motion.div>

            <motion.h2
              variants={headlineWrap}
              className={`text-4xl font-extrabold tracking-tight sm:text-5xl ${
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
              className={`max-w-2xl text-base leading-relaxed sm:text-lg ${
                isDark ? "text-white/60" : "text-slate-600"
              }`}
            >
              Minimal cards. Click a project to see full details.
            </motion.p>

            {/* Controls */}
            <motion.div variants={item} className="space-y-4">
              <div className="max-w-xl">
                <div
                  className={`flex items-center gap-2 rounded-2xl border px-4 py-3 backdrop-blur transition-all ${
                    isDark
                      ? "border-white/10 bg-white/5 focus-within:border-white/20"
                      : "border-slate-200 bg-white/70 focus-within:border-slate-300"
                  }`}
                >
                  <Search
                    className={`${
                      isDark ? "text-white/50" : "text-slate-500"
                    } h-4 w-4`}
                  />
                  <input
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    placeholder="Search projects..."
                    className={`w-full bg-transparent text-sm outline-none ${
                      isDark
                        ? "text-white placeholder:text-white/35"
                        : "text-slate-900 placeholder:text-slate-400"
                    }`}
                  />
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <div
                  className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-widest ring-1 ${
                    isDark
                      ? "bg-white/5 text-white/70 ring-white/10"
                      : "bg-slate-900/5 text-slate-700 ring-slate-900/10"
                  }`}
                >
                  <Filter className="h-4 w-4 text-cyan-400" />
                  Filter
                </div>

                {categories.map((c) => (
                  <button
                    key={c.key}
                    onClick={() => setActive(c.key)}
                    className={pillClass(active === c.key)}
                    type="button"
                  >
                    {c.label}{" "}
                    <span
                      className={`${
                        isDark ? "text-white/55" : "text-slate-500"
                      }`}
                    >
                      ({counts[c.key]})
                    </span>
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Grid */}
          <motion.div
            variants={item}
            className="grid items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-4"
          >
            <AnimatePresence mode="popLayout">
              {visible.map((p) => {
                const line = lineFor(p.category);
                const demo = hasDemo(p);
                const repo = hasRepo(p);

                return (
                  <motion.article
                    key={`${p.title}-${p.year}`}
                    variants={item}
                    initial="hidden"
                    animate="show"
                    exit="hidden"
                    layout
                    whileHover={
                      shouldReduceMotion ? undefined : { y: -3, scale: 1.01 }
                    }
                    className={`group relative h-full overflow-hidden rounded-2xl border backdrop-blur transition-all duration-300 flex flex-col ${
                      isDark
                        ? "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10 hover:shadow-xl hover:shadow-black/40"
                        : "border-slate-200 bg-white/70 hover:bg-white hover:shadow-xl hover:shadow-slate-200/60"
                    }`}
                    role="button"
                    tabIndex={0}
                    onClick={() => setSelected(p)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") setSelected(p);
                    }}
                  >
                    {/* image */}
                    <div className="relative aspect-[16/9] w-full overflow-hidden">
                      <img
                        src={p.imageUrl}
                        alt={p.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.06]"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                      <div className="absolute left-4 top-4 flex flex-wrap items-center gap-2">
                        <span className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest ring-1 ring-white/15 bg-black/25 text-white/85 backdrop-blur">
                          <span
                            className={`h-2 w-2 rounded-full bg-gradient-to-r ${line}`}
                          />
                          {p.category}
                        </span>

                        <span className="inline-flex items-center rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest ring-1 ring-white/15 bg-black/25 text-white/85 backdrop-blur">
                          {p.year}
                        </span>

                        {visibilityPill(p)}
                      </div>
                    </div>

                    {/* content */}
                    <div className="flex flex-1 flex-col p-5">
                      <h3
                        className={`text-base font-extrabold tracking-tight ${
                          isDark ? "text-white" : "text-slate-900"
                        } line-clamp-2 min-h-[2.75rem]`}
                      >
                        {p.title}
                      </h3>

                      <p
                        className={`mt-2 text-sm leading-relaxed ${
                          isDark ? "text-white/60" : "text-slate-600"
                        } line-clamp-2 min-h-[2.5rem]`}
                      >
                        {p.summary}
                      </p>

                      {/* actions */}
                      <div className="mt-auto pt-4">
                        {demo && repo ? (
                          <div className="grid grid-cols-2 gap-2">
                            <a
                              href={p.links?.live}
                              target="_blank"
                              rel="noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className={btnDemo()}
                            >
                              <Globe className="h-4 w-4" />
                              Demo
                              <ExternalLink className="h-4 w-4 opacity-70" />
                            </a>

                            <a
                              href={p.links?.github}
                              target="_blank"
                              rel="noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className={btnGithub()}
                            >
                              <Github className="h-4 w-4" />
                              Code
                              <ExternalLink className="h-4 w-4 opacity-70" />
                            </a>
                          </div>
                        ) : demo ? (
                          <a
                            href={p.links?.live}
                            target="_blank"
                            rel="noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className={btnDemo(true)}
                          >
                            <Globe className="h-4 w-4" />
                            View Demo
                            <ExternalLink className="h-4 w-4 opacity-70" />
                          </a>
                        ) : repo ? (
                          <a
                            href={p.links?.github}
                            target="_blank"
                            rel="noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className={btnGithub(true)}
                          >
                            <Github className="h-4 w-4" />
                            Source Code
                            <ExternalLink className="h-4 w-4 opacity-70" />
                          </a>
                        ) : (
                          <div
                            className={`inline-flex items-center justify-center rounded-xl px-3 py-2 text-xs font-bold ring-1 ${
                              isDark
                                ? "bg-white/5 text-white/30 ring-white/10 opacity-60"
                                : "bg-white/70 text-slate-400 ring-slate-200 opacity-60"
                            }`}
                          >
                            No links available
                          </div>
                        )}
                      </div>

                      {/* bottom gradient line */}
                      <div
                        className={`absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r ${line}
                        group-hover:w-full transition-all duration-500 ease-out`}
                      />
                    </div>
                  </motion.article>
                );
              })}
            </AnimatePresence>

            {filtered.length === 0 && (
              <div
                className={`col-span-full rounded-2xl border p-8 text-center ${
                  isDark
                    ? "border-white/10 bg-white/5 text-white/70"
                    : "border-slate-200 bg-white/70 text-slate-600"
                }`}
              >
                No projects found for “{q}”.
              </div>
            )}
          </motion.div>

          {/* Show more / Show less */}
          {filtered.length > 0 && (canShowMore || canShowLess) && (
            <motion.div
              variants={item}
              className="flex flex-wrap items-center justify-center gap-3 pt-2"
            >
              {canShowLess && (
                <button
                  type="button"
                  onClick={showLess}
                  className={loadMoreBtnClass}
                >
                  Show less
                  <span className={isDark ? "text-white/50" : "text-slate-500"}>
                    ({Math.min(visibleCount, filtered.length)}/{filtered.length}
                    )
                  </span>
                </button>
              )}

              {canShowMore && (
                <button
                  type="button"
                  onClick={showMore}
                  className={loadMoreBtnClass}
                >
                  Show more
                  <span className={isDark ? "text-white/50" : "text-slate-500"}>
                    ({Math.min(visibleCount, filtered.length)}/{filtered.length}
                    )
                  </span>
                </button>
              )}
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Modal */}
      {selected && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          onClick={() => setSelected(null)}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

          <div
            onClick={(e) => e.stopPropagation()}
            className={`relative w-full max-w-3xl overflow-hidden rounded-2xl border shadow-2xl ${
              isDark
                ? "border-white/10 bg-slate-950"
                : "border-slate-200 bg-white"
            }`}
            style={{ animation: "pop 140ms ease-out" }}
          >
            <div className="relative aspect-[16/9] w-full overflow-hidden">
              <img
                src={selected.imageUrl}
                alt={selected.title}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

              <button
                type="button"
                onClick={() => setSelected(null)}
                className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-black/30 text-white ring-1 ring-white/15 backdrop-blur hover:bg-black/45"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="absolute left-5 bottom-5 space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest ring-1 ring-white/15 bg-black/25 text-white/90 backdrop-blur">
                    <Tag className="h-3.5 w-3.5 text-cyan-300" />
                    {selected.category}
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest ring-1 ring-white/15 bg-black/25 text-white/90 backdrop-blur">
                    <Calendar className="h-3.5 w-3.5 text-cyan-300" />
                    {selected.year}
                  </span>
                  {visibilityPill(selected)}
                </div>

                <div className="text-xl font-extrabold text-white sm:text-2xl">
                  {selected.title}
                </div>
              </div>
            </div>

            <div className="p-6 sm:p-7">
              <p
                className={`${
                  isDark ? "text-white/70" : "text-slate-700"
                } leading-relaxed`}
              >
                {selected.summary}
              </p>

              <div className="mt-5">
                <div
                  className={`text-xs font-bold uppercase tracking-widest ${
                    isDark ? "text-white/55" : "text-slate-500"
                  }`}
                >
                  Tech Stack
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {selected.tech.map((t) => (
                    <span
                      key={t}
                      className={`rounded-full px-3 py-1 text-xs font-semibold ring-1 ${
                        isDark
                          ? "bg-white/5 text-white/75 ring-white/10"
                          : "bg-white text-slate-700 ring-slate-200"
                      }`}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {selected.highlights?.length ? (
                <div className="mt-5">
                  <div
                    className={`text-xs font-bold uppercase tracking-widest ${
                      isDark ? "text-white/55" : "text-slate-500"
                    }`}
                  >
                    Highlights
                  </div>
                  <ul
                    className={`mt-3 space-y-2 text-sm ${
                      isDark ? "text-white/65" : "text-slate-600"
                    }`}
                  >
                    {selected.highlights.map((h) => (
                      <li key={h} className="flex gap-2">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              <div className="mt-7 flex flex-wrap items-center gap-2">
                {hasDemo(selected) && (
                  <a
                    href={selected.links?.live}
                    target="_blank"
                    rel="noreferrer"
                    className={btnDemo()}
                  >
                    <Globe className="h-4 w-4" />
                    View Demo
                    <ExternalLink className="h-4 w-4 opacity-70" />
                  </a>
                )}

                {hasRepo(selected) && (
                  <a
                    href={selected.links?.github}
                    target="_blank"
                    rel="noreferrer"
                    className={btnGithub()}
                  >
                    <Github className="h-4 w-4" />
                    Source Code
                    <ExternalLink className="h-4 w-4 opacity-70" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ProjectsSection;
