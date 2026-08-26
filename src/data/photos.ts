export interface GalleryPhoto {
  id: string;
  category: "festival" | "party" | "afters" | "flash";
  title: string;
  timestamp: string;
  location: string;
  vibe: string;
  url: string;
  aspect: "portrait" | "landscape" | "square";
  accentColor: string;
}

export const GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    id: "photo-1",
    category: "festival",
    title: "Main Stage Energy",
    timestamp: "02:18 AM '04",
    location: "Sziget Festival Stage",
    vibe: "Euphoric Bass Drop",
    url: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=900&auto=format&fit=crop",
    aspect: "portrait",
    accentColor: "#FF70A6",
  },
  {
    id: "photo-2",
    category: "flash",
    title: "Flash in the Bathroom Mirror",
    timestamp: "03:42 AM '04",
    location: "Underground Club Restroom",
    vibe: "Iconic Lipgloss & Glare",
    url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=900&auto=format&fit=crop",
    aspect: "portrait",
    accentColor: "#70EEFF",
  },
  {
    id: "photo-3",
    category: "party",
    title: "Confetti Blast Chaos",
    timestamp: "01:05 AM '04",
    location: "Warehouse Birthday Rave",
    vibe: "Sparkler Madness",
    url: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=900&auto=format&fit=crop",
    aspect: "landscape",
    accentColor: "#FF9F1C",
  },
  {
    id: "photo-4",
    category: "afters",
    title: "5 AM Kitchen Talk",
    timestamp: "05:14 AM '04",
    location: "Flat 4B Living Room",
    vibe: "Sun Rising Outside",
    url: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=900&auto=format&fit=crop",
    aspect: "landscape",
    accentColor: "#B4F8C8",
  },
  {
    id: "photo-5",
    category: "festival",
    title: "Crowd Surfing Flash",
    timestamp: "23:48 PM '04",
    location: "Let It Roll Open Air",
    vibe: "Pure Adrenaline",
    url: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=900&auto=format&fit=crop",
    aspect: "square",
    accentColor: "#FF70A6",
  },
  {
    id: "photo-6",
    category: "flash",
    title: "Backseat Flash Snap",
    timestamp: "04:30 AM '04",
    location: "Night Ride Taxi Home",
    vibe: "Tired But Unstoppable",
    url: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=900&auto=format&fit=crop",
    aspect: "portrait",
    accentColor: "#70EEFF",
  },
  {
    id: "photo-7",
    category: "party",
    title: "Red Cups & Neon Glow",
    timestamp: "00:22 AM '04",
    location: "House Party Hallway",
    vibe: "Secret Playlist Playing",
    url: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=900&auto=format&fit=crop",
    aspect: "landscape",
    accentColor: "#FF9F1C",
  },
  {
    id: "photo-8",
    category: "afters",
    title: "Balcony Smoke & Laughs",
    timestamp: "06:02 AM '04",
    location: "Prague Rooftop Afters",
    vibe: "Golden Hour Glow",
    url: "https://images.unsplash.com/photo-1574391884720-bbc3740c59d1?q=80&w=900&auto=format&fit=crop",
    aspect: "square",
    accentColor: "#B4F8C8",
  },
];