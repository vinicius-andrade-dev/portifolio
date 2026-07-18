"use client";

import React, { createContext, useContext } from "react";

interface I18nContextProps {
  dict: any;
  locale: string;
}

const I18nContext = createContext<I18nContextProps | null>(null);

export function I18nProvider({
  children,
  dict,
  locale,
}: {
  children: React.ReactNode;
  dict: any;
  locale: string;
}) {
  return (
    <I18nContext.Provider value={{ dict, locale }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useLocale must be used within an I18nProvider");
  }
  return context;
}
