const professionals = [
  { name: "Lucas Silva", role: "Barbeiro", status: "Ativo" },
  { name: "Marina Costa", role: "Colorista", status: "Ativo" },
  { name: "João Mendes", role: "Barbeiro", status: "Férias" },
];

export default function ProfessionalsPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-6xl flex-col gap-8 px-6 py-16">
      <header className="flex items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-amber-300/80">
            Profissionais
          </p>
          <h1 className="text-3xl font-semibold">Equipe</h1>
        </div>
        <button className="rounded-full bg-amber-400 px-4 py-2 text-sm font-semibold text-zinc-900">
          Novo profissional
        </button>
      </header>
      <section className="grid gap-4">
        {professionals.map((pro) => (
          <div
            key={pro.name}
            className="rounded-2xl border border-white/10 bg-white/5 p-5"
          >
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold">{pro.name}</h2>
                <p className="text-sm text-zinc-300">{pro.role}</p>
              </div>
              <span className="rounded-full border border-white/20 px-3 py-1 text-xs text-zinc-200">
                {pro.status}
              </span>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
