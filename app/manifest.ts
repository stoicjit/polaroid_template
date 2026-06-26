import type { MetadataRoute } from "next";
import { eventConfig } from "@/lib/event";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: eventConfig.title,
    short_name: eventConfig.shortName,
    description: eventConfig.description,
    start_url: "/welcome",
    scope: "/",
    display: "standalone",
    background_color: "#0a0a0a",
    theme_color: "#0a0a0a",
    icons: [
      {
        src: "/app_icon.png",
        sizes: "1200x1200",
        type: "image/png",
      },
    ],
  };
}
