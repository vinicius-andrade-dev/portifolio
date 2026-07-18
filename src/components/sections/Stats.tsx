"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FolderGit2, Cpu, GitCommit, FileBadge, CalendarRange } from "lucide-react";
import { useLocale } from "@/hooks/useLocale";
import { Card, CardContent } from "@/components/ui/Card";

interface AnimatedCounterProps {
  value: number;
  duration?: number;
  suffix?: string;
}

function AnimatedCounter({ value, duration = 1.5, suffix = "" }: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const end = value;
    if (start === end) return;

    const totalDurationMs = duration * 1000;
    // Calculate the frame rate / step count
    const intervalTime = 16; // ~60fps
    const totalSteps = totalDurationMs / intervalTime;
    const stepIncrement = end / totalSteps;

    const timer = setInterval(() => {
      start += stepIncrement;
      if (start >= end) {
        clearInterval(timer);
        setCount(end);
      } else {
        setCount(Math.floor(start));
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [value, duration, isInView]);

  return (
    <span ref={ref} className="font-extrabold tabular-nums">
      {count}
      {suffix}
    </span>
  );
}

export function Stats() {
  const { dict } = useLocale();

  const statsItems = [
    {
      icon: <FolderGit2 className="w-5 h-5 text-indigo-500" />,
      value: 12,
      suffix: "",
      label: dict.stats.projects,
    },
    {
      icon: <Cpu className="w-5 h-5 text-cyan-500" />,
      value: 24,
      suffix: "+",
      label: dict.stats.technologies,
    },
    {
      icon: <GitCommit className="w-5 h-5 text-violet-500" />,
      value: 1200,
      suffix: "+",
      label: dict.stats.commits,
    },
    {
      icon: <FileBadge className="w-5 h-5 text-emerald-500" />,
      value: 3,
      suffix: "",
      label: dict.stats.certifications,
    },
    {
      icon: <CalendarRange className="w-5 h-5 text-amber-500" />,
      value: 3,
      suffix: "+",
      label: dict.stats.years,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { type: "spring" as const, stiffness: 120, damping: 15 },
    },
  };

  return (
    <section className="py-16 relative overflow-hidden bg-zinc-50 dark:bg-[#030303]/40 border-b border-zinc-100 dark:border-zinc-900/60 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-2 md:grid-cols-5 gap-4"
        >
          {statsItems.map((item, index) => (
            <motion.div variants={itemVariants} key={index} className="h-full">
              <Card glass className="h-full border-zinc-200/60 dark:border-zinc-800/60">
                <CardContent className="p-5 flex flex-col items-center justify-center text-center space-y-2">
                  {/* Icon wrap */}
                  <div className="p-2 rounded-xl bg-white dark:bg-zinc-900/60 border border-zinc-150 dark:border-zinc-800/40">
                    {item.icon}
                  </div>
                  
                  {/* Number count */}
                  <span className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white">
                    <AnimatedCounter value={item.value} suffix={item.suffix} />
                  </span>

                  {/* Label */}
                  <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                    {item.label}
                  </span>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
