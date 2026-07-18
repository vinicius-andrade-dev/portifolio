import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Vinicius Silva de Andrade Portfolio",
    short_name: "VAndrade",
    description: "Portfólio profissional de Vinicius Silva de Andrade, Desenvolvedor Full Stack.",
    start_url: "/",
    display: "standalone",
    background_color: "#030303",
    theme_color: "#7c3aed",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
