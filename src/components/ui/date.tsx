function formatDate(date: Date): string {
  const now = new Date();

  const seconds = Math.round((now.getTime() - date.getTime()) / 1000);
  if (seconds < 60) return "Agora mesmo";

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `Há ${minutes} minuto${minutes > 1 ? "s" : ""}`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `Há ${hours} hora${hours > 1 ? "s" : ""}`;

  const days = Math.floor(hours / 24);
  if (days === 1)
    return `Ontem às ${date.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    })}`;

  return date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function DateComponent({ date }: { date: Date }) {
  return <time dateTime={date.toISOString()}>{formatDate(date)}</time>;
}

export { DateComponent as Date };
