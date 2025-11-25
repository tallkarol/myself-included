import Link from "next/link";
import Image from "next/image";
import { FaInstagram, FaSoundcloud, FaSpotify } from "react-icons/fa";

const socialLinks = [
  { 
    name: "Instagram", 
    href: "https://www.instagram.com/myselfincludedmusic", 
    icon: FaInstagram,
    color: "#E4405F"
  },
  { 
    name: "SoundCloud", 
    href: "https://soundcloud.com/myself-included", 
    icon: FaSoundcloud,
    color: "#FF5500"
  },
  { 
    name: "Spotify", 
    href: "https://open.spotify.com/artist/09K1NtNYl5AQDMNA5pTgJ5", 
    icon: FaSpotify,
    color: "#1DB954"
  },
];

const FOOTER_TRACK_URL = "https://soundcloud.com/myself-included/the-dunk";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-dark-charcoal">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-4 mb-4">
              <Image
                src="/photo-soundcloud-profile.jpg"
                alt="Myself Included"
                width={60}
                height={60}
                className="rounded-full object-cover"
              />
              <Link href="/" className="group">
                <span className="font-display text-xl font-light text-white transition-all duration-300 group-hover:text-purple-600 group-hover:drop-shadow-[0_0_8px_rgba(147,51,234,0.6)]">
                  ᗰYᔕEᒪᖴ IᑎᑕᒪᑌᗪEᗪ
                </span>
              </Link>
            </div>
            <p className="text-sm text-muted-foreground">
              Electro/Hip Hop/Bass project from Columbus, Ohio. Created by Alex Cope.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-ui font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/music"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Music
                </Link>
              </li>
              <li>
                <Link
                  href="/tour"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Tour
                </Link>
              </li>
              <li>
                <Link
                  href="/store"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Store
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            {/* SoundCloud Widget */}
            <div className="mb-6">
              <div className="w-full max-w-[280px]">
                <iframe
                  width="100%"
                  height="75"
                  scrolling="no"
                  frameBorder="no"
                  allow="autoplay"
                  src={`https://w.soundcloud.com/player/?url=${encodeURIComponent(FOOTER_TRACK_URL)}&color=%23ff5500&auto_play=true&hide_related=true&show_comments=false&show_user=false&show_reposts=false&show_teaser=false&show_artwork=false&visual=false`}
                  style={{ borderRadius: "8px" }}
                  title="SoundCloud Player"
                />
              </div>
            </div>
            
            <h4 className="font-ui font-semibold mb-4">Follow</h4>
            <div className="flex gap-4">
              {socialLinks.map((link) => {
                const IconComponent = link.icon;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:scale-110 transition-transform"
                    aria-label={link.name}
                  >
                    <IconComponent size={24} style={{ color: link.color }} />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer Section - Full Width */}
      <div className="w-full bg-black pt-8 pb-8 border-t border-border">
        <div className="container">
          <div className="text-center">
            <p className="text-xs font-ui font-light uppercase tracking-[0.5px] text-foreground/80">
              &copy; {new Date().getFullYear()} MYSELF INCLUDED. ALL RIGHTS RESERVED. DESIGN BY{" "}
              <a
                href="https://www.tallkarol.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
              >
                TALLKAROL
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

