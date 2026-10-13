import type { Metadata } from "next";
import "./globals.css";
import LayoutWrapper from "@/components/LayoutWrapper";

export const metadata: Metadata = {
  title: "Lambda CDMO — Integrated Biologics Solutions & GMP Manufacturing",
  description: "Lambda operates as an integrated solutions provider for biologics drug development, cGMP manufacturing, cell line engineering, and clinical trials enablement globally.",
  icons: {
    icon: "/images/fav.png",
    shortcut: "/images/fav.png",
    apple: "/images/fav.png",
  },
  keywords: [
    "biologics CDMO",
    "GMP manufacturing",
    "cell line engineering",
    "drug substance",
    "drug product aseptic filling",
    "monoclonal antibodies mAbs",
    "bispecific antibodies",
    "antibody-drug conjugates ADCs",
    "First in Human clinical trials",
    "biosimilars development",
    "analytical characterization"
  ],
  authors: [{ name: "Lambda CDMO Scientific Team" }],
  openGraph: {
    title: "Lambda CDMO — Integrated Biologics Solutions & GMP Manufacturing",
    description: "Integrated solutions provider for biologics drug development, GMP manufacturing, and global clinical trials enablement.",
    url: "https://lambda-cdmo.com",
    siteName: "Lambda CDMO",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased text-foreground bg-background selection:bg-brand-blue/20">
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
