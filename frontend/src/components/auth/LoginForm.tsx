import { Link } from "react-router-dom" // Fontos import a navigációhoz
import { Button } from "../ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card"
import { Input } from "../ui/input"
import { Label } from "../ui/label"

export function LoginForm() {
  return (
    <div className="flex items-center justify-center min-h-screen"> 
      {/* A fenti div csak azért van, hogy középre tegye a kártyát az oldalon */}
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
          <CardAction>
            {/* Átalakítva: A Sign Up gomb mostantól egy Link */}
            <Button variant="link" asChild>
              <Link to="/register">Sign Up</Link>
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <form onSubmit={(e) => e.preventDefault()}> 
            {/* preventDefault: hogy ne töltődjön újra az oldal gombnyomásra */}
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
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
                <Input id="password" type="password" required />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          {/* A tényleges bejelentkezés gomb (marad submit típusú) */}
          <Button type="submit" className="w-full">
            Login
          </Button>
          
          <Button variant="outline" className="w-full">
            Login with Google
          </Button>

          {/* Opcionális: Vissza a főoldalra gomb */}
          <Button variant="ghost" className="w-full text-xs" asChild>
            <Link to="/">← Back to home</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default LoginForm;