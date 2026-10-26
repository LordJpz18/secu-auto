"use client";
import { useState } from "react";
import type { Vehicle } from "@/lib/types";
import { VehicleCard } from "./VehicleCard";
type Filter="all"|"particulier"|"utilitaire"|"automatic"|"manual"|"petrol"|"diesel"|"hybrid"|"electric";
const filters:[Filter,string][]=[["all","Tous"],["particulier","Particuliers"],["utilitaire","Utilitaires"],["automatic","Automatique"],["manual","Manuelle"],["petrol","Essence"],["diesel","Diesel"],["hybrid","Hybride"],["electric","Électrique"]];
export function VehicleCatalog({vehicles,compact=false}:{vehicles:Vehicle[];compact?:boolean}) { const [filter,setFilter]=useState<Filter>(compact?"particulier":"all"); const shown=vehicles.filter(v=>filter==="all"||v.category===filter||v.transmission===filter||v.fuel===filter); return <div><div className="vehicle-filters" role="tablist" aria-label="Filtrer les véhicules">{filters.filter(([id])=>!compact||["particulier","utilitaire"].includes(id)).map(([id,label])=><button key={id} type="button" role="tab" aria-selected={filter===id} onClick={()=>setFilter(id)}>{label}</button>)}</div><div className="catalog-grid">{shown.map(vehicle=><VehicleCard key={vehicle.id} vehicle={vehicle}/>)}</div>{!shown.length&&<p className="empty-state">Aucun véhicule ne correspond à ce filtre.</p>}</div>; }
