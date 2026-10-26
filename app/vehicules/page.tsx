import type { Metadata } from "next";
import { VehicleCatalog } from "@/components/vehicles/VehicleCatalog";
import { vehicles } from "@/data/vehicles";
export const metadata:Metadata={title:"Catalogue de véhicules",description:"Découvrez les véhicules particuliers et utilitaires Abrauto disponibles à la location en Île-de-France."};
export default function VehiclesPage(){return <main id="main"><section className="page-hero"><div className="shell"><p className="kicker">CATALOGUE</p><h1>PARTICULIERS.<br/><span>UTILITAIRES.</span></h1><p>Une flotte présentée à titre indicatif. Contactez-nous pour connaître les disponibilités et conditions.</p></div></section><section className="section shell"><VehicleCatalog vehicles={vehicles}/><p className="availability-note">Les disponibilités et conditions de location sont confirmées directement avec Abrauto.</p></section></main>}
