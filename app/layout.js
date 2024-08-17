import { Inter } from "next/font/google";
import Sidebar from "@/components/Sidebar";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Geomap",
  description: "Muhammad Luqman Hakim - G6401211094 - IPB University",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex">
          <Sidebar />
          <div className="flex-1 p-6 ml-64">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
