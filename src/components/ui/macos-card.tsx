import { cn } from "~/lib/class-name";

function MacOSCard({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card"
      className={cn(
        "bg-card shadow-card flex flex-col overflow-hidden rounded-xl backdrop-blur-3xl",
        className,
      )}
      {...props}
    />
  );
}

function WindowControls() {
  return (
    <div data-slot="card-window-controls" className="flex items-center gap-2">
      <div
        data-slot="close"
        className="bg-card-window-control-close shadow-card-window-control size-3 rounded-full"
      />
      <div
        data-slot="minimize"
        className="bg-card-window-control-minimize shadow-card-window-control size-3 rounded-full"
      />
      <div
        data-slot="zoom"
        className="bg-card-window-control-zoom shadow-card-window-control size-3 rounded-full"
      />
    </div>
  );
}

function MacOSCardTitlebar({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "bg-card-titlebar text-card-titlebar-foreground shadow-card-titlebar @container/card-header grid grid-cols-[1fr_auto_1fr] px-2 py-1 backdrop-blur-2xl",
        className,
      )}
      {...props}
    >
      <WindowControls />
      <h3 className="px-2.5 text-sm font-semibold">{children}</h3>
    </div>
  );
}

function MacOSCardContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("bg-card-content h-full w-full p-5", className)}
      {...props}
    />
  );
}

export { MacOSCard, MacOSCardContent, MacOSCardTitlebar };
