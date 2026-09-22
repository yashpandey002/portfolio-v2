import { About } from "@/components/about";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { Nav } from "@/components/nav";
import { Toolkit } from "@/components/toolkit";
import { Work } from "@/components/work";

export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <About />
      <Work />
      <Toolkit />
      <Contact />
      <Footer />
    </>
  );
}
