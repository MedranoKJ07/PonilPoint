"use client";

import { AnimatePresence, motion } from "motion/react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function AlternadorTema() {
  const { resolvedTheme, setTheme } = useTheme();
  const [montado, setMontado] = useState(false);

  useEffect(() => {
    setMontado(true);
  }, []);

  if (!montado) {
    return (
      <div
        aria-hidden="true"
        className="
          size-11 rounded-2xl border border-border/80
          bg-card/80 shadow-sm backdrop-blur-xl
        "
      />
    );
  }

  const esOscuro = resolvedTheme === "dark";

  return (
    <motion.button
      type="button"
      aria-label={
        esOscuro
          ? "Activar modo claro"
          : "Activar modo oscuro"
      }
      aria-pressed={esOscuro}
      title={
        esOscuro
          ? "Cambiar a modo claro"
          : "Cambiar a modo oscuro"
      }
      onClick={() => setTheme(esOscuro ? "light" : "dark")}
      whileHover={{
        scale: 1.06,
        rotate: esOscuro ? -3 : 3,
      }}
      whileTap={{
        scale: 0.92,
      }}
      transition={{
        type: "spring",
        stiffness: 420,
        damping: 24,
      }}
      className="
        group relative flex size-11 items-center justify-center
        overflow-hidden rounded-2xl
        border border-[#0E1B3D]/10
        bg-white/75 text-[#0E1B3D]
        shadow-[0_8px_30px_rgba(14,27,61,0.10)]
        backdrop-blur-xl
        transition-[background-color,border-color,color,box-shadow]
        duration-500
        hover:border-[#1677FF]/35
        hover:shadow-[0_12px_35px_rgba(22,119,255,0.18)]
        focus-visible:outline-none
        focus-visible:ring-2
        focus-visible:ring-[#1677FF]
        focus-visible:ring-offset-2
        dark:border-white/10
        dark:bg-[#121A2E]/80
        dark:text-white
        dark:shadow-[0_10px_35px_rgba(0,0,0,0.30)]
        dark:hover:border-[#73B9FF]/30
        dark:hover:shadow-[0_12px_38px_rgba(22,119,255,0.20)]
        dark:focus-visible:ring-[#73B9FF]
        dark:focus-visible:ring-offset-[#0E1B3D]
      "
    >
      <div
        aria-hidden="true"
        className="
          absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(22,119,255,0.15),transparent_68%)]
          opacity-0 transition-opacity duration-300
          group-hover:opacity-100
        "
      />

      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={esOscuro ? "sol" : "luna"}
          initial={{
            opacity: 0,
            scale: 0.45,
            rotate: esOscuro ? -100 : 100,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            rotate: 0,
          }}
          exit={{
            opacity: 0,
            scale: 0.45,
            rotate: esOscuro ? 100 : -100,
          }}
          transition={{
            duration: 0.28,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="relative z-10"
        >
          {esOscuro ? (
            <Sun className="size-5 text-[#73B9FF]" />
          ) : (
            <Moon className="size-5 text-[#1677FF]" />
          )}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  );
}