import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "NextPay",
    short_name: "NextPay",
    description: "How much you can safely spend before your next payday.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#F4F5F2",
    theme_color: "#F4F5F2",
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
      {
        src: "/icons/maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
