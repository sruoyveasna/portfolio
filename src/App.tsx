import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { ThemeProvider } from "./context/theme";
import React from "react";
import { useTheme } from "./context/theme";

const queryClient = new QueryClient();

/**
 * ✅ Force Dark Mode by default (only once on first mount)
 * - Keeps toggle working normally
 * - Avoids changing your ThemeProvider logic
 */
const EnsureDarkDefault: React.FC = () => {
  const { isDark, toggleTheme } = useTheme();

  React.useLayoutEffect(() => {
    if (!isDark) toggleTheme();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
};

/**
 * Global background layer (one-page feel)
 * - Matches the same visual language you used in About
 * - Put it once here, and REMOVE per-section base backgrounds
 */
const GlobalBackground: React.FC = () => {
  const { isDark } = useTheme();

  return (
    <div aria-hidden="true" className="fixed inset-0 -z-10 overflow-hidden">
      {/* Base gradient */}
      <div
        className={`absolute inset-0 ${
          isDark
            ? "bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950"
            : "bg-gradient-to-b from-slate-100 via-white to-slate-50"
        }`}
      />

      {/* Soft grid */}
      <div
        className="absolute inset-0 opacity-[0.14]"
        style={{
          backgroundImage: isDark
            ? "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.18) 1px, transparent 1px)"
            : "radial-gradient(circle at 1px 1px, rgba(2,6,23,0.12) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* Glow fields */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(900px 520px at 18% 18%, rgba(59,130,246,0.25), transparent 62%), radial-gradient(900px 520px at 82% 18%, rgba(168,85,247,0.20), transparent 62%), radial-gradient(900px 520px at 50% 92%, rgba(20,184,166,0.10), transparent 58%)",
        }}
      />
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        {/* ✅ Force default dark mode */}
        <EnsureDarkDefault />

        {/* ✅ One global background for the whole app */}
        <GlobalBackground />

        {/* App chrome */}
        <Toaster />
        <Sonner />

        {/* Routes */}
        <BrowserRouter>
          <div className="relative z-0 min-h-screen">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
