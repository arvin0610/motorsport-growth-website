export interface Client {
  name: string;
  slug: string;
  logo: string; // path relative to /public
  hue?: string; // optional brand hue for hover state
}

export const clients: Client[] = [
  { name: "961 Motorsport",          slug: "961-motorsport",          logo: "/clients/961-motorsport.png" },
  { name: "Destined Industries",     slug: "destined-industries",     logo: "/clients/destined-industries.png" },
  { name: "HCCC",                    slug: "hccc",                    logo: "/clients/hccc.png" },
  { name: "Levant",                  slug: "levant",                  logo: "/clients/levant.png" },
  { name: "Limitless Auto Collision",slug: "limitless-auto-collision",logo: "/clients/limitless-auto-collision.png" },
  { name: "Naibor",                  slug: "naibor",                  logo: "/clients/naibor.png" },
  { name: "Precision Motorsport",    slug: "precision-motorsport",    logo: "/clients/precision-motorsport.png" },
  { name: "Stage 4 Tuning",          slug: "stage-4-tuning",          logo: "/clients/stage-4-tuning.png" },
  { name: "Take 15",                 slug: "take-15",                 logo: "/clients/take-15.png" },
  { name: "The House Bath",          slug: "the-house-bath",          logo: "/clients/the-house-bath.png" },
];
