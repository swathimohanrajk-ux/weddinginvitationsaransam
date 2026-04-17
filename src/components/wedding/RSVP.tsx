import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Heart, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const STORAGE_KEY = "wedding_rsvp_submitted";

const RSVP = ({ onSubmitted }: { onSubmitted: () => void }) => {
  const [open, setOpen] = useState(false);
  const [count, setCount] = useState(2);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [declined, setDeclined] = useState(false);

  useEffect(() => {
    const v = localStorage.getItem(STORAGE_KEY);
    if (v === "yes") setSubmitted(true);
    if (v === "no") setDeclined(true);
  }, []);

  const handleYes = () => setOpen(true);

  const handleNo = () => {
    localStorage.setItem(STORAGE_KEY, "no");
    setDeclined(true);
    toast("We'll miss you — sending love your way 💛");
  };

  const submit = async () => {
    if (count < 1 || count > 10) return;
    setSubmitting(true);
    const { error } = await supabase.from("rsvps").insert({ guest_count: count });
    setSubmitting(false);
    if (error) {
      toast.error("Something went wrong. Please try again.");
      return;
    }
    localStorage.setItem(STORAGE_KEY, "yes");
    setSubmitted(true);
    setOpen(false);
    onSubmitted();
    toast.success("Thank you! We can't wait to celebrate with you 🌸");
  };

  return (
    <section className="py-24 px-6 bg-gradient-blush relative">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9 }}
        className="max-w-3xl mx-auto text-center"
      >
        <p className="text-xs tracking-[0.4em] uppercase text-gold mb-3">Kindly Reply</p>
        <h2 className="font-script text-6xl md:text-7xl text-gradient-gold mb-4">
          Will you attend?
        </h2>
        <p className="font-serif italic text-lg text-muted-foreground mb-12">
          Your presence would mean the world to us
        </p>

        {submitted ? (
          <div className="glass-card rounded-3xl p-8 inline-block">
            <Heart className="h-8 w-8 text-gold mx-auto mb-3 fill-current" />
            <p className="font-serif text-xl text-foreground/80">
              Thank you for confirming — see you soon!
            </p>
          </div>
        ) : declined ? (
          <div className="glass-card rounded-3xl p-8 inline-block">
            <p className="font-serif text-xl text-foreground/80">
              You'll be missed — thank you for letting us know 💛
            </p>
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              onClick={handleYes}
              size="lg"
              className="rounded-full px-10 py-7 text-base tracking-[0.2em] uppercase bg-gradient-gold text-primary-foreground shadow-soft hover:shadow-glow hover:scale-105 transition-elegant border-0"
            >
              <Heart className="mr-2 h-5 w-5 fill-current" />
              Yes, I'm in
            </Button>
            <Button
              onClick={handleNo}
              variant="outline"
              size="lg"
              className="rounded-full px-10 py-7 text-base tracking-[0.2em] uppercase border-gold text-gold hover:bg-blush/40 hover:text-foreground transition-elegant"
            >
              <X className="mr-2 h-5 w-5" />
              I couldn't make it
            </Button>
          </div>
        )}
      </motion.div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="glass-card border-0 max-w-md">
          <DialogHeader className="text-center">
            <DialogTitle className="font-script text-4xl text-gradient-gold text-center">
              How many of you?
            </DialogTitle>
            <DialogDescription className="font-serif italic text-base text-center text-muted-foreground">
              Please let us know how many guests will be attending (1–10)
            </DialogDescription>
          </DialogHeader>

          <div className="flex items-center justify-center gap-6 py-6">
            <button
              onClick={() => setCount((c) => Math.max(1, c - 1))}
              className="w-12 h-12 rounded-full bg-gradient-gold text-primary-foreground text-2xl shadow-soft hover:scale-110 transition-elegant"
              aria-label="Decrease"
            >
              −
            </button>
            <div className="font-serif text-6xl text-gradient-gold w-20 text-center">{count}</div>
            <button
              onClick={() => setCount((c) => Math.min(10, c + 1))}
              className="w-12 h-12 rounded-full bg-gradient-gold text-primary-foreground text-2xl shadow-soft hover:scale-110 transition-elegant"
              aria-label="Increase"
            >
              +
            </button>
          </div>

          <Button
            onClick={submit}
            disabled={submitting}
            className="w-full rounded-full py-6 bg-gradient-gold text-primary-foreground tracking-[0.2em] uppercase text-sm border-0 hover:shadow-glow transition-elegant"
          >
            {submitting ? "Sending..." : "Confirm Attendance"}
          </Button>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default RSVP;
