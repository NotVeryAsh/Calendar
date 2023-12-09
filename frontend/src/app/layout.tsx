import type { Metadata } from 'next'
import { montserrat } from '@/app/ui/fonts';
import './globals.css'

export const metadata: Metadata = {
  title: 'Calendars',
  description: 'Calendars... But better.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={montserrat.className}>{children}</body>
    </html>
  )
}
