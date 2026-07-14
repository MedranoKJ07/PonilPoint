import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

/**
 * Prisma con PostgreSQL debe ejecutarse en el runtime de Node.js.
 */
export const runtime = "nodejs";

/**
 * Evita que Next.js intente almacenar en caché
 * el resultado de esta comprobación.
 */
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const [cantidadEmpresas, cantidadSucursales, cantidadBodegas] =
      await Promise.all([
        prisma.empresa.count(),
        prisma.sucursal.count(),
        prisma.bodega.count(),
      ]);

    return NextResponse.json({
      correcto: true,
      mensaje: "PinolPoint está conectado correctamente a la base de datos.",
      datos: {
        empresas: cantidadEmpresas,
        sucursales: cantidadSucursales,
        bodegas: cantidadBodegas,
      },
      fechaServidor: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error comprobando la base de datos:", error);

    return NextResponse.json(
      {
        correcto: false,
        mensaje: "No fue posible conectar con la base de datos.",
      },
      {
        status: 500,
      },
    );
  }
}