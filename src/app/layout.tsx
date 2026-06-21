import type { Metadata } from 'next'
import './globals.css'
import BackToTop from '@/components/BackToTop'
import { ExpToastProvider } from '@/components/ExpToast'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'AI Wizard Tool - Discover & Compare AI Coding Tools',
  description: 'AI Wizard Tool helps you find the best AI coding tools, compare features, prices, and choose the right one for your vibe coding workflow. Browse MCP servers, AI code assistants, and more.',
  keywords: 'AI coding tools, AI code assistant, MCP servers, AI tool comparison, vibe coding, AI IDE, Cursor, Windsurf, Claude Code, Copilot',
  icons: {
    icon: [
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.ico', sizes: '16x16 32x32 48x48' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180' },
    ],
  },
  manifest: '/site.webmanifest',
  openGraph: {
    title: 'AI Wizard Tool - Discover & Compare AI Coding Tools',
    description: 'Find the best AI coding tools, compare features, prices, and choose the right one for your vibe coding workflow. Browse MCP servers, AI code assistants, and more.',
    type: 'website',
    locale: 'en_US',
  },
  robots: {
    index: true,
    follow: true,
  },
  other: {
    'language': 'en',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className="bg-white">
      <body className="min-h-screen bg-white text-cyber-foreground font-sans relative transition-colors duration-300">
        {/* Main Content - 移除了 grid-pattern、circuit-pattern、scanlines 等赛博朋克装饰 */}

        <div className="relative z-10">
          <ExpToastProvider>
            {children}
          </ExpToastProvider>
        </div>

        <BackToTop />
      </body>
    </html>
  )
}
