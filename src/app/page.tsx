import { BlogPreview } from "@/components/blog/BlogPreview";
import { BrokerFooter } from "@/components/broker/BrokerFooter";
import { BrokerGallery } from "@/components/broker/BrokerGallery";
import { BrokerHero } from "@/components/broker/BrokerHero";
import { CollectionsSection } from "@/components/broker/CollectionsSection";
import { ContactSection } from "@/components/broker/ContactSection";
import { CredibilityStrip } from "@/components/broker/CredibilityStrip";
import { FilmBand } from "@/components/broker/FilmBand";
import { FinishesSection } from "@/components/broker/FinishesSection";
import { LeadModalProvider } from "@/components/broker/LeadModal";
import { ListingsSection } from "@/components/broker/ListingsSection";
import { MaraveIntro } from "@/components/broker/MaraveIntro";
import { MarqueeStrip } from "@/components/broker/MarqueeStrip";
import { PlaceSection } from "@/components/broker/PlaceSection";
import { ReserveSection } from "@/components/broker/ReserveSection";
import { RevealOnScroll } from "@/components/broker/RevealOnScroll";
import { SiteNav } from "@/components/broker/SiteNav";
import { TeamSection } from "@/components/broker/TeamSection";

export const revalidate = 300;

export default async function Home() {
  return (
    <LeadModalProvider>
      <main>
        <SiteNav />
        <RevealOnScroll>
          <BrokerHero />
          <MarqueeStrip />
          <MaraveIntro />
          <PlaceSection />
          <FilmBand />
          <CollectionsSection />
          <FinishesSection />
          <BrokerGallery />
          <ReserveSection />
          <ListingsSection />
          <CredibilityStrip />
          <TeamSection />
          <BlogPreview />
          <ContactSection />
          <BrokerFooter />
        </RevealOnScroll>
      </main>
    </LeadModalProvider>
  );
}
