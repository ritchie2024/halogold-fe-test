import "@fontsource/cormorant-garamond/400.css";
import "@fontsource/cormorant-garamond/500.css";
import "@fontsource/cormorant-garamond/600.css";
import "@fontsource/cormorant-garamond/500-italic.css";
import "@fontsource/cinzel/400.css";
import "@fontsource/cinzel/500.css";
import "@fontsource/cinzel/600.css";
import "@fontsource/crimson-pro/300.css";
import "@fontsource/crimson-pro/400.css";
import "@fontsource/crimson-pro/600.css";
import "./globals.css";
import { AppProvider } from "@/lib/AppContext";

export const metadata = {
  title: "HaloGold — Investasi Emas Digital",
  description:
    "Prototipe Front End HaloGold: beli, jual, dan pantau emas digital Anda.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" className="h-full">
      <body className="min-h-full antialiased">
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
