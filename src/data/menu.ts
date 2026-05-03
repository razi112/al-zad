const alfahmMandiImg = "https://cdn.citymapia.com/kottayam/malabar-majlis/37916/Portfolio.jpg?biz=8363";
const pepperAlfahmImg = "https://i.pinimg.com/736x/9f/c2/4c/9fc24c1a70a18a06069cd26b4992e298.jpg";
const masalaShawaiImg = "https://fudbee.com/assets/img/items/1661433463qe9xSBcAoe.jpg";

export type SizeVariant = {
  label: string;
  price: number;
};

export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number; // base / starting price (used for display)
  sizes?: SizeVariant[];
  image: string;
  category: "Signature" | "Wraps" | "Platters" | "Sides" | "Burgers";
  badge?: string;
};

export const menu: MenuItem[] = [
  // ── Mandi items ──────────────────────────────────────────────────────────
  {
    id: "mandi-normal-alfahm",
    name: "Normal Al Fahm Mandi",
    description: "Classic charcoal-roasted Al Fahm chicken on fragrant smoked basmati rice.",
    price: 180,
    sizes: [
      { label: "Qtr",  price: 180 },
      { label: "Half", price: 360 },
      { label: "3/4",  price: 540 },
      { label: "Full", price: 710 },
    ],
    image: alfahmMandiImg,
    category: "Platters",
    badge: "House Favorite",
  },
  {
    id: "mandi-masala-shawaii",
    name: "Normal / Masala Shawaii Mandi",
    description: "Tender Shawaii-style chicken with aromatic masala spices on saffron rice.",
    price: 180,
    sizes: [
      { label: "Qtr",  price: 180 },
      { label: "Half", price: 360 },
      { label: "3/4",  price: 540 },
      { label: "Full", price: 710 },
    ],
    image: masalaShawaiImg,
    category: "Platters",
  },
  {
    id: "mandi-pepper-alfahm",
    name: "Pepper / Peri-Peri / Honey Al Fahm Mandi",
    description: "Al Fahm chicken with your choice of bold pepper, fiery peri-peri or sweet honey glaze.",
    price: 190,
    sizes: [
      { label: "Qtr",  price: 190 },
      { label: "Half", price: 380 },
      { label: "3/4",  price: 570 },
      { label: "Full", price: 740 },
    ],
    image: pepperAlfahmImg,
    category: "Platters",
    badge: "Chef's Pick",
  },

  // ── Other items ───────────────────────────────────────────────────────────
];

export const categories = ["All", "Platters"] as const;
