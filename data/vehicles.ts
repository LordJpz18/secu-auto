import type { Vehicle } from "@/lib/types";
import { withBasePath } from "@/config/site";
const placeholderImage = withBasePath("/images/hero/abrauto-hero.png");
export const vehicles: Vehicle[] = [
  { id: "compacte-urbaine", slug: "compacte-urbaine", name: "Compacte urbaine", make: "Marque à renseigner", model: "Modèle à renseigner", category: "particulier", dailyPriceCents: 4900, status: "available", transmission: "manual", fuel: "petrol", seats: 5, features: ["5 places", "Climatisation", "Format citadin"], coverImageUrl: placeholderImage },
  { id: "suv-confort", slug: "suv-confort", name: "SUV confort", make: "Marque à renseigner", model: "Modèle à renseigner", category: "particulier", dailyPriceCents: 7900, status: "on_request", transmission: "automatic", fuel: "hybrid", seats: 5, features: ["Boîte automatique", "5 places", "Motorisation hybride"], coverImageUrl: placeholderImage },
  { id: "familiale-polyvalente", slug: "familiale-polyvalente", name: "Familiale polyvalente", make: "Marque à renseigner", model: "Modèle à renseigner", category: "particulier", dailyPriceCents: 6900, status: "soon", transmission: "manual", fuel: "diesel", seats: 5, features: ["Grand coffre", "5 places", "Long trajet"], coverImageUrl: placeholderImage },
  { id: "fourgon-6m3", slug: "fourgon-6m3", name: "Fourgon 6 m³", make: "Marque à renseigner", model: "Modèle à renseigner", category: "utilitaire", dailyPriceCents: 8900, status: "available", volumeM3: 6, payloadKg: 1000, features: ["Volume 6 m³", "Charge utile provisoire", "2 places"], coverImageUrl: placeholderImage },
  { id: "fourgon-12m3", slug: "fourgon-12m3", name: "Fourgon 12 m³", make: "Marque à renseigner", model: "Modèle à renseigner", category: "utilitaire", dailyPriceCents: 11900, status: "on_request", volumeM3: 12, payloadKg: 1200, features: ["Volume 12 m³", "Charge utile provisoire", "3 places"], coverImageUrl: placeholderImage },
];
