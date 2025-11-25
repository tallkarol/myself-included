import Hero from "@/components/sections/Hero";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const SPOTIFY_ARTIST_ID = "09K1NtNYl5AQDMNA5pTgJ5";
const SOUNDCLOUD_URL = "https://soundcloud.com/myself-included";

async function getUpcomingEvents() {
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
      const events = await response.json();
      return events.slice(0, 1); // Get first event for preview
    }
  } catch (error) {
    console.error("Failed to fetch events:", error);
  }
  // Return empty array if fetch fails
  return [];
}

export default async function Home() {
  const upcomingEvents = await getUpcomingEvents();

  return (
    <div className="bg-background">
      <Hero />

      {/* About Section */}
      <section className="py-20 md:py-28 border-t border-border/50 bg-dark-slate/30">
        <div className="container px-5 md:px-4 max-w-5xl mx-auto">
          <div className="grid md:grid-cols-[200px_1fr] gap-8 md:gap-12 items-start">
            <div className="flex justify-center md:justify-start">
              <Image
                src="/photo-soundcloud-profile.jpg"
                alt="Alex Cope - Myself Included"
                width={200}
                height={200}
                className="rounded-full object-cover aspect-square"
              />
            </div>
            <div className="space-y-6 text-center md:text-left">
              <h2 className="font-display text-3xl md:text-4xl font-light tracking-tight text-foreground mb-6">
                About
              </h2>
              <p className="text-base md:text-lg text-foreground/90 leading-relaxed">
                Alex Cope is a producer, multi instrumentalist, and the creator of the electro/Hip Hop/Bass project out of Columbus, Ohio called &quot;Myself Included&quot;.
              </p>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                &quot;Myself Included&quot; was created in March of 2024.
              </p>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                Alex will be performing a headlining set at the &quot;Festivus&quot; music festival on Dec 21 in Ohio.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Music Section */}
      <section className="py-20 md:py-28 border-t border-border/50 bg-dark-charcoal/40">
        <div className="container px-5 md:px-4 max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-light tracking-tight text-foreground mb-4">
              Music
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Stream the latest releases and discover new sounds.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Spotify Widget */}
            <div className="border border-border/50 bg-dark-slate/50 p-4 hover:border-purple-500/30 hover:glow-purple transition-all">
              <h3 className="font-ui text-sm font-medium text-foreground/80 mb-3 uppercase tracking-wider">
                Spotify
              </h3>
              <div className="w-full">
                <iframe
                  style={{ borderRadius: "8px" }}
                  src={`https://open.spotify.com/embed/artist/${SPOTIFY_ARTIST_ID}?utm_source=generator&theme=0`}
                  width="100%"
                  height="352"
                  frameBorder="0"
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                  className="bg-dark-gray"
                />
              </div>
            </div>
            
            {/* SoundCloud Widget */}
            <div className="border border-border/50 bg-dark-slate/50 p-4 hover:border-purple-500/30 hover:glow-purple transition-all">
              <h3 className="font-ui text-sm font-medium text-foreground/80 mb-3 uppercase tracking-wider">
                SoundCloud
              </h3>
              <div className="w-full">
                <iframe
                  width="100%"
                  height="300"
                  scrolling="no"
                  frameBorder="no"
                  allow="autoplay"
                  src={`https://w.soundcloud.com/player/?url=${encodeURIComponent(SOUNDCLOUD_URL)}&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true`}
                  className="bg-dark-gray rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Shows Preview */}
      <section className="py-20 md:py-28 border-t border-border/50 bg-dark-slate/30">
        <div className="container px-5 md:px-4 max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-light tracking-tight text-foreground mb-4">
              Upcoming Shows
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Catch Myself Included live at these upcoming events.
            </p>
          </div>
          
          <div className="space-y-6 mb-12">
            {upcomingEvents.map((event: any) => {
              const formatTime = (timeString?: string) => {
                if (!timeString) return "";
                const [hours, minutes] = timeString.split(":");
                const hour = parseInt(hours);
                const ampm = hour >= 12 ? "PM" : "AM";
                const displayHour = hour % 12 || 12;
                return `${displayHour}:${minutes} ${ampm}`;
              };

              return (
                <div key={event.id} className="border border-border/50 bg-dark-slate/50 p-6 md:p-8 hover:border-purple-500/30 hover:glow-purple transition-all">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <h3 className="font-ui text-xl md:text-2xl font-medium text-foreground mb-2">
                        {event.venue}
                      </h3>
                      <p className="text-sm md:text-base text-muted-foreground">
                        {event.date} • {event.city}
                      </p>
                      {event.location && (
                        <p className="text-xs md:text-sm text-muted-foreground/70 mt-2">
                          {event.location}
                        </p>
                      )}
                      {(event.eventStartTime || event.mySetTime) && (
                        <div className="flex gap-4 mt-2 text-xs md:text-sm text-muted-foreground/70">
                          {event.eventStartTime && (
                            <span>Event starts: {formatTime(event.eventStartTime)}</span>
                          )}
                          {event.mySetTime && (
                            <span>My set: {formatTime(event.mySetTime)}</span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
            {upcomingEvents.length === 0 && (
              <p className="text-muted-foreground text-center">No upcoming shows scheduled.</p>
            )}
          </div>
          
          <div className="text-center">
            <Button 
              asChild 
              variant="outline" 
              className="border-border/50 text-foreground hover:bg-foreground/5 rounded-none px-8 py-6 transition-all"
            >
              <Link href="/tour">View All Dates</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

