import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { loginUser } from "../../services/auth.service"; 
import type { LoginType } from "../../types/user.types";

const init: LoginType = {
  email: "",
  password: ""
};

export function LoginForm() {
  const [form, setForm] = useState<LoginType>(init);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }
  const navigate = useNavigate()
 const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  if (!form.email) {
    alert("Kérjük, töltse ki az email mezőt!");
    return emailRef.current?.focus();
  }
  
  if (!form.password) {
    alert("Kérjük, adja meg a jelszavát!");
    return passwordRef.current?.focus();
  }

  try {
    const res = await loginUser(form);
    console.log("Sikeres belépés:", res);
    navigate("/dashboard");
    setForm(init); 
  } catch (error) {
    console.error("Hiba:", error);
    alert("Helytelen email vagy jelszó!");
  }
};

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
          <CardAction>
            <Button variant="link" asChild>
              <Link to="/register">Sign Up</Link>
            </Button>
          </CardAction>
        </CardHeader>
        
        <form onSubmit={handleSubmit}>
          <CardContent>
            <div className="flex flex-col gap-6 p-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="m@example.com"
                  ref={emailRef}
                  value={form.email}
                  onChange={handleChange}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    to="/forgot-password"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </Link>
                </div>
                <Input 
                  id="password" 
                  name="password"
                  type="password" 
                  ref={passwordRef}
                  value={form.password}
                  onChange={handleChange}
                />
              </div>
            </div>
          </CardContent>
          
          <CardFooter className="flex-col gap-2">
            <Button type="submit" className="w-full">
              Login
            </Button>
            <Button variant="ghost" className="w-full text-xs" asChild>
              <Link to="/">← Back to home</Link>
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

export default LoginForm;