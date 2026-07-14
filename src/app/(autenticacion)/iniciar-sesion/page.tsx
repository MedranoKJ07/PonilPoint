"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  type FormEvent,
  useState,
} from "react";
import {
  AlertCircle,
  ArrowRight,
  Eye,
  EyeOff,
  LoaderCircle,
  LockKeyhole,
  Mail,
} from "lucide-react";
import { z } from "zod";

import { AnimateIcon } from "@/components/animate-ui/icons/icon";
import { Button } from "@/components/animate-ui/primitives/buttons/button";
import { MarcoAutenticacion } from "@/components/autenticacion/marco-autenticacion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";

const esquemaInicioSesion = z.object({
  correo: z
    .string()
    .trim()
    .email("Ingresa un correo electrónico válido."),

  contrasena: z
    .string()
    .min(1, "Ingresa tu contraseña."),
});

export default function PaginaInicioSesion() {
  const router = useRouter();

  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [mostrarContrasena, setMostrarContrasena] =
    useState(false);

  const [mensajeError, setMensajeError] =
    useState<string | null>(null);

  const [procesando, setProcesando] = useState(false);

  async function iniciarSesion(
    evento: FormEvent<HTMLFormElement>,
  ) {
    evento.preventDefault();
    setMensajeError(null);

    const validacion = esquemaInicioSesion.safeParse({
      correo,
      contrasena,
    });

    if (!validacion.success) {
      setMensajeError(
        validacion.error.issues[0]?.message ??
          "Revisa la información ingresada.",
      );

      return;
    }

    setProcesando(true);

    try {
      const { error } = await authClient.signIn.email({
        email: validacion.data.correo.toLowerCase(),
        password: validacion.data.contrasena,
        rememberMe: true,
      });

      if (error) {
        setMensajeError(
          "El correo electrónico o la contraseña son incorrectos.",
        );

        return;
      }

      router.push("/crear-empresa");
      router.refresh();
    } catch (error) {
      console.error("Error iniciando sesión:", error);

      setMensajeError(
        "Ocurrió un error inesperado al iniciar sesión.",
      );
    } finally {
      setProcesando(false);
    }
  }

  return (
    <MarcoAutenticacion
      titulo="Bienvenido de nuevo"
      descripcion="Ingresa a tu cuenta para continuar administrando tus empresas."
    >
      <form
        className="space-y-5"
        onSubmit={iniciarSesion}
        noValidate
      >
        {/* Correo */}
        <div className="space-y-2">
          <Label
            htmlFor="correo"
            className="
              text-brand-navy
              transition-colors duration-500
              dark:text-white
            "
          >
            Correo electrónico
          </Label>

          <div className="group relative">
            <div
              className="
                pointer-events-none absolute inset-y-0 left-0
                flex items-center pl-3.5
                text-muted-foreground
                transition-colors duration-300
                group-focus-within:text-primary
                dark:text-[#B3C6DF]
                dark:group-focus-within:text-accent
              "
            >
              <AnimateIcon
                animateOnHover
                completeOnStop
              >
                <Mail className="size-4.5" />
              </AnimateIcon>
            </div>

            <Input
              id="correo"
              name="correo"
              type="email"
              autoComplete="email"
              placeholder="correo@ejemplo.com"
              value={correo}
              onChange={(evento) =>
                setCorreo(evento.target.value)
              }
              disabled={procesando}
              className="
                h-12 rounded-xl
                border-border/90
                bg-background/70
                pl-10
                text-foreground
                shadow-sm
                backdrop-blur-sm
                transition-[background-color,border-color,box-shadow]
                duration-300
                placeholder:text-muted-foreground
                focus-visible:border-primary
                focus-visible:ring-primary/20

                dark:border-white/10
                dark:bg-brand-navy/35
                dark:text-white
                dark:placeholder:text-[#B3C6DF]/60
                dark:focus-visible:border-accent
                dark:focus-visible:ring-accent/20
              "
            />
          </div>
        </div>

        {/* Contraseña */}
        <div className="space-y-2">
          <div className="flex items-center justify-between gap-4">
            <Label
              htmlFor="contrasena"
              className="
                text-brand-navy
                transition-colors duration-500
                dark:text-white
              "
            >
              Contraseña
            </Label>

            <Link
              href="/recuperar-contrasena"
              className="
                text-xs font-semibold text-primary
                transition-colors
                hover:text-[#0F5EDB]
                hover:underline
                dark:text-accent
                dark:hover:text-white
              "
            >
              ¿Olvidaste tu contraseña?
            </Link>
          </div>

          <div className="group relative">
            <div
              className="
                pointer-events-none absolute inset-y-0 left-0
                flex items-center pl-3.5
                text-muted-foreground
                transition-colors duration-300
                group-focus-within:text-primary
                dark:text-[#B3C6DF]
                dark:group-focus-within:text-accent
              "
            >
              <AnimateIcon
                animateOnHover
                completeOnStop
              >
                <LockKeyhole className="size-4.5" />
              </AnimateIcon>
            </div>

            <Input
              id="contrasena"
              name="contrasena"
              type={
                mostrarContrasena
                  ? "text"
                  : "password"
              }
              autoComplete="current-password"
              placeholder="Tu contraseña"
              value={contrasena}
              onChange={(evento) =>
                setContrasena(evento.target.value)
              }
              disabled={procesando}
              className="
                h-12 rounded-xl
                border-border/90
                bg-background/70
                px-10
                text-foreground
                shadow-sm
                backdrop-blur-sm
                transition-[background-color,border-color,box-shadow]
                duration-300
                placeholder:text-muted-foreground
                focus-visible:border-primary
                focus-visible:ring-primary/20

                dark:border-white/10
                dark:bg-brand-navy/35
                dark:text-white
                dark:placeholder:text-[#B3C6DF]/60
                dark:focus-visible:border-accent
                dark:focus-visible:ring-accent/20
              "
            />

            <button
              type="button"
              aria-label={
                mostrarContrasena
                  ? "Ocultar contraseña"
                  : "Mostrar contraseña"
              }
              aria-pressed={mostrarContrasena}
              disabled={procesando}
              onClick={() =>
                setMostrarContrasena(
                  (estadoActual) => !estadoActual,
                )
              }
              className="
                absolute inset-y-0 right-0
                flex w-10 items-center justify-center
                text-muted-foreground
                transition-colors
                hover:text-primary
                focus-visible:outline-none
                focus-visible:text-primary
                disabled:pointer-events-none
                disabled:opacity-50

                dark:text-[#B3C6DF]
                dark:hover:text-accent
                dark:focus-visible:text-accent
              "
            >
              <AnimateIcon
                animateOnTap
                completeOnStop
              >
                {mostrarContrasena ? (
                  <EyeOff className="size-4.5" />
                ) : (
                  <Eye className="size-4.5" />
                )}
              </AnimateIcon>
            </button>
          </div>
        </div>

        {/* Error */}
        {mensajeError && (
          <div
            role="alert"
            className="
              flex items-start gap-3 rounded-xl
              border border-destructive/20
              bg-destructive/10
              px-4 py-3
              text-sm text-destructive
              shadow-sm
              backdrop-blur-sm
              dark:border-red-400/20
              dark:bg-red-500/10
              dark:text-red-300
            "
          >
            <AnimateIcon
              animateOnView
              completeOnStop
              className="mt-0.5 shrink-0"
            >
              <AlertCircle className="size-4" />
            </AnimateIcon>

            <p>{mensajeError}</p>
          </div>
        )}

        {/* Botón */}
        <Button
          type="submit"
          disabled={procesando}
          hoverScale={1.015}
          tapScale={0.98}
          className="
            group flex h-12 w-full
            items-center justify-center gap-2
            rounded-xl
            bg-primary px-4
            font-semibold text-primary-foreground
            shadow-[0_12px_30px_rgba(22,119,255,0.25)]
            transition-[background-color,box-shadow]
            duration-300
            hover:bg-[#0F5EDB]
            hover:shadow-[0_16px_38px_rgba(22,119,255,0.34)]
            disabled:pointer-events-none
            disabled:opacity-60

            dark:bg-primary
            dark:text-white
            dark:hover:bg-accent
            dark:hover:text-brand-navy
            dark:hover:shadow-[0_16px_40px_rgba(115,185,255,0.22)]
          "
        >
          {procesando ? (
            <>
              <AnimateIcon>
                <LoaderCircle className="size-4 animate-spin" />
              </AnimateIcon>

              <span>Ingresando...</span>
            </>
          ) : (
            <>
              <span>Iniciar sesión</span>

              <AnimateIcon
                animateOnHover
                animateOnTap
                completeOnStop
              >
                <ArrowRight
                  className="
                    size-4
                    transition-transform duration-300
                    group-hover:translate-x-1
                  "
                />
              </AnimateIcon>
            </>
          )}
        </Button>
      </form>

      <p
        className="
          mt-7 text-center text-sm
          text-muted-foreground
          transition-colors duration-500
          dark:text-[#B3C6DF]
        "
      >
        ¿Aún no tienes una cuenta?{" "}
        <Link
          href="/registro"
          className="
            font-semibold text-primary
            transition-colors
            hover:text-[#0F5EDB]
            hover:underline
            dark:text-accent
            dark:hover:text-white
          "
        >
          Crear cuenta
        </Link>
      </p>
    </MarcoAutenticacion>
  );
}