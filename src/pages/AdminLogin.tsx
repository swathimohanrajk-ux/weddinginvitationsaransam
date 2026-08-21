import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate("/admin", { replace: true });
    });
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    let { error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    if (error) {
      // First-time setup: create the admin account, then sign in.
      const signUp = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: { emailRedirectTo: window.location.origin + "/admin" },
      });
      if (!signUp.error) {
        const retry = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        });
        error = retry.error;
      }
    }

    if (error) {
      setLoading(false);
      toast.error("Invalid credentials");
      return;
    }

    const { data: claimed } = await supabase.rpc("claim_admin_role");
    setLoading(false);
    if (!claimed) {
      await supabase.auth.signOut();
      toast.error("This account is not an administrator");
      return;
    }
    navigate("/admin", { replace: true });
  };

  return (
    <main className="min-h-dvh flex items-center justify-center px-6 bg-gradient-elegant">
      <form
        onSubmit={handleSubmit}
        className="glass-card rounded-3xl p-8 w-full max-w-sm space-y-5"
      >
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-full bg-gradient-gold flex items-center justify-center mx-auto shadow-soft">
            <Lock className="h-5 w-5 text-primary-foreground" />
          </div>
          <h1 className="font-script text-4xl text-gradient-gold">Admin Login</h1>
          <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
            Private area
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="text-xs tracking-wide">Email</Label>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="bg-background/70 border-gold/30 rounded-full"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password" className="text-xs tracking-wide">Password</Label>
          <Input
            id="password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="bg-background/70 border-gold/30 rounded-full"
          />
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="w-full rounded-full py-6 bg-gradient-gold text-primary-foreground tracking-[0.2em] uppercase text-xs border-0 hover:shadow-glow transition-elegant"
        >
          {loading ? "Signing in…" : "Sign In"}
        </Button>
      </form>
    </main>
  );
};

export default AdminLogin;
