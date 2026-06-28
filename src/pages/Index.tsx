import { useState } from "react";
import Petals from "@/components/wedding/Petals";
import Hero from "@/components/wedding/Hero";
import Countdown from "@/components/wedding/Countdown";
import Details from "@/components/wedding/Details";
import Gallery from "@/components/wedding/Gallery";
import RSVP from "@/components/wedding/RSVP";
import GuestBubble from "@/components/wedding/GuestBubble";
import GuestWishes from "@/components/wedding/GuestWishes";
import MusicToggle from "@/components/wedding/MusicToggle";
import FloatingRing from "@/components/wedding/FloatingRing";
import Footer from "@/components/wedding/Footer";
import FloralDivider from "@/components/wedding/FloralDivider";

const Index = () => {
  const [refresh, setRefresh] = useState(0);

  return (
    <main className="relative bg-background min-h-screen overflow-x-hidden">
      <Petals count={16} />
      <MusicToggle />
      <GuestBubble refreshSignal={refresh} />
      <GuestWishes />

      <div className="relative z-10">
        <Hero />
        <FloralDivider />
        <Countdown />
        <Details />
        <FloralDivider flip />
        <Gallery />
        <RSVP onSubmitted={() => setRefresh((r) => r + 1)} />
        <Footer />
      </div>
    </main>
  );
};

export default Index;
