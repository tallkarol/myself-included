"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="py-20 md:py-28 border-b border-border/50 min-h-[40vh] md:min-h-[45vh] flex items-center">
        <div className="container px-5 md:px-4 max-w-5xl mx-auto w-full">
          <div className="text-center">
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-foreground mb-6">
              Contact & Booking
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Get in touch for bookings, collaborations, or just to say hello.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-14 md:py-20">
        <div className="container px-5 md:px-4">
          <div className="max-w-2xl mx-auto">
            <Card className="border-border bg-dark-slate/50 hover:border-purple-500/30 transition-all">
              <CardHeader>
                <CardTitle className="text-primary">Send a Message</CardTitle>
                <CardDescription>
                  Fill out the form below and I&apos;ll get back to you as soon as possible.
                </CardDescription>
              </CardHeader>
              <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your name"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="your.email@example.com"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="Booking inquiry, collaboration, etc."
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell me about your event, project, or just say hello..."
                  />
                </div>

                {submitStatus === "success" && (
                  <div className="p-4 bg-green-500/10 border border-green-500/50 rounded-md text-green-400 text-sm">
                    Message sent successfully! I&apos;ll get back to you soon.
                  </div>
                )}

                {submitStatus === "error" && (
                  <div className="p-4 bg-red-500/10 border border-red-500/50 rounded-md text-red-400 text-sm">
                    Something went wrong. Please try again later.
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary hover:bg-primary/90 text-dark font-bold"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
              </CardContent>
            </Card>

            <div className="mt-12 text-center">
              <h3 className="font-display text-2xl font-light tracking-tight text-foreground mb-4">Other Ways to Connect</h3>
              <div className="space-y-2 text-muted-foreground">
                <p>Email: <a href="mailto:Alexcope144@gmail.com" className="text-primary hover:underline">Alexcope144@gmail.com</a></p>
                <p className="text-sm mt-4">For booking inquiries, please use the form above or email directly.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

