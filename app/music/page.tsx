import { Metadata } from "next";
import { readFile } from "fs/promises";
import { join } from "path";
import { existsSync } from "fs";

export const metadata: Metadata = {
  title: "Music | MYSELF INCLUDED",
  description: "Listen to the latest tracks and releases from Myself Included.",
};

const SPOTIFY_ARTIST_ID = "09K1NtNYl5AQDMNA5pTgJ5";
const SOUNDCLOUD_URL = "https://soundcloud.com/myself-included";

interface Release {
  id: string;
  title: string;
  url: string;
  order?: number;
}

async function getMusic() {
  try {
    const MUSIC_FILE = join(process.cwd(), "data", "music.json");
    if (!existsSync(MUSIC_FILE)) {
      return { fullSets: [], otherReleases: [] };
    }
    const data = await readFile(MUSIC_FILE, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading music:", error);
    return { fullSets: [], otherReleases: [] };
  }
}

export default async function MusicPage() {
  const music = await getMusic();
  const fullSets: Release[] = (music.fullSets || [])
    .sort((a: Release, b: Release) => (a.order ?? 0) - (b.order ?? 0));
  const otherReleases: Release[] = (music.otherReleases || [])
    .sort((a: Release, b: Release) => (a.order ?? 0) - (b.order ?? 0));
  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="py-20 md:py-28 border-b border-border/50 min-h-[40vh] md:min-h-[45vh] flex items-center">
        <div className="container px-5 md:px-4 max-w-5xl mx-auto w-full">
          <div className="text-center">
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-foreground mb-6">
              Music
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Stream my latest releases and discover new sounds. Available on all major platforms.
            </p>
          </div>
        </div>
      </section>

      {/* Highlighted Releases Section */}
      <section className="py-12 md:py-20 border-b border-border/50 bg-dark-slate/30">
        <div className="container px-5 md:px-4 max-w-6xl mx-auto">
          {/* Full Sets */}
          <div className="mb-16">
            <div className="mb-8">
              <h2 className="font-display text-2xl md:text-3xl font-light tracking-tight text-foreground mb-2">
                Full Sets
              </h2>
              <p className="text-muted-foreground">Complete live sets and performances</p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {fullSets.length === 0 ? (
                <p className="text-muted-foreground col-span-2">No full sets available.</p>
              ) : (
                fullSets.map((track) => (
                  <div
                    key={track.id}
                    className="border border-border/50 bg-dark-charcoal/40 p-6 hover:border-purple-500/30 hover:bg-dark-charcoal/60 transition-all"
                  >
                    <h3 className="font-ui text-lg font-medium text-foreground mb-4">
                      {track.title}
                    </h3>
                    <div className="w-full">
                      <iframe
                        width="100%"
                        height="300"
                        scrolling="no"
                        frameBorder="no"
                        allow="autoplay"
                        src={`https://w.soundcloud.com/player/?url=${encodeURIComponent(track.url)}&color=%23ff5500&auto_play=false&hide_related=true&show_comments=false&show_user=false&show_reposts=false&show_teaser=true&visual=true`}
                        className="bg-dark-slate rounded-lg"
                      />
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Other Releases */}
          <div>
            <div className="mb-8">
              <h2 className="font-display text-2xl md:text-3xl font-light tracking-tight text-foreground mb-2">
                Other Releases
              </h2>
              <p className="text-muted-foreground">Latest singles and tracks</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherReleases.length === 0 ? (
                <p className="text-muted-foreground col-span-3">No releases available.</p>
              ) : (
                otherReleases.map((track) => (
                  <div
                    key={track.id}
                    className="border border-border/50 bg-dark-charcoal/40 p-6 hover:border-purple-500/30 hover:bg-dark-charcoal/60 transition-all"
                  >
                    <h3 className="font-ui text-base font-medium text-foreground mb-4">
                      {track.title}
                    </h3>
                    <div className="w-full">
                      <iframe
                        width="100%"
                        height="300"
                        scrolling="no"
                        frameBorder="no"
                        allow="autoplay"
                        src={`https://w.soundcloud.com/player/?url=${encodeURIComponent(track.url)}&color=%23ff5500&auto_play=false&hide_related=true&show_comments=false&show_user=false&show_reposts=false&show_teaser=true&visual=true`}
                        className="bg-dark-slate rounded-lg"
                      />
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Music Players Section */}
      <section className="py-20 md:py-28 border-b border-border/50">
        <div className="container px-5 md:px-4 max-w-5xl mx-auto">
          {/* Music Players Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Spotify */}
            <div className="border border-border/50 bg-dark-slate/50 p-6 hover:border-purple-500/30 hover:glow-purple transition-all">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-[#1DB954] flex items-center justify-center">
                  <span className="text-white font-bold text-sm">S</span>
                </div>
                <div>
                  <h3 className="font-ui text-lg font-medium text-foreground">Spotify</h3>
                  <p className="text-sm text-muted-foreground">Full artist profile</p>
                </div>
              </div>
              <div className="w-full">
                <iframe
                  style={{ borderRadius: "8px" }}
                  src={`https://open.spotify.com/embed/artist/${SPOTIFY_ARTIST_ID}?utm_source=generator&theme=0`}
                  width="100%"
                  height="352"
                  frameBorder="0"
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                  className="bg-dark-slate"
                />
              </div>
            </div>

            {/* SoundCloud */}
            <div className="border border-border/50 bg-dark-slate/50 p-6 hover:border-purple-500/30 hover:glow-purple transition-all">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-[#FF5500] flex items-center justify-center">
                  <span className="text-white font-bold text-sm">SC</span>
                </div>
                <div>
                  <h3 className="font-ui text-lg font-medium text-foreground">SoundCloud</h3>
                  <p className="text-sm text-muted-foreground">Latest tracks & mixes</p>
                </div>
              </div>
              <div className="w-full">
                <iframe
                  width="100%"
                  height="300"
                  scrolling="no"
                  frameBorder="no"
                  allow="autoplay"
                  src={`https://w.soundcloud.com/player/?url=${encodeURIComponent(SOUNDCLOUD_URL)}&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true`}
                  className="bg-dark-slate rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Other Platforms Section */}
      <section className="py-20 md:py-28 border-b border-border/50 bg-dark-charcoal/40">
        <div className="container px-5 md:px-4 max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-display text-2xl md:text-3xl font-light tracking-tight text-foreground mb-4">
              Also Available On
            </h2>
            <p className="text-muted-foreground">
              Find my music on Apple Music
            </p>
          </div>
          
          <div className="flex justify-center">
            <a
              href="https://music.apple.com/us/artist/myself-included/1735136597"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-border/50 bg-dark-charcoal/40 p-6 text-center hover:border-purple-500/30 hover:bg-dark-charcoal/60 transition-all cursor-pointer group"
            >
              <div
                className="w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center text-white font-bold text-sm group-hover:scale-110 transition-transform"
                style={{ backgroundColor: "#FA243C" }}
              >
                A
              </div>
              <p className="text-sm font-medium text-foreground/90">Apple Music</p>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

