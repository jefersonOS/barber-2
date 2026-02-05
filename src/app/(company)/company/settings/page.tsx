const settings = [
  {
    title: "Perfil da empresa",
    description: "Nome, slug, plano e branding.",
  },
  {
    title: "Notificações",
    description: "Confirmações, lembretes e avisos internos.",
  },
  {
    title: "Pagamentos",
    description: "Configuração do Stripe e políticas de sinal.",
  },
  {
    title: "Integrações",
    description: "Evolution, webhooks e automações.",
  },
];

export default function CompanySettingsPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-6xl flex-col gap-8 px-6 py-16">
      <header className="space-y-2">
        <p className="text-sm uppercase tracking-[0.3em] text-amber-300/80">
          Configurações
        </p>
        <h1 className="text-3xl font-semibold">Ajustes do negócio</h1>
        <p className="text-sm text-zinc-300">
          Centralize configurações e integrações da empresa.
        </p>
      </header>
      <section className="grid gap-4">
        {settings.map((item) => (
          <div
            key={item.title}
            className="rounded-2xl border border-white/10 bg-white/5 p-5"
          >
            <h2 className="text-lg font-semibold">{item.title}</h2>
            <p className="mt-2 text-sm text-zinc-300">{item.description}</p>
          </div>
        ))}
      </section>
    </main>
  );
}
