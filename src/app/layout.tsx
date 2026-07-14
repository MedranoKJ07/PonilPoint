import type { Metadata } from "next";
import { Poppins } from "next/font/google";

import "./globals.css";
import { ProveedorTema } from "@/components/proveedores/proveedor-tema";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "PinolPoint",
  description: "Tu punto de venta inteligente",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={poppins.variable}>
        <ProveedorTema>{children}</ProveedorTema>
      </body>
    </html>
  );
}