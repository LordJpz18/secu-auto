import type { Metadata } from "next";
import { ContactCard } from "@/components/contact/ContactCard";
export const metadata:Metadata={title:"Contact",description:"Contactez directement Abrauto Automotive à Savigny-le-Temple pour la location ou votre projet automobile."};
export default function ContactPage(){return <main id="main"><section className="page-hero"><div className="shell"><p className="kicker">SAVIGNY-LE-TEMPLE · ÎLE-DE-FRANCE</p><h1>PARLONS DE<br/><span>VOTRE PROJET.</span></h1><p>Aucun formulaire, aucun intermédiaire. Appelez-nous ou ouvrez directement WhatsApp.</p></div></section><section className="section shell"><ContactCard/></section></main>}
