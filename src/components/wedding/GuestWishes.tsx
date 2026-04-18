import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, MessageCircleHeart, Send, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";

type Wish = {
  id: string;
  guest_name: string;
  message: string;
  is_anonymous: boolean;
  created_at: string;
};

const formatTime = (iso: string) => {
  const d = new Date(iso);
  return d.toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
};

const GuestWishes = () => {
  const [open, setOpen] = useState(false);
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [anon, setAnon] = useState(false);
  const [sending, setSending] = useState(false);
  const [sparkle, setSparkle] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const isMobile = useIsMobile();

  const load = async () => {
    const { data, error } = await supabase
      .from("guest_wishes")
      .select("*")
      .order("created_at", { ascending: true });
    if (!error && data) setWishes(data as Wish[]);
  };

  useEffect(() => {
    load();
    const channel = supabase
      .channel("wishes-realtime")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "guest_wishes" },
        (payload) => {
          setWishes((prev) => {
            const w = payload.new as Wish;
            if (prev.find((p) => p.id === w.id)) return prev;
            return [...prev, w];
          });
        },
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => {
      const el = scrollRef.current?.querySelector(
        "[data-radix-scroll-area-viewport]",
      ) as HTMLElement | null;
      if (el) el.scrollTop = el.scrollHeight;
    }, 80);
    return () => clearTimeout(t);
  }, [wishes, open]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = name.trim();
    const trimmedMsg = message.trim();
    if (!trimmedMsg) {
      toast({ title: "Please write a wish", variant: "destructive" });
      return;
    }
    if (!anon && !trimmedName) {
      toast({ title: "Please enter your name (or post anonymously)", variant: "destructive" });
      return;
    }
    setSending(true);
    const { error } = await supabase.from("guest_wishes").insert({
      guest_name: anon ? "Anonymous Guest" : trimmedName,
      message: trimmedMsg,
      is_anonymous: anon,
    });
    setSending(false);
    if (error) {
      toast({ title: "Couldn't send wish", description: error.message, variant: "destructive" });
      return;
    }
    setMessage("");
    if (anon) setName("");
    setSparkle(true);
    setTimeout(() => setSparkle(false), 900);
  };

  const Panel = (
    <div className="flex flex-col h-full bg-gradient-to-b from-[hsl(36_50%_98%)] via-[hsl(12_55%_96%)] to-[hsl(36_60%_94%)]">
      <SheetHeader className="px-6 pt-6 pb-3 border-b border-gold/20">
        <SheetTitle className="font-script text-3xl text-gradient-gold flex items-center gap-2">
          <Heart className="h-5 w-5 text-gold" /> Guest Wishes
        </SheetTitle>
        <p className="text-xs tracking-[0.25em] uppercase text-gold/80">
          Share your blessings with the couple
        </p>
      </SheetHeader>

      <ScrollArea ref={scrollRef} className="flex-1 px-4 py-4">
        <div className="space-y-3 max-w-md mx-auto">
          {wishes.length === 0 && (
            <p className="text-center text-sm italic text-muted-foreground py-10">
              Be the first to send a wish ✨
            </p>
          )}
          <AnimatePresence initial={false}>
            {wishes.map((w) => (
              <motion.div
                key={w.id}
                initial={{ opacity: 0, y: 10, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-2xl rounded-tl-sm px-4 py-3 bg-card/80 border border-gold/15 shadow-soft backdrop-blur-sm"
              >
                <div className="flex items-baseline justify-between gap-2 mb-1">
                  <p className="font-serif text-sm font-medium text-foreground/85">
                    {w.is_anonymous ? "Anonymous Guest" : w.guest_name}
                  </p>
                  <span className="text-[10px] text-muted-foreground tabular-nums">
                    {formatTime(w.created_at)}
                  </span>
                </div>
                <p className="text-[15px] leading-relaxed text-foreground/80 italic">
                  {w.message}
                </p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </ScrollArea>

      <form
        onSubmit={handleSend}
        className="relative border-t border-gold/20 bg-card/70 backdrop-blur p-4 space-y-3"
      >
        <AnimatePresence>
          {sparkle && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="pointer-events-none absolute inset-0 flex items-center justify-center"
            >
              <Sparkles className="h-12 w-12 text-gold sparkle-pop" />
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex items-center justify-between gap-3">
          <Input
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={anon}
            maxLength={80}
            className="bg-background/70 border-gold/30 rounded-full"
          />
          <div className="flex items-center gap-2 shrink-0">
            <Switch id="anon" checked={anon} onCheckedChange={setAnon} />
            <Label htmlFor="anon" className="text-xs tracking-wide cursor-pointer">
              Anonymous
            </Label>
          </div>
        </div>
        <div className="flex items-end gap-2">
          <Textarea
            placeholder="Write your blessing…"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            maxLength={500}
            rows={2}
            className="bg-background/70 border-gold/30 rounded-2xl resize-none"
          />
          <Button
            type="submit"
            disabled={sending}
            size="icon"
            className="rounded-full bg-gradient-gold text-primary-foreground shadow-soft hover:shadow-glow hover:scale-105 transition-elegant h-11 w-11 shrink-0"
            aria-label="Send wish"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </form>
    </div>
  );

  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button
            className="fixed bottom-5 left-5 z-40 rounded-full bg-gradient-gold text-primary-foreground shadow-soft hover:shadow-glow hover:scale-105 transition-elegant px-5 py-6 gap-2"
          >
            <MessageCircleHeart className="h-5 w-5" />
            <span className="hidden sm:inline tracking-wider">Guest Wishes</span>
          </Button>
        </SheetTrigger>
        <SheetContent
          side={isMobile ? "bottom" : "right"}
          className={
            isMobile
              ? "h-[85vh] p-0 rounded-t-3xl border-t border-gold/30"
              : "w-full sm:max-w-md p-0 border-l border-gold/30"
          }
        >
          {Panel}
        </SheetContent>
      </Sheet>
    </>
  );
};

export default GuestWishes;
