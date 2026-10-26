export const basePath = (process.env.NEXT_PUBLIC_BASE_PATH ?? "").replace(/\/$/, "");
export const withBasePath = (path: string) => `${basePath}${path.startsWith("/") ? path : `/${path}`}`;

export const site = {
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  title: "Abrauto Automotive — Location de véhicules en Île-de-France",
  description: "Location de véhicules particuliers et utilitaires et accompagnement à l’achat à Savigny-le-Temple et dans toute l’Île-de-France.",
} as const;
