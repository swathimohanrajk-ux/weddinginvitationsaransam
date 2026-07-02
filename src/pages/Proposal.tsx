import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import videoAsset from "@/assets/wedding-proposal.mp4.asset.json";

const Proposal = () => {
  return (
    <main className="relative w-screen h-screen overflow-hidden bg-black">
      <video
        src={videoAsset.url}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />
      <Link
        to="/"
        className="absolute top-5 left-5 z-20 inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-sm text-amber-950 hover:scale-105 transition-elegant"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </Link>
    </main>
  );
};

export default Proposal;
