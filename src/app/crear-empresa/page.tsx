import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";

export default async function PaginaCrearEmpresa() {
  const sesion = await auth.api.getSession({
    headers: await headers(),
  });

  if (!sesion) {
    redirect("/iniciar-sesion");
  }

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-12">
      <section className="mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-sm font-semibold text-blue-600">
          PinolPoint
        </p>

        <h1 className="mt-2 text-2xl font-bold text-slate-900">
          Bienvenido, {sesion.user.name}
        </h1>

        <p className="mt-3 text-slate-600">
          Tu cuenta está funcionando correctamente. En el siguiente
          paso configuraremos tu primera empresa, sucursal y bodega.
        </p>

        <div className="mt-6 rounded-xl border border-green-200 bg-green-50 p-4">
          <p className="font-medium text-green-800">
            Sesión autenticada correctamente
          </p>

          <p className="mt-1 text-sm text-green-700">
            Correo: {sesion.user.email}
          </p>
        </div>
      </section>
    </main>
  );
}