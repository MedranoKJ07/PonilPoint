import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";

import { prisma } from "@/lib/prisma";

/**
 * Configuración central de autenticación de PinolPoint.
 *
 * Better Auth administra:
 * - usuarios;
 * - contraseñas;
 * - sesiones;
 * - cuentas vinculadas;
 * - verificaciones.
 *
 * Los permisos empresariales se agregarán posteriormente
 * mediante modelos propios de PinolPoint.
 */
export const auth = betterAuth({
  appName: "PinolPoint",

  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),

  emailAndPassword: {
    enabled: true,
  },
});