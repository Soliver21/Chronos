import React, { useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
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
      login(res.user, res.accessToken);
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
      
      <div className="flex items-center justify-center min-h-screen relative z-10 px-4 text-black">
        <Card className="w-full max-w-sm bg-white border-none shadow-2xl relative">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Bejelentkezés</CardTitle>
            <CardDescription className="text-gray-500">
              A belépéshez add meg az e-mail-címedet.
            </CardDescription>
            <CardAction>
              <Link to="/register" className="text-sm font-bold hover:underline">
               Regisztrálj most!
              </Link>
            </CardAction>
          </CardHeader>
          
          <form onSubmit={handleSubmit}>
            <CardContent className="grid gap-6"> 
              <div className="grid gap-2 text-left">
                <Label htmlFor="email" className="font-semibold text-gray-700">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="pelda@gmail.com"
                  ref={emailRef}
                  value={form.email}
                  onChange={handleChange}
                  className="bg-white border-gray-300 focus:ring-2 focus:ring-blue-500 h-11"
                />
              </div>
              <div className="grid gap-2 text-left">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="font-semibold text-gray-700">Password</Label>
                  <Link to="/forgot-password" className="text-xs text-blue-600 hover:underline">
                    Elfelejtetted a jelszavad?
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
                  className="bg-white border-gray-300 focus:ring-2 mb-5 focus:ring-blue-500 h-11"
                />
              </div>
            </CardContent>
            
            <CardFooter className="flex-col gap-4">
              <Button type="submit" className="w-full bg-slate-900 hover:bg-slate-800 text-white h-11 font-bold">
                Bejelentkezem
              </Button>
              <Link to="/" className="text-xs text-gray-400 hover:text-gray-600">
                ← Vissza a főoldalra
              </Link>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}

export default LoginForm;