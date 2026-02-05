const metrics = [
  { label: "Agendamentos hoje", value: "24" },
  { label: "Receita do mês", value: "R$ 32.450" },
  { label: "Sinal pendente", value: "R$ 1.280" },
];

export default function CompanyDashboardPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-6xl flex-col gap-10 px-6 py-16">
      <header className="space-y-2">
        <p className="text-sm uppercase tracking-[0.3em] text-amber-300/80">
          Admin da empresa
        </p>
        <h1 className="text-3xl font-semibold">Visão geral</h1>
        <p className="text-sm text-zinc-300">
          Monitore agenda, financeiro e desempenho da equipe.
        </p>
      </header>
      <section className="grid gap-4 md:grid-cols-3">
        {metrics.map((item) => (
          <div
            key={item.label}
            className="rounded-2xl border border-white/10 bg-white/5 p-6"
          >
            <p className="text-sm text-zinc-300">{item.label}</p>
            <h2 className="mt-2 text-2xl font-semibold">{item.value}</h2>
          </div>
        ))}
      </section>
    </main>
  );
}
