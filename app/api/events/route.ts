import { NextResponse } from "next/server";
import { readFile, writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { existsSync } from "fs";

const EVENTS_FILE = join(process.cwd(), "data", "events.json");

// Initialize events file if it doesn't exist
// Helper function to parse date string and return Date object for sorting
function parseEventDate(dateString: string): Date {
  // Try parsing the formatted date string (e.g., "December 21, 2024")
  const parsed = new Date(dateString);
  // If parsing fails, return a far future date to push invalid dates to the end
  return isNaN(parsed.getTime()) ? new Date("9999-12-31") : parsed;
}

async function getEvents() {
  try {
    if (!existsSync(EVENTS_FILE)) {
      // Create data directory if it doesn't exist
      const dataDir = join(process.cwd(), "data");
      if (!existsSync(dataDir)) {
        await mkdir(dataDir, { recursive: true });
      }
      // Initialize with default event
      const defaultEvents = [
        {
          id: "1",
          date: "December 21, 2024",
          venue: "Festivus Music Festival",
          location: "Ohio",
          city: "Ohio",
          ticketLink: "#",
        },
      ];
      await writeFile(EVENTS_FILE, JSON.stringify(defaultEvents, null, 2), "utf-8");
      return defaultEvents;
    }
    const data = await readFile(EVENTS_FILE, "utf-8");
    const events = JSON.parse(data);
    // Sort events by date (earliest first)
    return events.sort((a: any, b: any) => {
      const dateA = parseEventDate(a.date);
      const dateB = parseEventDate(b.date);
      return dateA.getTime() - dateB.getTime();
    });
  } catch (error) {
    console.error("Error reading events:", error);
    return [];
  }
}

async function saveEvents(events: any[]) {
  try {
    const dataDir = join(process.cwd(), "data");
    if (!existsSync(dataDir)) {
      await mkdir(dataDir, { recursive: true });
    }
    // Sort events by date before saving
    const sortedEvents = [...events].sort((a: any, b: any) => {
      const dateA = parseEventDate(a.date);
      const dateB = parseEventDate(b.date);
      return dateA.getTime() - dateB.getTime();
    });
    await writeFile(EVENTS_FILE, JSON.stringify(sortedEvents, null, 2), "utf-8");
  } catch (error) {
    console.error("Error saving events:", error);
    throw error;
  }
}

export async function GET() {
  try {
    const events = await getEvents();
    return NextResponse.json(events);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch events" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { password, action, event } = body;

    // Simple password check
    if (password !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const events = await getEvents();

    if (action === "check") {
      // Just verify password
      return NextResponse.json({ success: true });
    }

    if (action === "add") {
      const newEvent = {
        id: Date.now().toString(),
        ...event,
      };
      events.push(newEvent);
      await saveEvents(events);
      return NextResponse.json({ success: true, event: newEvent });
    }

    if (action === "update") {
      const index = events.findIndex((e: any) => e.id === event.id);
      if (index === -1) {
        return NextResponse.json({ error: "Event not found" }, { status: 404 });
      }
      events[index] = event;
      await saveEvents(events);
      return NextResponse.json({ success: true, event });
    }

    if (action === "delete") {
      const filtered = events.filter((e: any) => e.id !== event.id);
      await saveEvents(filtered);
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to process request" }, { status: 500 });
  }
}

