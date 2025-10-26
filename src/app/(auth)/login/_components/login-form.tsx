// src/app/(auth)/login/_components/login-form.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import api from "@/lib/api";
import Cookies from "js-cookie";

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@urbancounting.com"); // pre-fill untuk dev
  const [password, setPassword] = useState("passwordyangkuat123"); // pre-fill untuk dev
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    // =================================================================
    // 👇 TAMBAHKAN BARIS INI UNTUK DEBUGGING
    console.log("Mencoba mengirim request ke:", api.defaults.baseURL + "/auth/login");
    // =================================================================

    try {
      const response = await api.post("/auth/login", { email, password });

      // Login berhasil, backend akan mengirimkan token
      const { token, user } = response.data;

      // Simpan token di cookie
      Cookies.set("token", token, { expires: 1, secure: process.env.NODE_ENV === "production" });
      // Anda juga bisa menyimpan info user di localStorage jika perlu diakses di banyak tempat
      localStorage.setItem("user", JSON.stringify(user));

      // Arahkan ke dashboard
      router.push("/dashboard");
    } catch (err: any) {
      console.error("Login failed:", err);
      setError(err.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="rounded-xl border border-slate-700 bg-slate-800/50 p-8">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300" htmlFor="email">
              Email
            </label>
            <input className="mt-1 block w-full rounded-button border-slate-600 bg-slate-700 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary" id="email" type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300" htmlFor="password">
              Password
            </label>
            <input className="mt-1 block w-full rounded-button border-slate-600 bg-slate-700 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary" id="password" type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
        </div>
        {error && (
          <div className="mt-4 text-sm text-red-400">
            <p>{error}</p>
          </div>
        )}
      </div>
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Signing In..." : "Sign In"}
      </Button>
    </form>
  );
}
