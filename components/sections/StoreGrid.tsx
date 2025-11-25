import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface StoreItem {
  id: string;
  name: string;
  description: string;
  price: string;
  image?: string;
  category: "merch" | "music";
}

interface StoreGridProps {
  items: StoreItem[];
}

export default function StoreGrid({ items }: StoreGridProps) {
  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No items available at this time.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((item) => (
        <Card key={item.id} className="border-border bg-dark-slate/50 hover:border-purple-500/30 hover:glow-purple transition-all">
          {item.image && (
            <div className="relative w-full h-64 bg-dark-charcoal">
              <div className="absolute inset-0 flex items-center justify-center text-4xl">
                {item.category === "music" ? "🎵" : "👕"}
              </div>
            </div>
          )}
          <CardHeader>
            <div className="flex items-start justify-between">
              <CardTitle className="text-primary">{item.name}</CardTitle>
              <span className="text-sm font-bold text-neon-purple">{item.price}</span>
            </div>
            <CardDescription className="text-foreground/70">
              {item.description}
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button className="w-full bg-primary hover:bg-primary/90 text-dark font-bold">
              Add to Cart
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}

