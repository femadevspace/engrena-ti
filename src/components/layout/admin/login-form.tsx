"use client";

// Utilizado em componentes client-side
import { signIn } from "next-auth/react";

import NextLink from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import {
  MacOSCard,
  MacOSCardContent,
  MacOSCardTitlebar,
} from "~/components/ui/macos-card";
import { cn } from "~/lib/class-name";

export function AdminLoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    const formData = new FormData(event.currentTarget);
    const nickname = formData.get("nickname") as string;
    const password = formData.get("password") as string;

    if (nickname.length === 0)
      return setError("O nome de usuário é obrigatório.");
    if (password.length === 0)
      return setError("A senha é obrigatória."); // prettier-ignore

    const result = await signIn("credentials", {
      redirect: false,
      nickname,
      password,
    });

    if (result?.ok && !result.error) return router.push("/admin");
    setError("Nome de usuário ou senha incorretos.");
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <MacOSCard>
        <MacOSCardTitlebar>Login Administrador</MacOSCardTitlebar>
        <MacOSCardContent>
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="nickname">Nome de usuário</Label>
              <Input id="nickname" name="nickname" type="text" required />
            </div>

            <div className="grid gap-3">
              <Label htmlFor="password">Senha</Label>
              <Input id="password" name="password" type="password" required />
            </div>

            {error && (
              <p className="text-destructive text-sm" role="alert">
                {error}
              </p>
            )}

            <div className="grid grid-cols-2 gap-4">
              <Button variant={"link"} asChild>
                <NextLink href={"/"}>Voltar</NextLink>
              </Button>
              <Button type="submit">Entrar</Button>
            </div>
          </form>
        </MacOSCardContent>
      </MacOSCard>
    </div>
  );
}
