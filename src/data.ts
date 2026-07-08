export type Work = {
  src: string;
  title: string;
  category: "gaming" | "irl";
};

export const BEHANCE_URL = "https://www.behance.net/sythepsd";

export const clients = [
  {
    name: "oCmz",
    subs: "8.76M",
    handle: "@iiocmz",
    img: "/clients/ocmz.webp",
    url: "https://www.youtube.com/iiocmz",
    tag: "Fortnite",
  },
  {
    name: "Clix",
    subs: "3.31M",
    handle: "@Clix",
    img: "/clients/clix.webp",
    url: "https://www.youtube.com/@Clix",
    tag: "Fortnite",
  },
  {
    name: "ThomasHD",
    subs: "147K",
    handle: "@Th0masHD",
    img: "/clients/thomashd.webp",
    url: "https://www.youtube.com/@Th0masHD",
    tag: "Gaming",
  },
];

// One unified "Selected Work" set — gaming + IRL combined, interleaved.
const gaming: Work[] = Array.from({ length: 8 }, (_, i) => ({
  src: `/work/gaming-${i + 1}.webp`,
  title: `Fortnite Thumbnail ${String(i + 1).padStart(2, "0")}`,
  category: "gaming" as const,
}));
const irl: Work[] = Array.from({ length: 3 }, (_, i) => ({
  src: `/work/irl-${i + 1}.webp`,
  title: `IRL Content ${String(i + 1).padStart(2, "0")}`,
  category: "irl" as const,
}));

// Interleave so IRL pieces are spread through the grid rather than clumped.
export const works: Work[] = [
  gaming[0], gaming[1], irl[0], gaming[2], gaming[3], gaming[4],
  irl[1], gaming[5], gaming[6], irl[2], gaming[7],
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
  { label: "Behance", handle: "@sythepsd", url: BEHANCE_URL },
  { label: "Store", handle: "payhip.com/SythePSD", url: "https://payhip.com/SythePSD" },
  { label: "Discord", handle: "sythepsd", url: "#" },
];

export const nav = [
  { label: "Work", href: "#work" },
  { label: "Clients", href: "#clients" },
  { label: "About", href: "#about" },
  { label: "Process", href: "#process" },
  { label: "Contact", href: "#contact" },
];
