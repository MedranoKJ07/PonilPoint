"use client";

import {
  ThemeProvider,
  type ThemeProviderProps,
} from "next-themes";

export function ProveedorTema({
  children,
  ...propiedades
}: ThemeProviderProps) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      enableColorScheme
      storageKey="pinolpoint-tema"
      {...propiedades}
    >
      {children}
    </ThemeProvider>
  );
}