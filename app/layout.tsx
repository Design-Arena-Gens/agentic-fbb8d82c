import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Football Quiz - Learn Football Match Details',
  description: 'Duolingo-style app for learning football match details',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
