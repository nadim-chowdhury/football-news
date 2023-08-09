import Header from "@/components/Header";
import "./globals.scss";
import { Inter } from "next/font/google";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Football Hub",
  description: "Developed by Nadim Chowdhury",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-slate-50`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
