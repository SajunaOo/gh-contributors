import "@/styles/globals.css"
import { Metadata, Viewport } from "next"
import { siteConfig } from "@/config/site"

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "https://cdn.jsdmirror.com/gh/SajunaOo/Image/OpenList-Moe/favicon.ico",
    shortcut: "https://cdn.jsdmirror.com/gh/SajunaOo/Image/OpenList-Moe/favicon.ico",
    apple: "https://cdn.jsdmirror.com/gh/SajunaOo/Image/OpenList-Moe/favicon.ico",
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
