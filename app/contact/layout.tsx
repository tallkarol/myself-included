import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact & Booking | MYSELF INCLUDED",
  description: "Get in touch for bookings, collaborations, or inquiries. Email Alexcope144@gmail.com for booking.",
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

