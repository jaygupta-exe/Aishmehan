/**
 * SITE DATA & PLACEHOLDER CONFIGURATION
 * All content on the homepage is driven by this file.
 * The client can easily swap copy, images, program titles, and links here.
 */

export const siteData = {
  brand: {
    name: "AISH MEHAN",
    tagline: "ELITE ONLINE TRANSFORMATION COACHING",
    initials: "AM",
  },

  navigation: [
    { label: "PHILOSOPHY", href: "#philosophy" },
    { label: "ABOUT", href: "#about" },
    { label: "RESULTS", href: "#transformations" },
    { label: "REVIEWS", href: "#testimonials" },
  ],

  header: {
    ctaLabel: "APPLY NOW",
    ctaHref: "#apply",
  },

  hero: {
    videoSrc: "/hero.mp4",
    posterSrc: "/images/hero-poster.jpg",
    eyebrow: "ONLINE TRANSFORMATION COACHING",
    headlineMain: "ENGINEER YOUR",
    headlineAccent: "STRONGEST SELF.",
    supportingText:
      "Discipline-focused physical conditioning, targeted nutrition architecture, and daily direct accountability designed for high-performers ready for radical transformation.",
    primaryCta: {
      label: "APPLY FOR COACHING",
      href: "#apply",
    },
    secondaryCta: {
      label: "EXPLORE PHILOSOPHY",
      href: "#philosophy",
    },
    stats: [
      { label: "COACHING MODEL", value: "1-ON-1 DIRECT" },
      { label: "METHODOLOGY", value: "EVIDENCE-BASED" },
      { label: "INTAKE STATUS", value: "ACCEPTING CLIENTS" },
    ],
  },

  credibility: {
    eyebrow: "FOUNDATIONAL PERFORMANCE PILLARS",
    badges: [
      { code: "PROTO-01", title: "BIOMECHANICAL ACCURACY" },
      { code: "PROTO-02", title: "METABOLIC CONDITIONING" },
      { code: "PROTO-03", title: "PERIODIZED HYPERTROPHY" },
      { code: "PROTO-04", title: "EVIDENCE-BASED NUTRITION" },
      { code: "PROTO-05", title: "AUTONOMIC RECOVERY" },
      { code: "PROTO-06", title: "DAILY ACCOUNTABILITY" },
    ],
  },

  philosophy: {
    eyebrow: "THE PHILOSOPHY",
    headlineLarge: "CONTROL YOUR DISCIPLINE,",
    headlineSmall: "or the environment controls you.",
    paragraphs: [
      "Physical transformation is not an emotional endeavor—it is a systematic execution of proven physiological principles repeated with unyielding consistency.",
      "Generic fitness templates fail because they ignore your unique hormonal profile, schedule constraints, and biomechanics. We build an engineered lifestyle architecture that leaves zero room for guesswork.",
    ],
    highlightQuote: "“Intensity delivers temporary peaks. Structured discipline builds permanent standards.”",
  },

  transformations: {
    eyebrow: "VERIFIED EVOLUTIONS",
    headline: "DOCUMENTED PHYSICAL TRANSFORMATIONS",
    subtitle:
      "Real client outcomes achieved through disciplined execution of customized training and nutrition protocols.",
    disclaimer: "[CLIENT NOTE: Transformation photos are placeholder demonstrations. Replace with actual client imagery.]",
    slides: [
      {
        id: 1,
        code: "CLIENT PROFILE // ALPHA",
        phase: "16-WEEK PROTOCOL",
        focus: "Rapid Visceral Fat Reduction & Abdominal Definition",
        beforeImage: "/images/transform-1-before.jpg",
        afterImage: "/images/transform-1-after.jpg",
        keyTakeaways: [
          "Structured caloric deficit with zero lean mass degradation",
          "4x weekly progressive hypertrophy split",
          "Full restoration of daily metabolic energy",
        ],
      },
      {
        id: 2,
        code: "CLIENT PROFILE // BRAVO",
        phase: "20-WEEK PROTOCOL",
        focus: "Lean Mass Hypertrophy & Postural Reconstruction",
        beforeImage: "/images/transform-2-before.jpg",
        afterImage: "/images/transform-2-after.jpg",
        keyTakeaways: [
          "Progressive surplus with nutrient timing around lifting",
          "Posterior chain & shoulder girdle emphasis",
          "Substantial increase in 1RM strength benchmarks",
        ],
      },
      {
        id: 3,
        code: "CLIENT PROFILE // CHARLIE",
        phase: "12-WEEK PROTOCOL",
        focus: "Executive Body Recomposition & Metabolic Re-priming",
        beforeImage: "/images/transform-3-before.jpg",
        afterImage: "/images/transform-3-after.jpg",
        keyTakeaways: [
          "Time-condensed 45-minute training sessions",
          "High-protein travel-friendly nutritional plan",
          "Restored sleep architecture and daytime stamina",
        ],
      },
    ],
  },

  testimonials: {
    eyebrow: "THE CLIENT VOICE",
    headline: "DISCIPLINE SPEAKS FOR ITSELF",
    subtitle:
      "Unedited feedback from individuals who committed to the process and executed without excuses.",
    items: [
      {
        quote:
          "The level of detail in this coaching program is unlike anything I have encountered. No generic meal plans, no wasted sets. Every single week was calibrated to how my body was responding. It completely redefined my standard for fitness.",
        author: "[CLIENT PLACEHOLDER // EXECUTIVE]",
        tenure: "6 Months in Program",
        focus: "Physique & Longevity",
      },
      {
        quote:
          "What sets this coaching apart is the direct accountability. Having direct feedback on my lifting technique and instant adjustments to my macros when travel came up meant I never lost momentum. The results speak for themselves.",
        author: "[CLIENT PLACEHOLDER // ENTREPRENEUR]",
        tenure: "9 Months in Program",
        focus: "Body Recomposition",
      },
      {
        quote:
          "I thought my schedule was too demanding for serious physical transformation. This method stripped away the fluff and gave me an exact blueprint. In 16 weeks I achieved what years of solo gym sessions could not.",
        author: "[CLIENT PLACEHOLDER // ATHLETE]",
        tenure: "4 Months in Program",
        focus: "Strength & Conditioning",
      },
    ],
  },

  coach: {
    eyebrow: "THE HEAD COACH",
    name: "DIVESH MEHAN (AISH)",
    title: "TRANSFORMATION ARCHITECT & PERFORMANCE SPECIALIST",
    image: "/images/about.png",
  },

  finalCta: {
    eyebrow: "LIMITED CLIENT ROSTER",
    headline: "ARE YOU READY TO DEMAND MORE FROM YOURSELF?",
    subheadline:
      "Client onboarding is strictly limited each month to ensure every client receives direct, daily attention from the head coach. Submit your intake application today to secure your assessment.",
    buttonLabel: "SUBMIT COACHING APPLICATION",
    buttonHref: "#apply-form",
    disclaimer:
      "Applications are reviewed within 24–48 hours. Serious applicants only.",
  },

  footer: {
    brandName: "AISH MEHAN",
    tagline: "ELITE ONLINE TRANSFORMATION COACHING",
    mission:
      "Forging physical standards through evidence-based training, precision nutrition, and disciplined accountability.",
    quickLinks: [
      { label: "Philosophy", href: "#philosophy" },
      { label: "About The Coach", href: "#about" },
      { label: "Client Results", href: "#transformations" },
      { label: "Testimonials", href: "#testimonials" },
      { label: "Apply For Coaching", href: "#apply" },
    ],
    policies: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
      { label: "Coaching Agreement", href: "#" },
      { label: "Client Portal", href: "#" },
    ],
    socials: [
      { name: "Instagram", href: "#", icon: "instagram" },
      { name: "YouTube", href: "#", icon: "youtube" },
      { name: "Twitter / X", href: "#", icon: "twitter" },
      { name: "LinkedIn", href: "#", icon: "linkedin" },
    ],
    copyright: `© ${new Date().getFullYear()} AISH MEHAN COACHING. ALL RIGHTS RESERVED.`,
  },
};
