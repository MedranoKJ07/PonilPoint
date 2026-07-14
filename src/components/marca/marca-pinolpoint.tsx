"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";

import { cn } from "@/lib/utils";

type ModoMarca = "panel" | "movil" | "tarjeta";

interface MarcaPinolPointProps {
  modo: ModoMarca;
  className?: string;
  prioridad?: boolean;
}

interface ImagenMarcaProps {
  srcClaro: string;
  srcOscuro: string;
  alt: string;
  width: number;
  height: number;
  className: string;
  prioridad?: boolean;
}

function ImagenMarcaTema({
  srcClaro,
  srcOscuro,
  alt,
  width,
  height,
  className,
  prioridad = false,
}: ImagenMarcaProps) {
  return (
    <>
      {/* Versión para modo claro */}
      <Image
        src={srcClaro}
        alt={alt}
        width={width}
        height={height}
        priority={prioridad}
        className={cn(
          "h-auto object-contain dark:hidden",
          className,
        )}
      />

      {/* Versión para modo oscuro */}
      <Image
        src={srcOscuro}
        alt=""
        aria-hidden="true"
        width={width}
        height={height}
        priority={prioridad}
        className={cn(
          "hidden h-auto object-contain dark:block",
          className,
        )}
      />
    </>
  );
}

export function MarcaPinolPoint({
  modo,
  className,
  prioridad = false,
}: MarcaPinolPointProps) {
  const reducirMovimiento = useReducedMotion();

  const animacion = reducirMovimiento
    ? undefined
    : {
        y: [0, -4, 0],
      };

  const transicion = {
    duration: 4.8,
    repeat: Infinity,
    ease: "easeInOut" as const,
  };

  if (modo === "panel") {
    return (
      <motion.div
        animate={animacion}
        transition={transicion}
        className={cn(
          "inline-flex items-center",
          className,
        )}
      >
        <ImagenMarcaTema
          srcClaro="/marca/pinolpoint/logo-horizontal-color.webp"
          srcOscuro="/marca/pinolpoint/logo-horizontal-blanco.webp"
          alt="PinolPoint, tu punto de venta inteligente"
          width={460}
          height={180}
          prioridad={prioridad}
          className="
            w-[245px]
            xl:w-[285px]
            2xl:w-[310px]
          "
        />
      </motion.div>
    );
  }

  if (modo === "tarjeta") {
    return (
      <motion.div
        animate={animacion}
        transition={transicion}
        className={cn(
          "inline-flex items-center justify-center",
          className,
        )}
      >
        <ImagenMarcaTema
          srcClaro="/marca/pinolpoint/isotipo-color.webp"
          srcOscuro="/marca/pinolpoint/isotipo-blanco.webp"
          alt="Isotipo de PinolPoint"
          width={180}
          height={220}
          prioridad={prioridad}
          className="h-14 w-auto xl:h-16"
        />
      </motion.div>
    );
  }

  return (
    <motion.div
      animate={animacion}
      transition={transicion}
      className={cn(
        "flex min-h-16 items-center",
        className,
      )}
    >
      {/* Teléfonos pequeños: isotipo */}
      <div className="sm:hidden">
        <ImagenMarcaTema
          srcClaro="/marca/pinolpoint/isotipo-color.webp"
          srcOscuro="/marca/pinolpoint/isotipo-blanco.webp"
          alt="PinolPoint"
          width={180}
          height={220}
          prioridad={prioridad}
          className="h-16 w-auto"
        />
      </div>

      {/* Tablet y teléfonos anchos: logo horizontal */}
      <div className="hidden sm:block lg:hidden">
        <ImagenMarcaTema
          srcClaro="/marca/pinolpoint/logo-horizontal-color.webp"
          srcOscuro="/marca/pinolpoint/logo-horizontal-blanco.webp"
          alt="PinolPoint, tu punto de venta inteligente"
          width={460}
          height={180}
          prioridad={prioridad}
          className="w-[225px] md:w-[250px]"
        />
      </div>
    </motion.div>
  );
}