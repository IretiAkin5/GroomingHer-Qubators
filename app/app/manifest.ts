import type { MetadataRoute } from "next";
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "GroomingHer",
    short_name: "GroomingHer",
    start_url: "/",
    display: "standalone",
    background_color: "#FFF9F4",
    theme_color: "#642C58",
    icons: [],
  };
}
