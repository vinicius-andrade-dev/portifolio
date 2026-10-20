/**
 * Seção de currículo: disponibiliza a versão principal em PDF e apresenta
 * a versão especializada em Back-end sem oferecer um arquivo ainda inexistente.
 */
"use client";

import { motion } from "framer-motion";
import { Download, ExternalLink, FileText, ArrowRight, Clock3 } from "lucide-react";
import { useLocale } from "@/hooks/useLocale";
import { Card, CardContent } from "@/components/ui/Card";

export function Resume() {
  const { dict } = useLocale();

  return (
    <section
      id="resume"
      className="py-24 relative overflow-hidden bg-white dark:bg-[#030303] border-t border-zinc-100 dark:border-zinc-900/60 transition-colors"
    >
      <div className="absolute top-0 right-0 w-[420px] h-[420px] rounded-full bg-indigo-500/5 dark:bg-indigo-500/5 glow-orb pointer-events-none" />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <p className="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400 mb-2">
            {dict.resume.title}
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-950 dark:text-white">
            {dict.resume.title}
          </h2>
          <p className="mt-4 text-base text-zinc-500 dark:text-zinc-400">
            {dict.resume.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
          >
            <Card hoverEffect glass className="h-full border-indigo-200/80 dark:border-indigo-900/70">
              <CardContent className="p-6 sm:p-7 flex flex-col h-full">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900/60">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                      {dict.resume.fullStack}
                    </h3>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                      {dict.resume.format}
                    </p>
                  </div>
                </div>
                <p className="mt-5 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 flex-1">
                  {dict.resume.fullStackDescription}
                </p>
                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <a
                    href="/cv-vinicius.pdf"
                    download="Vinicius-Andrade-Curriculo-Full-Stack.pdf"
                    className="inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                  >
                    <Download className="w-4 h-4" />
                    {dict.resume.download}
                  </a>
                  <a
                    href="/cv-vinicius.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    {dict.resume.viewOnline}
                  </a>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.08 }}
          >
            <Card glass className="h-full border-zinc-200/80 dark:border-zinc-800/80">
              <CardContent className="p-6 sm:p-7 flex flex-col h-full">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-cyan-50 dark:bg-cyan-950/40 text-cyan-700 dark:text-cyan-300 border border-cyan-100 dark:border-cyan-900/60">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                      {dict.resume.backEnd}
                    </h3>
                    <p className="inline-flex items-center gap-1.5 mt-2 text-xs font-semibold text-amber-700 dark:text-amber-300">
                      <Clock3 className="w-3.5 h-3.5" />
                      {dict.resume.preparing}
                    </p>
                  </div>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 flex-1">
                  {dict.resume.backEndDescription}
                </p>
                <p className="mt-3 text-xs leading-relaxed text-zinc-500 dark:text-zinc-500">
                  {dict.resume.preparingNote}
                </p>
                <a
                  href="#projects"
                  className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                >
                  {dict.resume.backEndProjects}
                  <ArrowRight className="w-4 h-4" />
                </a>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
