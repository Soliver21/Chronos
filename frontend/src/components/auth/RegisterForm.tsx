import React, { useRef, useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { registUser } from '../../services/auth.service';
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import { useToast } from "../../context/ToastContext";
import type { RegisterType } from '../../types/user.types';

const init: RegisterType = { name: "", email: "", password: "" };

const RegisterComp = () => {
  const [form, setForm] = useState<RegisterType>(init);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const { theme } = useTheme();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const isDark = theme === "dark";

  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwdRef = useRef<HTMLInputElement>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.name) { nameRef.current?.focus(); return; }
    if (!form.email) { emailRef.current?.focus(); return; }
    if (!form.password) { passwdRef.current?.focus(); return; }
    setLoading(true);
    try {
      const res = await registUser(form);
      login(res.user, res.token);
      showToast("Sikeres regisztráció! Üdvözlünk a Chronos-ban", "success");
      setForm(init);
      navigate("/dashboard");
    } catch (error: any) {
      console.error(error);
      const msg = error?.response?.data?.message || "Hiba történt a regisztráció során.";
      showToast(msg, "error");
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
  const linkCls = isDark ? "text-indigo-400" : "text-indigo-600";
  const eyeCls = isDark ? "text-gray-500 hover:text-gray-300" : "text-gray-400 hover:text-gray-600";

  // Mezők definíciója - jelszó külön kezeljük a szem ikonhoz
  const regularFields = [
    { id: "name", name: "name", label: "Teljes név", type: "text", placeholder: "Kovács János", ref: nameRef, value: form.name },
    { id: "email", name: "email", label: "E-mail cím", type: "email", placeholder: "m@example.com", ref: emailRef, value: form.email },
  ];

  return (
    <div className={`min-h-screen flex items-center justify-center px-4 transition-colors duration-300 ${pageBg}`}>
      <Card className={`w-full max-w-sm shadow-2xl border ${cardBg}`}>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center font-bold">Fiók létrehozása</CardTitle>
          <CardDescription className={`text-center ${descCls}`}>
            Adja meg adatait a regisztrációhoz
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="grid gap-4 p-4">
            {/* Név és email mezők */}
            {regularFields.map(({ id, name, label, type, placeholder, ref, value }) => (
              <div key={id} className="grid gap-2">
                <Label htmlFor={id} className={labelCls}>{label}</Label>
                <Input
                  id={id} name={name} type={type} placeholder={placeholder}
                  ref={ref} value={value} onChange={handleChange}
                  className={`focus:ring-2 ${inputCls}`}
                />
              </div>
            ))}

            {/* Jelszó mező szem ikonnal */}
            <div className="grid gap-2">
              <Label htmlFor="password" className={labelCls}>Jelszó</Label>
              <div className="relative">
                <Input
                  id="password" name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  ref={passwdRef} value={form.password} onChange={handleChange}
                  className={`focus:ring-2 pr-10 ${inputCls}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(v => !v)}
                  className={`absolute right-3 top-1/2 -translate-y-1/2 transition-colors ${eyeCls}`}
                  tabIndex={-1}
                  aria-label={showPassword ? "Jelszó elrejtése" : "Jelszó megjelenítése"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-3">
            <Button
              type="submit" disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold h-11"
            >
              {loading ? "Regisztráció..." : "Regisztráció"}
            </Button>
            <div className={`text-sm text-center ${descCls}`}>
              Van már fiókja?{" "}
              <Link to="/login" className={`underline underline-offset-4 font-semibold ${linkCls}`}>
                Jelentkezzen be
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default RegisterComp;