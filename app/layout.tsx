import './globals.css'

import { Inter } from 'next/font/google'
import { ClerkProvider } from "@clerk/nextjs"



import { ModalProvider } from '@/providers/modal-provider'
import { ToasterProvider } from '@/providers/toast-provider'
import { ThemeProvider } from '@/providers/theme-provider'

const inter = Inter({ subsets: ['latin'] })

export const Metadata = {
  title: 'Admin Dashboard',
  description: 'Admin Dashboard',
}

/* The `export default function RootLayout({ children }: { children: React.ReactNode })` is defining a
functional component called `RootLayout`. It takes an object as a parameter with a property
`children` of type `React.ReactNode`. This component is used as a layout wrapper for other
components, where the `children` prop represents the content that will be rendered inside the
`RootLayout` component. */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {


  
  return (
    /* The `<ClerkProvider>` component is a wrapper component that provides authentication and user
    management functionality to the application. It sets up the necessary context and hooks for
    interacting with the Clerk authentication system. */
    <ClerkProvider>
      <html lang="es">
        <body className={inter.className}>
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
          >
            <ToasterProvider />
            <ModalProvider />
            {children}
          </ThemeProvider>
          </body>
      </html>
    </ClerkProvider>
  )
  
}
