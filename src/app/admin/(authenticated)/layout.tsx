import { redirect } from "next/navigation";
import { AdminSidebar } from "~/components/layout/admin/sidebar";
import { SidebarInset, SidebarProvider } from "~/components/ui/sidebar";
import { auth } from "~/server/auth";

export default async function AdminAuthenticatedLayout({
  children,
}: LayoutProps<"/admin">) {
  const session = await auth();
  if (!session?.user) return redirect("/");

  return (
    <SidebarProvider>
      <AdminSidebar session={session} />
      <SidebarInset
        className="p-2"
        style={{
          background:
            "radial-gradient(50% 50% at 50% 50%, #001540 0%, #011224 100%)",
        }}
      >
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
