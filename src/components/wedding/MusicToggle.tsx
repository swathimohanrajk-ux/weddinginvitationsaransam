import { useEffect, useRef, useState } from "react";
import { Music, VolumeX } from "lucide-react";

const TRACK = "https://cdn.pixabay.com/audio/2022/10/18/audio_31c2790cdf.mp3";

const MusicToggle = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const a = new Audio(TRACK);
    a.loop = true;
    a.volume = 0.35;
    audioRef.current = a;
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
        /* ignore autoplay block */
      }
    }
  };

  return (
    <button
      onClick={toggle}
      aria-label={playing ? "Pause music" : "Play music"}
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
