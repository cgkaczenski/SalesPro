import type { Metadata } from "next";
import { Inter, Lexend } from "next/font/google";
import clsx from "clsx";
import "../styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

const lexend = Lexend({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-lexend",
});

export const metadata: Metadata = {
  title: "SalesPro - CRM",
  description: "Track your sales and manage your sales pipeline.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={clsx(
          "h-full scroll-smooth bg-white antialiased",
          inter.className,
          lexend.variable
        )}
      >
        {children}
      </body>
    </html>
  );
}
