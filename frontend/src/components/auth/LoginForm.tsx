import React, { useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "../ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  CardAction
} from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { loginUser } from "../../services/auth.service"; 
import { useAuth } from "../../context/AuthContext";
import type { LoginType } from "../../types/user.types";

const init: LoginType = {
  email: "",
  password: ""
};

export function LoginForm() {
  const [form, setForm] = useState<LoginType>(init);
  const { login } = useAuth();
  const navigate = useNavigate();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.email) return emailRef.current?.focus();
    if (!form.password) return passwordRef.current?.focus();

    try {
      const res = await loginUser(form);
      login(res.user, res.token);
      setForm(init); 
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      alert("Helytelen email vagy jelszó!");
    }
  };

  return (
    <div className="landing-page">
      <div className="gradient-bg"></div>
      
      <div className="flex items-center justify-center min-h-screen relative z-10">
        <Card className="w-full max-w-sm bg-white text-black shadow-2xl">
          <CardHeader className="pb-2">
            <CardTitle>Login to your account</CardTitle>
            <CardDescription>
              Enter your email below to login to your account
            </CardDescription>
            <CardAction>
              <Button variant="link" asChild className="p-0">
                <Link to="/register" className="text-xs font-bold">Sign Up</Link>
              </Button>
            </CardAction>
          </CardHeader>
          
          <form onSubmit={handleSubmit}>
            <div className="px-6 py-8 flex flex-col gap-6"> 
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
                    className="ml-auto inline-block text-xs underline underline-offset-4"
                  >
                    Forgot your password?
                  </Link>
                </div>
                <Input 
                  id="password" 
                  name="password"
                  type="password" 
                  placeholder="********" 
                  ref={passwordRef}
                  value={form.password}
                  onChange={handleChange}
                />
              </div>
            </div>
            
            <CardFooter className="flex-col gap-2 pb-6">
              <Button type="submit" className="w-full bg-slate-900 text-white hover:bg-slate-800">
                Login
              </Button>
              <Button variant="ghost" className="w-full text-xs" asChild>
                <Link to="/">← Back to home</Link>
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}

export default LoginForm;