import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Building2, Mail, Lock, Eye, EyeOff, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    // Mock authentication
    setTimeout(() => {
      console.log("Login data:", data);
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("user", JSON.stringify({ name: "Aarav Reddy", email: data.email }));
      toast.success("Welcome back, Aarav!");
      navigate("/");
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#0a0a0b] p-4 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-[-10%] right-[-10%] h-[500px] w-[500px] rounded-full bg-primary/10 blur-[120px]" />
      <div className="absolute bottom-[-10%] left-[-10%] h-[500px] w-[500px] rounded-full bg-primary/5 blur-[100px]" />

      <div className="w-full max-w-[440px] relative z-10">
        <div className="surface-card p-8 md:p-10 border-border/40 shadow-2xl backdrop-blur-xl">
          <div className="flex flex-col items-center text-center mb-10">
            <div className="h-14 w-14 rounded-2xl gradient-primary flex items-center justify-center shadow-glow mb-6">
              <Building2 className="h-7 w-7 text-primary-foreground" strokeWidth={2.2} />
            </div>
            <h1 className="display-text text-3xl font-bold tracking-tight mb-2">Welcome back</h1>
            <p className="text-muted-foreground text-[15px]">
              Access your society management dashboard
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-[13px] font-semibold ml-1">
                Email Address
              </Label>
              <div className="relative group">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-[17px] w-[17px] text-muted-foreground transition-colors group-focus-within:text-primary" />
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@greenwood.in"
                  className="pl-11 h-12 bg-secondary/50 border-border/60 rounded-xl focus:ring-primary/20 focus:border-primary transition-all text-[14px]"
                  {...register("email")}
                />
              </div>
              {errors.email && (
                <p className="text-[12px] text-destructive font-medium ml-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between ml-1">
                <Label htmlFor="password" className="text-[13px] font-semibold">
                  Password
                </Label>
                <Link
                  to="/forgot-password"
                  className="text-[12px] font-medium text-primary hover:underline"
                >
                  Forgot?
                </Link>
              </div>
              <div className="relative group">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-[17px] w-[17px] text-muted-foreground transition-colors group-focus-within:text-primary" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="pl-11 pr-11 h-12 bg-secondary/50 border-border/60 rounded-xl focus:ring-primary/20 focus:border-primary transition-all text-[14px]"
                  {...register("password")}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="h-[17px] w-[17px]" />
                  ) : (
                    <Eye className="h-[17px] w-[17px]" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-[12px] text-destructive font-medium ml-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-[15px] shadow-glow transition-all active:scale-[0.98] mt-2 group"
            >
              {isLoading ? (
                <div className="h-5 w-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
              ) : (
                <>
                  Sign in to Dashboard
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </Button>
          </form>

          <div className="mt-8 pt-8 border-t border-border/40 text-center">
            <p className="text-[14px] text-muted-foreground">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="font-bold text-foreground hover:text-primary transition-colors inline-flex items-center gap-1"
              >
                Join Greenwood <Sparkles className="h-3.5 w-3.5" />
              </Link>
            </p>
          </div>
        </div>

        <p className="text-center mt-8 text-[12px] text-muted-foreground font-medium tracking-wide">
          © 2024 GREENWOOD SOCIETY MANAGEMENT. ALL RIGHTS RESERVED.
        </p>
      </div>
    </div>
  );
};

export default Login;
