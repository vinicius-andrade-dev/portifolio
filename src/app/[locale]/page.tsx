import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Projects } from "@/components/sections/Projects";
import { Experience } from "@/components/sections/Experience";
import { Certifications } from "@/components/sections/Certifications";
import { GithubSection } from "@/components/sections/Github";
import { Stats } from "@/components/sections/Stats";
import { Contact } from "@/components/sections/Contact";

export default async function PortfolioPage() {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Certifications />
      <GithubSection />
      <Stats />
      <Contact />
    </>
  );
}
