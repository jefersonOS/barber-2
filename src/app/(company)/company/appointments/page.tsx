const appointments = [
  {
    client: "Carlos Oliveira",
    service: "Corte + Barba",
    time: "10:30",
    professional: "Lucas Silva",
    status: "Confirmado",
  },
  {
    client: "Ana Ribeiro",
    service: "Corte feminino",
    time: "11:15",
    professional: "Marina Costa",
    status: "Sinal pendente",
  },
];

export default function AppointmentsPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-6xl flex-col gap-8 px-6 py-16">
      <header className="space-y-2">
        <p className="text-sm uppercase tracking-[0.3em] text-amber-300/80">
          Agenda
        </p>
        <h1 className="text-3xl font-semibold">Agendamentos do dia</h1>
      </header>
      <section className="grid gap-4">
        {appointments.map((appointment) => (
          <div
            key={`${appointment.client}-${appointment.time}`}
            className="rounded-2xl border border-white/10 bg-white/5 p-5"
          >
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold">{appointment.client}</h2>
                <p className="text-sm text-zinc-300">
                  {appointment.service} · {appointment.time}
                </p>
                <p className="text-xs text-zinc-400">
                  Profissional: {appointment.professional}
                </p>
              </div>
              <span className="rounded-full border border-white/20 px-3 py-1 text-xs text-zinc-200">
                {appointment.status}
              </span>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
