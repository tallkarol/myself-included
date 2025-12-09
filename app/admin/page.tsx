"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Event {
  id: string;
  date: string;
  eventStartTime?: string;
  mySetTime?: string;
  venue: string;
  location: string;
  city: string;
  ticketLink?: string;
}

interface Release {
  id: string;
  title: string;
  url: string;
  order?: number;
}

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [events, setEvents] = useState<Event[]>([]);
  const [music, setMusic] = useState<{ fullSets: Release[]; otherReleases: Release[] }>({
    fullSets: [],
    otherReleases: [],
  });
  const [loading, setLoading] = useState(false);
  const [newEvent, setNewEvent] = useState<Partial<Event>>({
    date: "",
    eventStartTime: "",
    mySetTime: "",
    venue: "",
    location: "",
    city: "",
    ticketLink: "",
  });
  const [newRelease, setNewRelease] = useState<Partial<Release>>({
    title: "",
    url: "",
  });
  const [releaseCategory, setReleaseCategory] = useState<"fullSets" | "otherReleases">("fullSets");

  useEffect(() => {
    if (isAuthenticated) {
      fetchEvents();
      fetchMusic();
    }
  }, [isAuthenticated]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password, action: "check" }),
      });
      if (response.ok) {
        setIsAuthenticated(true);
      } else {
        alert("Incorrect password");
      }
    } catch (error) {
      alert("Error authenticating");
    } finally {
      setLoading(false);
    }
  };

  const fetchEvents = async () => {
    try {
      const response = await fetch("/api/events");
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      console.error("Failed to fetch events:", error);
    }
  };

  const fetchMusic = async () => {
    try {
      const response = await fetch("/api/music");
      const data = await response.json();
      setMusic(data);
    } catch (error) {
      console.error("Failed to fetch music:", error);
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { 
      year: "numeric", 
      month: "long", 
      day: "numeric" 
    });
  };

  const handleAddEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Format the date for display
      const formattedDate = formatDate(newEvent.date || "");
      
      const eventToAdd = {
        ...newEvent,
        date: formattedDate || newEvent.date,
      };

      const response = await fetch("/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          password,
          action: "add",
          event: eventToAdd,
        }),
      });
      if (response.ok) {
        await fetchEvents();
        setNewEvent({ date: "", eventStartTime: "", mySetTime: "", venue: "", location: "", city: "", ticketLink: "" });
      } else {
        alert("Failed to add event");
      }
    } catch (error) {
      alert("Error adding event");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteEvent = async (id: string) => {
    if (!confirm("Are you sure you want to delete this event?")) return;
    setLoading(true);
    try {
      const response = await fetch("/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          password,
          action: "delete",
          event: { id },
        }),
      });
      if (response.ok) {
        await fetchEvents();
      } else {
        alert("Failed to delete event");
      }
    } catch (error) {
      alert("Error deleting event");
    } finally {
      setLoading(false);
    }
  };

  const handleAddRelease = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("/api/music", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          password,
          action: "add",
          category: releaseCategory,
          release: newRelease,
        }),
      });
      if (response.ok) {
        await fetchMusic();
        setNewRelease({ title: "", url: "" });
      } else {
        const errorData = await response.json().catch(() => ({ error: "Failed to add release" }));
        alert(`Failed to add release: ${errorData.error || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error adding release:", error);
      alert(`Error adding release: ${error instanceof Error ? error.message : "Unknown error"}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteRelease = async (id: string, category: "fullSets" | "otherReleases") => {
    if (!confirm("Are you sure you want to delete this release?")) return;
    setLoading(true);
    try {
      const response = await fetch("/api/music", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          password,
          action: "delete",
          category,
          release: { id },
        }),
      });
      if (response.ok) {
        await fetchMusic();
      } else {
        alert("Failed to delete release");
      }
    } catch (error) {
      alert("Error deleting release");
    } finally {
      setLoading(false);
    }
  };

  const handleReorderRelease = async (id: string, category: "fullSets" | "otherReleases", direction: "up" | "down") => {
    setLoading(true);
    try {
      const response = await fetch("/api/music", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          password,
          action: "reorder",
          category,
          direction,
          release: { id },
        }),
      });
      if (response.ok) {
        await fetchMusic();
      } else {
        alert("Failed to reorder release");
      }
    } catch (error) {
      alert("Error reordering release");
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <div className="max-w-md w-full border border-border/50 bg-dark-slate/50 p-8">
          <h1 className="font-display text-2xl font-light text-white mb-6">Admin Login</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Label htmlFor="password" className="text-foreground/80">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-2 bg-dark-slate/50 border-border/50"
                required
              />
            </div>
            <Button type="submit" disabled={loading} className="w-full bg-primary hover:bg-primary/80 text-dark">
              {loading ? "Logging in..." : "Login"}
            </Button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="font-display text-3xl font-light text-white">Admin Dashboard</h1>
          <Button
            onClick={() => setIsAuthenticated(false)}
            variant="outline"
            className="border-border/50 text-foreground"
          >
            Logout
          </Button>
        </div>

        {/* Add Event Form */}
        <div className="border border-border/50 bg-dark-slate/50 p-6 mb-8 hover:border-purple-500/30 transition-all">
          <h2 className="font-ui text-xl font-medium text-white mb-4">Add New Event</h2>
          <form onSubmit={handleAddEvent} className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="date" className="text-foreground/80">
                Date
              </Label>
              <Input
                id="date"
                type="date"
                value={newEvent.date}
                onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                className="mt-2 bg-dark-slate/50 border-border/50"
                required
              />
            </div>
            <div>
              <Label htmlFor="eventStartTime" className="text-foreground/80">
                Event Start Time
              </Label>
              <Input
                id="eventStartTime"
                type="time"
                value={newEvent.eventStartTime || ""}
                onChange={(e) => setNewEvent({ ...newEvent, eventStartTime: e.target.value })}
                className="mt-2 bg-dark-slate/50 border-border/50"
                required
              />
            </div>
            <div>
              <Label htmlFor="mySetTime" className="text-foreground/80">
                My Set Time (optional)
              </Label>
              <Input
                id="mySetTime"
                type="time"
                value={newEvent.mySetTime || ""}
                onChange={(e) => setNewEvent({ ...newEvent, mySetTime: e.target.value })}
                className="mt-2 bg-dark-slate/50 border-border/50"
              />
            </div>
            <div>
              <Label htmlFor="venue" className="text-foreground/80">
                Venue
              </Label>
              <Input
                id="venue"
                type="text"
                value={newEvent.venue}
                onChange={(e) => setNewEvent({ ...newEvent, venue: e.target.value })}
                placeholder="Enter venue name"
                className="mt-2 bg-dark-slate/50 border-border/50"
                required
              />
            </div>
            <div>
              <Label htmlFor="location" className="text-foreground/80">
                Location
              </Label>
              <Input
                id="location"
                type="text"
                value={newEvent.location}
                onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                placeholder="Enter venue address"
                className="mt-2 bg-dark-slate/50 border-border/50"
                required
              />
            </div>
            <div>
              <Label htmlFor="city" className="text-foreground/80">
                City
              </Label>
              <Input
                id="city"
                type="text"
                value={newEvent.city}
                onChange={(e) => setNewEvent({ ...newEvent, city: e.target.value })}
                placeholder="Enter city"
                className="mt-2 bg-dark-slate/50 border-border/50"
                required
              />
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="ticketLink" className="text-foreground/80">
                Ticket Link (optional)
              </Label>
              <Input
                id="ticketLink"
                type="url"
                value={newEvent.ticketLink || ""}
                onChange={(e) => setNewEvent({ ...newEvent, ticketLink: e.target.value })}
                placeholder="https://..."
                className="mt-2 bg-dark-slate/50 border-border/50"
              />
            </div>
            <div className="md:col-span-2">
              <Button type="submit" disabled={loading} className="bg-primary hover:bg-primary/80 text-dark">
                {loading ? "Adding..." : "Add Event"}
              </Button>
            </div>
          </form>
        </div>

        {/* Events Table */}
        <div className="border border-border/50 bg-dark-slate/50 p-6 hover:border-purple-500/30 transition-all">
          <h2 className="font-ui text-xl font-medium text-white mb-4">Events</h2>
          {events.length === 0 ? (
            <p className="text-muted-foreground">No events yet. Add one above.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border/50">
                    <th className="text-left py-3 px-4 text-sm font-medium text-foreground/80 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-foreground/80 uppercase tracking-wider">
                      Event Start
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-foreground/80 uppercase tracking-wider">
                      My Set Time
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-foreground/80 uppercase tracking-wider">
                      Venue
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-foreground/80 uppercase tracking-wider">
                      City
                    </th>
                    <th className="text-right py-3 px-4 text-sm font-medium text-foreground/80 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {events.map((event) => (
                    <tr key={event.id} className="border-b border-border/30 hover:bg-dark-slate/30">
                      <td className="py-3 px-4 text-sm text-foreground/90">{event.date}</td>
                      <td className="py-3 px-4 text-sm text-foreground/90">{event.eventStartTime || "-"}</td>
                      <td className="py-3 px-4 text-sm text-foreground/90">{event.mySetTime || "-"}</td>
                      <td className="py-3 px-4 text-sm text-foreground/90">{event.venue}</td>
                      <td className="py-3 px-4 text-sm text-foreground/90">{event.city}</td>
                      <td className="py-3 px-4 text-right">
                        <Button
                          onClick={() => handleDeleteEvent(event.id)}
                          variant="outline"
                          size="sm"
                          className="border-red-500/50 text-red-400 hover:bg-red-500/10"
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Music Management Section */}
        <div className="mt-12 pt-12 border-t border-border/50">
          <h2 className="font-display text-2xl font-light text-white mb-8">Music Management</h2>

          {/* Add Release Form */}
          <div className="border border-border/50 bg-dark-slate/50 p-6 mb-8 hover:border-purple-500/30 transition-all">
            <h3 className="font-ui text-xl font-medium text-white mb-4">Add New Release</h3>
            <form onSubmit={handleAddRelease} className="space-y-4">
              <div>
                <Label htmlFor="category" className="text-foreground/80">
                  Category
                </Label>
                <select
                  id="category"
                  value={releaseCategory}
                  onChange={(e) => setReleaseCategory(e.target.value as "fullSets" | "otherReleases")}
                  className="mt-2 w-full bg-dark-slate/50 border border-border/50 rounded-md px-3 py-2 text-foreground"
                >
                  <option value="fullSets">Full Sets</option>
                  <option value="otherReleases">Other Releases</option>
                </select>
              </div>
              <div>
                <Label htmlFor="title" className="text-foreground/80">
                  Title
                </Label>
                <Input
                  id="title"
                  type="text"
                  value={newRelease.title}
                  onChange={(e) => setNewRelease({ ...newRelease, title: e.target.value })}
                  placeholder="Enter track title"
                  className="mt-2 bg-dark-slate/50 border-border/50"
                  required
                />
              </div>
              <div>
                <Label htmlFor="url" className="text-foreground/80">
                  SoundCloud URL
                </Label>
                <Input
                  id="url"
                  type="url"
                  value={newRelease.url}
                  onChange={(e) => setNewRelease({ ...newRelease, url: e.target.value })}
                  placeholder="https://soundcloud.com/..."
                  className="mt-2 bg-dark-slate/50 border-border/50"
                  required
                />
              </div>
              <Button type="submit" disabled={loading} className="bg-primary hover:bg-primary/80 text-dark">
                {loading ? "Adding..." : "Add Release"}
              </Button>
            </form>
          </div>

          {/* Full Sets Table */}
          <div className="border border-border/50 bg-dark-slate/50 p-6 mb-8 hover:border-purple-500/30 transition-all">
            <h3 className="font-ui text-xl font-medium text-white mb-4">Full Sets</h3>
            {music.fullSets.length === 0 ? (
              <p className="text-muted-foreground">No full sets yet. Add one above.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border/50">
                      <th className="text-left py-3 px-4 text-sm font-medium text-foreground/80 uppercase tracking-wider">
                        Order
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-foreground/80 uppercase tracking-wider">
                        Title
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-foreground/80 uppercase tracking-wider">
                        URL
                      </th>
                      <th className="text-right py-3 px-4 text-sm font-medium text-foreground/80 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {[...music.fullSets]
                      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
                      .map((release, index) => (
                      <tr key={release.id} className="border-b border-border/30 hover:bg-dark-slate/30">
                        <td className="py-3 px-4 text-sm text-foreground/90">{index + 1}</td>
                        <td className="py-3 px-4 text-sm text-foreground/90">{release.title}</td>
                        <td className="py-3 px-4 text-sm text-foreground/90">
                          <a href={release.url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline truncate block max-w-md">
                            {release.url}
                          </a>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button
                              onClick={() => handleReorderRelease(release.id, "fullSets", "up")}
                              variant="outline"
                              size="sm"
                              disabled={index === 0 || loading}
                              className="border-border/50 text-foreground/80 hover:bg-dark-slate/50"
                              title="Move up"
                            >
                              ↑
                            </Button>
                            <Button
                              onClick={() => handleReorderRelease(release.id, "fullSets", "down")}
                              variant="outline"
                              size="sm"
                              disabled={index === music.fullSets.length - 1 || loading}
                              className="border-border/50 text-foreground/80 hover:bg-dark-slate/50"
                              title="Move down"
                            >
                              ↓
                            </Button>
                            <Button
                              onClick={() => handleDeleteRelease(release.id, "fullSets")}
                              variant="outline"
                              size="sm"
                              className="border-red-500/50 text-red-400 hover:bg-red-500/10"
                            >
                              Delete
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Other Releases Table */}
          <div className="border border-border/50 bg-dark-slate/50 p-6 hover:border-purple-500/30 transition-all">
            <h3 className="font-ui text-xl font-medium text-white mb-4">Other Releases</h3>
            {music.otherReleases.length === 0 ? (
              <p className="text-muted-foreground">No releases yet. Add one above.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border/50">
                      <th className="text-left py-3 px-4 text-sm font-medium text-foreground/80 uppercase tracking-wider">
                        Order
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-foreground/80 uppercase tracking-wider">
                        Title
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-foreground/80 uppercase tracking-wider">
                        URL
                      </th>
                      <th className="text-right py-3 px-4 text-sm font-medium text-foreground/80 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {[...music.otherReleases]
                      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
                      .map((release, index) => (
                      <tr key={release.id} className="border-b border-border/30 hover:bg-dark-slate/30">
                        <td className="py-3 px-4 text-sm text-foreground/90">{index + 1}</td>
                        <td className="py-3 px-4 text-sm text-foreground/90">{release.title}</td>
                        <td className="py-3 px-4 text-sm text-foreground/90">
                          <a href={release.url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline truncate block max-w-md">
                            {release.url}
                          </a>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button
                              onClick={() => handleReorderRelease(release.id, "otherReleases", "up")}
                              variant="outline"
                              size="sm"
                              disabled={index === 0 || loading}
                              className="border-border/50 text-foreground/80 hover:bg-dark-slate/50"
                              title="Move up"
                            >
                              ↑
                            </Button>
                            <Button
                              onClick={() => handleReorderRelease(release.id, "otherReleases", "down")}
                              variant="outline"
                              size="sm"
                              disabled={index === music.otherReleases.length - 1 || loading}
                              className="border-border/50 text-foreground/80 hover:bg-dark-slate/50"
                              title="Move down"
                            >
                              ↓
                            </Button>
                            <Button
                              onClick={() => handleDeleteRelease(release.id, "otherReleases")}
                              variant="outline"
                              size="sm"
                              className="border-red-500/50 text-red-400 hover:bg-red-500/10"
                            >
                              Delete
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

