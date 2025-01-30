import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useAuth from "@/hooks/useAuth";
import { useState } from "react";
import { toast } from "sonner";
import { Link } from "react-router-dom";

export function SignUpForm({ className, ...props }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { handleSignIn, error, setError, loading } = useAuth(email, password);

  const handleForm = (e) => {
    e.preventDefault();
    alert("Component in Development!");
  };

  if (error) {
    toast(error, { duration: 2000 });
    setError("");
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Sign Up</CardTitle>
          <CardDescription>Sign up now to start shopping.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleForm}>
            <div className="grid gap-6">
              <div className="grid gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="name" className="text-start">
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    type="name"
                    placeholder="Brandon Lee"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email" className="text-start">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="m@example.com"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                    <a
                      href="#"
                      className="ml-auto text-sm underline-offset-4 hover:underline"
                    >
                      Visible
                    </a>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full">
                  Sign Up
                </Button>
              </div>
              <div className="text-center text-sm">
                Already have an account?{" "}
                <Link to="/login" className="underline underline-offset-4">
                  Sign in
                </Link>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary  ">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}
