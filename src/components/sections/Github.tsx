/**
 * Setor / Seção: Dashboard do GitHub (GithubSection)
 * Exibe dados em tempo real integrados com a API do GitHub, incluindo
 * informações de perfil do usuário, métricas de repositórios/estrelas/forks,
 * linguagens mais utilizadas, grade de contribuições simulada e os repositórios mais recentes.
 */
"use client";

import { motion } from "framer-motion";
import { Star, GitFork, BookOpen, ExternalLink, Code2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { GithubIcon } from "@/components/ui/Icons";
import { useLocale } from "@/hooks/useLocale";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

interface GithubData {
  user: {
    avatar: string;
    login: string;
    name: string;
    url: string;
    publicRepos: number;
    followers: number;
  };
  stats: {
    totalStars: number;
    totalForks: number;
    totalRepos: number;
    topLanguages: { name: string; count: number }[];
  };
  repos: {
    name: string;
    description: string;
    stars: number;
    forks: number;
    language: string;
    url: string;
  }[];
}

export function GithubSection() {
  const { dict } = useLocale();

  const { data: githubData, isLoading } = useQuery<GithubData>({
    queryKey: ["github-data"],
    queryFn: async () => {
      const res = await fetch("/api/github");
      if (!res.ok) throw new Error("Failed to fetch GitHub data");
      return res.json();
    },
    retry: 1,
  });

  // Renderiza uma grade responsiva simulada de contribuições (commits)
  const renderContributionGrid = () => {
    // 53 semanas * 7 dias = 371 quadrados
    // Criamos quadrados com diferentes intensidades representando commits
    const totalSquares = 120; // limita o tamanho em dispositivos móveis/desktops
    const squares = Array.from({ length: totalSquares }, (_, i) => {
      // Cria um padrão: alguns dias têm commits, outros não
      const rand = Math.sin(i * 0.15) * Math.cos(i * 0.3) + Math.random();
      let colorClass = "bg-zinc-100 dark:bg-zinc-900"; // 0 commits
      
      if (rand > 1.2) colorClass = "bg-emerald-800 dark:bg-emerald-900"; // alto
      else if (rand > 0.8) colorClass = "bg-emerald-600 dark:bg-emerald-700"; // médio
      else if (rand > 0.3) colorClass = "bg-emerald-400 dark:bg-emerald-500/80"; // baixo
      else if (rand > 0.0) colorClass = "bg-emerald-200 dark:bg-emerald-300/30"; // micro

      return <div key={i} className={`w-3.5 h-3.5 rounded-[2px] transition-all hover:scale-130 ${colorClass}`} />;
    });

    return (
      <div className="w-full overflow-x-auto no-scrollbar pb-2">
        <div className="flex flex-col gap-1.5 min-w-[620px]">
          {/* Grades de dias: 7 linhas */}
          <div className="grid grid-flow-col grid-rows-7 gap-1.5 auto-cols-max">
            {squares}
          </div>
          <div className="flex justify-between items-center text-[10px] text-zinc-400 dark:text-zinc-550 pt-2 px-1">
            <span>Less</span>
            <div className="flex gap-1 items-center">
              <span className="w-2.5 h-2.5 rounded-[1px] bg-zinc-100 dark:bg-zinc-900" />
              <span className="w-2.5 h-2.5 rounded-[1px] bg-emerald-200 dark:bg-emerald-300/30" />
              <span className="w-2.5 h-2.5 rounded-[1px] bg-emerald-400 dark:bg-emerald-500/80" />
              <span className="w-2.5 h-2.5 rounded-[1px] bg-emerald-600 dark:bg-emerald-700" />
              <span className="w-2.5 h-2.5 rounded-[1px] bg-emerald-800 dark:bg-emerald-900" />
            </div>
            <span>More</span>
          </div>
        </div>
      </div>
    );
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring" as const, stiffness: 100, damping: 20 },
    },
  };

  if (isLoading || !githubData) {
    return (
      <div className="py-24 max-w-7xl mx-auto px-4 text-center">
        <div className="h-64 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950/40 animate-pulse" />
      </div>
    );
  }

  const { user, stats, repos } = githubData;

  return (
    <section
      id="github"
      className="py-24 relative overflow-hidden bg-white dark:bg-[#030303] transition-colors"
    >
      <div className="absolute top-1/2 left-0 w-80 h-80 rounded-full bg-cyan-500/5 glow-orb pointer-events-none" />

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
            {dict.github.title}
          </motion.h2>
          <motion.h3
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-950 dark:text-white"
          >
            {dict.github.subtitle}
          </motion.h3>
        </div>

        {/* Grid de Layout do Dashboard */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
        >
          
          {/* Painel Esquerdo: Estatísticas do Perfil e Calendário */}
          <div className="lg:col-span-4 space-y-6">
            <motion.div variants={itemVariants}>
              <Card glass className="border-zinc-200/80 dark:border-zinc-800/80">
                <CardContent className="p-6">
                  {/* Informações de Perfil do Usuário */}
                  <div className="flex items-center gap-4 mb-6">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-16 h-16 rounded-full border border-zinc-250 dark:border-zinc-800/80 object-cover"
                    />
                    <div>
                      <h4 className="text-lg font-bold text-zinc-900 dark:text-white">
                        {user.name}
                      </h4>
                      <a
                        href={user.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1.5 mt-0.5"
                      >
                        @{user.login}
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>

                  {/* Métricas de perfil */}
                  <div className="grid grid-cols-3 gap-2 border-y border-zinc-150 dark:border-zinc-900/60 py-4 mb-6 text-center">
                    <div>
                      <span className="block text-xl font-extrabold text-zinc-900 dark:text-white">
                        {stats.totalRepos}
                      </span>
                      <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">
                        {dict.github.repos}
                      </span>
                    </div>
                    <div>
                      <span className="block text-xl font-extrabold text-zinc-900 dark:text-white">
                        {stats.totalStars}
                      </span>
                      <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">
                        {dict.github.stars}
                      </span>
                    </div>
                    <div>
                      <span className="block text-xl font-extrabold text-zinc-900 dark:text-white">
                        {stats.totalForks}
                      </span>
                      <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">
                        {dict.github.forks}
                      </span>
                    </div>
                  </div>

                  {/* Principais Linguagens */}
                  <div>
                    <h5 className="text-xs font-bold uppercase text-zinc-500 dark:text-zinc-400 tracking-wider mb-4 flex items-center gap-1.5">
                      <Code2 className="w-4 h-4 text-indigo-500" />
                      Linguagens
                    </h5>
                    <div className="space-y-3.5">
                      {stats.topLanguages.map((lang) => (
                        <div key={lang.name} className="space-y-1">
                          <div className="flex justify-between items-center text-xs">
                            <span className="font-semibold text-zinc-700 dark:text-zinc-300">{lang.name}</span>
                            <span className="text-zinc-500">{lang.count} repos</span>
                          </div>
                          {/* Mini Barra de Progresso */}
                          <div className="w-full h-1 bg-zinc-100 dark:bg-zinc-900/80 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-linear-to-r from-violet-500 to-indigo-500 rounded-full"
                              style={{ width: `${(lang.count / stats.totalRepos) * 100}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </CardContent>
              </Card>
            </motion.div>

            {/* Card do Calendário de Contribuições */}
            <motion.div variants={itemVariants}>
              <Card glass className="border-zinc-200/80 dark:border-zinc-800/80">
                <CardContent className="p-6">
                  <h5 className="text-xs font-bold uppercase text-zinc-500 dark:text-zinc-400 tracking-wider mb-4">
                    {dict.github.contributions}
                  </h5>
                  {renderContributionGrid()}
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Painel Direito: Grid de Repositórios Ativos */}
          <div className="lg:col-span-8 space-y-6">
            <h5 className="text-sm font-bold uppercase text-zinc-500 dark:text-zinc-400 tracking-widest pl-2">
              {dict.github.repos} Recentes
            </h5>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {repos.map((repo) => (
                <motion.div variants={itemVariants} key={repo.name} className="h-full">
                  <Card hoverEffect glass className="h-full border-zinc-200/80 dark:border-zinc-800/85 flex flex-col justify-between">
                    <CardContent className="p-6 flex-1 flex flex-col justify-between">
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-zinc-800 dark:text-white">
                          <BookOpen className="w-4.5 h-4.5 text-zinc-400" />
                          <h4 className="text-base font-bold text-zinc-900 dark:text-white line-clamp-1">
                            {repo.name}
                          </h4>
                        </div>
                        <p className="text-xs sm:text-sm text-zinc-550 dark:text-zinc-400 line-clamp-2 leading-relaxed">
                          {repo.description}
                        </p>
                      </div>

                      {/* Rodapé do repositório: tecnologia, estrelas, forks, link externo */}
                      <div className="flex items-center justify-between mt-6 pt-4 border-t border-zinc-100 dark:border-zinc-900/60 text-xs">
                        <div className="flex items-center gap-3">
                          <Badge variant="outline" className="text-[10px] dark:border-zinc-800">
                            {repo.language}
                          </Badge>
                          <span className="flex items-center gap-1 text-zinc-500 dark:text-zinc-400">
                            <Star className="w-3.5 h-3.5" />
                            {repo.stars}
                          </span>
                          <span className="flex items-center gap-1 text-zinc-500 dark:text-zinc-400">
                            <GitFork className="w-3.5 h-3.5" />
                            {repo.forks}
                          </span>
                        </div>
                        <a
                          href={repo.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1 rounded-full text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-900"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
            
            <div className="text-center pt-2">
              <a
                href={user.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" rightIcon={<GithubIcon className="w-4 h-4" />}>
                  {dict.github.viewProfile}
                </Button>
              </a>
            </div>
          </div>

        </motion.div>

      </div>
    </section>
  );
}
