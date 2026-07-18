export const highlights = [
  { glyph: "$", stat: "RAISING $150K", label: "Pre-Seed Round", color: "#E11414" },
  { glyph: "◎", stat: "LAS VEGAS", label: "Headquarters", color: "#F2F2F0" },
  { glyph: "48", stat: "48 STATES", label: "100-Day Tour", color: "#E11414" },
  { glyph: "▣", stat: "MARKETPLACE", label: "Mobile + In-Shop Booking", color: "#F2F2F0" },
  { glyph: "↗", stat: "MASSIVE MARKET", label: "High-Growth Industry", color: "#E11414" },
  { glyph: "≡", stat: "MULTIPLE REVENUE", label: "Streams", color: "#F2F2F0" },
];

export const features = [
  { glyph: "⌂", title: "ON-DEMAND MOBILE CUTS", copy: "Book a barber to your home, hotel, office, event, or anywhere you need a cut." },
  { glyph: "▣", title: "IN-SHOP APPOINTMENTS", copy: "Discover top barbers in your area and book in-shop appointments with ease." },
  { glyph: "☾", title: "AFTER DARK", copy: "Premium after-hours appointments for your convenience and lifestyle." },
  { glyph: "AI", title: "AI HAIRCUT PREVIEW", copy: "Preview haircuts, beard styles, and lineups with AI before you book." },
  { glyph: "◈", title: "MARKETPLACE SHOP", copy: "Shop professional clippers, grooming products, apparel, and more." },
  { glyph: "◎", title: "COMMUNITY FOR BARBERS", copy: "Connect. Learn. Grow. Content, events, and business opportunities for barbers." },
];

/**
 * photo: path under /public (e.g. "/images/team/jason-porter.jpg").
 * Leave null to show the initials placeholder.
 */
export const team: {
  initials: string;
  name: string;
  role: string;
  photo: string | null;
}[] = [
  { initials: "JP", name: "JASON PORTER", role: "Founder & CEO", photo: null },
  { initials: "CP", name: "CAMERON PORTER", role: "Co-Founder", photo: null },
  { initials: "JW", name: "JERRY WILLIAMS", role: "Chief Investment Officer", photo: null },
  { initials: "AW", name: "AJ WILLIAMS", role: "Head of Technology", photo: null },
  { initials: "KM", name: "KELLY MILLER", role: "Head of National Relations", photo: null },
];

export const appBarbers = [
  { initials: "MF", name: "Marcus Fadez", meta: "0.5 mi · $30+", rating: "4.9" },
  { initials: "JB", name: "Jaymin Blendz", meta: "0.8 mi · $35+", rating: "4.9" },
  { initials: "TC", name: "Troy Cuts", meta: "1.2 mi · $30+", rating: "4.8" },
  { initials: "DB", name: "Dre The Barber", meta: "1.5 mi · $40+", rating: "5.0" },
];

export const accessItems = [
  "Investor Deck",
  "Financial Projections",
  "Market Analysis",
  "Use of Funds",
  "Data Room Access",
];

/**
 * Hero image: drop a file at /public/images/hero.jpg and it appears
 * automatically. Set to null to show the placeholder slot.
 */
export const heroImage: string | null = null;

/** Tour video URL — set it and the "Watch the video" button opens it. */
export const videoUrl: string = "";
