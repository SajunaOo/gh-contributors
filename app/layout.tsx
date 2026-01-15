import "@/styles/globals.css"
import { Metadata } from "next"
import { siteConfig } from "@/config/site"

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  icons: {
    icon: "https://cdn.jsdmirror.com/gh/SajunaOo/Image/OpenList-Moe/favicon.ico",
    shortcut: "https://cdn.jsdmirror.com/gh/SajunaOo/Image/OpenList-Moe/favicon.ico",
    apple: "https://cdn.jsdmirror.com/gh/SajunaOo/Image/OpenList-Moe/favicon.ico",
  },
  viewport: "width=device-width, initial-scale=1",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
