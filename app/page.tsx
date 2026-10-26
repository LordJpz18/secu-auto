import Image from "next/image";
import Link from "next/link";
import { BadgeCheck, Headphones, KeyRound, Phone, Search } from "lucide-react";
import { ContactCard } from "@/components/contact/ContactCard";
import { VehicleCatalog } from "@/components/vehicles/VehicleCatalog";
import { business } from "@/config/business";
import { withBasePath } from "@/config/site";
import { vehicles } from "@/data/vehicles";

const services = [
  [KeyRound, "LOCATION", "Des véhicules adaptés à vos besoins."],
  [Search, "ACCOMPAGNEMENT À L’ACHAT", "Une recherche personnalisée selon vos critères."],
  [BadgeCheck, "SÉCURITÉ & TRANSPARENCE", "Des informations claires pour avancer en confiance."],
  [Headphones, "SUIVI PERSONNALISÉ", "Un interlocuteur à chaque étape."],
] as const;

export default function Home() {
  return <main id="main">
    <section className="hero">
      <Image src={withBasePath("/images/hero/abrauto-hero.png")} alt="Véhicule sombre mis en lumière" fill priority loading="eager" sizes="100vw" />
      <div className="hero-overlay" /><div className="hero-line" />
      <div className="shell hero-content"><p className="kicker">LOCATION · ÎLE-DE-FRANCE</p><h1>LOUEZ.<br/><span>ROULEZ.</span><br/>SIMPLEMENT.</h1><p>Véhicules particuliers et utilitaires.<br/>Un accompagnement personnalisé pour votre projet automobile.</p><div className="actions"><Link className="button" href="/vehicules">Voir les véhicules</Link><a className="button button-outline" href={business.phoneHref}><Phone/>Nous appeler</a></div></div>
    </section>
    <section className="services section"><div className="shell"><div className="section-heading"><p className="kicker">NOS SERVICES</p><h2>UN BESOIN.<br/><span>UNE SOLUTION.</span></h2></div><div className="service-grid">{services.map(([Icon,title,text])=><article key={title}><div className="icon-ring"><Icon/></div><div><h3>{title}</h3><p>{text}</p></div></article>)}</div></div></section>
    <section className="section catalog-section" id="catalogue"><div className="shell"><div className="section-heading heading-row"><div><p className="kicker">NOTRE FLOTTE</p><h2>TROUVEZ VOTRE<br/><span>VÉHICULE.</span></h2></div><Link className="text-link" href="/vehicules">Voir tout le catalogue →</Link></div><VehicleCatalog vehicles={vehicles} compact/><p className="availability-note">Les disponibilités et conditions de location sont confirmées directement avec Abrauto.</p></div></section>
    <section className="purchase-banner"><div className="shell purchase-banner-grid"><div><p className="kicker">ACCOMPAGNEMENT À L’ACHAT</p><h2>NOUS CHERCHONS.<br/><span>VOUS CHOISISSEZ.</span></h2><p>Budget, usage, préférences : nous échangeons avec vous pour orienter votre recherche.</p><Link className="button" href="/achat">Découvrir le service</Link></div><div className="graphic-a" aria-hidden="true">A</div></div></section>
    <section className="section"><div className="shell"><ContactCard compact/></div></section>
  </main>;
}
