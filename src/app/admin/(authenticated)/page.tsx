import {
  MacOSCard,
  MacOSCardContent,
  MacOSCardTitlebar,
} from "~/components/ui/macos-card";

export default function AdminAuthenticatedPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <div className="flex flex-col gap-6">
          <MacOSCard>
            <MacOSCardTitlebar>Área Administrativa</MacOSCardTitlebar>
            <MacOSCardContent>
              <p className="text-base">
                Acesse as funcionalidades administrativas através do menu
                lateral.
              </p>
            </MacOSCardContent>
          </MacOSCard>
        </div>
      </div>
    </div>
  );
}
