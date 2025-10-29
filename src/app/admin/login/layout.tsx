import { redirect } from "next/navigation";
import { auth } from "~/server/auth";

export default async function AdminLoginLayout({
  children,
}: LayoutProps<"/admin/login">) {
  const session = await auth();
  if (session?.user) redirect("/admin");

  return <>{children}</>;
}
