import { useEffect, useRef, useState } from "react";
import { Music, VolumeX } from "lucide-react";
import track from "@/assets/wedding-music.mp3";

const MusicToggle = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const a = new Audio(track);
    a.loop = true;
    a.volume = 0.4;
    audioRef.current = a;

    // Try to autoplay (will be blocked by most browsers until user interacts)
    a.play()
      .then(() => setPlaying(true))
      .catch(() => {
        // Autoplay blocked — start on first user interaction
        const startOnInteract = () => {
          a.play()
            .then(() => setPlaying(true))
            .catch(() => {});
          window.removeEventListener("pointerdown", startOnInteract);
          window.removeEventListener("keydown", startOnInteract);
        };
        window.addEventListener("pointerdown", startOnInteract, { once: true });
        window.addEventListener("keydown", startOnInteract, { once: true });
      });

    return () => {
      a.pause();
      audioRef.current = null;
    };
  }, []);

  const toggle = async () => {
    const a = audioRef.current;
    if (!a) return;
    if (playing) {
      a.pause();
      setPlaying(false);
    } else {
      try {
        await a.play();
        setPlaying(true);
      } catch {
        /* ignore */
      }
    }
  };

  return (
    <button
      onClick={toggle}
      aria-label={playing ? "Mute music" : "Play music"}
      className="fixed top-5 right-5 z-40 glass-card rounded-full p-3 transition-elegant hover:scale-110 hover:shadow-glow"
    >
      {playing ? (
        <Music className="h-5 w-5 text-gold animate-shimmer" />
      ) : (
        <VolumeX className="h-5 w-5 text-muted-foreground" />
      )}
    </button>
  );
};

export default MusicToggle;
