/**
 * Setor / Seção: Rodapé (Footer)
 * Rodapé da página contendo informações sobre o profissional, links rápidos
 * para contato e redes sociais, informações de copyright e detalhes das
 * tecnologias empregadas no desenvolvimento do site.
 */
"use client";

import { Mail, Phone } from "lucide-react";
import { useLocale } from "@/hooks/useLocale";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";

export function Footer() {
  const { dict } = useLocale();

  const socialLinks = [
    {
      icon: <GithubIcon className="w-5 h-5" />,
      url: "https://github.com/vinicius-andrade-dev",
      label: "GitHub",
    },
    {
      icon: <LinkedinIcon className="w-5 h-5" />,
      url: "https://linkedin.com/in/vinicius-andrade-dev",
      label: "LinkedIn",
    },
    {
      icon: <Mail className="w-5 h-5" />,
      url: "mailto:gestaolisboainfo@gmail.com",
      label: "Email",
    },
    {
      icon: <Phone className="w-5 h-5" />,
      url: "https://wa.me/5573981667518",
      label: "WhatsApp",
    },
  ];

  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#030303] py-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Informações da Marca / Identidade */}
          <div className="text-center md:text-left">
            <span className="text-base font-bold text-zinc-900 dark:text-white">
              Vinicius Silva de Andrade
            </span>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
              {dict.hero.role || "Full Stack Developer"}
            </p>
          </div>

          {/* Links Sociais */}
          <div className="flex items-center gap-4">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                aria-label={link.label}
              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between border-t border-zinc-200 dark:border-zinc-800 mt-8 pt-8 text-center sm:text-left">
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            © {new Date().getFullYear()} Vinicius Silva de Andrade. All rights reserved.
          </p>
          <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-2 sm:mt-0">
            Built with Next.js 16, React 19 & Tailwind CSS v4
          </p>
        </div>
      </div>
    </footer>
  );
}
