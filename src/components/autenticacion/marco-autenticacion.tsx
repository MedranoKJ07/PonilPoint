"use client";
import { AnimateIcon } from "@/components/animate-ui/icons/icon";
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
        bg-[#F7F9FC] text-[#0E1B3D]
        transition-colors duration-700
        dark:bg-[#09132D] dark:text-white
      "
    >
      <FondoBurbujasTema />

      <div className="relative z-10 mx-auto grid min-h-screen max-w-[1600px] lg:grid-cols-[1.04fr_0.96fr]">
        {/* Panel informativo */}
        <section
          className="
            relative hidden overflow-hidden
            border-r border-[#0E1B3D]/10
            px-12 py-14
            transition-[border-color] duration-700
            dark:border-white/10
            lg:flex lg:flex-col lg:justify-between
            xl:px-16 xl:py-16
          "
        >
          {/* Cristal claro */}
          <div
            aria-hidden="true"
            className="
              absolute inset-0
              bg-white/48
              backdrop-blur-[34px]
              transition-[background-color,opacity] duration-700
              dark:bg-transparent
              dark:opacity-0
            "
          />

          {/* Cristal oscuro */}
          <div
            aria-hidden="true"
            className="
              absolute inset-0
              bg-[#0E1B3D]/66
              opacity-0
              backdrop-blur-[34px]
              transition-[background-color,opacity] duration-700
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
              bg-[#1677FF]/12 blur-[120px]
              dark:bg-[#1677FF]/20
            "
          />

          {/* Identidad */}
          <motion.div
            variants={contenedorEscalonado}
            initial={reducirMovimiento ? false : "oculto"}
            animate="visible"
            className="relative z-10"
          >
            <motion.div
              variants={elementoEntrada}
              className="inline-flex items-center gap-3"
            >
              <motion.div
                animate={
                  reducirMovimiento
                    ? undefined
                    : {
                        y: [0, -5, 0],
                        rotate: [0, -1.5, 0],
                      }
                }
                transition={{
                  duration: 4.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="
                  relative flex size-12 items-center justify-center
                  rounded-2xl
                  border border-[#1677FF]/20
                  bg-white/70
                  text-[#1677FF]
                  shadow-[0_12px_40px_rgba(22,119,255,0.16)]
                  backdrop-blur-xl
                  transition-[background-color,border-color,color,box-shadow]
                  duration-700
                  dark:border-[#73B9FF]/20
                  dark:bg-white/10
                  dark:text-[#73B9FF]
                  dark:shadow-[0_14px_42px_rgba(22,119,255,0.24)]
                "
              >
                <Store className="size-6" />

                <motion.span
                  aria-hidden="true"
                  animate={
                    reducirMovimiento
                      ? undefined
                      : {
                          opacity: [0.25, 0.85, 0.25],
                          scale: [0.8, 1.2, 0.8],
                        }
                  }
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="
                    absolute -right-1 -top-1 size-3
                    rounded-full bg-[#73B9FF]
                    shadow-[0_0_16px_rgba(115,185,255,0.9)]
                  "
                />
              </motion.div>

              <div>
                <p className="text-xl font-bold tracking-tight">
                  <span
                    className="
                      text-[#0E1B3D]
                      transition-colors duration-700
                      dark:text-white
                    "
                  >
                    Pinol
                  </span>

                  <span
                    className="
                      text-[#1677FF]
                      transition-colors duration-700
                      dark:text-[#73B9FF]
                    "
                  >
                    Point
                  </span>
                </p>

                <p
                  className="
                    text-sm text-[#4B5563]
                    transition-colors duration-700
                    dark:text-[#B9CBE5]
                  "
                >
                  Tu punto de venta inteligente
                </p>
              </div>
            </motion.div>

            <motion.div
              variants={elementoEntrada}
              className="mt-16 max-w-xl"
            >
              <span
                className="
                  inline-flex items-center gap-2 rounded-full
                  border border-[#1677FF]/20
                  bg-white/55 px-3 py-1.5
                  text-xs font-semibold tracking-wide
                  text-[#0F5EDB]
                  shadow-sm backdrop-blur-xl
                  transition-[background-color,border-color,color]
                  duration-700
                  dark:border-[#73B9FF]/25
                  dark:bg-[#1677FF]/15
                  dark:text-[#A9D5FF]
                "
              >
                <Sparkles className="size-3.5" />
                Gestión empresarial moderna
              </span>

              <h2
                className="
                  mt-6 text-4xl font-bold leading-tight tracking-tight
                  text-[#0E1B3D]
                  transition-colors duration-700
                  dark:text-white
                  xl:text-5xl
                "
              >
                Administra, vende y controla tu empresa desde una sola
                plataforma.
              </h2>

              <p
                className="
                  mt-5 max-w-lg text-base leading-7
                  text-[#4B5563]
                  transition-colors duration-700
                  dark:text-[#B9CBE5]
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
                  border border-[#0E1B3D]/10
                  bg-white/58 px-4 py-3.5
                  shadow-[0_10px_35px_rgba(14,27,61,0.07)]
                  backdrop-blur-xl
                  transition-[background-color,border-color,box-shadow]
                  duration-500
                  hover:border-[#1677FF]/35
                  hover:bg-white/82
                  hover:shadow-[0_16px_45px_rgba(22,119,255,0.12)]
                  dark:border-[#73B9FF]/12
                  dark:bg-[#121A2E]/54
                  dark:shadow-[0_14px_40px_rgba(0,0,0,0.18)]
                  dark:hover:border-[#73B9FF]/32
                  dark:hover:bg-[#162440]/74
                "
              >
                <div
                  aria-hidden="true"
                  className="
                    absolute inset-y-0 left-0 w-1
                    origin-bottom scale-y-0
                    bg-gradient-to-b from-[#1677FF] to-[#73B9FF]
                    transition-transform duration-300
                    group-hover:scale-y-100
                  "
                />

                <div
                  className="
                    flex size-10 shrink-0 items-center justify-center
                    rounded-xl
                    border border-[#1677FF]/15
                    bg-[#1677FF]/10
                    transition-[background-color,border-color,transform]
                    duration-300
                    group-hover:-rotate-3
                    group-hover:scale-105
                    dark:border-[#73B9FF]/20
                    dark:bg-[#1677FF]/18
                  "
                >
                  <Icono className="size-5 text-[#1677FF] dark:text-[#73B9FF]" />
                </div>

                <span
                  className="
                    flex-1 text-sm leading-6
                    text-[#1F2937]
                    transition-colors duration-700
                    dark:text-white/88
                  "
                >
                  {texto}
                </span>

                <CheckCircle2 className="size-5 text-[#1677FF] dark:text-[#73B9FF]" />
              </motion.article>
            ))}
          </motion.div>

          <div
            className="
              relative z-10 flex items-center justify-between
              border-t border-[#0E1B3D]/10 pt-6
              text-[#4B5563]
              transition-[border-color,color] duration-700
              dark:border-white/10
              dark:text-white/55
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
            <div className="mb-8 lg:hidden">
              <div className="inline-flex items-center gap-3">
                <motion.div
                  animate={
                    reducirMovimiento
                      ? undefined
                      : {
                          y: [0, -4, 0],
                      }
                  }
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="
                    flex size-11 items-center justify-center
                    rounded-2xl bg-[#1677FF] text-white
                    shadow-[0_10px_30px_rgba(22,119,255,0.28)]
                  "
                >
                  <Store className="size-5" />
                </motion.div>

                <div>
                  <p className="font-bold tracking-tight">
                    <span className="text-[#0E1B3D] dark:text-white">
                      Pinol
                    </span>

                    <span className="text-[#1677FF] dark:text-[#73B9FF]">
                      Point
                    </span>
                  </p>

                  <p className="text-xs text-[#4B5563] dark:text-[#B9CBE5]">
                    Tu punto de venta inteligente
                  </p>
                </div>
              </div>
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
                border border-[#1677FF]/18
                bg-white/82 p-6
                shadow-[0_28px_80px_rgba(14,27,61,0.16)]
                backdrop-blur-[30px]
                transition-[background-color,border-color,box-shadow]
                duration-700
                sm:p-8

                dark:border-[#73B9FF]/18
                dark:bg-[#101A31]/88
                dark:shadow-[0_32px_100px_rgba(0,0,0,0.52),0_0_60px_rgba(22,119,255,0.10)]
              "
            >
              {/* Fondo interior claro */}
              <div
                aria-hidden="true"
                className="
                  pointer-events-none absolute inset-0
                  bg-[linear-gradient(145deg,rgba(255,255,255,0.38),rgba(230,234,241,0.12))]
                  opacity-100 transition-opacity duration-700
                  dark:opacity-0
                "
              />

              {/* Fondo interior oscuro */}
              <div
                aria-hidden="true"
                className="
                  pointer-events-none absolute inset-0
                  bg-[linear-gradient(145deg,rgba(18,26,46,0.56),rgba(14,27,61,0.18))]
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
                  from-transparent via-[#1677FF]/80 to-transparent
                  dark:via-[#73B9FF]/75
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
                  bg-[#1677FF]/11 blur-3xl
                  dark:bg-[#73B9FF]/11
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
                  dark:via-[#73B9FF]/10
                "
              />

              <div className="relative z-10">
                <motion.div
                  variants={contenedorEscalonado}
                  initial={reducirMovimiento ? false : "oculto"}
                  animate="visible"
                  className="mb-7"
                >
                  {/* Marca con colores alternados */}
                  <motion.div
                    variants={elementoEntrada}
                    className="mb-5"
                  >
                    <p className="text-lg font-bold tracking-tight">
                      <span
                        className="
                          text-[#0E1B3D]
                          transition-colors duration-700
                          dark:text-white
                        "
                      >
                        Pinol
                      </span>

                      <span
                        className="
                          text-[#1677FF]
                          transition-colors duration-700
                          dark:text-[#73B9FF]
                        "
                      >
                        Point
                      </span>
                    </p>

                    <p
                      className="
                        mt-0.5 text-xs font-medium
                        text-[#4B5563]
                        transition-colors duration-700
                        dark:text-[#AFC8E8]
                      "
                    >
                      Tu punto de venta inteligente
                    </p>
                  </motion.div>

                  <motion.h1
                    variants={elementoEntrada}
                    className="
                      text-3xl font-bold tracking-tight
                      text-[#0E1B3D]
                      transition-colors duration-700
                      dark:text-white
                    "
                  >
                    {titulo}
                  </motion.h1>

                  <motion.p
                    variants={elementoEntrada}
                    className="
                      mt-2 text-sm leading-6
                      text-[#4B5563]
                      transition-colors duration-700
                      dark:text-[#B3C6DF]
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
                text-[#4B5563]
                transition-colors duration-700
                dark:text-[#B3C6DF]/80
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