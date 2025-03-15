import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Nav/Navbar";

import { ModalProvider } from "./context/ModalContext";
import { AppProviders } from "./providers/AppProviders";

export const metadata: Metadata = {
  title: "Aninex",
  description: "Aninex app",
};

export default function RootLayout({children}: Readonly<{children: React.ReactNode;}>) {
  return (
    <html lang="en">
      <body>
      <AppProviders>
        <ModalProvider>
          <Navbar />
          <main style={{margin:' 5% 6% '}}>{children}</main>          
        </ModalProvider>
       </AppProviders>
      </body>
    </html>
  );
}
