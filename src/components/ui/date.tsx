function Date({ date }: { date: Date }) {
  return (
    <time dateTime={date.toISOString()}>
      {date.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })}
    </time>
  );
}

export { Date };
