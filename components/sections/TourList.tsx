import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Typography } from "@/components/typography";
import { Button } from "@/components/ui/button";

function formatTime(timeString: string) {
  if (!timeString) return "";
  // Convert 24-hour format to 12-hour format
  const [hours, minutes] = timeString.split(":");
  const hour = parseInt(hours);
  const ampm = hour >= 12 ? "PM" : "AM";
  const displayHour = hour % 12 || 12;
  return `${displayHour}:${minutes} ${ampm}`;
}

interface TourDate {
  id: string;
  date: string;
  eventStartTime?: string;
  mySetTime?: string;
  venue: string;
  location: string;
  city: string;
  ticketLink?: string;
}

interface TourListProps {
  dates: TourDate[];
}

export default function TourList({ dates }: TourListProps) {
  if (dates.length === 0) {
    return (
      <div className="text-center py-12">
        <Typography variant="body" className="text-muted-foreground">
          No upcoming shows scheduled. Check back soon!
        </Typography>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {dates.map((date) => (
        <Card key={date.id} className="border-border bg-dark-slate/50 hover:border-purple-500/30 hover:glow-purple transition-all">
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <CardTitle className="text-primary mb-2">{date.venue}</CardTitle>
                <CardDescription className="text-foreground/80">
                  {date.date} • {date.city}
                </CardDescription>
                {date.location && (
                  <CardDescription className="text-foreground/70 text-sm mt-1">
                    {date.location}
                  </CardDescription>
                )}
                <div className="flex gap-4 mt-2 text-sm text-foreground/70">
                  {date.eventStartTime && (
                    <span>Event starts: {formatTime(date.eventStartTime)}</span>
                  )}
                  {date.mySetTime && (
                    <span>My set: {formatTime(date.mySetTime)}</span>
                  )}
                </div>
              </div>
              {date.ticketLink && (
                <Button asChild variant="outline" className="border-neon-purple text-neon-purple hover:bg-neon-purple/10">
                  <a href={date.ticketLink} target="_blank" rel="noopener noreferrer">
                    Get Tickets
                  </a>
                </Button>
              )}
            </div>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
}

