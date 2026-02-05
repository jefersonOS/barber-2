const sections = [
  {
    title: "Visão global",
    description: "Empresas ativas, crescimento e churn.",
  },
  {
    title: "Planos e billing",
    description: "Controle de assinaturas e repasses.",
  },
  {
    title: "Compliance",
    description: "Logs, acessos e auditoria.",
  },
  {
    title: "Operação",
    description: "Filas de suporte e alertas críticos.",
  },
];

export default function PlatformAdminPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-6xl flex-col gap-8 px-6 py-16">
      <header className="space-y-2">
        <p className="text-sm uppercase tracking-[0.3em] text-amber-300/80">
          Platform Admin
        </p>
        <h1 className="text-3xl font-semibold">Administração da plataforma</h1>
        <p className="text-sm text-zinc-300">
          Monitoramento e controles globais do SaaS.
        </p>
      </header>
      <section className="grid gap-4 md:grid-cols-2">
        {sections.map((section) => (
          <div
            key={section.title}
            className="rounded-2xl border border-white/10 bg-white/5 p-5"
          >
            <h2 className="text-lg font-semibold">{section.title}</h2>
            <p className="mt-2 text-sm text-zinc-300">{section.description}</p>
          </div>
        ))}
      </section>
    </main>
  );
}
