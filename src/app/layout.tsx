import type { Metadata } from 'next';
import './globals.css';
import { MatchesProvider } from '@/context/matches-provider';
import Header from '@/components/header';
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: 'SkillSwap',
  description: 'Swap skills with talented people near you.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=Space+Grotesk:wght@400;500;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <MatchesProvider>
          <Header />
          <main className="pt-16 min-h-[calc(100vh-4rem)]">
            {children}
          </main>
          <Toaster />
        </MatchesProvider>
      </body>
    </html>
  );
}
