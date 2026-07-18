"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Globe, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const languages = [
  { code: "pt", label: "Português", flag: "🇧🇷" },
  { code: "en", label: "English", flag: "🇺🇸" },
  { code: "es", label: "Español", flag: "🇪🇸" },
];

export function LanguageSwitcher() {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  // Extract current language from URL
  let currentLocale = "pt";
  if (pathname.startsWith("/en/") || pathname === "/en") currentLocale = "en";
  else if (pathname.startsWith("/es/") || pathname === "/es") currentLocale = "es";

  const handleLanguageChange = (locale: string) => {
    // Save to cookie so the middleware remembers next time
    document.cookie = `NEXT_LOCALE=${locale}; path=/; max-age=31536000; SameSite=Lax`;

    let newPath = pathname;

    // Remove old locale prefix if present
    if (pathname.startsWith("/en")) {
      newPath = pathname.substring(3) || "/";
    } else if (pathname.startsWith("/es")) {
      newPath = pathname.substring(3) || "/";
    }

    // Add new locale prefix (default 'pt' uses root directory '/')
    if (locale === "pt") {
      newPath = newPath.startsWith("/") ? newPath : `/${newPath}`;
    } else {
      newPath = newPath.startsWith("/") ? `/${locale}${newPath}` : `/${locale}/${newPath}`;
    }

    // Format slash duplicates
    newPath = newPath.replace(/\/+/g, "/");
    if (newPath.endsWith("/") && newPath.length > 1) {
      newPath = newPath.slice(0, -1);
    }

    router.push(newPath);
    setIsOpen(false);
  };

  const activeLang = languages.find((lang) => lang.code === currentLocale) || languages[0];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-full border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-sm font-medium text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800/80 transition-colors cursor-pointer"
        aria-expanded={isOpen}
        aria-label="Select Language"
      >
        <Globe className="w-4 h-4 text-zinc-500" />
        <span>{activeLang.flag}</span>
        <span className="uppercase text-xs tracking-wider font-semibold">{activeLang.code}</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
            
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="absolute right-0 mt-2 w-44 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md shadow-lg z-50 overflow-hidden"
            >
              <div className="py-1">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => handleLanguageChange(lang.code)}
                    className="flex items-center justify-between w-full px-4 py-2 text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors text-left font-medium cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <span>{lang.flag}</span>
                      <span>{lang.label}</span>
                    </div>
                    {currentLocale === lang.code && (
                      <Check className="w-4.5 h-4.5 text-indigo-500" />
                    )}
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
