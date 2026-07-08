import { BlogPreview } from "@/components/blog/BlogPreview";
import { Calculator } from "@/components/Calculator";
import { ControlSplit } from "@/components/ControlSplit";
import { Disclosures } from "@/components/Disclosures";
import { DollarJourney } from "@/components/DollarJourney";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";
import { Gallery } from "@/components/Gallery";
import { Hero, Ribbon } from "@/components/Hero";
import { Lifecycle } from "@/components/Lifecycle";
import { PeakDates } from "@/components/PeakDates";
import { ProgramFacts } from "@/components/ProgramFacts";
import { StickyNav } from "@/components/StickyNav";

export default function Home() {
  return (
    <main>
      <Ribbon />
      <StickyNav />
      <Hero />
      <Gallery />
      <DollarJourney />
      <Calculator />
      <FAQ />
      <PeakDates />
      <ProgramFacts />
      <ControlSplit />
      <Lifecycle />
      <Disclosures />
      <BlogPreview />
      <Footer />
    </main>
  );
}
