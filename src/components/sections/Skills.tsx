"use client";

import { motion } from "framer-motion";
import { useLocale } from "@/hooks/useLocale";
import { Card, CardContent } from "@/components/ui/Card";

interface SkillItem {
  name: string;
  level: number; // 0 to 100
}

interface SkillCategory {
  key: string;
  title: string;
  skills: SkillItem[];
}

export function Skills() {
  const { dict } = useLocale();

  const skillCategories: SkillCategory[] = [
    {
      key: "frontend",
      title: dict.skills.categories.frontend,
      skills: [
        { name: "JavaScript / ES6+", level: 90 },
        { name: "TypeScript", level: 90 },
        { name: "React 19", level: 95 },
        { name: "Next.js 16 (App Router)", level: 90 },
        { name: "Tailwind CSS v4", level: 95 },
        { name: "HTML5 / CSS3", level: 95 },
      ],
    },
    {
      key: "backend",
      title: dict.skills.categories.backend,
      skills: [
        { name: "Node.js", level: 85 },
        { name: "NestJS", level: 75 },
        { name: "Express", level: 85 },
        { name: "REST APIs / Swagger", level: 90 },
        { name: "Prisma ORM", level: 85 },
        { name: "JWT Autenticação / RBAC", level: 85 },
      ],
    },
    {
      key: "database",
      title: dict.skills.categories.database,
      skills: [
        { name: "PostgreSQL", level: 80 },
        { name: "MongoDB", level: 80 },
        { name: "Redis Caching", level: 70 },
      ],
    },
    {
      key: "cloud",
      title: dict.skills.categories.cloud,
      skills: [
        { name: "AWS (S3, EC2, RDS, Lambda)", level: 70 },
        { name: "Microsoft Azure", level: 65 },
        { name: "Google Cloud Platform", level: 65 },
        { name: "Vercel Deployments", level: 95 },
      ],
    },
    {
      key: "devops",
      title: dict.skills.categories.devops,
      skills: [
        { name: "Docker Conteinerização", level: 75 },
        { name: "Git / GitHub Actions", level: 85 },
      ],
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring" as const, stiffness: 100, damping: 20 },
    },
  };

  return (
    <section
      id="skills"
      className="py-24 relative overflow-hidden bg-white dark:bg-[#030303] transition-colors"
    >
      {/* Glow effect */}
      <div className="absolute top-1/4 right-0 w-[450px] h-[450px] rounded-full bg-cyan-500/5 dark:bg-cyan-500/2 glow-orb pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
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
        </div>

        {/* Skills Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {skillCategories.map((category) => (
            <motion.div variants={cardVariants} key={category.key} className="h-full">
              <Card hoverEffect glass className="h-full border-zinc-200/80 dark:border-zinc-800/60 flex flex-col">
                <CardContent className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Category Title */}
                    <h4 className="text-md font-bold text-zinc-900 dark:text-white mb-6 uppercase tracking-wider border-b border-zinc-100 dark:border-zinc-800/60 pb-2">
                      {category.title}
                    </h4>
                    
                    {/* Skills list */}
                    <div className="space-y-5">
                      {category.skills.map((skill) => (
                        <div key={skill.name} className="space-y-1.5">
                          <div className="flex justify-between items-center text-xs">
                            <span className="font-semibold text-zinc-700 dark:text-zinc-300">
                              {skill.name}
                            </span>
                            <span className="font-semibold text-zinc-500 dark:text-zinc-500">
                              {skill.level}%
                            </span>
                          </div>

                          {/* Progress track */}
                          <div className="w-full h-1.5 rounded-full bg-zinc-100 dark:bg-zinc-900 overflow-hidden border border-zinc-200/10 dark:border-zinc-800/30">
                            {/* Animated bar */}
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: `${skill.level}%` }}
                              viewport={{ once: true }}
                              transition={{ duration: 1.2, ease: "easeOut", delay: 0.1 }}
                              className="h-full rounded-full bg-linear-to-r from-violet-600 to-indigo-500 dark:from-violet-500 dark:to-cyan-400"
                            />
                          </div>
                        </div>
                      ))}
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
