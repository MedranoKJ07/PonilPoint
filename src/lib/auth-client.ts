import { createAuthClient } from "better-auth/react";

/**
 * Cliente utilizado solamente desde componentes React.
 *
 * No necesita baseURL porque frontend y API pertenecen
 * al mismo dominio.
 */
export const authClient = createAuthClient();