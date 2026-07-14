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
        className="size-11 rounded-2xl border border-border bg-card/80 shadow-sm backdrop-blur-xl"
      />
    );
  }

  const esOscuro = resolvedTheme === "dark";

  return (
    <motion.button
      type="button"
      aria-label={esOscuro ? "Activar modo claro" : "Activar modo oscuro"}
      aria-pressed={esOscuro}
      title={esOscuro ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
      onClick={() => setTheme(esOscuro ? "light" : "dark")}
      whileHover={{
        scale: 1.06,
        rotate: esOscuro ? -3 : 3,
      }}
      whileTap={{ scale: 0.92 }}
      transition={{
        type: "spring",
        stiffness: 420,
        damping: 24,
      }}
      className="group relative flex size-11 items-center justify-center overflow-hidden rounded-2xl border border-border bg-card/82 text-foreground shadow-[0_8px_30px_var(--shadow-color)] backdrop-blur-xl transition-[background-color,border-color,color,box-shadow] duration-300 hover:border-primary/45 hover:bg-card-elevated hover:shadow-[0_12px_35px_rgba(37,99,235,0.16)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background dark:hover:shadow-[0_12px_38px_rgba(96,165,250,0.14)]"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.14),transparent_68%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:bg-[radial-gradient(circle_at_center,rgba(96,165,250,0.12),transparent_68%)]"
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
            <Sun className="size-5 text-primary" />
          ) : (
            <Moon className="size-5 text-brand-primary" />
          )}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  );
}
