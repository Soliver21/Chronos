import React, { useRef, useState } from 'react';
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import type { RegisterType } from '../../types/user.types';
import { registUser } from '../../services/auth.service';

const init: RegisterType = {
    name: "",
    email: "",
    password: ""
};

const RegisterComp = () => {
    const [form, setForm] = useState<RegisterType>(init);
    const nameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwdRef = useRef<HTMLInputElement>(null);

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setForm(prev => ({...prev, [name]: value}));
    }
    const navigate = useNavigate()
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        if (!form.name) {
            nameRef.current?.focus();
            return alert("Kérjük, adja meg a nevét!");
        }
        if (!form.email) {
            emailRef.current?.focus();
            return alert("Kérjük, adja meg az email címét!");
        }
        if (!form.password) {
            passwdRef.current?.focus();
            return alert("Kérjük, adjon meg egy jelszót!");
        }

        try {
            const res = await registUser(form);
            setForm(init);
            console.log("Sikeres regisztráció:", res);
            alert("Sikeres regisztráció!");
             navigate("/dashboard");
        } catch(error) {
            console.error("Hiba a kérésnél:", error);
            alert("Hiba történt a regisztráció során.");
        }
    }

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <Card className="w-full max-w-sm">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center">Fiók létrehozása</CardTitle>
          <CardDescription className="text-center">
            Add meg az adataidat a regisztrációhoz
          </CardDescription>
        </CardHeader>
        
        <form onSubmit={handleSubmit}>
          <CardContent className="grid gap-4 p-6">
            <div className="grid gap-2">
              <Label htmlFor="name">Név</Label>
              <Input 
                id="name"
                name="name"
                type="text" 
                placeholder="Kovács János" 
                ref={nameRef}
                value={form.name}
                onChange={handleChange}
              />
            </div>
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
              <Label htmlFor="password">Jelszó</Label>
              <Input 
                id="password"
                name="password"
                type="password" 
                ref={passwdRef}
                value={form.password}
                onChange={handleChange}
              />
            </div>
          </CardContent>
          
          <CardFooter className="flex flex-col gap-3">
            <Button type="submit" className="w-full">
              Regisztráció
            </Button>
            <div className="text-sm text-center text-muted-foreground">
              Van már fiókod?{" "}
              <Link to="/login" className="text-primary underline underline-offset-4">
                Jelentkezz be
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

export default RegisterComp;