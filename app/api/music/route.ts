import { NextResponse } from "next/server";
import { readFile, writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { existsSync } from "fs";

const MUSIC_FILE = join(process.cwd(), "data", "music.json");

// Initialize music file if it doesn't exist
async function getMusic() {
  try {
    if (!existsSync(MUSIC_FILE)) {
      // Create data directory if it doesn't exist
      const dataDir = join(process.cwd(), "data");
      if (!existsSync(dataDir)) {
        await mkdir(dataDir, { recursive: true });
      }
      // Initialize with default releases
      const defaultMusic = {
        fullSets: [
          {
            id: "1",
            title: "Dreams Official Post Party",
            url: "https://soundcloud.com/myself-included/dreams-official-post-party",
            order: 0,
          },
          {
            id: "2",
            title: "Glassmonkey Full Set 11-2-24",
            url: "https://soundcloud.com/myself-included/glassmonkey-full-set-11-2-24",
            order: 1,
          },
          {
            id: "3",
            title: "Debussy Set - Secret Dreams 7/18/24",
            url: "https://soundcloud.com/myself-included/debussy-set-secret-dreams-71824",
            order: 2,
          },
          {
            id: "4",
            title: "Secret Dreams Fest - Woods Set 7/20/24",
            url: "https://soundcloud.com/myself-included/secretdreams-fest-woods-set-72024",
            order: 3,
          },
        ],
        otherReleases: [
          {
            id: "1",
            title: "N.O.M.S",
            url: "https://soundcloud.com/myself-included/n-o-m-s",
            order: 0,
          },
          {
            id: "2",
            title: "Slowdown",
            url: "https://soundcloud.com/myself-included/slowdown",
            order: 1,
          },
          {
            id: "3",
            title: "Ride (3Flip Mafia Collection)",
            url: "https://soundcloud.com/myself-included/ride-3flip-mafia-collection",
            order: 2,
          },
          {
            id: "4",
            title: "It Keeps On Comin",
            url: "https://soundcloud.com/myself-included/it-keeps-on-comin",
            order: 3,
          },
          {
            id: "5",
            title: "The Want Master",
            url: "https://soundcloud.com/myself-included/the-want-master",
            order: 4,
          },
          {
            id: "6",
            title: "Swangin'",
            url: "https://soundcloud.com/myself-included/swangin1",
            order: 5,
          },
        ],
      };
      await writeFile(MUSIC_FILE, JSON.stringify(defaultMusic, null, 2), "utf-8");
      return defaultMusic;
    }
    const data = await readFile(MUSIC_FILE, "utf-8");
    const music = JSON.parse(data);
    
    // Ensure all releases have order fields (backward compatibility)
    if (music.fullSets) {
      music.fullSets.forEach((r: any, index: number) => {
        if (r.order === undefined) {
          r.order = index;
        }
      });
    }
    if (music.otherReleases) {
      music.otherReleases.forEach((r: any, index: number) => {
        if (r.order === undefined) {
          r.order = index;
        }
      });
    }
    
    return music;
  } catch (error) {
    console.error("Error reading music:", error);
    return { fullSets: [], otherReleases: [] };
  }
}

async function saveMusic(music: any) {
  try {
    const dataDir = join(process.cwd(), "data");
    if (!existsSync(dataDir)) {
      await mkdir(dataDir, { recursive: true });
    }
    await writeFile(MUSIC_FILE, JSON.stringify(music, null, 2), "utf-8");
  } catch (error) {
    console.error("Error saving music:", error);
    throw error;
  }
}

export async function GET() {
  try {
    const music = await getMusic();
    return NextResponse.json(music);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch music" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { password, action, category, release } = body;

    // Simple password check
    if (password !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const music = await getMusic();

    if (action === "check") {
      // Just verify password
      return NextResponse.json({ success: true });
    }

    if (action === "add") {
      const categoryArray = category === "fullSets" ? music.fullSets : music.otherReleases;
      const maxOrder = categoryArray.length > 0 
        ? Math.max(...categoryArray.map((r: any) => r.order ?? 0))
        : -1;
      
      const newRelease = {
        id: Date.now().toString(),
        order: maxOrder + 1,
        ...release,
      };
      
      if (category === "fullSets") {
        music.fullSets.push(newRelease);
      } else if (category === "otherReleases") {
        music.otherReleases.push(newRelease);
      } else {
        return NextResponse.json({ error: "Invalid category" }, { status: 400 });
      }
      
      await saveMusic(music);
      return NextResponse.json({ success: true, release: newRelease });
    }

    if (action === "delete") {
      if (category === "fullSets") {
        music.fullSets = music.fullSets.filter((r: any) => r.id !== release.id);
        // Reorder remaining items
        music.fullSets.forEach((r: any, index: number) => {
          r.order = index;
        });
      } else if (category === "otherReleases") {
        music.otherReleases = music.otherReleases.filter((r: any) => r.id !== release.id);
        // Reorder remaining items
        music.otherReleases.forEach((r: any, index: number) => {
          r.order = index;
        });
      } else {
        return NextResponse.json({ error: "Invalid category" }, { status: 400 });
      }
      
      await saveMusic(music);
      return NextResponse.json({ success: true });
    }

    if (action === "reorder") {
      const { direction } = body; // "up" or "down"
      const categoryArray = category === "fullSets" ? music.fullSets : music.otherReleases;
      
      // Ensure all items have order
      categoryArray.forEach((r: any, index: number) => {
        if (r.order === undefined) {
          r.order = index;
        }
      });
      
      // Sort by order
      categoryArray.sort((a: any, b: any) => a.order - b.order);
      
      const index = categoryArray.findIndex((r: any) => r.id === release.id);
      if (index === -1) {
        return NextResponse.json({ error: "Release not found" }, { status: 404 });
      }
      
      if (direction === "up" && index > 0) {
        // Swap with previous item
        const temp = categoryArray[index].order;
        categoryArray[index].order = categoryArray[index - 1].order;
        categoryArray[index - 1].order = temp;
      } else if (direction === "down" && index < categoryArray.length - 1) {
        // Swap with next item
        const temp = categoryArray[index].order;
        categoryArray[index].order = categoryArray[index + 1].order;
        categoryArray[index + 1].order = temp;
      }
      
      await saveMusic(music);
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to process request" }, { status: 500 });
  }
}

