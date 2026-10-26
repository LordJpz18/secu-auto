export type VehicleStatus = "available" | "soon" | "on_request";
export type Vehicle = {
  id: string; slug: string; name: string; make: string; model: string;
  category: "particulier" | "utilitaire"; dailyPriceCents: number; status: VehicleStatus;
  transmission?: "manual" | "automatic"; fuel?: string; seats?: number;
  volumeM3?: number; payloadKg?: number; features: string[]; coverImageUrl: string;
};
