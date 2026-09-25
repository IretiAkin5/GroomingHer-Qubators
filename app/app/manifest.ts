import type { MetadataRoute } from "next";
export default function manifest(): MetadataRoute.Manifest {
  return { name: "GroomingHer", short_name: "GH Notes", start_url: "/", display: "standalone", background_color: "#FFF7F9", theme_color: "#7C2D52", icons: [] };
}
