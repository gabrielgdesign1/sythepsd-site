export type Work = {
  src: string;
  title: string;
  category: "gaming" | "irl";
};

export const clients = [
  { name: "oCmz", subs: "8.76M", handle: "@iiocmz", url: "https://www.youtube.com/iiocmz" },
  { name: "Clix", subs: "3.31M", handle: "@Clix", url: "https://www.youtube.com/@Clix" },
  { name: "ThomasHD", subs: "147K", handle: "@Th0masHD", url: "https://www.youtube.com/@Th0masHD" },
];

export const gamingWorks: Work[] = Array.from({ length: 8 }, (_, i) => ({
  src: `/work/gaming-${i + 1}.webp`,
  title: `Fortnite Thumbnail ${String(i + 1).padStart(2, "0")}`,
  category: "gaming" as const,
}));

export const irlWorks: Work[] = Array.from({ length: 3 }, (_, i) => ({
  src: `/work/irl-${i + 1}.webp`,
  title: `IRL Content ${String(i + 1).padStart(2, "0")}`,
  category: "irl" as const,
}));

export const services = [
  {
    group: "Fortnite Graphics",
    items: [
      { name: "PFP (Profile Pictures)", price: "€20" },
      { name: "Headers", price: "€30" },
      { name: "Revamps", price: "€50" },
      { name: "2D Designs", price: "€40" },
      { name: "3D Designs", price: "€50–150" },
    ],
  },
  {
    group: "Social Media Graphics",
    items: [
      { name: "Headers", price: "€25" },
      { name: "Posters", price: "€30–50" },
    ],
  },
  {
    group: "IRL Content",
    items: [{ name: "Headers", price: "€30" }],
  },
];

export const process = [
  {
    title: "Reach out",
    body: "Contact me through any platform below. Expect a quick response — usually within minutes.",
  },
  {
    title: "Brief & concept",
    body: "We lock the direction: style, references, and goals so the design fits your channel perfectly.",
  },
  {
    title: "Design & revisions",
    body: "I deliver the first draft, then refine it across multiple revision rounds until it's right.",
  },
  {
    title: "Final delivery",
    body: "You receive high-quality, ready-to-upload files through secure payment methods.",
  },
];

export const socials = [
  { label: "Twitter / X", handle: "@SythePSD", url: "https://x.com/SythePSD" },
  { label: "Email", handle: "schullerdani70@gmail.com", url: "mailto:schullerdani70@gmail.com" },
  { label: "YouTube", handle: "SythePSD", url: "https://www.youtube.com/channel/UCaRVqC8QYRBeDyf4BSVZUmQ" },
  { label: "Behance", handle: "@sythepsd", url: "https://www.behance.net/sythepsd" },
  { label: "Store", handle: "payhip.com/SythePSD", url: "https://payhip.com/SythePSD" },
  { label: "Discord", handle: "sythepsd", url: "#" },
];

export const nav = [
  { label: "Work", href: "#work" },
  { label: "Clients", href: "#clients" },
  { label: "About", href: "#about" },
  { label: "Pricing", href: "#pricing" },
  { label: "Contact", href: "#contact" },
];
