import './globals.css';

import { Inter } from 'next/font/google';
import { ClerkProvider } from "@clerk/nextjs";
import { esES } from '@clerk/localizations';
import { shadesOfPurple } from '@clerk/themes';

import { ModalProvider } from '@/providers/modal-provider'
import { ToasterProvider } from '@/providers/toast-provider'
import { ThemeProvider } from '@/providers/theme-provider'

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'NebulaCMS',
  description: 'Mas que un CMS, una plataforma de comercio electrónico',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      localization={esES}
      appearance={{
        baseTheme: shadesOfPurple,
        signIn: { baseTheme: shadesOfPurple },
        signUp: { baseTheme: shadesOfPurple },
        layout: {
          socialButtonsPlacement: "bottom",
          socialButtonsVariant: "iconButton",
          logoPlacement: "inside",
        },
      }}
    >
      <html lang="es" suppressHydrationWarning>
        <body className={inter.className}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <ToasterProvider />
            <ModalProvider />
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}