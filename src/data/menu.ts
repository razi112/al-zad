import chicken from "@/assets/dish-chicken.jpg";
import shawarma from "@/assets/dish-shawarma.jpg";
import mezze from "@/assets/dish-mezze.jpg";
import mandi from "@/assets/dish-mandi.jpg";
import wings from "@/assets/dish-wings.jpg";
import burger from "@/assets/dish-burger.jpg";

export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: "Signature" | "Wraps" | "Platters" | "Sides" | "Burgers";
  badge?: string;
};

export const menu: MenuItem[] = [
  {
    id: "flame-half",
    name: "Flame-Roasted Half Chicken",
    description: "Slow-marinated 24h, charcoal-grilled, served with saffron rice & grilled lemon.",
    price: 42,
    image: chicken,
    category: "Signature",
    badge: "House Favorite",
  },
  {
    id: "mandi-feast",
    name: "Royal Chicken Mandi",
    description: "Smoked basmati, tender drumsticks, toasted nuts, raisins & garlic sauce.",
    price: 58,
    image: mandi,
    category: "Platters",
    badge: "Chef's Pick",
  },
  {
    id: "mezze-grand",
    name: "Grand Mezze Platter",
    description: "Hummus, mutabbal, kibbeh, olives, grilled chicken & warm pita.",
    price: 65,
    image: mezze,
    category: "Platters",
  },
  {
    id: "shawarma-royale",
    name: "Shawarma Royale",
    description: "Spit-roasted chicken, garlic toum, pickles, wrapped in saj.",
    price: 22,
    image: shawarma,
    category: "Wraps",
  },
  {
    id: "wings-fire",
    name: "Fire & Honey Wings",
    description: "Crispy wings glazed with chili-honey, sesame and scallions.",
    price: 28,
    image: wings,
    category: "Sides",
    badge: "Spicy",
  },
  {
    id: "burger-zad",
    name: "The AL ZAD Burger",
    description: "Double grilled chicken, aged cheddar, brioche, golden fries.",
    price: 32,
    image: burger,
    category: "Burgers",
  },
];

export const categories = ["All", "Signature", "Platters", "Wraps", "Burgers", "Sides"] as const;
