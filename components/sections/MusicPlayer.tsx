"use client";

import { Typography } from "@/components/typography";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface MusicPlayerProps {
  spotifyArtistId?: string;
  soundcloudUrl?: string;
}

export default function MusicPlayer({ spotifyArtistId, soundcloudUrl }: MusicPlayerProps) {
  return (
    <div className="space-y-8">
      {/* Spotify Section */}
      {spotifyArtistId && (
        <Card className="border-border bg-dark-slate/50 hover:border-purple-500/30 hover:glow-purple transition-all">
          <CardHeader>
            <CardTitle className="text-primary">Spotify</CardTitle>
            <CardDescription>Listen on Spotify</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="w-full">
              <iframe
                style={{ borderRadius: "12px" }}
                src={`https://open.spotify.com/embed/artist/${spotifyArtistId}?utm_source=generator&theme=0`}
                width="100%"
                height="352"
                frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                className="bg-dark-slate"
              />
            </div>
          </CardContent>
        </Card>
      )}

      {/* SoundCloud Section */}
      {soundcloudUrl && (
        <Card className="border-border bg-dark-slate/50 hover:border-purple-500/30 hover:glow-purple transition-all">
          <CardHeader>
            <CardTitle className="text-primary">SoundCloud</CardTitle>
            <CardDescription>Latest tracks on SoundCloud</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="w-full">
              <iframe
                width="100%"
                height="300"
                scrolling="no"
                frameBorder="no"
                allow="autoplay"
                src={`https://w.soundcloud.com/player/?url=${encodeURIComponent(soundcloudUrl)}&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true`}
                className="bg-dark-slate rounded-lg"
              />
            </div>
          </CardContent>
        </Card>
      )}

      {!spotifyArtistId && !soundcloudUrl && (
        <div className="text-center py-12">
          <Typography variant="body" className="text-muted-foreground">
            Music players will appear here once configured.
          </Typography>
        </div>
      )}
    </div>
  );
}

