"use client";

import { motion } from "framer-motion";
import { Award, Calendar, ShieldCheck, ExternalLink } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useLocale } from "@/hooks/useLocale";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

interface Certification {
  name: string;
  issuer: string;
  date: string;
  id: string;
  image?: string;
  credentialUrl: string;
}

export function Certifications() {
  const { dict } = useLocale();

  // Load live Credly badges from our local API endpoint
  const { data: liveBadges, isLoading } = useQuery<Certification[]>({
    queryKey: ["credly-badges"],
    queryFn: async () => {
      const res = await fetch("/api/credly");
      if (!res.ok) return [];
      return res.json();
    },
    retry: 1,
  });

  // Decide source: live if available and not empty, otherwise fallback to dict certifications
  const certifications: Certification[] =
    liveBadges && liveBadges.length > 0 ? liveBadges : dict.certifications.list;

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
      id="certifications"
      className="py-24 relative overflow-hidden bg-zinc-50 dark:bg-[#030303]/40 border-y border-zinc-100 dark:border-zinc-900/60 transition-colors"
    >
      {/* Background decoration */}
      <div className="absolute top-1/3 right-0 w-80 h-80 rounded-full bg-violet-500/5 glow-orb pointer-events-none" />

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
            {dict.certifications.title}
          </motion.h2>
          <motion.h3
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-950 dark:text-white"
          >
            {dict.certifications.subtitle}
          </motion.h3>
        </div>

        {/* Certifications Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="h-48 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950/40 animate-pulse"
              />
            ))}
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {certifications.map((cert) => (
              <motion.div variants={cardVariants} key={cert.id} className="h-full">
                <Card hoverEffect glass className="h-full border-zinc-200/80 dark:border-zinc-800/80 flex flex-col justify-between">
                  <CardContent className="p-6 flex-1 flex flex-col justify-between">
                    <div className="space-y-4">
                      
                      {/* Badge image or icon */}
                      <div className="flex items-start justify-between">
                        {cert.image ? (
                          <img
                            src={cert.image}
                            alt={cert.name}
                            className="w-16 h-16 object-contain rounded-lg bg-zinc-100 dark:bg-zinc-900/50 p-1 border border-zinc-200/50 dark:border-zinc-800/60"
                            loading="lazy"
                          />
                        ) : (
                          <div className="p-3 bg-violet-50 dark:bg-violet-950/40 text-violet-600 dark:text-violet-400 rounded-2xl border border-violet-100 dark:border-violet-900/40">
                            <ShieldCheck className="w-8 h-8" />
                          </div>
                        )}
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest font-mono">
                          <Calendar className="w-3.5 h-3.5" />
                          {cert.date}
                        </span>
                      </div>

                      {/* Info */}
                      <div>
                        <h4 className="text-md font-bold text-zinc-900 dark:text-white line-clamp-2">
                          {cert.name}
                        </h4>
                        <span className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 block">
                          {cert.issuer}
                        </span>
                      </div>

                    </div>

                    {/* Action Verify */}
                    <div className="mt-6 pt-4 border-t border-zinc-100 dark:border-zinc-900/60">
                      <a
                        href={cert.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full inline-block"
                      >
                        <Button
                          variant="ghost"
                          size="sm"
                          rightIcon={<ExternalLink className="w-3.5 h-3.5" />}
                          className="w-full justify-between"
                        >
                          {dict.certifications.viewOnCredly}
                        </Button>
                      </a>
                    </div>

                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}

      </div>
    </section>
  );
}
