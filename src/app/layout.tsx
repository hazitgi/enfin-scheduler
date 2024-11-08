import Wrapper from "@/components/warpper/warpper";
import "./globals.css";
import { Inter } from "next/font/google";
import { PrimeReactProvider } from "primereact/api";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Meeting Slots Checker",
  description: "Check available meeting slots for participants",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <PrimeReactProvider>
          <Wrapper>{children}</Wrapper>
        </PrimeReactProvider>
      </body>
    </html>
  );
}
