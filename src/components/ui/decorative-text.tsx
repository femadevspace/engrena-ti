import { cn } from "~/lib/class-name";

interface Props extends React.ComponentProps<"span"> {
  leading?: string;
  trailing?: string;
}

function Decoration({
  children,
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      aria-hidden="true"
      className={cn("text-accent select-none", className)}
      {...props}
    >
      {children}
    </span>
  );
}

function DecorativeText({
  leading,
  trailing,
  children,
  className,
  ...props
}: Props) {
  return (
    <span
      className={cn("mx-2 inline-flex items-baseline", className)}
      {...props}
    >
      {leading && <Decoration>{leading}</Decoration>}
      {children}
      {trailing && <Decoration>{trailing}</Decoration>}
    </span>
  );
}

function CurlyBrackets({ children, ...props }: React.ComponentProps<"span">) {
  return (
    <DecorativeText leading="{" trailing="}" {...props}>
      {children}
    </DecorativeText>
  );
}

export { CurlyBrackets, Decoration, DecorativeText };
