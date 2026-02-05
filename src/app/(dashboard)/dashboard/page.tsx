const cards = [
  {
    title: "Owner",
    description: "Gerencie empresas, planos e acesso global.",
    href: "/owner/companies",
  },
  {
    title: "Admin da empresa",
    description: "Controle agenda, serviços, profissionais e financeiro.",
    href: "/company/dashboard",
  },
  {
    title: "Profissional",
    description: "Acompanhe seus clientes e horários confirmados.",
    href: "/company/appointments",
  },
];

export default function DashboardPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-6xl flex-col gap-10 px-6 py-16">
      <header className="space-y-3">
        <p className="text-sm uppercase tracking-[0.3em] text-amber-300/80">
          Painel central
        </p>
        <h1 className="text-3xl font-semibold">Escolha o contexto</h1>
        <p className="text-zinc-300">
          Esta área será direcionada pelo perfil do usuário após autenticação.
        </p>
      </header>
      <section className="grid gap-6 md:grid-cols-3">
        {cards.map((card) => (
          <a
            key={card.title}
            href={card.href}
            className="rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:border-amber-300/50"
          >
            <h2 className="text-lg font-semibold">{card.title}</h2>
            <p className="mt-2 text-sm text-zinc-300">{card.description}</p>
          </a>
        ))}
      </section>
    </main>
  );
}
