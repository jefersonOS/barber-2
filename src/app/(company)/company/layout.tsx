"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  Calendar,
  LayoutDashboard,
  Scissors,
  Users,
  BarChart3,
  Settings,
} from "lucide-react";

const navItems = [
  { label: "Painel", href: "/company/dashboard", icon: LayoutDashboard },
  { label: "Agenda", href: "/company/appointments", icon: Calendar },
  { label: "Serviços", href: "/company/services", icon: Scissors },
  { label: "Profissionais", href: "/company/professionals", icon: Users },
  { label: "Relatórios", href: "/company/reports", icon: BarChart3 },
  { label: "Configurações", href: "/company/settings", icon: Settings },
];

export default function CompanyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="mx-auto flex min-h-screen max-w-7xl">
        <aside className="hidden w-64 flex-col border-r border-white/10 bg-black/30 p-6 md:flex">
          <div className="mb-6">
            <h2 className="text-lg font-semibold">BarberSaaS</h2>
            <p className="text-xs text-zinc-400">Área da empresa</p>
          </div>
          <nav className="flex flex-col gap-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-xl px-3 py-2 text-sm transition hover:bg-white/10 hover:text-white ${
                  pathname === item.href
                    ? "bg-white/10 text-white"
                    : "text-zinc-300"
                }`}
              >
                <item.icon className="mr-2 h-4 w-4" />
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="mt-auto pt-6 text-xs text-zinc-500">
            Planejamento e operação
          </div>
        </aside>
        <div className="flex-1">
          <header className="flex items-center justify-between border-b border-white/10 px-6 py-4 md:hidden">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-amber-300/80">
                BarberSaaS
              </p>
              <p className="text-sm text-zinc-300">Área da empresa</p>
            </div>
            <button
              type="button"
              onClick={() => setOpen((prev) => !prev)}
              className="rounded-lg border border-white/10 px-3 py-2 text-xs text-zinc-200"
            >
              Menu
            </button>
          </header>
          {open && (
            <div className="border-b border-white/10 bg-black/40 px-6 py-4 md:hidden">
              <nav className="flex flex-col gap-2">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={`rounded-xl px-3 py-2 text-sm transition hover:bg-white/10 hover:text-white ${
                      pathname === item.href
                        ? "bg-white/10 text-white"
                        : "text-zinc-300"
                    }`}
                  >
                    <item.icon className="mr-2 h-4 w-4" />
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>
          )}
          {children}
        </div>
      </div>
    </div>
  );
}
