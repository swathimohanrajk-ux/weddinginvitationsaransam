import Petals from "@/components/wedding/Petals";
import Hero from "@/components/wedding/Hero";
import Countdown from "@/components/wedding/Countdown";
import Details from "@/components/wedding/Details";

import RSVP from "@/components/wedding/RSVP";
import GuestWishes from "@/components/wedding/GuestWishes";
import MusicToggle from "@/components/wedding/MusicToggle";
import Footer from "@/components/wedding/Footer";
import FloralDivider from "@/components/wedding/FloralDivider";

const Index = () => {
  return (
    <main className="relative bg-background min-h-screen overflow-x-hidden">
      <Petals count={16} />
      <MusicToggle />
      <GuestWishes />

      <div className="relative z-10">
        <Hero />
        <FloralDivider />
        <Countdown />

        <Details />
        <FloralDivider flip />
        <RSVP onSubmitted={() => {}} />
        <Footer />
      </div>
    </main>
  );
};

export default Index;
