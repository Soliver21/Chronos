import React, { useRef, useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { registUser } from '../../services/auth.service';
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import type { RegisterType } from '../../types/user.types';

const init: RegisterType = { name: "", email: "", password: "" };

const RegisterComp = () => {
  const [form, setForm] = useState<RegisterType>(init);
  const { login } = useAuth();
  const { theme } = useTheme();
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
    if (!form.name) return nameRef.current?.focus();
    if (!form.email) return emailRef.current?.focus();
    if (!form.password) return passwdRef.current?.focus();
    try {
      const res = await registUser(form);
      login(res.user, res.token);
      setForm(init);
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      alert("Hiba történt a regisztráció során.");
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

  return (
    <div className={`min-h-screen flex items-center justify-center px-4 transition-colors duration-300 ${pageBg}`}>
      <Card className={`w-full max-w-sm shadow-2xl border ${cardBg}`}>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center font-bold">Fiók létrehozása</CardTitle>
          <CardDescription className={`text-center ${descCls}`}>
            Add meg az adataidat a regisztrációhoz
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="grid gap-4 p-4">
            {[
              { id: "name", name: "name", label: "Név", type: "text", placeholder: "Kovács János", ref: nameRef, value: form.name },
              { id: "email", name: "email", label: "Email", type: "email", placeholder: "m@example.com", ref: emailRef, value: form.email },
              { id: "password", name: "password", label: "Jelszó", type: "password", placeholder: "********", ref: passwdRef, value: form.password },
            ].map(({ id, name, label, type, placeholder, ref, value }) => (
              <div key={id} className="grid gap-2">
                <Label htmlFor={id} className={labelCls}>{label}</Label>
                <Input id={id} name={name} type={type} placeholder={placeholder}
                  ref={ref} value={value} onChange={handleChange}
                  className={`focus:ring-2 ${inputCls}`} />
              </div>
            ))}
          </CardContent>
          <CardFooter className="flex flex-col gap-3">
            <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold h-11">
              Regisztráció
            </Button>
            <div className={`text-sm text-center ${descCls}`}>
              Van már fiókod?{" "}
              <Link to="/login" className={`underline underline-offset-4 font-semibold ${linkCls}`}>
                Jelentkezz be
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default RegisterComp;