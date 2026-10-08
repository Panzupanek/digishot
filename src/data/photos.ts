export interface GalleryPhoto {
  id: string;
  title: string;
  timestamp: string;
  url: string;
  vibe?: string;
  category?: string;
}

export const GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    id: "shot-1",
    title: "Shot #01",
    timestamp: "02:18 AM",
    url: "/gallery/shot1.jpg",
    vibe: "Xenon Flash",
  },
  {
    id: "shot-2",
    title: "Shot #02",
    timestamp: "03:42 AM",
    url: "/gallery/shot2.jpg",
    vibe: "Retro Grain",
  },
  {
    id: "shot-3",
    title: "Shot #03",
    timestamp: "01:05 AM",
    url: "/gallery/shot3.jpg",
    vibe: "Party Energy",
  },
  {
    id: "shot-4",
    title: "Shot #04",
    timestamp: "04:30 AM",
    url: "/gallery/shot4.jpg",
    vibe: "Authentic Night",
  },
];