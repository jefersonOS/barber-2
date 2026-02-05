const services = [
  { name: "Corte masculino", price: "R$ 60", duration: "45 min" },
  { name: "Barba", price: "R$ 40", duration: "30 min" },
  { name: "Combo premium", price: "R$ 90", duration: "75 min" },
];

export default function ServicesPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-6xl flex-col gap-8 px-6 py-16">
      <header className="flex items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-amber-300/80">
            Serviços
          </p>
          <h1 className="text-3xl font-semibold">Catálogo</h1>
        </div>
        <button className="rounded-full bg-amber-400 px-4 py-2 text-sm font-semibold text-zinc-900">
          Novo serviço
        </button>
      </header>
      <section className="grid gap-4">
        {services.map((service) => (
          <div
            key={service.name}
            className="rounded-2xl border border-white/10 bg-white/5 p-5"
          >
            <h2 className="text-lg font-semibold">{service.name}</h2>
            <p className="mt-2 text-sm text-zinc-300">
              {service.duration} · {service.price}
            </p>
          </div>
        ))}
      </section>
    </main>
  );
}
