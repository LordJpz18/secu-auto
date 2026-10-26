import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { business } from "@/config/business";
import { navigation } from "@/config/navigation";
export function Footer() { return <footer className="footer"><div className="shell footer-grid"><div><BrandLogo footer/><p>{business.description}</p><p className="automotive">SAVIGNY-LE-TEMPLE · ÎLE-DE-FRANCE</p></div><div><h2>Navigation</h2>{navigation.map(item=><Link key={item.href} href={item.href}>{item.label}</Link>)}</div><div><h2>Contact</h2><a href={business.phoneHref}><Phone/>{business.phone}</a><a href={business.emailHref}><Mail/>{business.email}</a><a href={business.mapUrl} target="_blank" rel="noreferrer"><MapPin/>{business.city}</a><p>{business.openingHours}</p></div><div><h2>Informations</h2><Link href="/mentions-legales">Mentions légales</Link><Link href="/confidentialite">Confidentialité</Link></div></div><div className="shell footer-bottom">© {new Date().getFullYear()} Abrauto Automotive.</div></footer>; }
