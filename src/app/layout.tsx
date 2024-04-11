import type { Metadata } from "next";
import { Poppins, Roboto } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import clsx from "clsx";
import "../styles/globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
  display: "swap",
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: "SalesPro - CRM",
  description: "Track your sales and manage your sales pipeline.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <SessionProvider session={session}>
      <html lang="en">
        <body
          className={clsx(
            "h-full scroll-smooth bg-white antialiased",
            poppins.variable,
            roboto.variable
          )}
        >
          {children}
        </body>
      </html>
    </SessionProvider>
  );
}
