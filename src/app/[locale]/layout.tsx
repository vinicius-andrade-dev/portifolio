import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { getDictionary } from "@/lib/dictionary";
import { Providers } from "./providers";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { I18nProvider } from "@/hooks/useLocale";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateStaticParams() {
  return [{ locale: "pt" }, { locale: "en" }, { locale: "es" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;
  const dict = getDictionary(locale);

  const siteUrl = "https://viniciusandrade.com"; // placeholder professional domain
  const localizedUrl = locale === "pt" ? siteUrl : `${siteUrl}/${locale}`;

  return {
    title: `Vinicius Silva de Andrade | ${dict.hero.role || "Full Stack Developer"}`,
    description: dict.hero.subheadline,
    metadataBase: new URL(siteUrl),
    alternates: {
      canonical: localizedUrl,
      languages: {
        "pt-BR": siteUrl,
        "en-US": `${siteUrl}/en`,
        "es-ES": `${siteUrl}/es`,
      },
    },
    openGraph: {
      title: `Vinicius Silva de Andrade | ${dict.hero.role || "Full Stack Developer"}`,
      description: dict.hero.subheadline,
      url: localizedUrl,
      siteName: "Vinicius Andrade Portfolio",
      images: [
        {
          url: `/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: "Vinicius Silva de Andrade Portfolio",
        },
      ],
      locale: locale === "pt" ? "pt_BR" : locale === "es" ? "es_ES" : "en_US",
      type: "profile",
    },
    twitter: {
      card: "summary_large_image",
      title: `Vinicius Silva de Andrade | ${dict.hero.role || "Full Stack Developer"}`,
      description: dict.hero.subheadline,
      images: [`/og-image.jpg`],
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;
  const dict = getDictionary(locale);

  // Schema.org Person metadata
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Vinicius Silva de Andrade",
    "jobTitle": "Full Stack Developer",
    "url": "https://viniciusandrade.com",
    "sameAs": [
      "https://github.com/lisboainformatica",
      "https://linkedin.com/in/vinicius-andrade-sistemas",
    ],
    "knowsAbout": [
      "JavaScript",
      "TypeScript",
      "Node.js",
      "React",
      "Next.js",
      "PostgreSQL",
      "MongoDB",
      "Docker",
      "Cloud Computing",
      "APIs REST",
    ],
  };

  return (
    <html
      lang={locale}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Favicons & Manifest */}
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className="min-h-full flex flex-col bg-white dark:bg-[#030303] text-zinc-900 dark:text-zinc-150 transition-colors duration-300">
        <Providers>
          <I18nProvider dict={dict} locale={locale}>
            <Navbar />
            <main className="flex-grow">{children}</main>
            <Footer />
          </I18nProvider>
        </Providers>
      </body>
    </html>
  );
}
