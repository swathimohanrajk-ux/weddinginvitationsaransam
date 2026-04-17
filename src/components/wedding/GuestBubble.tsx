import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const GuestBubble = ({ refreshSignal }: { refreshSignal: number }) => {
  const [total, setTotal] = useState<number | null>(null);

  const load = async () => {
    const { data, error } = await supabase.from("rsvps").select("guest_count");
    if (error) return;
    const sum = (data ?? []).reduce((a, r) => a + (r.guest_count ?? 0), 0);
    setTotal(sum);
  };

  useEffect(() => {
    load();
    const channel = supabase
      .channel("rsvps-realtime")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "rsvps" },
        () => load()
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  useEffect(() => {
    load();
  }, [refreshSignal]);

  return (
    <AnimatePresence>
      {total !== null && total > 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.6, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 40 }}
          transition={{ type: "spring", stiffness: 220, damping: 22 }}
          className="fixed bottom-5 right-5 z-40 glass-card rounded-3xl px-5 py-4 max-w-[220px] animate-float-soft"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-gold flex items-center justify-center shadow-soft shrink-0">
              <Users className="h-5 w-5 text-primary-foreground" />
            </div>
            <div className="text-left leading-tight">
              <p className="text-[10px] tracking-[0.25em] uppercase text-gold">Expected Guests</p>
              <p className="font-serif text-3xl text-gradient-gold leading-none my-0.5">{total}</p>
              <p className="text-[10px] italic text-muted-foreground">
                Are eager to attend the wedding
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default GuestBubble;
