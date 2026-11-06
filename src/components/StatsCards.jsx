function StatsCards({ stats }) {
  const cards = [
    { label: "Total tasks", value: stats.total },
    { label: "Completed", value: stats.completed },
    { label: "Pending", value: stats.pending },
    { label: "Completed %", value: `${stats.percent}%` },
  ];

  return (
    <section className="grid grid-cols-2 gap-3 md:grid-cols-4">
      {cards.map((card) => (
        <div key={card.label} className="rounded-lg bg-white p-4 shadow">
          <p className="text-sm text-slate-500">{card.label}</p>
          <p className="text-3xl font-bold">{card.value}</p>
        </div>
      ))}
    </section>
  );
}

export default StatsCards;