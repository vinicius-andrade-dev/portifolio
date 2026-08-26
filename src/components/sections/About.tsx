/**
 * Setor / Seção: Sobre (About)
 * Apresenta uma introdução sobre o profissional, formação atual e uma
 * linha do tempo interativa destacando os marcos da trajetória.
 */
"use client";

import { motion } from "framer-motion";
import { Shield, Server, Code, Award } from "lucide-react";
import { useLocale } from "@/hooks/useLocale";
import { Card, CardContent } from "@/components/ui/Card";

export function About() {
  const { dict } = useLocale();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" as const },
    },
  };

  const timelineVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: (index: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 15,
        delay: index * 0.2,
      },
    }),
  };

  // Mapeamento de ícones para eventos da linha do tempo
  const icons = [
    <Shield className="w-5 h-5 text-indigo-500" key="shield" />,
    <Server className="w-5 h-5 text-cyan-500" key="server" />,
    <Code className="w-5 h-5 text-violet-500" key="code" />,
  ];

  return (
    <section
      id="about"
      className="py-24 relative overflow-hidden bg-zinc-50 dark:bg-[#030303]/40 border-y border-zinc-100 dark:border-zinc-900/60 transition-colors"
    >
      {/* Elementos visuais de fundo (formas decorativas) */}
      <div className="absolute top-1/3 left-0 w-80 h-80 rounded-full bg-indigo-500/5 dark:bg-indigo-500/2 glow-orb" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Cabeçalho da Seção */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400 mb-2"
          >
            {dict.about.title}
          </motion.h2>
          <motion.h3
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-950 dark:text-white"
          >
            {dict.about.subtitle}
          </motion.h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Lado Esquerdo: Trajetória e texto de introdução */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="lg:col-span-5 space-y-6 lg:sticky lg:top-28"
          >
            <motion.h4
              variants={textVariants}
              className="text-xl font-bold text-zinc-900 dark:text-zinc-100"
            >
              {dict.about.intro}
            </motion.h4>
            <motion.p
              variants={textVariants}
              className="text-base text-zinc-500 dark:text-zinc-400 leading-relaxed"
            >
              {dict.about.paragraph1}
            </motion.p>
            <motion.p
              variants={textVariants}
              className="text-base text-zinc-500 dark:text-zinc-400 leading-relaxed"
            >
              {dict.about.paragraph2}
            </motion.p>

            <motion.div
              variants={textVariants}
              className="p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/40 flex items-center gap-4 shadow-xs"
            >
              <div className="p-3 bg-indigo-50 dark:bg-indigo-950/50 rounded-xl text-indigo-600 dark:text-indigo-400">
                <Award className="w-6 h-6 animate-pulse" />
              </div>
              <div>
                <span className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                  Estudante ADS
                </span>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                  Focado em Engenharia de Software e Práticas DevOps.
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Lado Direito: Linha do tempo vertical interactiva */}
          <div className="lg:col-span-7 relative pl-8 lg:pl-10">
            
            {/* Linha vertical da linha do tempo */}
            <div className="absolute left-4.5 lg:left-6.5 top-2 bottom-2 w-0.5 bg-zinc-200 dark:bg-zinc-800/80" />

            {/* Agrupador de cards da linha do tempo */}
            <div className="space-y-10">
              {dict.about.events.map((event: any, index: number) => (
                <motion.div
                  key={index}
                  custom={index}
                  variants={timelineVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  className="relative"
                >
                  {/* Contêiner do ícone do ponto/nó da linha do tempo */}
                  <span className="absolute -left-11 lg:-left-13 top-1 flex items-center justify-center w-8 h-8 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-xs z-10 text-zinc-700 dark:text-zinc-300">
                    {icons[index] || <Code className="w-4 h-4" />}
                  </span>

                  {/* Card com os detalhes do evento */}
                  <Card hoverEffect glass className="relative border-zinc-200/80 dark:border-zinc-800/60">
                    <CardContent className="p-6">
                      <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 tracking-wider">
                        {event.year}
                      </span>
                      <h4 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mt-1 mb-2">
                        {event.title}
                      </h4>
                      <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                        {event.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
