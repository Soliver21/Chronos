import React, { useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "../ui/button";
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { loginUser } from "../../services/auth.service";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import { useToast } from "../../context/ToastContext";
import type { LoginType } from "../../types/user.types";

const init: LoginType = { email: "", password: "" };

export function LoginForm() {
  const [form, setForm] = useState<LoginType>(init);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const { theme } = useTheme();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const isDark = theme === "dark";

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.email) { emailRef.current?.focus(); return; }
    if (!form.password) { passwordRef.current?.focus(); return; }
    setLoading(true);
    try {
      const res = await loginUser(form);
      login(res.user, res.token);
      showToast(`Üdvözlünk, ${res.user.name || "felhasználó"}!`, "success");
      setForm(init);
      

      if (res.user.email === "admin@chronos.com" || res.user.role === "ADMIN") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }


    } catch (error) {
      console.error(error);
      showToast("Helytelen email vagy jelszó!", "error");
    } finally {
      setLoading(false);
    }
  };

  const pageBg = isDark ? "bg-[#0a0a0a]" : "bg-white";
  const cardBg = isDark ? "bg-[#0f0f14] border-white/10 text-white" : "bg-white border-gray-200 text-gray-900";
  const inputCls = isDark
    ? "bg-[#1a1a1f] border-white/10 text-white focus:ring-indigo-500"
    : "bg-white border-gray-300 focus:ring-blue-500";
  const labelCls = isDark ? "text-gray-400" : "text-gray-700";
  const descCls = isDark ? "text-gray-500" : "text-gray-500";
  const linkCls = isDark ? "text-indigo-400 hover:text-indigo-300" : "text-indigo-600 hover:text-indigo-500";

  return (
    <div className={`min-h-screen flex items-center justify-center px-4 transition-colors duration-300 ${pageBg}`}>
      <Card className={`w-full max-w-sm shadow-2xl border ${cardBg}`}>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Bejelentkezés</CardTitle>
          <CardDescription className={descCls}>
            A belépéshez add meg az e-mail-címedet.
          </CardDescription>
          <CardAction>
            <Link to="/register" className={`text-sm font-bold hover:underline ${linkCls}`}>
              Regisztrálj most!
            </Link>
          </CardAction>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="grid gap-6">
            <div className="grid gap-2 text-left">
              <Label htmlFor="email" className={`font-semibold ${labelCls}`}>Email</Label>
              <Input id="email" name="email" type="email" placeholder="pelda@gmail.com"
                ref={emailRef} value={form.email} onChange={handleChange}
                className={`h-11 focus:ring-2 ${inputCls}`} />
            </div>
            <div className="grid gap-2 text-left">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className={`font-semibold ${labelCls}`}>Jelszó</Label>
                <Link to="/forgot-password" className={`text-xs hover:underline ${linkCls}`}>
                  Elfelejtetted?
                </Link>
              </div>
              <Input id="password" name="password" type="password" placeholder="********"
                ref={passwordRef} value={form.password} onChange={handleChange}
                className={`h-11 focus:ring-2 mb-2 ${inputCls}`} />
            </div>
          </CardContent>
          <CardFooter className="flex-col gap-4">
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white h-11 font-bold"
            >
              {loading ? "Bejelentkezés..." : "Bejelentkezem"}
            </Button>
            <Link to="/" className={`text-xs ${descCls} hover:underline`}>← Vissza a főoldalra</Link>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

export default LoginForm;
