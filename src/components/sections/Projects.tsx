/**
 * Setor / Seção: Projetos (Projects)
 * Apresenta o portfólio de projetos do desenvolvedor, permitindo filtrar e visualizar
 * detalhes detalhados (problema, solução, arquitetura, desafios e resultados) de forma
 * interativa através de abas, além de listar tecnologias e fornecer links para demonstrações e código.
 * Contém também representações visuais em código de cada painel de sistema simulado.
 */
"use client";

import { motion } from "framer-motion";
import { ExternalLink, Database, Users, ShieldAlert, Cpu, Layers, ArrowRightLeft } from "lucide-react";
import { useLocale } from "@/hooks/useLocale";
import { GithubIcon } from "@/components/ui/Icons";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/Tabs";

interface ProjectDetails {
  id: string;
  name: string;
  tagline: string;
  description: string;
  problemText: string;
  solutionText: string;
  architectureText: string;
  challengesText: string;
  resultsText: string;
}

export function Projects() {
  const { dict } = useLocale();

  const projects: ProjectDetails[] = dict.projects.list;

  // Mapeamento de tecnologias para cada ID de projeto (usado nas badges)
  const projectTechs: Record<string, string[]> = {
    protocolo360: [
      "NestJS",
      "Next.js 15",
      "TypeScript",
      "PostgreSQL",
      "Prisma ORM",
      "Redis",
      "Docker",
      "JWT",
      "RBAC",
      "Multi-Tenant",
      "AsyncLocalStorage",
      "TanStack Query",
      "Tailwind CSS",
      "Shadcn/UI",
    ],
    ubs: [
      "Next.js",
      "TypeScript",
      "Node.js",
      "PostgreSQL",
      "Prisma",
      "Docker",
      "Redis",
      "JWT",
      "Tailwind CSS",
      "RBAC",
      "Multi-Tenant",
      "LGPD",
    ],
    warehouse: [
      "Next.js",
      "Node.js",
      "MongoDB",
      "JWT",
      "Tailwind CSS",
      "Recharts",
      "Dashboard",
    ],
    "api-rest": ["Node.js", "Express", "Swagger", "MongoDB", "Mongoose", "JWT", "TypeScript"],
  };

  const projectLinks: Record<string, { demo?: string; code: string }> = {
    protocolo360: {
      code: "https://github.com/lisboainformatica/protocolo360",
    },
    ubs: {
      code: "https://github.com/lisboainformatica/ubs",
    },
    warehouse: {
      demo: "https://almoxarifadolisboa.vercel.app",
      code: "https://github.com/lisboainformatica/warehouse-mvp",
    },
    "api-rest": {
      code: "https://github.com/lisboainformatica", // busca automática ou perfil
    },
  };

  const renderVisualMockup = (id: string) => {
    switch (id) {
      case "protocolo360":
        return (
          <div className="w-full h-full min-h-[220px] rounded-2xl bg-zinc-950 p-4 border border-zinc-800/80 flex flex-col text-xs font-mono text-zinc-400 overflow-hidden shadow-inner">
            {/* Cabeçalho */}
            <div className="flex items-center justify-between border-b border-zinc-800 pb-2 mb-3">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
              </div>
              <span className="text-[10px] text-zinc-600 uppercase tracking-widest font-semibold">SAAS MULTI-TENANT CONTEXT</span>
            </div>
            
            {/* Detalhes do contexto */}
            <div className="flex-1 flex flex-col gap-2">
              <div className="flex justify-between items-center bg-zinc-900/50 p-2 rounded-lg border border-zinc-800/50">
                <div className="flex items-center gap-2">
                  <span className="p-1 rounded-sm bg-indigo-500/20 text-indigo-400"><Layers className="w-3.5 h-3.5" /></span>
                  <span className="font-bold text-zinc-200">Tenant: Prefeitura de Itajaí</span>
                </div>
                <Badge variant="outline" className="text-[9px] border-indigo-900/50 text-indigo-400 bg-indigo-950/20">Prefix: ITAJ</Badge>
              </div>

              {/* Exibição do protocolo */}
              <div className="bg-zinc-900/40 p-2.5 rounded-lg border border-zinc-800/20 flex flex-col gap-1.5">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] text-zinc-500 font-semibold">PROTOCOLO: <b className="text-zinc-300">ITAJ-2026-0042</b></span>
                  <span className="text-[9px] px-1.5 py-0.2 bg-emerald-950/40 text-emerald-400 border border-emerald-900/50 rounded font-semibold">TRAMITADO</span>
                </div>
                <div className="flex items-center justify-between mt-1 text-[9px] bg-black/30 p-1.5 rounded border border-zinc-850">
                  <span className="text-zinc-400">GABINETE</span>
                  <ArrowRightLeft className="w-3 h-3 text-indigo-400" />
                  <span className="text-zinc-300">FINANÇAS</span>
                </div>
              </div>

              {/* Simulação de isolamento lógico e logger do AsyncLocalStorage */}
              <div className="flex-1 bg-black/60 p-2 rounded-lg border border-zinc-900 font-mono text-[9px] text-zinc-555 space-y-1 overflow-y-auto leading-relaxed">
                <p className="text-zinc-600">[TenantMiddleware] Token validated. context: {"{ tenantId: 'ITAJ' }"}</p>
                <p className="text-violet-400">[AsyncLocalStorage] Context stored on request thread</p>
                <p className="text-emerald-500">[PrismaExtension] Intercepted query findUnique(Protocolo)</p>
                <p className="text-cyan-400 font-bold">[PrismaService] Injecting automatically: where: {"{ tenantId: 'ITAJ' }"}</p>
              </div>
            </div>
          </div>
        );

      case "ubs":
        return (
          <div className="w-full h-full min-h-[220px] rounded-2xl bg-zinc-950 p-4 border border-zinc-800/80 flex flex-col text-xs font-mono text-zinc-400 overflow-hidden shadow-inner">
            {/* Cabeçalho */}
            <div className="flex items-center justify-between border-b border-zinc-800 pb-2 mb-3">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
              </div>
              <span className="text-[10px] text-zinc-600 uppercase tracking-widest font-semibold">PSF DIGITAL PANEL</span>
            </div>
            {/* Simulação de interface do agendador */}
            <div className="flex-1 flex flex-col gap-2">
              <div className="flex justify-between items-center bg-zinc-900/50 p-2 rounded-lg border border-zinc-800/50">
                <div className="flex items-center gap-2">
                  <span className="p-1 rounded-sm bg-violet-500/20 text-violet-400"><Users className="w-3.5 h-3.5" /></span>
                  <span className="font-bold text-zinc-200">Tenant_A (Clinica Centro)</span>
                </div>
                <Badge variant="outline" className="text-[9px] border-emerald-900/50 text-emerald-400 bg-emerald-950/20">RBAC: Active</Badge>
              </div>
              
              <div className="grid grid-cols-3 gap-2">
                <div className="bg-zinc-900/40 p-2 rounded-lg border border-zinc-800/20 text-center">
                  <span className="block text-[10px] text-zinc-500">Dr. Eduardo</span>
                  <span className="block text-emerald-400 font-bold mt-1">09:00 - Ocupado</span>
                </div>
                <div className="bg-zinc-900/40 p-2 rounded-lg border border-zinc-800/20 text-center">
                  <span className="block text-[10px] text-zinc-500">Dra. Beatriz</span>
                  <span className="block text-indigo-400 font-bold mt-1">10:30 - Livre</span>
                </div>
                <div className="bg-zinc-900/40 p-2 rounded-lg border border-zinc-800/20 text-center animate-pulse">
                  <span className="block text-[10px] text-zinc-500">Dr. Vinicius</span>
                  <span className="block text-cyan-400 font-bold mt-1">13:15 - Live</span>
                </div>
              </div>

              {/* Logs no console */}
              <div className="flex-1 bg-black/60 p-2.5 rounded-lg border border-zinc-900 font-mono text-[9px] text-zinc-500 space-y-1 overflow-y-auto">
                <p className="text-zinc-600">[system] Init Multi-Tenant handler for host 'clinica-centro'</p>
                <p className="text-violet-400">[postgres] pg_crypto initialized. HIPAA & LGPD compliance: OK</p>
                <p className="text-emerald-400">[redis] cache HIT for doctor schedules lookup</p>
              </div>
            </div>
          </div>
        );

      case "warehouse":
        return (
          <div className="w-full h-full min-h-[220px] rounded-2xl bg-zinc-950 p-4 border border-zinc-800/80 flex flex-col text-xs font-mono text-zinc-400 overflow-hidden shadow-inner">
            {/* Cabeçalho */}
            <div className="flex items-center justify-between border-b border-zinc-800 pb-2 mb-3">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
              </div>
              <span className="text-[10px] text-zinc-600 uppercase tracking-widest font-semibold">STOCK CONTROL CHART</span>
            </div>
            {/* Simulação de layout de estoque com gráficos */}
            <div className="flex-1 flex flex-col gap-3 justify-center">
              <div className="space-y-2">
                <div className="flex justify-between items-center text-[10px]">
                  <span>Item 1: Cabo Óptico</span>
                  <span className="text-emerald-400 font-bold">98% (Estoque Ok)</span>
                </div>
                <div className="w-full h-2 rounded-full bg-zinc-900 overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: "98%" }} />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center text-[10px]">
                  <span>Item 2: Conector RJ-45</span>
                  <span className="text-amber-400 font-bold">24% (Estoque Baixo)</span>
                </div>
                <div className="w-full h-2 rounded-full bg-zinc-900 overflow-hidden">
                  <div className="h-full bg-amber-500 rounded-full animate-pulse" style={{ width: "24%" }} />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center text-[10px]">
                  <span>Item 3: Roteador Cisco</span>
                  <span className="text-red-500 font-bold">4% (Solicitar Reposição)</span>
                </div>
                <div className="w-full h-2 rounded-full bg-zinc-900 overflow-hidden">
                  <div className="h-full bg-red-500 rounded-full" style={{ width: "4%" }} />
                </div>
              </div>
              
              <div className="mt-1 text-[9px] bg-zinc-900/60 p-2 rounded-md border border-zinc-800/40 text-center">
                <span>Credenciais Teste: <b className="text-zinc-200">teste@teste.com / 123456</b></span>
              </div>
            </div>
          </div>
        );

      case "api-rest":
        return (
          <div className="w-full h-full min-h-[220px] rounded-2xl bg-zinc-950 p-4 border border-zinc-800/80 flex flex-col text-xs font-mono text-zinc-400 overflow-hidden shadow-inner">
            {/* Cabeçalho */}
            <div className="flex items-center justify-between border-b border-zinc-800 pb-2 mb-3">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
              </div>
              <span className="text-[10px] text-zinc-600 uppercase tracking-widest font-semibold">SWAGGER OPENAPI DOCS</span>
            </div>
            {/* Simulação de layout de endpoint */}
            <div className="flex-1 flex flex-col gap-2">
              <div className="flex items-center gap-2 bg-emerald-950/20 border border-emerald-900/30 p-2 rounded-lg text-emerald-400 font-semibold">
                <span className="px-1.5 py-0.5 rounded bg-emerald-500 text-black text-[9px] font-bold">GET</span>
                <span>/api/v1/auth/session</span>
              </div>
              <div className="flex items-center gap-2 bg-indigo-950/20 border border-indigo-900/30 p-2 rounded-lg text-indigo-400 font-semibold">
                <span className="px-1.5 py-0.5 rounded bg-indigo-500 text-white text-[9px] font-bold">POST</span>
                <span>/api/v1/users/register</span>
              </div>
              
              {/* Representação JSON */}
              <div className="bg-black/60 p-2 rounded-lg border border-zinc-900 text-[9px] text-zinc-500 overflow-y-auto leading-relaxed">
                <p className="text-zinc-400">{"{"}</p>
                <p className="pl-4"><span className="text-indigo-400">"status"</span>: <span className="text-emerald-400">200</span>,</p>
                <p className="pl-4"><span className="text-indigo-400">"message"</span>: <span className="text-emerald-400">"Session Authenticated"</span>,</p>
                <p className="pl-4"><span className="text-indigo-400">"payload"</span>: {"{ "}<span className="text-cyan-400">"username"</span>: <span className="text-emerald-400">"lisboa"</span>, <span className="text-cyan-400">"role"</span>: <span className="text-emerald-400">"admin"</span>{" }"}</p>
                <p className="text-zinc-400">{"}"}</p>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.25 },
    },
  };

  const projectVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring" as const, stiffness: 80, damping: 20 },
    },
  };

  return (
    <section
      id="projects"
      className="py-24 relative overflow-hidden bg-zinc-50 dark:bg-[#030303]/40 border-b border-zinc-100 dark:border-zinc-900/60 transition-colors"
    >
      {/* Elemento decorativo de fundo */}
      <div className="absolute top-1/2 right-1/4 w-[380px] h-[380px] rounded-full bg-violet-500/5 dark:bg-violet-500/2 glow-orb pointer-events-none" />

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
            {dict.projects.title}
          </motion.h2>
          <motion.h3
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-950 dark:text-white"
          >
            {dict.projects.subtitle}
          </motion.h3>
        </div>

        {/* Lista de Cards de Projetos */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="space-y-12"
        >
          {projects.map((project) => (
            <motion.div variants={projectVariants} key={project.id}>
              <Card hoverEffect glass className="border-zinc-200/80 dark:border-zinc-800/80">
                <CardContent className="p-0">
                  <div className="grid grid-cols-1 lg:grid-cols-12">
                    
                    {/* Lado Esquerdo do Projeto: Detalhes e Abas interativas */}
                    <div className="p-6 sm:p-8 lg:col-span-7 flex flex-col justify-between">
                      <div>
                        {/* Detalhes do Cabeçalho do Projeto */}
                        <div className="flex flex-wrap items-center gap-2 mb-3">
                          <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 tracking-wide uppercase">
                            {project.tagline}
                          </span>
                          {projectLinks[project.id]?.demo && (
                            <Badge variant="indigo" className="text-[10px] py-0.5">
                              {dict.projects.active}
                            </Badge>
                          )}
                        </div>

                        <h4 className="text-2xl font-extrabold text-zinc-900 dark:text-white mb-4">
                          {project.name}
                        </h4>

                        <p className="text-sm sm:text-base text-zinc-650 dark:text-zinc-400 leading-relaxed mb-6">
                          {project.description}
                        </p>

                        {/* Abas interativas (Problema, Solução, Arquitetura, etc.) */}
                        <Tabs defaultValue="problem" className="w-full">
                          <TabsList className="mb-4">
                            <TabsTrigger value="problem">{dict.projects.problem}</TabsTrigger>
                            <TabsTrigger value="solution">{dict.projects.solution}</TabsTrigger>
                            <TabsTrigger value="architecture">{dict.projects.architecture}</TabsTrigger>
                            <TabsTrigger value="challenges">{dict.projects.challenges}</TabsTrigger>
                            <TabsTrigger value="results">{dict.projects.results}</TabsTrigger>
                          </TabsList>

                          <TabsContent value="problem" className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                            {project.problemText}
                          </TabsContent>
                          <TabsContent value="solution" className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                            {project.solutionText}
                          </TabsContent>
                          <TabsContent value="architecture" className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                            {project.architectureText}
                          </TabsContent>
                          <TabsContent value="challenges" className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                            {project.challengesText}
                          </TabsContent>
                          <TabsContent value="results" className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                            {project.resultsText}
                          </TabsContent>
                        </Tabs>

                      </div>

                      {/* Badges de tecnologia e botões de ação */}
                      <div className="mt-8 pt-6 border-t border-zinc-150 dark:border-zinc-900/60">
                        {/* Badges de Tecnologias Utilizadas */}
                        <div className="flex flex-wrap gap-1.5 mb-6">
                          {projectTechs[project.id]?.map((tech) => (
                            <Badge key={tech} variant="outline" className="text-[10px] dark:border-zinc-800">
                              {tech}
                            </Badge>
                          ))}
                        </div>

                        {/* Links e Botões de Ação (Demo / Código) */}
                        <div className="flex items-center gap-3">
                          {projectLinks[project.id]?.demo && (
                            <a
                              href={projectLinks[project.id].demo}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <Button
                                variant="primary"
                                size="sm"
                                rightIcon={<ExternalLink className="w-3.5 h-3.5" />}
                              >
                                {dict.projects.demo}
                              </Button>
                            </a>
                          )}
                          <a
                            href={projectLinks[project.id].code}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Button
                              variant="secondary"
                              size="sm"
                              leftIcon={<GithubIcon className="w-4 h-4" />}
                            >
                              {dict.projects.code}
                            </Button>
                          </a>
                        </div>
                      </div>

                    </div>

                    {/* Lado Direito do Projeto: Representação Vetorial / Simulador de Tela */}
                    <div className="lg:col-span-5 bg-zinc-100 dark:bg-zinc-900/30 p-6 flex items-center justify-center border-t lg:border-t-0 lg:border-l border-zinc-200 dark:border-zinc-800">
                      <div className="w-full max-w-sm">
                        {renderVisualMockup(project.id)}
                      </div>
                    </div>

                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
