"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/Container";
import { Logo } from "@/components/Logo";

export function Header() {
  return (
    <header className="py-10">
      <Container>
        <nav className="relative z-50 flex justify-between">
          <div className="flex items-center md:gap-x-12">
            <Link href="#" aria-label="Home">
              <Logo className="h-10 w-auto" />
            </Link>
          </div>
          <div className="flex items-center gap-x-1 md:gap-x-8">
            <Button variant="ghost" asChild>
              <Link href="/login">Sign in</Link>
            </Button>
            <Button variant="green" asChild>
              <Link href="/login">
                Get started&nbsp;<span className="hidden lg:inline">today</span>
              </Link>
            </Button>
          </div>
        </nav>
      </Container>
    </header>
  );
}
