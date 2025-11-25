"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="relative h-[70vh] flex items-center justify-center overflow-hidden bg-dark">
      {/* Background banner image */}
      <div className="absolute inset-0">
        <Image
          src="/soundcloud-banner.jpg"
          alt="Myself Included"
          fill
          className="object-cover opacity-15"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-dark/80 via-dark/60 to-dark-slate/80" />
      </div>

      {/* Content */}
      <div className="container relative z-10 px-5 md:px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center max-w-4xl mx-auto"
        >
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="font-display text-5xl md:text-7xl lg:text-8xl font-light tracking-tight mb-6 relative inline-block"
          >
            <span className="bg-gradient-to-r from-white via-purple-400 to-white bg-clip-text text-transparent bg-[length:200%_auto] animate-shimmer">
              ᗰYᔕEᒪᖴ IᑎᑕᒪᑌᗪEᗪ
            </span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            Electro/Hip Hop/Bass project from Columbus, Ohio. 
            Created by producer and multi-instrumentalist Alex Cope.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button 
              asChild 
              size="lg" 
              className="bg-primary hover:bg-primary/80 text-dark font-medium px-8 py-6 text-base rounded-none transition-all hover:scale-105"
            >
              <Link href="/music">Listen Now</Link>
            </Button>
            <Button 
              asChild 
              variant="outline" 
              size="lg"
              className="border-foreground/20 text-foreground hover:bg-foreground/5 px-8 py-6 text-base rounded-none transition-all hover:scale-105"
            >
              <Link href="/tour">Upcoming Shows</Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

