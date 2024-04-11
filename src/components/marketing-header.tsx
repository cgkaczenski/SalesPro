"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LoginButton } from "@/components/auth/login-button";
import { ContainerDiv } from "@/components/container-div";
import { AppLogo } from "@/components/app-logo";

export function MarketingHeader() {
  return (
    <header className="py-10">
      <ContainerDiv>
        <nav className="relative z-50 flex justify-between">
          <div className="flex items-center md:gap-x-12">
            <Link href="#" aria-label="Home">
              <AppLogo className="h-10 w-auto" />
            </Link>
          </div>
          <div className="flex items-center gap-x-1 md:gap-x-8 text-slate-800">
            <LoginButton asChild>
              <Button variant="ghost">Sign in</Button>
            </LoginButton>
            <LoginButton href="/auth/register" asChild>
              <Button variant="green">Get started today</Button>
            </LoginButton>
          </div>
        </nav>
      </ContainerDiv>
    </header>
  );
}
