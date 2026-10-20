/**
 * Seção de tecnologias: apresenta as stacks utilizadas nos projetos públicos
 * e estudos práticos, organizadas por área. As tags indicam uso em projetos,
 * não uma classificação subjetiva de proficiência.
 */
"use client";

import { motion } from "framer-motion";
import { Code2, Server, Database, Cloud, Wrench } from "lucide-react";
import { useLocale } from "@/hooks/useLocale";
import { Card, CardContent } from "@/components/ui/Card";

interface StackCategory {
  key: string;
  title: string;
  icon: React.ReactNode;
  technologies: string[];
}

export function Skills() {
  const { dict } = useLocale();

  const stackCategories: StackCategory[] = [
    {
      key: "frontend",
      title: dict.skills.categories.frontend,
      icon: <Code2 className="w-5 h-5" />,
      technologies: ["JavaScript", "TypeScript", "React", "Next.js", "Angular", "HTML5", "CSS3", "Tailwind CSS", "shadcn/ui", "TanStack Query", "Recharts"],
    },
    {
      key: "backend",
      title: dict.skills.categories.backend,
      icon: <Server className="w-5 h-5" />,
      technologies: ["Node.js", "Express", "NestJS", "Java 21", "Spring Boot", "Python", "APIs REST", "JWT", "RBAC", "Swagger / OpenAPI", "Joi", "Zod"],
    },
    {
      key: "database",
      title: dict.skills.categories.database,
      icon: <Database className="w-5 h-5" />,
      technologies: ["PostgreSQL", "MySQL", "MongoDB", "SQLite", "Prisma ORM", "Mongoose", "Knex.js", "Flyway", "Redis"],
    },
    {
      key: "cloud",
      title: dict.skills.categories.cloud,
      icon: <Cloud className="w-5 h-5" />,
      technologies: ["Vercel", "Microsoft Azure (estudos)", "AWS (estudos)"],
    },
    {
      key: "devops",
      title: dict.skills.categories.devops,
      icon: <Wrench className="w-5 h-5" />,
      technologies: ["Git", "GitHub", "Docker", "Docker Compose", "Nginx", "Linux / redes", "Pino (logging)", "Testes automatizados"],
    },
  ];

  return (
    <section
      id="skills"
      className="py-24 relative overflow-hidden bg-white dark:bg-[#030303] transition-colors"
    >
      <div className="absolute top-1/4 right-0 w-[450px] h-[450px] rounded-full bg-cyan-500/5 dark:bg-cyan-500/2 glow-orb pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400 mb-2"
          >
            {dict.skills.title}
          </motion.h2>
          <motion.h3
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-950 dark:text-white"
          >
            {dict.skills.subtitle}
          </motion.h3>
          <p className="mt-4 text-sm sm:text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
            Tecnologias e ferramentas presentes nos projetos do portfólio. Algumas estão em uso prático e outras em fase de estudo.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stackCategories.map((category, index) => (
            <motion.div
              key={category.key}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.07 }}
              className="h-full"
            >
              <Card hoverEffect glass className="h-full border-zinc-200/80 dark:border-zinc-800/60">
                <CardContent className="p-6 h-full">
                  <div className="flex items-center gap-3 mb-5">
                    <span className="flex items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-cyan-400 p-2.5">
                      {category.icon}
                    </span>
                    <h4 className="text-sm font-bold text-zinc-900 dark:text-white uppercase tracking-wider">
                      {category.title}
                    </h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {category.technologies.map((technology) => (
                      <span
                        key={technology}
                        className="rounded-lg border border-zinc-200 bg-zinc-50 px-2.5 py-1.5 text-xs font-medium text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900/70 dark:text-zinc-300"
                      >
                        {technology}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
