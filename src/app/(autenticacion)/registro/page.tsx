"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { type FormEvent, useState } from "react";
import { AlertCircle, ArrowRight, LoaderCircle } from "lucide-react";
import { z } from "zod";

import { Button } from "@/components/animate-ui/primitives/buttons/button";
import { MarcoAutenticacion } from "@/components/autenticacion/marco-autenticacion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";

const esquemaRegistro = z
  .object({
    nombre: z
      .string()
      .trim()
      .min(2, "El nombre debe contener al menos 2 caracteres.")
      .max(100, "El nombre es demasiado largo."),

    correo: z
      .string()
      .trim()
      .email("Ingresa un correo electrónico válido."),

    contrasena: z
      .string()
      .min(8, "La contraseña debe contener al menos 8 caracteres.")
      .max(128, "La contraseña no puede superar los 128 caracteres."),

    confirmarContrasena: z.string(),
  })
  .refine(
    (datos) => datos.contrasena === datos.confirmarContrasena,
    {
      message: "Las contraseñas no coinciden.",
      path: ["confirmarContrasena"],
    },
  );

export default function PaginaRegistro() {
  const router = useRouter();

  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [confirmarContrasena, setConfirmarContrasena] =
    useState("");

  const [mensajeError, setMensajeError] = useState<string | null>(
    null,
  );
  const [procesando, setProcesando] = useState(false);

  async function registrarUsuario(
    evento: FormEvent<HTMLFormElement>,
  ) {
    evento.preventDefault();
    setMensajeError(null);

    const validacion = esquemaRegistro.safeParse({
      nombre,
      correo,
      contrasena,
      confirmarContrasena,
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
      const { error } = await authClient.signUp.email({
        name: validacion.data.nombre,
        email: validacion.data.correo.toLowerCase(),
        password: validacion.data.contrasena,
      });

      if (error) {
        setMensajeError(
          error.message ?? "No fue posible crear la cuenta.",
        );

        return;
      }

      router.push("/crear-empresa");
      router.refresh();
    } catch (error) {
      console.error("Error registrando el usuario:", error);

      setMensajeError(
        "Ocurrió un error inesperado al crear la cuenta.",
      );
    } finally {
      setProcesando(false);
    }
  }

  return (
    <MarcoAutenticacion
      titulo="Crea tu cuenta"
      descripcion="Comienza a administrar tu negocio con PinolPoint."
    >
      <form
        className="space-y-5"
        onSubmit={registrarUsuario}
        noValidate
      >
        <div className="space-y-2">
          <Label htmlFor="nombre">Nombre completo</Label>

          <Input
            id="nombre"
            name="nombre"
            type="text"
            autoComplete="name"
            placeholder="Ejemplo: Celeste Ruiz"
            value={nombre}
            onChange={(evento) => setNombre(evento.target.value)}
            disabled={procesando}
            className="h-11"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="correo">Correo electrónico</Label>

          <Input
            id="correo"
            name="correo"
            type="email"
            autoComplete="email"
            placeholder="correo@ejemplo.com"
            value={correo}
            onChange={(evento) => setCorreo(evento.target.value)}
            disabled={procesando}
            className="h-11"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="contrasena">Contraseña</Label>

          <Input
            id="contrasena"
            name="contrasena"
            type="password"
            autoComplete="new-password"
            placeholder="Mínimo 8 caracteres"
            value={contrasena}
            onChange={(evento) =>
              setContrasena(evento.target.value)
            }
            disabled={procesando}
            className="h-11"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmarContrasena">
            Confirmar contraseña
          </Label>

          <Input
            id="confirmarContrasena"
            name="confirmarContrasena"
            type="password"
            autoComplete="new-password"
            placeholder="Repite tu contraseña"
            value={confirmarContrasena}
            onChange={(evento) =>
              setConfirmarContrasena(evento.target.value)
            }
            disabled={procesando}
            className="h-11"
          />
        </div>

        {mensajeError && (
          <div
            role="alert"
            className="flex items-start gap-3 rounded-xl border border-destructive/20 bg-destructive/10 px-4 py-3 text-sm text-destructive"
          >
            <AlertCircle className="mt-0.5 size-4 shrink-0" />
            <p>{mensajeError}</p>
          </div>
        )}

        <Button
          type="submit"
          disabled={procesando}
          hoverScale={1.015}
          tapScale={0.98}
          className="flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 font-semibold text-primary-foreground disabled:pointer-events-none disabled:opacity-60"
        >
          {procesando ? (
            <>
              <LoaderCircle className="size-4 animate-spin" />
              Creando cuenta...
            </>
          ) : (
            <>
              Crear cuenta
              <ArrowRight className="size-4" />
            </>
          )}
        </Button>
      </form>

      <p className="mt-7 text-center text-sm text-muted-foreground">
        ¿Ya tienes una cuenta?{" "}
        <Link
          href="/iniciar-sesion"
          className="font-semibold text-primary hover:underline"
        >
          Iniciar sesión
        </Link>
      </p>
    </MarcoAutenticacion>
  );
}