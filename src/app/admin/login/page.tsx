import NextLink from "next/link";
import { AdminLoginForm } from "~/components/layout/admin/login-form";

export default function AdminLoginPage() {
  return (
    <main
      className="flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10"
      style={{
        background:
          "radial-gradient(50% 50% at 50% 50%, #001540 0%, #011224 100%)",
      }}
    >
      <div className="flex w-full max-w-sm flex-col gap-6">
        <h1 className="flex justify-center text-center">
          <NextLink
            href={"/"}
            className="flex items-center self-center font-bold"
          >
            Engrena<span className="text-accent">TI</span>
          </NextLink>
        </h1>

        <AdminLoginForm />
      </div>
    </main>
  );
}
