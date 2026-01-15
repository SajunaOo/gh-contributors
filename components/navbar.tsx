"use client"

import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarItem,
  Button,
  Link,
} from "@nextui-org/react"
import { siteConfig } from "@/config/site"
import { ThemeSwitch } from "@/components/theme-switch"
import {
  GithubIcon,
  HeartFilledIcon,
  SolarHomeSmileAngleBold,
} from "@/components/icons"
import NextLink from "next/link"

export const Navbar = () => {
  return (
    <NextUINavbar maxWidth="xl" position="sticky">
      <NavbarContent className="flex basis-full" justify="center">
        <NavbarItem className="flex gap-2 items-center">
          <NextLink href="/">
            <SolarHomeSmileAngleBold className="text-2xl transition-opacity opacity-60 hover:opacity-50" />
          </NextLink>
          <Link isExternal href={siteConfig.links.github} aria-label="Github">
            <GithubIcon className="text-default-500" />
          </Link>
          <ThemeSwitch />
        </NavbarItem>
      </NavbarContent>
    </NextUINavbar>
  )
}
