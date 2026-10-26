"use client";
import Link from "next/link";
import { Menu, Phone, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { business } from "@/config/business";
import { navigation } from "@/config/navigation";
export function Header() { const pathname=usePathname(); const [open,setOpen]=useState(false); const panel=useRef<HTMLDivElement>(null); useEffect(()=>{if(!open)return;panel.current?.querySelector<HTMLElement>("a")?.focus();const onKey=(event:KeyboardEvent)=>{if(event.key==="Escape")setOpen(false)};document.addEventListener("keydown",onKey);return()=>document.removeEventListener("keydown",onKey)},[open]); return <header className="site-header"><div className="shell header-inner"><BrandLogo/><nav className="desktop-nav" aria-label="Navigation principale">{navigation.map(item=><Link key={item.href} className={pathname===item.href?"active":undefined} href={item.href}>{item.label}</Link>)}<a className="button header-cta" href={business.phoneHref}><Phone/>Appeler</a></nav><button className="menu-button" type="button" aria-expanded={open} aria-controls="mobile-menu" aria-label={open?"Fermer le menu":"Ouvrir le menu"} onClick={()=>setOpen(!open)}>{open?<X/>:<Menu/>}</button></div>{open&&<div className="mobile-panel" id="mobile-menu" ref={panel}><nav aria-label="Navigation mobile">{navigation.map(item=><Link onClick={()=>setOpen(false)} key={item.href} href={item.href}>{item.label}</Link>)}<a className="button" href={business.phoneHref}><Phone/>Appeler Abrauto</a></nav></div>}</header>; }
