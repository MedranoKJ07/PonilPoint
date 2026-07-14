import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Building2, CheckCircle2, Mail, Store } from "lucide-react";

import { AlternadorTema } from "@/components/tema/alternador-tema";
import { auth } from "@/lib/auth";

export default async function PaginaCrearEmpresa() {
  const sesion = await auth.api.getSession({
    headers: await headers(),
  });

  if (!sesion) {
    redirect("/iniciar-sesion");
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-background px-4 py-10 text-foreground transition-colors duration-300 sm:px-6 lg:px-8">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(37,99,235,0.10),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(96,165,250,0.12),transparent_32%)] dark:bg-[radial-gradient(circle_at_top_left,rgba(96,165,250,0.08),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(37,99,235,0.10),transparent_34%)]"
      />

      <div className="relative mx-auto max-w-4xl">
        <header className="mb-8 flex items-center justify-between gap-4">
        

          <AlternadorTema />
        </header>

        <section className="overflow-hidden rounded-3xl border border-border bg-card text-card-foreground shadow-[0_24px_70px_var(--shadow-color-strong)]">
          <div className="border-b border-border bg-gradient-to-r from-secondary/70 via-card to-card px-6 py-8 sm:px-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary">
              <Building2 className="size-3.5" />
              Configuración inicial
            </div>

            <h1 className="mt-5 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Bienvenido, {sesion.user.name}
            </h1>

            <p className="mt-3 max-w-2xl leading-7 text-muted-foreground">
              Tu cuenta está funcionando correctamente. El siguiente paso será
              configurar tu primera empresa, su sucursal principal y la bodega
              inicial desde la que comenzarás a operar.
            </p>
          </div>

          <div className="grid gap-6 p-6 sm:p-10 md:grid-cols-[1.15fr_0.85fr]">
            <div className="rounded-2xl border border-success/25 bg-success-background p-5 text-success-foreground">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-xl bg-success/12 text-success">
                  <CheckCircle2 className="size-5" />
                </div>

                <div>
                  <p className="font-semibold">
                    Sesión autenticada correctamente
                  </p>
                  <p className="mt-1 text-sm leading-6 opacity-85">
                    Ya puedes continuar con la creación de tu espacio de trabajo
                    en PinolPoint.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-muted/70 p-5">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Mail className="size-4.5" />
                </div>

                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                    Cuenta activa
                  </p>
                  <p className="mt-1 truncate text-sm font-medium text-foreground">
                    {sesion.user.email}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
