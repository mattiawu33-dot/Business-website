export type Store = {
  id: string;
  city: string;
  region: string;
  address: string;
  phone: string;
};

// Round 12 placeholder — a small sample so the page layout can be reviewed.
// The real, confirmed list of Ishué locations across Piemonte, Lombardia,
// Liguria, and Emilia will replace these entries in a follow-up round.
export const STORES: Store[] = [
  { id: "torino", city: "Torino", region: "Piemonte", address: "Via Roma 12, 10121 Torino (TO)", phone: "+39 011 000 0000" },
  { id: "milano", city: "Milano", region: "Lombardia", address: "Corso Buenos Aires 45, 20124 Milano (MI)", phone: "+39 02 0000 0000" },
  { id: "genova", city: "Genova", region: "Liguria", address: "Via XX Settembre 8, 16121 Genova (GE)", phone: "+39 010 000 0000" },
  { id: "bologna", city: "Bologna", region: "Emilia", address: "Via Indipendenza 20, 40121 Bologna (BO)", phone: "+39 051 000 0000" },
];
