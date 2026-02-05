"use client";

import { useMemo, useState } from "react";
import { getSupabaseClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const supabase = useMemo(() => getSupabaseClient(), []);
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus(null);

    if (!supabase) {
      setStatus({
        type: "error",
        message: "Supabase não configurado. Verifique o .env.local.",
      });
      return;
    }

    setLoading(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });

        if (error) {
          throw error;
        }

        setStatus({
          type: "success",
          message: "Conta criada! Verifique seu e-mail para confirmar.",
        });
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          throw error;
        }

        setStatus({
          type: "success",
          message: "Login realizado com sucesso.",
        });
      }
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Falha ao autenticar.";
      setStatus({ type: "error", message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="mx-auto flex min-h-screen max-w-5xl items-center justify-center px-6 py-16">
      <div className="grid w-full gap-10 rounded-3xl border border-white/10 bg-white/5 p-10 lg:grid-cols-2">
        <div className="space-y-4">
          <p className="text-sm uppercase tracking-[0.3em] text-amber-300/80">
            BarberOS
          </p>
          <h1 className="text-3xl font-semibold">
            {mode === "signup" ? "Crie sua conta" : "Acesse sua conta"}
          </h1>
          <p className="text-sm text-zinc-300">
            {mode === "signup"
              ? "Cadastre-se para começar a operar sua barbearia."
              : "Entre com e-mail e senha ou continue com seu provedor social."}
          </p>
          <div className="rounded-2xl border border-white/10 bg-black/30 p-4 text-sm text-zinc-300">
            Integração pronta para Supabase Auth.
          </div>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label className="text-sm text-zinc-200">E-mail</label>
            <input
              type="email"
              placeholder="voce@barbearia.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-zinc-200">Senha</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white"
              required
              minLength={6}
            />
          </div>
          {status && (
            <div
              className={`rounded-xl border px-4 py-3 text-xs ${
                status.type === "success"
                  ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-200"
                  : "border-red-400/30 bg-red-400/10 text-red-200"
              }`}
            >
              {status.message}
            </div>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-amber-400 px-4 py-3 text-sm font-semibold text-zinc-900 transition disabled:opacity-70"
          >
            {loading
              ? "Processando..."
              : mode === "signup"
              ? "Criar conta"
              : "Entrar"}
          </button>
          <div className="flex items-center justify-between text-xs text-zinc-400">
            <span>{mode === "signin" ? "Esqueceu a senha?" : ""}</span>
            <button
              type="button"
              onClick={() =>
                setMode((current) =>
                  current === "signin" ? "signup" : "signin"
                )
              }
              className="cursor-pointer text-amber-200 transition hover:text-amber-100"
            >
              {mode === "signin" ? "Criar conta" : "Já tenho conta"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
