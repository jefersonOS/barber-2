const units = [
  { name: "Unidade Centro", city: "São Paulo", rooms: 6 },
  { name: "Unidade Pinheiros", city: "São Paulo", rooms: 4 },
];

export default function UnitsPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-6xl flex-col gap-8 px-6 py-16">
      <header className="flex items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-amber-300/80">
            Unidades
          </p>
          <h1 className="text-3xl font-semibold">Locais de atendimento</h1>
        </div>
        <button className="rounded-full bg-amber-400 px-4 py-2 text-sm font-semibold text-zinc-900">
          Nova unidade
        </button>
      </header>
      <section className="grid gap-4">
        {units.map((unit) => (
          <div
            key={unit.name}
            className="rounded-2xl border border-white/10 bg-white/5 p-5"
          >
            <h2 className="text-lg font-semibold">{unit.name}</h2>
            <p className="mt-2 text-sm text-zinc-300">
              {unit.city} · {unit.rooms} cadeiras
            </p>
          </div>
        ))}
      </section>
    </main>
  );
}
