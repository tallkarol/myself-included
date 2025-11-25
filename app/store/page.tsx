import { Metadata } from "next";
import StoreGrid from "@/components/sections/StoreGrid";

export const metadata: Metadata = {
  title: "Store | MYSELF INCLUDED",
  description: "Official merchandise and music from Myself Included.",
};

const storeItems = [
  {
    id: "1",
    name: "Signature T-Shirt",
    description: "Premium cotton t-shirt with artist logo",
    price: "$35",
    category: "merch" as const,
  },
  {
    id: "2",
    name: "Hoodie",
    description: "Comfortable hoodie perfect for festivals",
    price: "$65",
    category: "merch" as const,
  },
  {
    id: "3",
    name: "Vinyl - Electric Dreams",
    description: "Limited edition 12\" vinyl single",
    price: "$25",
    category: "music" as const,
  },
  {
    id: "4",
    name: "CD - Album Collection",
    description: "Complete album collection on CD",
    price: "$20",
    category: "music" as const,
  },
  {
    id: "5",
    name: "Poster Set",
    description: "Set of 3 high-quality posters",
    price: "$30",
    category: "merch" as const,
  },
  {
    id: "6",
    name: "Digital Album Download",
    description: "High-quality digital download of latest album",
    price: "$10",
    category: "music" as const,
  },
];

export default function StorePage() {
  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="py-20 md:py-28 border-b border-border/50 min-h-[40vh] md:min-h-[45vh] flex items-center">
        <div className="container px-5 md:px-4 max-w-5xl mx-auto w-full">
          <div className="text-center">
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-foreground mb-6">
              Store
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Official merchandise and music. Show your support and represent the sound.
            </p>
          </div>
        </div>
      </section>

      {/* Store Grid */}
      <section className="py-14 md:py-20">
        <div className="container px-5 md:px-4">
          <StoreGrid items={storeItems} />
        </div>
      </section>
    </div>
  );
}

