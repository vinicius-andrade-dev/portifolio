"use client";

import React, { createContext, useContext, useState } from "react";
import { motion } from "framer-motion";

interface TabsContextProps {
  value: string;
  onValueChange: (value: string) => void;
}

const TabsContext = createContext<TabsContextProps | null>(null);

export function Tabs({
  defaultValue,
  value,
  onValueChange,
  children,
  className = "",
}: {
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  children: React.ReactNode;
  className?: string;
}) {
  const [localValue, setLocalValue] = useState(defaultValue || "");
  const activeValue = value !== undefined ? value : localValue;
  const setActiveValue = onValueChange !== undefined ? onValueChange : setLocalValue;

  return (
    <TabsContext.Provider value={{ value: activeValue, onValueChange: setActiveValue }}>
      <div className={`w-full ${className}`}>{children}</div>
    </TabsContext.Provider>
  );
}

export function TabsList({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`flex items-center p-1 rounded-full bg-zinc-100 dark:bg-zinc-900/50 border border-zinc-200/50 dark:border-zinc-800/80 gap-1 overflow-x-auto no-scrollbar ${className}`}
    >
      {children}
    </div>
  );
}

export function TabsTrigger({
  value,
  children,
  className = "",
}: {
  value: string;
  children: React.ReactNode;
  className?: string;
}) {
  const context = useContext(TabsContext);
  if (!context) throw new Error("TabsTrigger must be used inside Tabs");

  const isActive = context.value === value;

  return (
    <button
      type="button"
      onClick={() => context.onValueChange(value)}
      className={`relative px-4 py-2 text-xs md:text-sm font-semibold rounded-full transition-colors focus:outline-hidden cursor-pointer select-none whitespace-nowrap ${
        isActive
          ? "text-zinc-950 dark:text-white"
          : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200"
      } ${className}`}
    >
      {isActive && (
        <motion.span
          layoutId="activeTabBg"
          className="absolute inset-0 bg-white dark:bg-zinc-800 rounded-full shadow-xs border border-zinc-200/50 dark:border-zinc-700/50"
          style={{ zIndex: 0 }}
          transition={{ type: "spring", stiffness: 380, damping: 30 }}
        />
      )}
      <span className="relative z-10">{children}</span>
    </button>
  );
}

export function TabsContent({
  value,
  children,
  className = "",
}: {
  value: string;
  children: React.ReactNode;
  className?: string;
}) {
  const context = useContext(TabsContext);
  if (!context) throw new Error("TabsContent must be used inside Tabs");

  if (context.value !== value) return null;

  return (
    <div className={`mt-4 outline-hidden ${className}`}>
      {children}
    </div>
  );
}
