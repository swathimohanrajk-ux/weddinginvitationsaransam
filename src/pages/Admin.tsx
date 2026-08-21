import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Heart, LogOut, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

type Wish = {
  id: string;
  guest_name: string;
  message: string;
  is_anonymous: boolean;
  created_at: string;
};

type Rsvp = { id: string; guest_count: number; created_at: string };

const formatTime = (iso: string) =>
  new Date(iso).toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });

const Admin = () => {
  const navigate = useNavigate();
  const [ready, setReady] = useState(false);
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [rsvps, setRsvps] = useState<Rsvp[]>([]);

  useEffect(() => {
    let active = true;

    const check = async () => {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) {
        navigate("/admin/login", { replace: true });
        return;
      }
      const { data: isAdmin } = await supabase.rpc("has_role", {
        _user_id: userData.user.id,
        _role: "admin",
      });
      if (!isAdmin) {
        await supabase.auth.signOut();
        navigate("/admin/login", { replace: true });
        return;
      }
      if (!active) return;
      setReady(true);

      const [w, r] = await Promise.all([
        supabase.from("guest_wishes").select("*").order("created_at", { ascending: false }),
        supabase.from("rsvps").select("*").order("created_at", { ascending: false }),
      ]);
      if (!active) return;
      if (w.data) setWishes(w.data as Wish[]);
      if (r.data) setRsvps(r.data as Rsvp[]);
    };

    check();
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      if (!session) navigate("/admin/login", { replace: true });
    });
    return () => {
      active = false;
      sub.subscription.unsubscribe();
    };
  }, [navigate]);

  const signOut = async () => {
    await supabase.auth.signOut();
    navigate("/admin/login", { replace: true });
  };

  if (!ready) {
    return (
      <main className="min-h-dvh flex items-center justify-center bg-gradient-elegant">
        <p className="font-serif italic text-muted-foreground">Loading…</p>
      </main>
    );
  }

  const totalGuests = rsvps.reduce((a, r) => a + (r.guest_count ?? 0), 0);

  return (
    <main className="min-h-dvh bg-gradient-elegant px-5 py-10">
      <div className="max-w-4xl mx-auto space-y-8">
        <header className="flex items-center justify-between gap-4 flex-wrap">
          <div>
            <p className="text-[10px] tracking-[0.4em] uppercase text-gold">Private</p>
            <h1 className="font-script text-5xl text-gradient-gold">Admin</h1>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="text-xs tracking-[0.2em] uppercase text-muted-foreground hover:text-gold transition-elegant"
            >
              View site
            </Link>
            <Button
              onClick={signOut}
              variant="outline"
              className="rounded-full border-gold text-gold hover:bg-blush/40 hover:text-foreground gap-2"
            >
              <LogOut className="h-4 w-4" /> Log out
            </Button>
          </div>
        </header>

        <section className="grid gap-4 sm:grid-cols-2">
          <div className="glass-card rounded-3xl p-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-gold flex items-center justify-center shadow-soft shrink-0">
              <Users className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <p className="text-[10px] tracking-[0.25em] uppercase text-gold">Expected Guests</p>
              <p className="font-serif text-4xl text-gradient-gold leading-none my-1">
                {totalGuests}
              </p>
              <p className="text-[10px] italic text-muted-foreground">
                Across {rsvps.length} RSVP{rsvps.length === 1 ? "" : "s"}
              </p>
            </div>
          </div>

          <div className="glass-card rounded-3xl p-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-gold flex items-center justify-center shadow-soft shrink-0">
              <Heart className="h-5 w-5 text-primary-foreground fill-current" />
            </div>
            <div>
              <p className="text-[10px] tracking-[0.25em] uppercase text-gold">Guest Wishes</p>
              <p className="font-serif text-4xl text-gradient-gold leading-none my-1">
                {wishes.length}
              </p>
              <p className="text-[10px] italic text-muted-foreground">Messages received</p>
            </div>
          </div>
        </section>

        <section className="glass-card rounded-3xl p-6">
          <h2 className="font-serif text-2xl text-foreground/85 mb-4">RSVP Submissions</h2>
          {rsvps.length === 0 ? (
            <p className="text-sm italic text-muted-foreground">No RSVPs yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-[10px] tracking-[0.2em] uppercase text-gold">
                    <th className="py-2 pr-4">Guests</th>
                    <th className="py-2">Submitted</th>
                  </tr>
                </thead>
                <tbody>
                  {rsvps.map((r) => (
                    <tr key={r.id} className="border-t border-gold/15">
                      <td className="py-2 pr-4 font-serif text-base">{r.guest_count}</td>
                      <td className="py-2 text-muted-foreground">{formatTime(r.created_at)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        <section className="glass-card rounded-3xl p-6">
          <h2 className="font-serif text-2xl text-foreground/85 mb-4">Guest Wishes</h2>
          {wishes.length === 0 ? (
            <p className="text-sm italic text-muted-foreground">No wishes yet.</p>
          ) : (
            <ul className="space-y-3">
              {wishes.map((w) => (
                <li
                  key={w.id}
                  className="rounded-2xl px-4 py-3 bg-card/70 border border-gold/15 shadow-soft"
                >
                  <div className="flex items-baseline justify-between gap-3 mb-1">
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
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
};

export default Admin;
