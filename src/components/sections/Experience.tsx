"use client";

import { motion } from "framer-motion";
import { Briefcase, Calendar, Building2 } from "lucide-react";
import { useLocale } from "@/hooks/useLocale";
import { Card, CardContent } from "@/components/ui/Card";

interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  description: string;
}

export function Experience() {
  const { dict } = useLocale();

  const experiences: ExperienceItem[] = dict.experience.list;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring" as const, stiffness: 100, damping: 20 },
    },
  };

  return (
    <section
      id="experience"
      className="py-24 relative overflow-hidden bg-white dark:bg-[#030303] transition-colors"
    >
      {/* Background decoration */}
      <div className="absolute bottom-1/4 left-1/4 w-[350px] h-[350px] rounded-full bg-indigo-500/5 glow-orb pointer-events-none" />

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
            {dict.experience.title}
          </motion.h2>
          <motion.h3
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-950 dark:text-white"
          >
            {dict.experience.subtitle}
          </motion.h3>
        </div>

        {/* Experience Cards Layout */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {experiences.map((exp, index) => (
            <motion.div variants={itemVariants} key={exp.company} className="h-full">
              <Card hoverEffect glass className="h-full border-zinc-200/80 dark:border-zinc-800/80 flex flex-col justify-between relative">
                {/* Visual Glow Corner */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-linear-to-bl from-indigo-500/10 to-transparent dark:from-indigo-500/5 pointer-events-none rounded-tr-2xl" />

                <CardContent className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                  <div className="space-y-4">
                    {/* Header Info */}
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400">
                        <Briefcase className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 tracking-wider flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5" />
                          {exp.period}
                        </span>
                        <h4 className="text-lg font-bold text-zinc-900 dark:text-white mt-0.5">
                          {exp.role}
                        </h4>
                      </div>
                    </div>

                    {/* Company Tag */}
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-zinc-200/60 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-900/50 text-xs font-semibold text-zinc-600 dark:text-zinc-400">
                      <Building2 className="w-3.5 h-3.5" />
                      {exp.company}
                    </div>

                    {/* Description */}
                    <p className="text-sm text-zinc-550 dark:text-zinc-400 leading-relaxed pt-2">
                      {exp.description}
                    </p>
                  </div>

                  {/* Badge representing order of timeline */}
                  <div className="mt-8 text-right text-[10px] text-zinc-400 dark:text-zinc-600 font-mono select-none">
                    0{index + 1} / 03
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
