"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";

import { BubbleBackground } from "@/components/animate-ui/components/backgrounds/bubble";

/**
 * Paleta exclusiva de PinolPoint. Se evita cualquier morado o rosado para
 * conservar una identidad azul consistente en ambos modos.
 */
const coloresModoClaro = {
  first: "37,99,235", // #2563EB - Azul principal
  second: "96,165,250", // #60A5FA - Azul claro
  third: "47,128,237", // #2F80ED - Azul eléctrico
  fourth: "219,234,254", // #DBEAFE - Azul suave
  fifth: "255,255,255", // #FFFFFF - Blanco
  sixth: "232,241,255", // #E8F1FF - Superficie azul suave
};

const coloresModoOscuro = {
  first: "37,99,235", // #2563EB
  second: "96,165,250", // #60A5FA
  third: "16,27,81", // #101B51
  fourth: "18,38,77", // #12264D
  fifth: "22,33,58", // #16213A
  sixth: "8,14,40", // #080E28
};

type OndaInteraccion = {
  id: number;
  x: number;
  y: number;
};

const transicionPuntero = {
  stiffness: 115,
  damping: 28,
  mass: 0.75,
};

export function FondoBurbujasTema() {
  const { resolvedTheme } = useTheme();
  const reducirMovimiento = useReducedMotion();
  const [montado, setMontado] = useState(false);
  const [ondas, setOndas] = useState<OndaInteraccion[]>([]);

  const contenedorRef = useRef<HTMLDivElement>(null);
  const idOndaRef = useRef(0);
  const temporizadoresRef = useRef<number[]>([]);

  // Posición absoluta del puntero dentro del fondo.
  const punteroX = useMotionValue(0);
  const punteroY = useMotionValue(0);
  const punteroXSuave = useSpring(punteroX, transicionPuntero);
  const punteroYSuave = useSpring(punteroY, transicionPuntero);

  // Desplazamiento reducido para crear profundidad sin mover toda la interfaz.
  const paralajeX = useMotionValue(0);
  const paralajeY = useMotionValue(0);
  const paralajeXSuave = useSpring(paralajeX, transicionPuntero);
  const paralajeYSuave = useSpring(paralajeY, transicionPuntero);
  const paralajeInversoX = useTransform(paralajeXSuave, (valor) => valor * -0.72);
  const paralajeInversoY = useTransform(paralajeYSuave, (valor) => valor * -0.72);

  const focoClaro = useMotionTemplate`radial-gradient(430px circle at ${punteroXSuave}px ${punteroYSuave}px, rgba(37,99,235,0.22), rgba(96,165,250,0.10) 35%, transparent 72%)`;
  const focoOscuro = useMotionTemplate`radial-gradient(460px circle at ${punteroXSuave}px ${punteroYSuave}px, rgba(96,165,250,0.20), rgba(37,99,235,0.11) 38%, transparent 74%)`;

  useEffect(() => {
    setMontado(true);
  }, []);

  useEffect(() => {
    if (!montado || reducirMovimiento) return;

    const colocarEnCentro = () => {
      const contenedor = contenedorRef.current;
      if (!contenedor) return;

      const rectangulo = contenedor.getBoundingClientRect();
      punteroX.set(rectangulo.width / 2);
      punteroY.set(rectangulo.height / 2);
      paralajeX.set(0);
      paralajeY.set(0);
    };

    const obtenerPosicion = (evento: PointerEvent) => {
      const contenedor = contenedorRef.current;
      if (!contenedor) return null;

      const rectangulo = contenedor.getBoundingClientRect();
      const x = evento.clientX - rectangulo.left;
      const y = evento.clientY - rectangulo.top;

      const estaDentro =
        x >= 0 &&
        y >= 0 &&
        x <= rectangulo.width &&
        y <= rectangulo.height;

      if (!estaDentro) return null;

      return { x, y, ancho: rectangulo.width, alto: rectangulo.height };
    };

    const manejarMovimiento = (evento: PointerEvent) => {
      // En pantallas táctiles solo reaccionamos al toque para evitar trabajo
      // innecesario durante el desplazamiento vertical de la página.
      if (evento.pointerType === "touch") return;

      const posicion = obtenerPosicion(evento);
      if (!posicion) return;

      punteroX.set(posicion.x);
      punteroY.set(posicion.y);

      paralajeX.set((posicion.x / posicion.ancho - 0.5) * 46);
      paralajeY.set((posicion.y / posicion.alto - 0.5) * 34);
    };

    const manejarInteraccion = (evento: PointerEvent) => {
      if (!evento.isPrimary || (evento.pointerType === "mouse" && evento.button !== 0)) {
        return;
      }

      const posicion = obtenerPosicion(evento);
      if (!posicion) return;

      punteroX.set(posicion.x);
      punteroY.set(posicion.y);
      paralajeX.set((posicion.x / posicion.ancho - 0.5) * 46);
      paralajeY.set((posicion.y / posicion.alto - 0.5) * 34);

      const id = ++idOndaRef.current;
      setOndas((actuales) => [
        ...actuales.slice(-4),
        { id, x: posicion.x, y: posicion.y },
      ]);

      const temporizador = window.setTimeout(() => {
        setOndas((actuales) => actuales.filter((onda) => onda.id !== id));
        temporizadoresRef.current = temporizadoresRef.current.filter(
          (valor) => valor !== temporizador,
        );
      }, 950);

      temporizadoresRef.current.push(temporizador);
    };

    const manejarSalidaVentana = () => {
      paralajeX.set(0);
      paralajeY.set(0);
    };

    colocarEnCentro();

    window.addEventListener("pointermove", manejarMovimiento, { passive: true });
    window.addEventListener("pointerdown", manejarInteraccion, { passive: true });
    window.addEventListener("resize", colocarEnCentro, { passive: true });
    window.addEventListener("blur", manejarSalidaVentana);

    return () => {
      window.removeEventListener("pointermove", manejarMovimiento);
      window.removeEventListener("pointerdown", manejarInteraccion);
      window.removeEventListener("resize", colocarEnCentro);
      window.removeEventListener("blur", manejarSalidaVentana);

      temporizadoresRef.current.forEach((temporizador) => {
        window.clearTimeout(temporizador);
      });
      temporizadoresRef.current = [];
    };
  }, [
    montado,
    reducirMovimiento,
    paralajeX,
    paralajeY,
    punteroX,
    punteroY,
  ]);

  if (!montado) {
    return (
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-background transition-colors duration-500"
      />
    );
  }

  const esOscuro = resolvedTheme === "dark";

  return (
    <div
      ref={contenedorRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden bg-background"
    >
      <BubbleBackground
        key={esOscuro ? "burbujas-dark" : "burbujas-light"}
        interactive={false}
        colors={esOscuro ? coloresModoOscuro : coloresModoClaro}
        transition={{
          stiffness: 82,
          damping: 24,
        }}
        className="absolute inset-0 bg-background opacity-48 transition-opacity duration-500 dark:opacity-66"
      />

      {/* Luces ambientales con paralaje */}
      <motion.div
        className="absolute -left-[18rem] top-[8%] size-[42rem] rounded-full bg-primary/18 blur-[130px] will-change-transform dark:bg-primary/14"
        style={{ x: paralajeXSuave, y: paralajeYSuave }}
      />

      <motion.div
        className="absolute -right-[16rem] bottom-[-12rem] size-[38rem] rounded-full bg-brand-electric/16 blur-[140px] will-change-transform dark:bg-brand-primary/18"
        style={{ x: paralajeInversoX, y: paralajeInversoY }}
      />

      {/* Capas que aseguran contraste con los formularios */}
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(247,249,252,0.78),rgba(219,234,254,0.38),rgba(255,255,255,0.66))] opacity-100 transition-opacity duration-500 dark:opacity-0" />

      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(7,11,22,0.72),rgba(8,14,40,0.74),rgba(17,26,46,0.62))] opacity-0 transition-opacity duration-500 dark:opacity-100" />

      {/* Halo que sigue al cursor, visible incluso sobre las capas de contraste */}
      {!reducirMovimiento && (
        <>
          <motion.div
            className="absolute inset-0 opacity-100 transition-opacity duration-500 dark:opacity-0"
            style={{ background: focoClaro }}
          />

          <motion.div
            className="absolute inset-0 opacity-0 transition-opacity duration-500 dark:opacity-100"
            style={{ background: focoOscuro }}
          />
        </>
      )}

      {/* Ondas generadas al hacer clic o tocar la pantalla */}
      {!reducirMovimiento &&
        ondas.map((onda) => (
          <motion.span
            key={onda.id}
            className="absolute size-40 rounded-full border border-primary/45 bg-primary/8 shadow-[0_0_55px_rgba(37,99,235,0.18)] dark:border-primary/40 dark:bg-primary/6 dark:shadow-[0_0_65px_rgba(96,165,250,0.16)]"
            style={{
              left: onda.x,
              top: onda.y,
              x: "-50%",
              y: "-50%",
            }}
            initial={{ opacity: 0.62, scale: 0.12 }}
            animate={{ opacity: 0, scale: 2.35 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          />
        ))}

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_32%,rgba(16,27,81,0.08)_100%)] transition-colors duration-500 dark:bg-[radial-gradient(circle_at_center,transparent_25%,rgba(0,0,0,0.52)_100%)]" />
    </div>
  );
}