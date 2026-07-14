"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

import { BubbleBackground } from "@/components/animate-ui/components/backgrounds/bubble";

/**
 * Colores oficiales PinolPoint.
 *
 * No dejamos ningún color predeterminado del componente,
 * porque su configuración original contiene morado y rosado.
 */
const coloresModoClaro = {
  first: "22,119,255",   // #1677FF - Azul eléctrico
  second: "115,185,255", // #73B9FF - Azul claro
  third: "14,27,61",     // #0E1B3D - Azul profundo
  fourth: "230,234,241", // #E6EAF1 - Gris claro
  fifth: "255,255,255",  // #FFFFFF - Blanco
  sixth: "31,41,55",     // #1F2937 - Gris oscuro
};

const coloresModoOscuro = {
  first: "22,119,255",   // #1677FF
  second: "115,185,255", // #73B9FF
  third: "14,27,61",     // #0E1B3D
  fourth: "18,26,46",    // Superficie dark
  fifth: "31,41,55",     // #1F2937
  sixth: "8,17,38",      // Fondo oscuro profundo
};

export function FondoBurbujasTema() {
  const { resolvedTheme } = useTheme();
  const [montado, setMontado] = useState(false);

  useEffect(() => {
    setMontado(true);
  }, []);

  if (!montado) {
    return (
      <div
        aria-hidden="true"
        className="
          absolute inset-0
          bg-background
          transition-colors duration-700
        "
      />
    );
  }

  const esOscuro = resolvedTheme === "dark";

  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 z-0 overflow-hidden"
    >
      <BubbleBackground
        key={esOscuro ? "burbujas-dark" : "burbujas-light"}
        interactive
        colors={
          esOscuro
            ? coloresModoOscuro
            : coloresModoClaro
        }
        transition={{
          stiffness: 82,
          damping: 24,
        }}
        className="
          absolute inset-0
          opacity-70
          transition-opacity duration-700
          dark:opacity-80
        "
      />

      {/* Capa celeste para light mode */}
      <div
        className="
          pointer-events-none absolute inset-0
          bg-[linear-gradient(135deg,rgba(247,249,252,0.46),rgba(115,185,255,0.11),rgba(255,255,255,0.32))]
          opacity-100
          transition-opacity duration-700
          dark:opacity-0
        "
      />

      {/* Capa azul profundo para dark mode */}
      <div
        className="
          pointer-events-none absolute inset-0
          bg-[linear-gradient(135deg,rgba(8,17,38,0.58),rgba(14,27,61,0.66),rgba(18,26,46,0.54))]
          opacity-0
          transition-opacity duration-700
          dark:opacity-100
        "
      />

      {/* Viñeta que mejora la lectura */}
      <div
        className="
          pointer-events-none absolute inset-0
          bg-[radial-gradient(circle_at_center,transparent_30%,rgba(14,27,61,0.09)_100%)]
          transition-colors duration-700
          dark:bg-[radial-gradient(circle_at_center,transparent_24%,rgba(3,8,22,0.52)_100%)]
        "
      />
    </div>
  );
}