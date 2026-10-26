import Image from "next/image";
import Link from "next/link";
import { withBasePath } from "@/config/site";
export function BrandLogo({ footer = false }: { footer?: boolean }) { return <Link href="/" className={footer ? "brand-logo brand-logo-footer" : "brand-logo"} aria-label="Abrauto Automotive, accueil"><Image src={withBasePath("/images/brand/logo-officiel.jpg")} alt="Abrauto Automotive" width={1560} height={1560} priority={!footer} /></Link>; }
