import { Metadata } from "next";
import TourList from "@/components/sections/TourList";

export const metadata: Metadata = {
  title: "Tour Dates | MYSELF INCLUDED",
  description: "Upcoming tour dates and live performances by Myself Included.",
};

async function getEvents() {
  try {
    // Use absolute URL for server-side fetch
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const url = process.env.NODE_ENV === "production" 
      ? `${baseUrl}/api/events`
      : "http://localhost:3000/api/events";
    
    const response = await fetch(url, {
      cache: "no-store",
    });
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.error("Failed to fetch events:", error);
  }
  // Return empty array if fetch fails
  return [];
}

export default async function TourPage() {
  const tourDates = await getEvents();

  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="py-20 md:py-28 border-b border-border/50 min-h-[40vh] md:min-h-[45vh] flex items-center">
        <div className="container px-5 md:px-4 max-w-5xl mx-auto w-full">
          <div className="text-center">
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-foreground mb-6">
              Tour Dates
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Catch Myself Included live at these upcoming events.
            </p>
          </div>
        </div>
      </section>

      {/* Tour List */}
      <section className="py-14 md:py-20">
        <div className="container px-5 md:px-4">
          <div className="max-w-4xl mx-auto">
            <TourList dates={tourDates} />
          </div>
        </div>
      </section>
    </div>
  );
}

