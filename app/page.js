import Header from "@/components/Header";
import Hero from "@/components/Hero";
import JalandharWorkshop from "@/components/JalandharWorkshop";
import CredibilityStrip from "@/components/CredibilityStrip";
import SupplementSection from "@/components/SupplementSection";
import PhilosophySection from "@/components/PhilosophySection";
import CoachSection from "@/components/CoachSection";
import BeforeAfterSection from "@/components/BeforeAfterSection";
import PricingSection from "@/components/PricingSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-near-black text-off-white selection:bg-khaki selection:text-near-black">
      {/* 1. Sticky / Dynamic Header with Signature Logo */}
      <Header />

      {/* 2. Fullscreen Video Hero with VOTED #1 TRANSFORMATION COACH */}
      <Hero />

      {/* 3. Jalandhar Fitness Workshop Campaign Announcement (Visible until Nov 4, 2026) */}
      <JalandharWorkshop />

      {/* 4. FEATURED IN Notched Banner Strip */}
      <CredibilityStrip />

      {/* 5. Stage & Steel Supplements (Mocha Protein, Creatine & BUY NOW) */}
      <SupplementSection />

      {/* 6. CONTROL YOUR ENVIRONMENT & IMPROVE YOUR HEALTHSPAN with 4 Pillars */}
      <PhilosophySection />

      {/* 7. Coach Authority & Bio (About Divesh Mehan + Signature Brands) */}
      <CoachSection />

      {/* 8. Exact BEFORE AND AFTER Transformations Grid Carousel */}
      <BeforeAfterSection />

      {/* 9. 1-on-1 Transformation Coaching Pricing & Deliverables */}
      <PricingSection />

      {/* 10. Military Khaki-Notched Footer with Protein & Creatine Promo + Chamfered Socials */}
      <Footer />
    </main>
  );
}
