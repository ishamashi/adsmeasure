// src/components/marketing/Navbar.tsx
import Link from "next/link";
import { BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/Button"; // <-- Impor Button

export function Navbar() {
  return (
    <nav className="fixed top-0 w-full bg-slate-950/80 backdrop-blur-lg border-b border-slate-800 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-brand rounded-lg flex items-center justify-center">
            <BarChart3 className="w-6 h-6" />
          </div>
          <span className="text-xl font-bold font-display">adsMeasure</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link href="#solutions" className="text-slate-300 hover:text-white transition">
            Solutions
          </Link>
          <Link href="#features" className="text-slate-300 hover:text-white transition">
            Features
          </Link>
          <Link href="#pricing" className="text-slate-300 hover:text-white transition">
            Pricing
          </Link>
          <Link href="#contact" className="text-slate-300 hover:text-white transition">
            Contact
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" className="text-slate-300 hover:text-white">
            Login
          </Button>
          <Button className="bg-gradient-brand font-semibold hover:shadow-glow">Get Started</Button>
        </div>
      </div>
    </nav>
  );
}
