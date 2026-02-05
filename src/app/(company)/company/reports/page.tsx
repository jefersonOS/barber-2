const reports = [
  {
    title: "Desempenho por profissional",
    description: "Receita, ticket médio e taxa de retorno.",
  },
  {
    title: "Eficiência da agenda",
    description: "Ocupação diária e cancelamentos.",
  },
  {
    title: "Canais de aquisição",
    description: "Origem dos clientes e conversão do WhatsApp.",
  },
];

export default function ReportsPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-6xl flex-col gap-8 px-6 py-16">
      <header className="space-y-2">
        <p className="text-sm uppercase tracking-[0.3em] text-amber-300/80">
          Relatórios
        </p>
        <h1 className="text-3xl font-semibold">Insights de performance</h1>
      </header>
      <section className="grid gap-4">
        {reports.map((report) => (
          <div
            key={report.title}
            className="rounded-2xl border border-white/10 bg-white/5 p-5"
          >
            <h2 className="text-lg font-semibold">{report.title}</h2>
            <p className="mt-2 text-sm text-zinc-300">{report.description}</p>
          </div>
        ))}
      </section>
    </main>
  );
}
