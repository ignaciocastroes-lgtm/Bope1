import { SiteNavbar } from '@/components/site-navbar'
import { HeroSection } from '@/components/hero-section'
import { ServicesSection } from '@/components/services-section'
import { EquipmentSection } from '@/components/equipment-section'
import { ThreatSection } from '@/components/threat-section'
import { StorySection } from '@/components/story-section'
import { LinkedInSection } from '@/components/linkedin-section'
import { ContactSection } from '@/components/contact-section'
import { SiteFooter } from '@/components/site-footer'
import { PromoModal } from '@/components/promo-modal'
import { QuoteModal } from '@/components/quote-modal'
import { FloatingContact } from '@/components/floating-contact'
import { IntroOverlay } from '@/components/intro-overlay'

export default function Page() {
  return (
    <main id="contenido" className="min-h-screen bg-background">
      <IntroOverlay />
      <div id="site-root">
      <SiteNavbar />
      <HeroSection />
      <ServicesSection />
      <EquipmentSection />
      <ThreatSection />
      <StorySection />
      <LinkedInSection />
      <ContactSection />
      <SiteFooter />
      <PromoModal />
      <QuoteModal />
      <FloatingContact />
      </div>
    </main>
  )
}
