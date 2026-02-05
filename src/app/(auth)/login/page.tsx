export default function LoginPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-5xl items-center justify-center px-6 py-16">
      <div className="grid w-full gap-10 rounded-3xl border border-white/10 bg-white/5 p-10 lg:grid-cols-2">
        <div className="space-y-4">
          <p className="text-sm uppercase tracking-[0.3em] text-amber-300/80">
            BarberOS
          </p>
          <h1 className="text-3xl font-semibold">Acesse sua conta</h1>
          <p className="text-sm text-zinc-300">
            Entre com e-mail e senha ou continue com seu provedor social.
          </p>
          <div className="rounded-2xl border border-white/10 bg-black/30 p-4 text-sm text-zinc-300">
            Integração pronta para Supabase Auth.
          </div>
        </div>
        <form className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm text-zinc-200">E-mail</label>
            <input
              type="email"
              placeholder="voce@barbearia.com"
              className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-zinc-200">Senha</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white"
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-xl bg-amber-400 px-4 py-3 text-sm font-semibold text-zinc-900"
          >
            Entrar
          </button>
          <div className="flex items-center justify-between text-xs text-zinc-400">
            <span>Esqueceu a senha?</span>
            <span>Criar conta</span>
          </div>
        </form>
      </div>
    </main>
  );
}
