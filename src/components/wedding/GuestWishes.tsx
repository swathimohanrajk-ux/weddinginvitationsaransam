import { useState } from "react";
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
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";

const GuestWishes = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [anon, setAnon] = useState(false);
  const [sending, setSending] = useState(false);
  const [sparkle, setSparkle] = useState(false);
  const [sent, setSent] = useState(false);
  const { toast } = useToast();
  const isMobile = useIsMobile();

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
    setName("");
    setSparkle(true);
    setSent(true);
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

      <div className="flex-1 flex items-center justify-center px-6 text-center">
        <AnimatePresence mode="wait">
          {sent ? (
            <motion.div
              key="sent"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-3"
            >
              <Heart className="h-8 w-8 text-gold mx-auto fill-current" />
              <p className="font-serif italic text-lg text-foreground/75">
                Thank you — your wish has been sent to the couple ✨
              </p>
              <p className="text-xs text-muted-foreground">
                Wishes are kept private and shared only with Saran &amp; Samyuktha.
              </p>
            </motion.div>
          ) : (
            <motion.p
              key="intro"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="font-serif italic text-base text-muted-foreground max-w-xs"
            >
              Write a private blessing below — it will be delivered straight to the couple.
            </motion.p>
          )}
        </AnimatePresence>
      </div>

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
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button className="fixed bottom-5 left-5 z-40 rounded-full bg-gradient-gold text-primary-foreground shadow-soft hover:shadow-glow hover:scale-105 transition-elegant px-5 py-6 gap-2">
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
  );
};

export default GuestWishes;
