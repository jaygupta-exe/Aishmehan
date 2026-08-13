/**
 * SITE DATA & CONFIGURATION
 * All content on the homepage is driven by this file.
 * The client can easily swap copy, images, program titles, and links here.
 */

// Coach WhatsApp Contact Number (Owner WhatsApp)
export const COACH_WHATSAPP_NUMBER = "919779159169";

// Jalandhar Workshop Announcement Expiry Date (YYYY-MM-DD)
export const ANNOUNCEMENT_EXPIRY = "2026-11-04";

// Fallback / External Form URL if needed
export const APPLICATION_FORM_URL = "#apply";

export const siteData = {
  brand: {
    name: "AISH MEHAN",
    tagline: "ELITE ONLINE TRANSFORMATION COACHING",
    initials: "AM",
  },

  navigation: [
    { label: "PHILOSOPHY", href: "#philosophy" },
    { label: "ABOUT", href: "#about" },
    { label: "CREDENTIALS", href: "#credentials" },
    { label: "RESULTS", href: "#transformations" },
    { label: "PRICING", href: "#pricing" },
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

  // Promotional Jalandhar Workshop Campaign (Directly below Hero)
  jalandharWorkshop: {
    eyebrow: "JALANDHAR FITNESS WORKSHOP",
    headline: "FIRST-EVER FITNESS WORKSHOP IN JALANDHAR",
    subheadline: "Learn the 5 Components of Fitness",
    components: [
      {
        id: "01",
        title: "Cardio Vascular Endurance",
        icon: "HeartPulse",
      },
      {
        id: "02",
        title: "Muscular Strength",
        icon: "Dumbbell",
      },
      {
        id: "03",
        title: "Muscular Endurance & Agility, Speed",
        icon: "Zap",
      },
      {
        id: "04",
        title: "Mobility (Flexibility)",
        icon: "Activity",
      },
      {
        id: "05",
        title: "Body Composition",
        icon: "Scale",
      },
    ],
    message:
      "Don’t waste your hard-earned money on people without knowledge. Learn from the best with more than 15 years of experience.",
    batch: {
      title: "JOIN MY BATCH IN JALANDHAR",
      count: "25",
      countLabel: "SPOTS ONLY",
      availabilityBadge: "LIMITED SPOTS AVAILABLE",
      locationLabel: "LOCATION",
      gymName: "OLD SKOOL GYM",
      city: "JALANDHAR",
    },
    ctaText: "APPLY NOW →",
    supportingText: "PRE-BOOKING CLOSES 4 NOVEMBER",
    expiryDate: ANNOUNCEMENT_EXPIRY,
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

  pricing: {
    eyebrow: "TRANSPARENT PRICING // NO HIDDEN FEES",
    headline: "TRANSFORMATION PACKAGES",
    subtitle: "Customized elite coaching, tailored nutrition, and direct weekly accountability with Coach Divesh Mehan.",
    packages: [
      {
        id: "4-weeks",
        name: "4 WEEKS",
        title: "Sprint Kickstart",
        price: "6,999",
        numericPrice: 6999,
        currency: "INR",
        duration: "4 Weeks",
        durationLabel: "4 WEEKS DURATION",
        badge: null,
        description: "Ideal for kickstarting fat loss, resetting metabolic discipline, and building baseline training momentum.",
        popular: false,
      },
      {
        id: "8-weeks",
        name: "8 WEEKS",
        title: "Optimal Transformation",
        price: "12,999",
        numericPrice: 12999,
        currency: "INR",
        duration: "8 Weeks",
        durationLabel: "8 WEEKS DURATION",
        badge: "MOST POPULAR",
        description: "The gold standard protocol for visible body recomposition, significant lean muscle gain, and habitual discipline.",
        popular: true,
      },
      {
        id: "12-weeks",
        name: "12 WEEKS",
        title: "Complete Mastery",
        price: "18,999",
        numericPrice: 18999,
        currency: "INR",
        duration: "12 Weeks",
        durationLabel: "12 WEEKS DURATION",
        badge: "BEST VALUE",
        description: "Full physical transformation, progressive periodization, biomechanical mastery, and lasting lifestyle change.",
        popular: false,
      },
    ],
    deliverables: [
      "Customised Diet plan veg and non veg",
      "Designing of workout on weekly basis",
      "Tracking progress through whatsapp",
      "Live video calling assistance",
      "Certified Corrective exercise specialist",
      "Certified nutritionist",
      "Certified trainer",
    ],
  },

  certifications: {
    eyebrow: "VERIFIED CREDENTIALS & ACCOLADES",
    headline: "GLOBALLY ACCREDITED & CHAMPIONSHIP PROVEN",
    subheadline:
      "Every protocol is backed by internationally accredited governing bodies, sports science qualifications, and natural bodybuilding championship titles.",
    stats: [
      { label: "CHAMPIONSHIP TITLES", value: "2X CHAMPION", desc: "Musclemania Asia & India" },
      { label: "GLOBAL ACCREDITATION", value: "EQF LEVEL 4", desc: "EREPS & EuropeActive" },
      { label: "SPECIALIZATION", value: "ACE & ACSM", desc: "Posture & Corrective Exercise" },
      { label: "PRACTICE STANDARDS", value: "ISO COMPLIANT", desc: "9001 / 14001 / 45001" },
    ],
    items: [
      {
        id: "musclemania-asia-2022",
        category: "championship",
        categoryLabel: "CHAMPIONSHIP TITLE",
        badgeText: "ASIA CHAMPION",
        badgeColor: "gold",
        title: "2022 Musclemania® Asia Champion",
        organization: "Musclemania® International",
        credential: "Certificate of Recognition — 2022 Musclemania® Asia Champion",
        date: "December 10, 2022",
        issuingAuthority: "Louis Zwick (President, Musclemania International)",
        regNo: "MM-ASIA-2022-WIN",
        image: "/images/Aisa certificate 2022.png",
        highlights: [
          "1st Place Gold Medal Champion across all Asian competitors",
          "100% Lifetime Natural & Drug-Free Standard",
          "Official 30th Anniversary Recognition from Musclemania International",
        ],
        verificationNote: "Official Certificate of Recognition by Musclemania International",
      },
      {
        id: "prehab-121-corrective",
        category: "medical",
        categoryLabel: "CORRECTIVE & REHAB",
        badgeText: "ACE & ACSM APPROVED",
        badgeColor: "blue",
        title: "Posture & Functional Corrective Exercise Specialist",
        organization: "Prehab 121™ Academy",
        credential: "Certificate of Completion — Posture & Functional Corrective Exercise Specialist",
        date: "Awarded 25th July 2026",
        issuingAuthority: "Dr. Luqman Shaikh (PT), Founder Prehab 121 Academy",
        regNo: "CES062989",
        image: "/images/certificate of completion.png",
        highlights: [
          "American Council on Exercise (ACE) Approved Provider (2.0 CECs - CEP205013)",
          "American College of Sports Medicine (ACSM) Approved Provider (20 CECs - 885783)",
          "ISO 9001:2015, ISO 14001:2015, ISO 45001:2018 Certified Institution",
        ],
        verificationNote: "Approved by ACE (CEP205013) & ACSM (885783) USA // Reg #CES062989",
      },
      {
        id: "ereps-level-4",
        category: "accreditation",
        categoryLabel: "GLOBAL ACCREDITATION",
        badgeText: "EREPS EQF-4",
        badgeColor: "emerald",
        title: "European Register of Exercise Professionals (EREPS)",
        organization: "EuropeActive & EREPS",
        credential: "Personal Trainer — EQF Level 4 (Admitted Member)",
        date: "Valid Through 22 June 2027",
        issuingAuthority: "EuropeActive Professional Standards Committee",
        regNo: "151544",
        image: "/images/EREPS certificate.png",
        highlights: [
          "Admitted to the official European Register of Exercise Professionals",
          "Highest European Qualification Framework (EQF Level 4) standard",
          "Regulated under EuropeActive Professional Standards Committee",
        ],
        verificationNote: "Verifiable at www.ereps.eu // Membership #151544",
      },
      {
        id: "musclemania-india-2019",
        category: "championship",
        categoryLabel: "CHAMPIONSHIP TITLE",
        badgeText: "NATIONAL CHAMPION",
        badgeColor: "gold",
        title: "2019 Musclemania® India Bodybuilding Champion",
        organization: "Musclemania® International",
        credential: "Certificate of Recognition — 2019 Musclemania® India Champion",
        date: "December 8, 2019",
        issuingAuthority: "Louis Zwick (President, Musclemania International)",
        regNo: "MM-IND-2019-CHAMP",
        image: "/images/muscle mania india.png",
        highlights: [
          "Gold Medal National Titleholder at Musclemania India",
          "Tested & Verified Drug-Free Physique Excellence",
          "Official 30th Anniversary Commemorative Golden Seal",
        ],
        verificationNote: "Official Certificate of Recognition by Musclemania International",
      },
      {
        id: "classic-fitness-cpt",
        category: "accreditation",
        categoryLabel: "ACADEMIC DIPLOMA",
        badgeText: "CERTIFIED TRAINER",
        badgeColor: "emerald",
        title: "Classic Fitness Academy — Certified Personal Trainer",
        organization: "Classic Fitness Academy (CFA)",
        credential: "Certified Personal Trainer (EQF Level – 4)",
        date: "Valid Through 24/04/2028",
        issuingAuthority: "Dr. Chirag Sethi (MD) & Lagan Rai McPereira (TD)",
        regNo: "CFA/CPT/12577",
        image: "/images/class fitness academy.png",
        highlights: [
          "EuropeActive & EREPS Affiliated Master Trainer Program",
          "Comprehensive Theoretical & Practical Exercise Science Examination",
          "Official QR Code Verifiable Credential",
        ],
        verificationNote: "Certification CFA/CPT/12577 // EuropeActive Affiliated",
      },
    ],
  },

  finalCta: {
    eyebrow: "LIMITED SPOTS ROSTER",
    headline: "ARE YOU READY TO DEMAND MORE FROM YOURSELF?",
    subheadline:
      "Coaching intake is strictly limited each month to ensure every client receives direct, daily attention from the head coach. Submit your intake application today to secure your assessment.",
    buttonLabel: "SUBMIT COACHING APPLICATION",
    buttonHref: "#apply",
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
      { label: "Pricing & Packages", href: "#pricing" },
      { label: "Apply For Coaching", href: "#apply" },
    ],
    policies: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
      { label: "Coaching Agreement", href: "#" },
      { label: "Client Portal", href: "#" },
    ],
    socials: [
      {
        name: "Aish Mehan Instagram",
        label: "FOLLOW AISH ON INSTAGRAM",
        handle: "@aish_mehan",
        type: "Coaching & Athlete",
        href: "https://www.instagram.com/aish_mehan?igsh=MWJ2bHRuZjNwdTgwbg==",
        icon: "instagram",
      },
      {
        name: "Stage & Steel Instagram",
        label: "FOLLOW STAGE & STEEL",
        handle: "@stageandsteelsupplements",
        type: "Official Supplements",
        href: "https://www.instagram.com/stageandsteelsupplements?igsh=Z2M3bzlseXliNm50",
        icon: "instagram",
      },
      {
        name: "Aish Mehan YouTube",
        label: "FOLLOW ON YOUTUBE",
        handle: "@aishmehan",
        type: "Training & Workouts",
        href: "https://youtube.com/@aishmehan?si=sHM3f5F1nkZv1VNO",
        icon: "youtube",
      },
    ],
    copyright: `COPYRIGHT © ${new Date().getFullYear()}, AISH MEHAN COACHING ALL RIGHTS RESERVED.`,
  },
};
