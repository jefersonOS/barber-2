export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen max-w-6xl flex-col gap-16 px-6 py-12">
      <header className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-6 py-4">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-amber-300/80">
            BarberOS
          </p>
          <h1 className="text-2xl font-semibold">SaaS para barbearias</h1>
        </div>
        <nav className="flex items-center gap-3 text-sm">
          <a
            href="/login"
            className="rounded-full border border-white/20 px-4 py-2 text-white/90 transition hover:border-amber-300/80 hover:text-white"
          >
            Entrar
          </a>
          <a
            href="/dashboard"
            className="rounded-full bg-amber-400 px-4 py-2 font-medium text-zinc-900 transition hover:bg-amber-300"
          >
            Painel
          </a>
        </nav>
      </header>

      <section className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6">
          <h2 className="text-4xl font-semibold leading-tight">
            Agendamentos com IA no WhatsApp e gestão completa do seu negócio.
          </h2>
          <p className="text-lg text-zinc-300">
            Automatize atendimento, cobrança de sinal e confirmação de agenda.
            No painel web, controle unidades, profissionais, serviços e relatórios
            em um único lugar.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="/login"
              className="rounded-full bg-amber-400 px-5 py-3 text-sm font-semibold text-zinc-900"
            >
              Começar agora
            </a>
            <a
              href="/company/dashboard"
              className="rounded-full border border-white/15 px-5 py-3 text-sm text-white/90"
            >
              Ver painel demo
            </a>
          </div>
        </div>
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <h3 className="text-lg font-semibold">Fluxo inteligente</h3>
          <ul className="mt-4 space-y-4 text-sm text-zinc-300">
            <li>
              <span className="text-amber-300">1.</span> Cliente conversa com o agente
              no WhatsApp (Evolution).
            </li>
            <li>
              <span className="text-amber-300">2.</span> IA coleta serviço, unidade,
              profissional e horário.
            </li>
            <li>
              <span className="text-amber-300">3.</span> Sinal via Stripe confirma a
              reserva automaticamente.
            </li>
            <li>
              <span className="text-amber-300">4.</span> Agenda e relatórios atualizados
              em tempo real.
            </li>
          </ul>
        </div>
      </section>

      <section className="grid gap-6 rounded-3xl border border-white/10 bg-white/5 p-6 md:grid-cols-3">
        {[
          {
            title: "Multi-tenant",
            description:
              "Cada barbearia com dados isolados, perfis e permissões por função.",
          },
          {
            title: "Financeiro",
            description:
              "Receitas, repasses e indicadores por profissional ou unidade.",
          },
          {
            title: "Relatórios",
            description:
              "Desempenho, retenção de clientes e agenda por período.",
          },
        ].map((feature) => (
          <div key={feature.title} className="space-y-2">
            <h4 className="text-base font-semibold">{feature.title}</h4>
            <p className="text-sm text-zinc-300">{feature.description}</p>
          </div>
        ))}
      </section>
    </main>
  );
}
