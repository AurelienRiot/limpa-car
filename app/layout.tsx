import { AuthProviders } from "@/providers/auth-providers";
import "./globals.css";
import type { Metadata } from "next";
import { Fira_Mono, Inter, Oswald, Source_Code_Pro } from "next/font/google";
import ToasterProvider from "@/providers/toast-provider";
import { ThemeProvider } from "@/providers/theme-provider";
import dynamic from "next/dynamic";
const DynamicTooltipProvider = dynamic(
  () => import("@/components/ui/tooltip"),
  { ssr: false },
);

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
});

const sourceCodePro = Source_Code_Pro({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-source-code-pro",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});
const firaMono = Fira_Mono({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-fira-mono",
});

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
        <body
          className={`${inter.variable} ${firaMono.variable} ${oswald.variable} ${sourceCodePro.variable} group/all debug-screens font-Inter `}
        >
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {" "}
            <ToasterProvider />
            <DynamicTooltipProvider delayDuration={100}>
              {children}
            </DynamicTooltipProvider>
          </ThemeProvider>
        </body>
      </AuthProviders>
    </html>
  );
}
