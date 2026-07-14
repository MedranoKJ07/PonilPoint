import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/generated/prisma/client";

/**
 * Guardamos PrismaClient en globalThis durante el desarrollo.
 *
 * Next.js recarga los módulos frecuentemente con Turbopack.
 * Sin este patrón podrían crearse varios clientes y varias
 * conexiones innecesarias hacia PostgreSQL.
 */
const globalParaPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function crearClientePrisma(): PrismaClient {
  const cadenaConexion = process.env.DATABASE_URL;

  if (!cadenaConexion) {
    throw new Error(
      "La variable de entorno DATABASE_URL no está configurada.",
    );
  }

  const adaptador = new PrismaPg({
    connectionString: cadenaConexion,
  });

  return new PrismaClient({
    adapter: adaptador,
  });
}

export const prisma =
  globalParaPrisma.prisma ?? crearClientePrisma();

if (process.env.NODE_ENV !== "production") {
  globalParaPrisma.prisma = prisma;
}