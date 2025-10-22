import { cn } from "~/lib/class-name";

interface Props extends React.ComponentProps<"section"> {
  id: string;
  full?: boolean;
}

function Section({ className, full = false, ...props }: Props) {
  return (
    <section
      data-slot="section"
      className={cn(
        "flex flex-col items-center justify-center gap-12 px-4 py-16",
        full ? "w-full" : "container",
        className,
      )}
      {...props}
    />
  );
}

export { Section };
