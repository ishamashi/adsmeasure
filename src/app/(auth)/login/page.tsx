// src/app/(auth)/login/page.tsx
import { LoginForm } from "./_components/login-form";
import { BarChart3 } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 p-6">
      <div className="w-full max-w-md space-y-8">
        <Link href="/" className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-brand">
          <BarChart3 className="h-8 w-8 text-white" />
        </Link>
        <div className="text-center text-white">
          <h1 className="text-3xl font-bold font-display">Welcome to UrbanCounting</h1>
          <p className="mt-2 text-slate-400">Please sign in to access the platform.</p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
