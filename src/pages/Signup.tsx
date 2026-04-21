import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Building2, Mail, Lock, User, Phone, ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const signupSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type SignupFormValues = z.infer<typeof signupSchema>;

const Signup = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignupFormValues) => {
    setIsLoading(true);
    // Mock registration
    setTimeout(() => {
      console.log("Signup data:", data);
      toast.success("Account created successfully! Please login.");
      navigate("/login");
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#0a0a0b] p-4 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-[-10%] left-[-10%] h-[500px] w-[500px] rounded-full bg-primary/10 blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] h-[500px] w-[500px] rounded-full bg-primary/5 blur-[100px]" />

      <div className="w-full max-w-[500px] relative z-10 py-10">
        <div className="surface-card p-8 md:p-10 border-border/40 shadow-2xl backdrop-blur-xl">
          <div className="flex flex-col items-center text-center mb-10">
            <div className="h-14 w-14 rounded-2xl gradient-primary flex items-center justify-center shadow-glow mb-6">
              <ShieldCheck className="h-7 w-7 text-primary-foreground" strokeWidth={2.2} />
            </div>
            <h1 className="display-text text-3xl font-bold tracking-tight mb-2">Create an Account</h1>
            <p className="text-muted-foreground text-[15px]">
              Join the Greenwood society management system
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-[13px] font-semibold ml-1">
                  Full Name
                </Label>
                <div className="relative group">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-[17px] w-[17px] text-muted-foreground transition-colors group-focus-within:text-primary" />
                  <Input
                    id="fullName"
                    placeholder="Arjun Sharma"
                    className="pl-11 h-12 bg-secondary/50 border-border/60 rounded-xl focus:ring-primary/20 focus:border-primary transition-all text-[14px]"
                    {...register("fullName")}
                  />
                </div>
                {errors.fullName && (
                  <p className="text-[12px] text-destructive font-medium ml-1">
                    {errors.fullName.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-[13px] font-semibold ml-1">
                  Phone Number
                </Label>
                <div className="relative group">
                  <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-[17px] w-[17px] text-muted-foreground transition-colors group-focus-within:text-primary" />
                  <Input
                    id="phone"
                    placeholder="+91 98765 43210"
                    className="pl-11 h-12 bg-secondary/50 border-border/60 rounded-xl focus:ring-primary/20 focus:border-primary transition-all text-[14px]"
                    {...register("phone")}
                  />
                </div>
                {errors.phone && (
                  <p className="text-[12px] text-destructive font-medium ml-1">
                    {errors.phone.message}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-[13px] font-semibold ml-1">
                Email Address
              </Label>
              <div className="relative group">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-[17px] w-[17px] text-muted-foreground transition-colors group-focus-within:text-primary" />
                <Input
                  id="email"
                  type="email"
                  placeholder="arjun.s@greenwood.in"
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="password" className="text-[13px] font-semibold ml-1">
                  Password
                </Label>
                <div className="relative group">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-[17px] w-[17px] text-muted-foreground transition-colors group-focus-within:text-primary" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    className="pl-11 h-12 bg-secondary/50 border-border/60 rounded-xl focus:ring-primary/20 focus:border-primary transition-all text-[14px]"
                    {...register("password")}
                  />
                </div>
                {errors.password && (
                  <p className="text-[12px] text-destructive font-medium ml-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-[13px] font-semibold ml-1">
                  Confirm Password
                </Label>
                <div className="relative group">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-[17px] w-[17px] text-muted-foreground transition-colors group-focus-within:text-primary" />
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    className="pl-11 h-12 bg-secondary/50 border-border/60 rounded-xl focus:ring-primary/20 focus:border-primary transition-all text-[14px]"
                    {...register("confirmPassword")}
                  />
                </div>
                {errors.confirmPassword && (
                  <p className="text-[12px] text-destructive font-medium ml-1">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-start gap-2 py-2 ml-1">
              <input
                type="checkbox"
                id="terms"
                className="mt-1 h-3.5 w-3.5 rounded border-border/60 bg-secondary/50 text-primary focus:ring-primary/20"
                required
              />
              <label htmlFor="terms" className="text-[12px] text-muted-foreground leading-snug">
                I agree to the <Link to="/terms" className="text-foreground font-semibold hover:underline">Terms of Service</Link> and <Link to="/privacy" className="text-foreground font-semibold hover:underline">Privacy Policy</Link>.
              </label>
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
                  Create Admin Account
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </Button>
          </form>

          <div className="mt-8 pt-8 border-t border-border/40 text-center">
            <p className="text-[14px] text-muted-foreground">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-bold text-foreground hover:text-primary transition-colors inline-flex items-center gap-1"
              >
                Sign in instead <Building2 className="h-3.5 w-3.5" />
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

export default Signup;
