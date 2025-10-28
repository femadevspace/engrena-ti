import { cn } from "~/lib/class-name";

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn(
        "bg-foreground/10 w-full animate-pulse rounded-md",
        className,
      )}
      {...props}
    />
  );
}

export { Skeleton };
