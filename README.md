# Electronic Musician Portfolio

A modern, dark-themed portfolio website for an electronic musician built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

- **Homepage** - Hero section with latest releases and upcoming shows preview
- **Music Page** - Spotify and SoundCloud embed widgets
- **Tour Page** - List of upcoming events and tour dates
- **Store Page** - Merchandise and music products
- **Contact/Booking Page** - Contact form with Resend email integration

## Tech Stack

- **Next.js 14.2.0** (App Router)
- **React 18.3.0**
- **TypeScript 5.4.0**
- **Tailwind CSS 3.4.0**
- **shadcn/ui** components
- **Framer Motion 11.0.0** (animations)
- **Resend** (email service)

## Getting Started

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env.local` file in the root directory:

```env
RESEND_API_KEY=your_resend_api_key_here
NEXT_PUBLIC_BASE_URL=https://yourdomain.com
ADMIN_PASSWORD=your_secure_password_here
```

**Note:** Set `ADMIN_PASSWORD` to protect the admin panel at `/admin`. Use a strong password.

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm start
```

## Configuration

### Customizing Content

1. **Artist Name**: Replace "DJ Artist Name" throughout the codebase
2. **Spotify Playlist**: Update `SPOTIFY_PLAYLIST_ID` in `app/music/page.tsx`
3. **SoundCloud Track**: Update `SOUNDCLOUD_TRACK_URL` in `app/music/page.tsx`
4. **Tour Dates**: Edit the `tourDates` array in `app/tour/page.tsx`
5. **Store Items**: Edit the `storeItems` array in `app/store/page.tsx`
6. **Contact Email**: Update email addresses in `app/api/contact/route.ts` and `app/contact/page.tsx`

### Styling

The theme uses a dark electronic aesthetic with:
- Dark backgrounds (black, dark gray)
- Neon accents (cyan, purple, pink)
- Custom fonts (Inter Tight, Plus Jakarta Sans, Inter)

Colors can be customized in:
- `tailwind.config.ts` - Theme colors
- `app/globals.css` - CSS variables

## Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Homepage
│   ├── globals.css        # Global styles
│   ├── tour/              # Tour page
│   ├── store/             # Store page
│   ├── contact/           # Contact page
│   ├── music/             # Music page
│   ├── api/               # API routes
│   ├── sitemap.ts         # Dynamic sitemap
│   └── robots.ts          # Robots file
├── components/
│   ├── layout/            # Header, Footer
│   ├── sections/          # Page sections
│   ├── ui/                # shadcn/ui components
│   └── typography.tsx     # Typography system
└── lib/
    └── utils.ts           # Utility functions
```

## License

MIT

