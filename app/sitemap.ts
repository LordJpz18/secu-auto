import type { MetadataRoute } from "next"; import {site} from "@/config/site"; export default function sitemap():MetadataRoute.Sitemap{return ["","/vehicules","/achat","/avis","/contact","/mentions-legales","/confidentialite"].map(path=>({url:`${site.url}${path}`,lastModified:new Date()}))}
export const dynamic = "force-static";
