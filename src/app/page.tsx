import { About } from "@/components/about";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { Nav } from "@/components/nav";
import { Projects } from "@/components/projects";
import { Toolkit } from "@/components/toolkit";
import { Work } from "@/components/work";

export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <About />
      <Work />
      <Projects />
      <Toolkit />
      <Footer />
    </>
  );
}
