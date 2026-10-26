import type { Metadata } from "next";
import { Barlow_Condensed, Manrope } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { site } from "@/config/site";
import "./globals.css";
const heading=Barlow_Condensed({subsets:["latin"],weight:["700","800","900"],style:["normal","italic"],variable:"--font-heading",display:"swap"});
const body=Manrope({subsets:["latin"],variable:"--font-body",display:"swap"});
export const metadata:Metadata={metadataBase:new URL(site.url),title:{default:site.title,template:"%s — Abrauto Automotive"},description:site.description,alternates:{canonical:site.url},openGraph:{type:"website",locale:"fr_FR",siteName:"Abrauto Automotive",title:site.title,description:site.description,url:site.url},twitter:{card:"summary_large_image"}};
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>){return <html lang="fr" className={`${heading.variable} ${body.variable}`} data-scroll-behavior="smooth"><body><a className="skip-link" href="#main">Aller au contenu principal</a><Header/>{children}<Footer/><a className="mobile-call" href="tel:+33783649046">Appeler Abrauto</a></body></html>}
