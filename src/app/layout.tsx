import type { Metadata } from "next"
import "./globals.scss"

export const metadata: Metadata = {
  title: "Vaulter",
  description: "Vaulter game",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
