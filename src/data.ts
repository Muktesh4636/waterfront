export const WHATSAPP =
  "https://wa.me/918790009000?text=Hi%2C%20I%27m%20interested%20in%20Fortune%20Waterfront";

export const MAP = {
  lat: 17.47861,
  lng: 78.41484,
  label: "Fortune Waterfront · Opposite IDL Lake, Kukatpally",
  // Google Maps embed centered on IDL Lake / Kukatpally waterfront
  embedUrl:
    "https://www.google.com/maps?q=Fortune+Waterfront+IDL+Lake+Kukatpally+Hyderabad&z=16&output=embed",
  directionsUrl:
    "https://www.google.com/maps/dir/?api=1&destination=Fortune+Waterfront+Kukatpally+Hyderabad",
  openUrl:
    "https://www.google.com/maps/search/?api=1&query=Fortune+Waterfront+IDL+Lake+Kukatpally",
} as const;

export const IMAGES = {
  hero: "/images/entrance-cgi-hd.jpg",
  entrance: "/images/entrance-cgi-hd.jpg",
  dusk: "/images/elev-dusk-hd.jpg",
  day: "/images/elev-day-hd.jpg",
  exter: "/images/exter-hd.jpg",
  exterA: "/images/exter-a-hd.jpg",
  elev: "/images/elev-hd.jpg",
  living: "/images/living.webp",
  bedroom: "/images/bedroom.webp",
  pool: "/images/pool.webp",
  club: "/images/club.webp",
  gym: "/images/gym.webp",
  yoga: "/images/yoga.webp",
  zen: "/images/zen.webp",
  kids: "/images/kids.webp",
  lobby: "/images/lobby.webp",
  dining: "/images/dining.webp",
  grand: "/images/grand.webp",
  central: "/images/central.webp",
  longView: "/images/long.webp",
  frontView: "/images/front.webp",
  towerAB: "/images/towers.webp",
  lakeSide: "/images/lake.webp",
} as const;

export const TAGLINES = [
  "Where the lake meets home",
  "Elevated living, quieter mornings",
  "Two towers. One waterfront.",
  "Crafted for families who choose calm",
  "Kukatpally. Connected. Considered.",
] as const;

export const HIGHLIGHTS = [
  { label: "Address", value: "IDL Lake" },
  { label: "Homes", value: "3 BHK" },
  { label: "Setting", value: "Gated" },
  { label: "Life", value: "Clubhouse" },
] as const;

export const LIFESTYLE = [
  {
    title: "Wake to water",
    line: "Mornings shaped by the lake breeze.",
    image: IMAGES.dusk,
  },
  {
    title: "Arrive in style",
    line: "A grand entrance that sets the tone.",
    image: IMAGES.entrance,
  },
  {
    title: "Live in light",
    line: "Interiors designed to breathe.",
    image: IMAGES.living,
  },
  {
    title: "Rest deeply",
    line: "Quiet bedrooms above the city hum.",
    image: IMAGES.bedroom,
  },
] as const;

export const AMENITIES = [
  { name: "Temperature-controlled pool", image: IMAGES.pool },
  { name: "Clubhouse & lounge", image: IMAGES.club },
  { name: "Fitness studio", image: IMAGES.gym },
  { name: "Yoga lawn", image: IMAGES.yoga },
  { name: "Zen garden", image: IMAGES.zen },
  { name: "Children's play", image: IMAGES.kids },
  { name: "Private lobbies", image: IMAGES.lobby },
  { name: "Dining & gatherings", image: IMAGES.dining },
] as const;

export const GALLERY = [
  { src: IMAGES.dusk, caption: "Dusk on the lake" },
  { src: IMAGES.day, caption: "Daylight elevation" },
  { src: IMAGES.exter, caption: "Landscape living" },
  { src: IMAGES.pool, caption: "Terrace pool" },
  { src: IMAGES.grand, caption: "Grand walk" },
  { src: IMAGES.central, caption: "Central greens" },
] as const;

export const PROXIMITY = [
  { title: "By the lake", detail: "Opposite IDL Lake" },
  { title: "Near metro", detail: "Minutes to Kukatpally Metro" },
  { title: "Work close", detail: "Hitech City within reach" },
  { title: "Everyday ease", detail: "Malls · Schools · Care" },
] as const;

export const VIDEOS = [
  {
    id: "R_lI9lJLZ5M",
    title: "Location & review 2026",
    tagline: "SSI Fortune Waterfront walkthrough",
    start: 6,
  },
  {
    id: "STgPutTW8Cw",
    title: "Project walkthrough",
    tagline: "Experience Fortune Waterfront",
  },
  {
    id: "63fBdkL5-VM",
    title: "Low density, high luxury",
    tagline: "The idea behind the address",
  },
  {
    id: "MCda_CPhlYc",
    title: "November site update",
    tagline: "Construction in motion",
  },
  {
    id: "-tF10HwGOlU",
    title: "April site update",
    tagline: "Progress on ground",
  },
] as const;

export const PROGRESS = {
  label: "August 2026",
  tagline: "Rising by the lake — both towers underway.",
  sourceUrl: "https://srisreenivasa.com/portfolio/fortune-waterfront/",
  photos: [
    { src: "/images/progress/Long-View-3.jpg", caption: "Long view" },
    { src: "/images/progress/Top-View-1-1.jpg", caption: "Top view" },
    { src: "/images/progress/Entrance.jpg", caption: "Entrance" },
    { src: "/images/progress/Front-View-3-1.jpg", caption: "Front elevation" },
    { src: "/images/progress/Side-View.jpg", caption: "Side view" },
    { src: "/images/progress/Lake-Side-View.jpg", caption: "Lake side" },
    { src: "/images/progress/Tower-AB.jpg", caption: "Towers A & B" },
    { src: "/images/progress/Tower-A-2.jpg", caption: "Tower A" },
    { src: "/images/progress/Tower-B.jpg", caption: "Tower B" },
    { src: "/images/progress/Left-View.jpg", caption: "Left view" },
    { src: "/images/progress/Rare-View-1.jpg", caption: "Rear view" },
  ],
} as const;

export const NAV_LINKS = [
  { href: "#overview", label: "Overview" },
  { href: "#lifestyle", label: "Lifestyle" },
  { href: "#amenities", label: "Amenities" },
  { href: "#videos", label: "Videos" },
  { href: "#progress", label: "Progress" },
  { href: "#location", label: "Location" },
] as const;
