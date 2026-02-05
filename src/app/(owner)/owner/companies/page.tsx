const companies = [
  {
    name: "Barbearia Central",
    status: "Ativa",
    plan: "Pro",
    admins: 2,
  },
  {
    name: "Studio Corte Fino",
    status: "Trial",
    plan: "Starter",
    admins: 1,
  },
];

export default function OwnerCompaniesPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-6xl flex-col gap-8 px-6 py-16">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-2">
          <p className="text-sm uppercase tracking-[0.3em] text-amber-300/80">
            Owner
          </p>
          <h1 className="text-3xl font-semibold">Empresas cadastradas</h1>
          <p className="text-sm text-zinc-300">
            Visão global do ecossistema e status de contratação.
          </p>
        </div>
        <button className="rounded-full bg-amber-400 px-4 py-2 text-sm font-semibold text-zinc-900">
          Nova empresa
        </button>
      </header>
      <section className="grid gap-4">
        {companies.map((company) => (
          <div
            key={company.name}
            className="rounded-2xl border border-white/10 bg-white/5 p-5"
          >
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold">{company.name}</h2>
                <p className="text-sm text-zinc-300">
                  Plano {company.plan} · {company.admins} admins
                </p>
              </div>
              <span className="rounded-full border border-white/20 px-3 py-1 text-xs text-zinc-200">
                {company.status}
              </span>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
