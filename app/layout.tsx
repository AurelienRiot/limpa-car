import { AuthProviders } from "@/providers/auth-providers";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ToasterProvider from "@/providers/toast-provider";
import { ThemeProvider } from "@/providers/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Limpa Car",
  description: "Nettoyage intérieur/extérieur",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <AuthProviders>
        <body className={`${inter.className} group/all debug-screens`}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {" "}
            <ToasterProvider />
            <TooltipProvider delayDuration={100}>{children}</TooltipProvider>
          </ThemeProvider>
        </body>
      </AuthProviders>
    </html>
  );
}
