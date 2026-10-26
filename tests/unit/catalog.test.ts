import { describe, expect, it } from "vitest";
import { vehicles } from "@/data/vehicles";
describe("catalogue local",()=>{it("contient des particuliers et des utilitaires",()=>{expect(vehicles.some(v=>v.category==="particulier")).toBe(true);expect(vehicles.some(v=>v.category==="utilitaire")).toBe(true)});it("possède des slugs uniques",()=>expect(new Set(vehicles.map(v=>v.slug)).size).toBe(vehicles.length));it("affiche uniquement des tarifs positifs",()=>expect(vehicles.every(v=>v.dailyPriceCents>0)).toBe(true))});
