import "@/styles/globals.css";
import type { Metadata } from "next";
import { Geist, Volkhov } from "next/font/google";

import { ThemeProvider } from "@/components/theme-provider";

import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const volkhov = Volkhov({
  variable: "--font-volkhov",
  subsets: ["latin"],
  weight: ["400", "700"], // Include only the weights you need
  style: ["normal", "italic"], // Include styles if necessary
});

export const metadata: Metadata = {
  title: "FASCO",
  description: "Ecommerce website for selling products online",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${volkhov.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
