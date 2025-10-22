import "~/styles/globals.css";

import { type Metadata } from "next";

import { cn } from "~/lib/class-name";
import { fira, inter } from "~/styles/fonts";
import { TRPCReactProvider } from "~/trpc/react";

export const metadata: Metadata = {
  title: "Engrena TI",
  description: "Conheça sobre o curso e acompanhe as aulas.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-br" className={cn([fira.variable, inter.variable])}>
      <body>
        <TRPCReactProvider>{children}</TRPCReactProvider>
      </body>
    </html>
  );
}
