/**
 * Setor / Seção: Hero (Apresentação Principal)
 * É a primeira seção visível da página, contendo uma saudação com o nome do profissional,
 * título principal (headline), breve resumo (subheadline), botões de ação para visualização
 * de projetos e download do currículo, links sociais e um avatar estilizado com animações.
 */
"use client";

import { motion } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useLocale } from "@/hooks/useLocale";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";

export function Hero() {
  const { dict } = useLocale();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { type: "spring" as const, stiffness: 100, damping: 20 },
    },
  };

  const glowVariants = {
    animate1: {
      x: [0, 30, -20, 0],
      y: [0, -40, 20, 0],
      scale: [1, 1.1, 0.9, 1],
      transition: { duration: 10, repeat: Infinity, ease: "easeInOut" as const },
    },
    animate2: {
      x: [0, -20, 40, 0],
      y: [0, 30, -30, 0],
      scale: [1, 0.9, 1.15, 1],
      transition: { duration: 12, repeat: Infinity, ease: "easeInOut" as const },
    },
  };

  const scrollToProjects = () => {
    if ((window as any).lenis) {
      const target = document.getElementById("projects");
      if (target) (window as any).lenis.scrollTo(target, { offset: -85 });
    } else {
      document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden bg-white dark:bg-[#030303] transition-colors"
    >
      {/* Grade de Fundo (Grid) */}
      <div className="absolute inset-0 grid-bg opacity-[0.4] dark:opacity-[0.25]" />
      
      {/* Camada de Gradiente Radial para suavizar a grade nas bordas */}
      <div className="absolute inset-0 bg-radial from-transparent via-white/80 to-white dark:via-[#030303]/80 dark:to-[#030303]" />

      {/* Esferas de Brilho de Fundo (Blobs) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          variants={glowVariants}
          animate="animate1"
          className="absolute top-1/4 left-1/4 w-[350px] h-[350px] rounded-full bg-violet-500/20 dark:bg-violet-500/10 glow-orb"
        />
        <motion.div
          variants={glowVariants}
          animate="animate2"
          className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-cyan-500/20 dark:bg-cyan-500/80 glow-orb"
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Conteúdo da Esquerda do Hero */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 text-center lg:text-left flex flex-col items-center lg:items-start"
          >
            {/* Nome */}
            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-zinc-950 dark:text-white mb-4"
            >
              Vinicius Silva <br className="hidden md:inline" />
              <span className="bg-clip-text text-transparent bg-linear-to-r from-violet-600 via-indigo-500 to-cyan-400 dark:from-violet-400 dark:via-indigo-300 dark:to-cyan-400">
                de Andrade
              </span>
            </motion.h1>

            {/* Título / Headline */}
            <motion.h2
              variants={itemVariants}
              className="text-xl sm:text-2xl font-bold text-zinc-800 dark:text-zinc-200 tracking-tight mb-4 max-w-2xl"
            >
              {dict.hero.headline}
            </motion.h2>

            {/* Subtítulo / Subheadline */}
            <motion.p
              variants={itemVariants}
              className="text-sm sm:text-base text-zinc-500 dark:text-zinc-400 leading-relaxed mb-8 max-w-xl"
            >
              {dict.hero.subheadline}
            </motion.p>

            {/* Botões de Ação */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
            >
              <Button
                onClick={scrollToProjects}
                variant="primary"
                size="lg"
                rightIcon={<ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />}
                className="w-full sm:w-auto group"
              >
                {dict.hero.viewProjects}
              </Button>
              
              <a
                href="/cv-vinicius.pdf" // Caminho de espaço reservado para o currículo PDF
                download
                className="w-full sm:w-auto"
              >
                <Button
                  variant="secondary"
                  size="lg"
                  leftIcon={<Download className="w-4 h-4" />}
                  className="w-full"
                >
                  {dict.hero.downloadCV}
                </Button>
              </a>
            </motion.div>

            {/* Links de Ícones Sociais */}
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-4 mt-8 pt-8 border-t border-zinc-100 dark:border-zinc-900 w-full justify-center lg:justify-start"
            >
              <a
                href="https://github.com/lisboainformatica"
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors p-2 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-full"
                aria-label="GitHub Profile"
              >
                <GithubIcon className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com/in/vinicius-andrade-dev"
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors p-2 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-full"
                aria-label="LinkedIn Profile"
              >
                <LinkedinIcon className="w-5 h-5" />
              </a>
            </motion.div>
          </motion.div>

          {/* Elementos Visuais da Direita do Hero (Avatar Estilizado) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 60, damping: 15, delay: 0.3 }}
            className="lg:col-span-5 flex justify-center items-center"
          >
            <div className="relative w-72 h-72 sm:w-85 sm:h-85 lg:w-96 lg:h-96">
              {/* Elemento giratório de brilho de fundo */}
              <div className="absolute inset-0 bg-linear-to-tr from-violet-600/30 to-cyan-500/30 dark:from-violet-500/20 dark:to-cyan-400/20 rounded-full blur-3xl animate-pulse-slow" />
              
              {/* Moldura Flutuante (Floating Frame) */}
              <div className="relative w-full h-full rounded-3xl border border-zinc-200/60 dark:border-zinc-800/80 bg-white/40 dark:bg-zinc-950/40 backdrop-blur-md shadow-2xl p-4 flex items-center justify-center overflow-hidden animate-float">
                {/* Fundo visual de grade dentro do card */}
                <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
                
                {/* Avatar SVG de Código */}
                <svg
                  viewBox="0 0 200 200"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4/5 h-4/5 relative z-10"
                >
                  <defs>
                    <linearGradient id="avatarGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#7c3aed" />
                      <stop offset="100%" stopColor="#06b6d4" />
                    </linearGradient>
                    <linearGradient id="circleGlow" x1="100%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#6366f1" />
                      <stop offset="100%" stopColor="#10b981" />
                    </linearGradient>
                    <clipPath id="avatarClip">
                      <circle cx="100" cy="100" r="52" />
                    </clipPath>
                  </defs>
                  
                  {/* Círculo Tecnológico Externo */}
                  <circle cx="100" cy="100" r="85" stroke="url(#circleGlow)" strokeWidth="1" strokeDasharray="4 8" className="animate-spin" style={{ transformOrigin: "center", animationDuration: "30s" }} />
                  
                  {/* Anel Tecnológico Interno */}
                  <circle cx="100" cy="100" r="75" stroke="#ffffff" strokeOpacity="0.05" strokeWidth="2" />
                  <circle cx="100" cy="100" r="75" stroke="url(#avatarGlow)" strokeOpacity="0.4" strokeWidth="1.5" strokeDasharray="30 150" className="animate-spin" style={{ transformOrigin: "center", animationDuration: "12s" }} />

                  {/* Representação Vetorial de Elementos de Código */}
                  <path d="M45 65 L60 80 L45 95" stroke="url(#avatarGlow)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                  <rect x="68" y="90" width="20" height="4" rx="2" fill="#06b6d4" />
                  
                  <path d="M155 135 L140 120 L155 105" stroke="url(#circleGlow)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                  <rect x="112" y="105" width="20" height="4" rx="2" fill="#7c3aed" />

                  {/* Borda e Imagem Circular do Avatar */}
                  <circle cx="100" cy="100" r="55" stroke="url(#avatarGlow)" strokeWidth="2" fill="none" />
                  <image
                    href="/avatar.png"
                    x="48"
                    y="48"
                    width="104"
                    height="104"
                    clipPath="url(#avatarClip)"
                    preserveAspectRatio="xMidYMid slice"
                  />
                </svg>
                
                {/* Camada de reflexo brilhante */}
                <div className="absolute inset-0 bg-linear-to-tr from-transparent via-white/10 to-white/5 dark:via-white/5 dark:to-white/0 pointer-events-none" />
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
