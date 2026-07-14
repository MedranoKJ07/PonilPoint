"use client";
import type { ReactNode } from "react";
import {
  BarChart3,
  Boxes,
  Building2,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  Store,
} from "lucide-react";
import {
  motion,
  useReducedMotion,
  type Variants,
} from "motion/react";

import { AlternadorTema } from "@/components/tema/alternador-tema";
import { FondoBurbujasTema } from "@/components/tema/fondo-burbujas-tema";
import { MarcaPinolPoint } from "@/components/marca/marca-pinolpoint";
interface MarcoAutenticacionProps {
  titulo: string;
  descripcion: string;
  children: ReactNode;
}

const caracteristicas = [
  {
    icono: Building2,
    texto: "Gestiona múltiples empresas y sucursales.",
  },
  {
    icono: Store,
    texto: "Punto de venta preparado para distintos negocios.",
  },
  {
    icono: Boxes,
    texto: "Inventario y bodegas completamente separados.",
  },
  {
    icono: BarChart3,
    texto: "Reportes para tomar mejores decisiones.",
  },
];

const contenedorEscalonado: Variants = {
  oculto: {},
  visible: {
    transition: {
      delayChildren: 0.12,
      staggerChildren: 0.1,
    },
  },
};

const elementoEntrada: Variants = {
  oculto: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export function MarcoAutenticacion({
  titulo,
  descripcion,
  children,
}: MarcoAutenticacionProps) {
  const reducirMovimiento = useReducedMotion();

  return (
    <main
      className="
        relative isolate min-h-screen overflow-hidden
        bg-background text-foreground
        transition-colors duration-500
      "
    >
      <FondoBurbujasTema />

      <div className="relative z-10 mx-auto grid min-h-screen max-w-[1600px] lg:grid-cols-[1.04fr_0.96fr]">
        {/* Panel informativo */}
        <section
          className="
            relative hidden overflow-hidden
            border-r border-border
            px-12 py-14
            transition-[border-color] duration-500
            lg:flex lg:flex-col lg:justify-between
            xl:px-16 xl:py-16
          "
        >
          {/* Cristal claro */}
          <div
            aria-hidden="true"
            className="
              absolute inset-0
              bg-card/48
              backdrop-blur-[34px]
              transition-[background-color,opacity] duration-500
              dark:bg-transparent
              dark:opacity-0
            "
          />

          {/* Cristal oscuro */}
          <div
            aria-hidden="true"
            className="
              absolute inset-0
              bg-sidebar/72
              opacity-0
              backdrop-blur-[34px]
              transition-[background-color,opacity] duration-500
              dark:opacity-100
            "
          />

          {/* Resplandor superior */}
          <motion.div
            aria-hidden="true"
            animate={
              reducirMovimiento
                ? undefined
                : {
                    x: [0, 35, -12, 0],
                    y: [0, -20, 12, 0],
                    scale: [1, 1.08, 0.96, 1],
                  }
            }
            transition={{
              duration: 16,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="
              pointer-events-none absolute -left-32 -top-32
              size-[28rem] rounded-full
              bg-brand-primary/12 blur-[120px]
              dark:bg-primary/18
            "
          />

          {/* Identidad */}
          <motion.div
            variants={contenedorEscalonado}
            initial={reducirMovimiento ? false : "oculto"}
            animate="visible"
            className="relative z-10"
          >
            <motion.div variants={elementoEntrada}>
              <MarcaPinolPoint
                modo="panel"
                prioridad
              />
            </motion.div>

            <motion.div
              variants={elementoEntrada}
              className="mt-16 max-w-xl"
            >
              <span
                className="
                  inline-flex items-center gap-2 rounded-full
                  border border-primary/25
                  bg-card/60 px-3 py-1.5
                  text-xs font-semibold tracking-wide
                  text-primary
                  shadow-sm backdrop-blur-xl
                  transition-[background-color,border-color,color]
                  duration-500
                  dark:bg-primary/12
                "
              >
                <Sparkles className="size-3.5" />
                Gestión empresarial moderna
              </span>

              <h2
                className="
                  mt-6 text-4xl font-bold leading-tight tracking-tight
                  text-foreground
                  transition-colors duration-500
                  xl:text-5xl
                "
              >
                Administra, vende y controla tu empresa desde una sola
                plataforma.
              </h2>

              <p
                className="
                  mt-5 max-w-lg text-base leading-7
                  text-muted-foreground
                  transition-colors duration-500
                "
              >
                Diseñado para comercios, servicios, distribuidoras y
                empresas con una o múltiples sucursales.
              </p>
            </motion.div>
          </motion.div>

          {/* Características */}
          <motion.div
            variants={contenedorEscalonado}
            initial={reducirMovimiento ? false : "oculto"}
            animate="visible"
            className="relative z-10 my-12 space-y-3"
          >
            {caracteristicas.map(({ icono: Icono, texto }) => (
              <motion.article
                key={texto}
                variants={elementoEntrada}
                whileHover={
                  reducirMovimiento
                    ? undefined
                    : {
                        y: -4,
                        x: 3,
                        scale: 1.008,
                      }
                }
                transition={{
                  type: "spring",
                  stiffness: 330,
                  damping: 26,
                }}
                className="
                  group relative flex items-center gap-4
                  overflow-hidden rounded-2xl
                  border border-border
                  bg-card/64 px-4 py-3.5
                  shadow-[0_10px_35px_var(--shadow-color)]
                  backdrop-blur-xl
                  transition-[background-color,border-color,box-shadow]
                  duration-500
                  hover:border-primary/40
                  hover:bg-card/90
                  hover:shadow-[0_16px_45px_rgba(37,99,235,0.12)]
                  dark:bg-card/70
                  dark:hover:bg-card-elevated/88
                "
              >
                <div
                  aria-hidden="true"
                  className="
                    absolute inset-y-0 left-0 w-1
                    origin-bottom scale-y-0
                    bg-gradient-to-b from-brand-primary to-brand-light
                    transition-transform duration-300
                    group-hover:scale-y-100
                  "
                />

                <div
                  className="
                    flex size-10 shrink-0 items-center justify-center
                    rounded-xl
                    border border-primary/20
                    bg-primary/10
                    transition-[background-color,border-color,transform]
                    duration-300
                    group-hover:-rotate-3
                    group-hover:scale-105
                    dark:bg-primary/14
                  "
                >
                  <Icono className="size-5 text-primary" />
                </div>

                <span
                  className="
                    flex-1 text-sm leading-6
                    text-foreground
                    transition-colors duration-500
                  "
                >
                  {texto}
                </span>

                <CheckCircle2 className="size-5 text-primary" />
              </motion.article>
            ))}
          </motion.div>

          <div
            className="
              relative z-10 flex items-center justify-between
              border-t border-border pt-6
              text-muted-foreground
              transition-[border-color,color] duration-500
            "
          >
            <p className="text-xs">© 2026 PinolPoint</p>

            <div className="flex items-center gap-2">
              <ShieldCheck className="size-3.5" />
              <p className="text-xs">Hecho en Nicaragua</p>
            </div>
          </div>
        </section>

        {/* Zona del formulario */}
        <section
          className="
            relative flex min-h-screen items-center justify-center
            px-5 py-20
            sm:px-8
            lg:px-12 lg:py-12
          "
        >
          <motion.div
            initial={
              reducirMovimiento
                ? false
                : {
                    opacity: 0,
                    scale: 0.9,
                    y: -10,
                  }
            }
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            transition={{
              duration: 0.55,
              delay: 0.3,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="absolute right-5 top-5 z-30 sm:right-8 sm:top-8"
          >
            <AlternadorTema />
          </motion.div>

          <motion.div
            initial={
              reducirMovimiento
                ? false
                : {
                    opacity: 0,
                    y: 28,
                    scale: 0.97,
                  }
            }
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            transition={{
              duration: 0.75,
              delay: 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative z-20 w-full max-w-md"
          >
            {/* Identidad móvil */}
            {/* Identidad adaptable para móvil y tablet */}
            <div className="mb-8 lg:hidden flex flex-col items-center text-center">
              <MarcaPinolPoint
                modo="movil"
                prioridad
              />
            </div>

            {/* Tarjeta/modal en modo claro y oscuro */}
            <motion.div
              whileHover={
                reducirMovimiento
                  ? undefined
                  : {
                      y: -3,
                  }
              }
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 25,
              }}
              className="
                group relative overflow-hidden rounded-[2rem]
                border border-border
                bg-card/88 p-6
                shadow-[0_28px_80px_var(--shadow-color-strong)]
                backdrop-blur-[30px]
                transition-[background-color,border-color,box-shadow]
                duration-500
                sm:p-8

                dark:shadow-[0_32px_100px_rgba(0,0,0,0.48),0_0_60px_rgba(96,165,250,0.08)]
              "
            >
              {/* Fondo interior claro */}
              <div
                aria-hidden="true"
                className="
                  pointer-events-none absolute inset-0
                  bg-[linear-gradient(145deg,rgba(255,255,255,0.40),rgba(219,234,254,0.10))]
                  opacity-100 transition-opacity duration-700
                  dark:opacity-0
                "
              />

              {/* Fondo interior oscuro */}
              <div
                aria-hidden="true"
                className="
                  pointer-events-none absolute inset-0
                  bg-[linear-gradient(145deg,rgba(22,33,58,0.62),rgba(8,14,40,0.20))]
                  opacity-0 transition-opacity duration-700
                  dark:opacity-100
                "
              />

              {/* Línea superior */}
              <div
                aria-hidden="true"
                className="
                  absolute inset-x-10 top-0 h-px
                  bg-gradient-to-r
                  from-transparent via-brand-primary/80 to-transparent
                  dark:via-primary/75
                "
              />

              {/* Resplandor */}
              <motion.div
                aria-hidden="true"
                animate={
                  reducirMovimiento
                    ? undefined
                    : {
                        scale: [1, 1.14, 1],
                        opacity: [0.4, 0.75, 0.4],
                    }
                }
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="
                  pointer-events-none absolute -right-20 -top-20
                  size-52 rounded-full
                  bg-brand-primary/11 blur-3xl
                  dark:bg-primary/11
                "
              />

              {/* Destello */}
              <motion.div
                aria-hidden="true"
                animate={
                  reducirMovimiento
                    ? undefined
                    : {
                        x: ["-180%", "320%"],
                    }
                }
                transition={{
                  duration: 2.1,
                  repeat: Infinity,
                  repeatDelay: 8,
                  ease: "easeInOut",
                }}
                className="
                  pointer-events-none absolute -top-1/2
                  h-[200%] w-16 rotate-12
                  bg-gradient-to-r
                  from-transparent via-white/28 to-transparent
                  blur-md
                  dark:via-primary/10
                "
              />

              <div className="relative z-10">
                <motion.div
                  variants={contenedorEscalonado}
                  initial={reducirMovimiento ? false : "oculto"}
                  animate="visible"
                  className="mb-7"
                >
                  {/* Isotipo dentro de la tarjeta en escritorio */}
                  <motion.div
                    variants={elementoEntrada}
                    className="mb-5 hidden lg:block flex flex-col items-center text-center"
                  >
                    <MarcaPinolPoint modo="tarjeta" />
                  </motion.div>

                  <motion.h1
                    variants={elementoEntrada}
                    className="
                      text-3xl font-bold tracking-tight
                      text-foreground
                      transition-colors duration-500
                    "
                  >
                    {titulo}
                  </motion.h1>

                  <motion.p
                    variants={elementoEntrada}
                    className="
                      mt-2 text-sm leading-6
                      text-muted-foreground
                      transition-colors duration-500
                    "
                  >
                    {descripcion}
                  </motion.p>
                </motion.div>

                <motion.div
                  initial={
                    reducirMovimiento
                      ? false
                      : {
                          opacity: 0,
                          y: 14,
                        }
                  }
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.6,
                    delay: 0.4,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {children}
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              initial={
                reducirMovimiento
                  ? false
                  : {
                      opacity: 0,
                  }
              }
              animate={{
                opacity: 1,
              }}
              transition={{
                duration: 0.6,
                delay: 0.7,
              }}
              className="
                mt-6 flex items-center justify-center gap-2
                text-center text-xs
                text-muted-foreground
                transition-colors duration-500
              "
            >
              <ShieldCheck className="size-3.5" />

              <span>
                Tus datos y operaciones permanecen protegidos.
              </span>
            </motion.div>
          </motion.div>
        </section>
      </div>
    </main>
  );
}