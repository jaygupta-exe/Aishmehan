import Header from "@/components/Header";
import Hero from "@/components/Hero";
import CredibilityStrip from "@/components/CredibilityStrip";
import SupplementSection from "@/components/SupplementSection";
import PhilosophySection from "@/components/PhilosophySection";
import CoachSection from "@/components/CoachSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-near-black text-off-white selection:bg-khaki selection:text-near-black">
      {/* 1. Sticky / Dynamic Header with Signature Logo */}
      <Header />

      {/* 2. Fullscreen Video Hero with VOTED #1 TRANSFORMATION COACH */}
      <Hero />

      {/* 3. FEATURED IN Notched Banner Strip */}
      <CredibilityStrip />

      {/* 4. Stage & Steel Supplements (Mocha Protein, Creatine & BUY NOW) */}
      <SupplementSection />

      {/* 5. CONTROL YOUR ENVIRONMENT & IMPROVE YOUR HEALTHSPAN with 4 Pillars */}
      <PhilosophySection />

      {/* 6. Coach Authority & Bio (About Divesh Mehan + Signature Brands) */}
      <CoachSection />
    </main>
  );
}
