import "dotenv/config";

import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client.js";

const cadenaConexion = process.env.DIRECT_URL ?? process.env.DATABASE_URL;

if (!cadenaConexion) {
  throw new Error(
    "No se encontró DIRECT_URL ni DATABASE_URL en las variables de entorno.",
  );
}

const adaptador = new PrismaPg({
  connectionString: cadenaConexion,
});

const prisma = new PrismaClient({
  adapter: adaptador,
});

/**
 * Permisos generales disponibles en PinolPoint.
 *
 * Estos permisos no pertenecen directamente a una empresa.
 * Los roles empresariales son los que reciben los permisos.
 */
const permisosBase = [
  // Empresa
  {
    codigo: "empresa.ver",
    modulo: "EMPRESA",
    recurso: "EMPRESA",
    accion: "VER",
    nombre: "Ver empresa",
  },
  {
    codigo: "empresa.editar",
    modulo: "EMPRESA",
    recurso: "EMPRESA",
    accion: "EDITAR",
    nombre: "Editar empresa",
  },
  {
    codigo: "empresa.configurar",
    modulo: "EMPRESA",
    recurso: "CONFIGURACION",
    accion: "EDITAR",
    nombre: "Configurar empresa",
  },

  // Sucursales
  {
    codigo: "sucursal.ver",
    modulo: "EMPRESA",
    recurso: "SUCURSAL",
    accion: "VER",
    nombre: "Ver sucursales",
  },
  {
    codigo: "sucursal.crear",
    modulo: "EMPRESA",
    recurso: "SUCURSAL",
    accion: "CREAR",
    nombre: "Crear sucursales",
  },
  {
    codigo: "sucursal.editar",
    modulo: "EMPRESA",
    recurso: "SUCURSAL",
    accion: "EDITAR",
    nombre: "Editar sucursales",
  },
  {
    codigo: "sucursal.desactivar",
    modulo: "EMPRESA",
    recurso: "SUCURSAL",
    accion: "DESACTIVAR",
    nombre: "Desactivar sucursales",
  },

  // Bodegas
  {
    codigo: "bodega.ver",
    modulo: "INVENTARIO",
    recurso: "BODEGA",
    accion: "VER",
    nombre: "Ver bodegas",
  },
  {
    codigo: "bodega.crear",
    modulo: "INVENTARIO",
    recurso: "BODEGA",
    accion: "CREAR",
    nombre: "Crear bodegas",
  },
  {
    codigo: "bodega.editar",
    modulo: "INVENTARIO",
    recurso: "BODEGA",
    accion: "EDITAR",
    nombre: "Editar bodegas",
  },
  {
    codigo: "bodega.desactivar",
    modulo: "INVENTARIO",
    recurso: "BODEGA",
    accion: "DESACTIVAR",
    nombre: "Desactivar bodegas",
  },

  // Usuarios
  {
    codigo: "usuario.ver",
    modulo: "SEGURIDAD",
    recurso: "USUARIO",
    accion: "VER",
    nombre: "Ver usuarios",
  },
  {
    codigo: "usuario.invitar",
    modulo: "SEGURIDAD",
    recurso: "USUARIO",
    accion: "INVITAR",
    nombre: "Invitar usuarios",
  },
  {
    codigo: "usuario.editar",
    modulo: "SEGURIDAD",
    recurso: "USUARIO",
    accion: "EDITAR",
    nombre: "Editar usuarios",
  },
  {
    codigo: "usuario.desactivar",
    modulo: "SEGURIDAD",
    recurso: "USUARIO",
    accion: "DESACTIVAR",
    nombre: "Desactivar usuarios",
  },

  // Roles
  {
    codigo: "rol.ver",
    modulo: "SEGURIDAD",
    recurso: "ROL",
    accion: "VER",
    nombre: "Ver roles",
  },
  {
    codigo: "rol.crear",
    modulo: "SEGURIDAD",
    recurso: "ROL",
    accion: "CREAR",
    nombre: "Crear roles",
  },
  {
    codigo: "rol.editar",
    modulo: "SEGURIDAD",
    recurso: "ROL",
    accion: "EDITAR",
    nombre: "Editar roles",
  },
  {
    codigo: "rol.asignar",
    modulo: "SEGURIDAD",
    recurso: "ROL",
    accion: "ASIGNAR",
    nombre: "Asignar roles",
  },

  // Artículos
  {
    codigo: "articulo.ver",
    modulo: "CATALOGOS",
    recurso: "ARTICULO",
    accion: "VER",
    nombre: "Ver productos y servicios",
  },
  {
    codigo: "articulo.crear",
    modulo: "CATALOGOS",
    recurso: "ARTICULO",
    accion: "CREAR",
    nombre: "Crear productos y servicios",
  },
  {
    codigo: "articulo.editar",
    modulo: "CATALOGOS",
    recurso: "ARTICULO",
    accion: "EDITAR",
    nombre: "Editar productos y servicios",
  },
  {
    codigo: "articulo.desactivar",
    modulo: "CATALOGOS",
    recurso: "ARTICULO",
    accion: "DESACTIVAR",
    nombre: "Desactivar productos y servicios",
  },

  // Inventario
  {
    codigo: "inventario.ver",
    modulo: "INVENTARIO",
    recurso: "EXISTENCIA",
    accion: "VER",
    nombre: "Ver inventario",
  },
  {
    codigo: "inventario.entrada",
    modulo: "INVENTARIO",
    recurso: "MOVIMIENTO",
    accion: "ENTRADA",
    nombre: "Registrar entradas de inventario",
  },
  {
    codigo: "inventario.salida",
    modulo: "INVENTARIO",
    recurso: "MOVIMIENTO",
    accion: "SALIDA",
    nombre: "Registrar salidas de inventario",
  },
  {
    codigo: "inventario.ajustar",
    modulo: "INVENTARIO",
    recurso: "MOVIMIENTO",
    accion: "AJUSTAR",
    nombre: "Realizar ajustes de inventario",
  },
  {
    codigo: "inventario.transferir",
    modulo: "INVENTARIO",
    recurso: "TRASLADO",
    accion: "CREAR",
    nombre: "Transferir inventario",
  },
  {
    codigo: "inventario.kardex",
    modulo: "INVENTARIO",
    recurso: "KARDEX",
    accion: "VER",
    nombre: "Consultar kardex",
  },

  // Ventas
  {
    codigo: "venta.ver",
    modulo: "VENTAS",
    recurso: "VENTA",
    accion: "VER",
    nombre: "Ver ventas",
  },
  {
    codigo: "venta.crear",
    modulo: "VENTAS",
    recurso: "VENTA",
    accion: "CREAR",
    nombre: "Registrar ventas",
  },
  {
    codigo: "venta.anular",
    modulo: "VENTAS",
    recurso: "VENTA",
    accion: "ANULAR",
    nombre: "Anular ventas",
  },
  {
    codigo: "venta.devolver",
    modulo: "VENTAS",
    recurso: "DEVOLUCION",
    accion: "CREAR",
    nombre: "Registrar devoluciones",
  },
  {
    codigo: "venta.descuento",
    modulo: "VENTAS",
    recurso: "DESCUENTO",
    accion: "APLICAR",
    nombre: "Aplicar descuentos",
  },

  // Compras
  {
    codigo: "compra.ver",
    modulo: "COMPRAS",
    recurso: "COMPRA",
    accion: "VER",
    nombre: "Ver compras",
  },
  {
    codigo: "compra.crear",
    modulo: "COMPRAS",
    recurso: "COMPRA",
    accion: "CREAR",
    nombre: "Registrar compras",
  },
  {
    codigo: "compra.anular",
    modulo: "COMPRAS",
    recurso: "COMPRA",
    accion: "ANULAR",
    nombre: "Anular compras",
  },

  // Caja
  {
    codigo: "caja.ver",
    modulo: "CAJA",
    recurso: "CAJA",
    accion: "VER",
    nombre: "Ver cajas",
  },
  {
    codigo: "caja.abrir",
    modulo: "CAJA",
    recurso: "TURNO",
    accion: "ABRIR",
    nombre: "Abrir caja",
  },
  {
    codigo: "caja.cerrar",
    modulo: "CAJA",
    recurso: "TURNO",
    accion: "CERRAR",
    nombre: "Cerrar caja",
  },
  {
    codigo: "caja.movimiento",
    modulo: "CAJA",
    recurso: "MOVIMIENTO",
    accion: "CREAR",
    nombre: "Registrar movimientos de caja",
  },

  // Reportes
  {
    codigo: "reporte.ventas",
    modulo: "REPORTES",
    recurso: "VENTAS",
    accion: "VER",
    nombre: "Ver reportes de ventas",
  },
  {
    codigo: "reporte.inventario",
    modulo: "REPORTES",
    recurso: "INVENTARIO",
    accion: "VER",
    nombre: "Ver reportes de inventario",
  },
  {
    codigo: "reporte.financiero",
    modulo: "REPORTES",
    recurso: "FINANCIERO",
    accion: "VER",
    nombre: "Ver reportes financieros",
  },

  // Contabilidad
  {
    codigo: "contabilidad.ver",
    modulo: "CONTABILIDAD",
    recurso: "CONTABILIDAD",
    accion: "VER",
    nombre: "Ver contabilidad",
  },
  {
    codigo: "contabilidad.gestionar",
    modulo: "CONTABILIDAD",
    recurso: "CONTABILIDAD",
    accion: "GESTIONAR",
    nombre: "Gestionar contabilidad",
  },

  // Nómina
  {
    codigo: "nomina.ver",
    modulo: "NOMINA",
    recurso: "NOMINA",
    accion: "VER",
    nombre: "Ver nómina",
  },
  {
    codigo: "nomina.gestionar",
    modulo: "NOMINA",
    recurso: "NOMINA",
    accion: "GESTIONAR",
    nombre: "Gestionar nómina",
  },
] as const;

/**
 * Permisos asignados a los roles iniciales.
 *
 * Propietario y Administrador reciben todos.
 * Los demás roles reciben únicamente lo necesario.
 */
const permisosPorRol: Record<string, string[]> = {
  PROPIETARIO: permisosBase.map((permiso) => permiso.codigo),

  ADMINISTRADOR: permisosBase.map((permiso) => permiso.codigo),

  VENDEDOR: [
    "empresa.ver",
    "sucursal.ver",
    "bodega.ver",
    "articulo.ver",
    "inventario.ver",
    "venta.ver",
    "venta.crear",
    "venta.devolver",
    "venta.descuento",
    "caja.ver",
    "caja.abrir",
    "caja.cerrar",
    "caja.movimiento",
    "reporte.ventas",
  ],

  INVENTARIO: [
    "empresa.ver",
    "sucursal.ver",
    "bodega.ver",
    "bodega.crear",
    "bodega.editar",
    "articulo.ver",
    "articulo.crear",
    "articulo.editar",
    "inventario.ver",
    "inventario.entrada",
    "inventario.salida",
    "inventario.ajustar",
    "inventario.transferir",
    "inventario.kardex",
    "compra.ver",
    "compra.crear",
    "reporte.inventario",
  ],

  CONTADOR: [
    "empresa.ver",
    "sucursal.ver",
    "venta.ver",
    "compra.ver",
    "caja.ver",
    "reporte.ventas",
    "reporte.inventario",
    "reporte.financiero",
    "contabilidad.ver",
    "contabilidad.gestionar",
    "nomina.ver",
    "nomina.gestionar",
  ],
};

async function ejecutarSeed() {
  console.log("Iniciando datos iniciales de PinolPoint...");

  const resultado = await prisma.$transaction(
    async (tx) => {
      // ========================================================
      // 1. EMPRESA DE DEMOSTRACIÓN
      // ========================================================

      const empresa = await tx.empresa.upsert({
        where: {
          slug: "empresa-demostracion",
        },
        update: {
          nombreLegal: "Empresa de Demostración PinolPoint",
          nombreComercial: "PinolPoint Demo",
          perfilNegocio: "COMERCIO",
          paisCodigo: "NI",
          monedaCodigo: "NIO",
          idiomaCodigo: "es",
          zonaHoraria: "America/Managua",
          estado: "ACTIVO",
          eliminadoEn: null,
        },
        create: {
          slug: "empresa-demostracion",
          nombreLegal: "Empresa de Demostración PinolPoint",
          nombreComercial: "PinolPoint Demo",
          perfilNegocio: "COMERCIO",
          paisCodigo: "NI",
          monedaCodigo: "NIO",
          idiomaCodigo: "es",
          zonaHoraria: "America/Managua",
          estado: "ACTIVO",
        },
      });

      // ========================================================
      // 2. CONFIGURACIÓN DE EMPRESA
      // ========================================================

      await tx.configuracionEmpresa.upsert({
        where: {
          empresaId: empresa.id,
        },
        update: {
          formatoFecha: "dd/MM/yyyy",
          formatoHora: "HORAS_24",
          primerDiaSemana: 1,
          decimalesCantidad: 3,
          decimalesPrecio: 2,
          usaSeparadorMiles: true,
          configuracionAdicional: {
            tema: "sistema",
            mostrarLogoEnTicket: true,
          },
        },
        create: {
          empresaId: empresa.id,
          formatoFecha: "dd/MM/yyyy",
          formatoHora: "HORAS_24",
          primerDiaSemana: 1,
          decimalesCantidad: 3,
          decimalesPrecio: 2,
          usaSeparadorMiles: true,
          configuracionAdicional: {
            tema: "sistema",
            mostrarLogoEnTicket: true,
          },
        },
      });

      // ========================================================
      // 3. CASA MATRIZ
      // ========================================================

      const sucursal = await tx.sucursal.upsert({
        where: {
          empresaId_codigo: {
            empresaId: empresa.id,
            codigo: "MATRIZ",
          },
        },
        update: {
          nombre: "Casa matriz",
          tipo: "CASA_MATRIZ",
          esPrincipal: true,
          paisCodigo: "NI",
          ciudad: "Managua",
          zonaHoraria: "America/Managua",
          estado: "ACTIVO",
          eliminadoEn: null,
        },
        create: {
          empresaId: empresa.id,
          codigo: "MATRIZ",
          nombre: "Casa matriz",
          tipo: "CASA_MATRIZ",
          esPrincipal: true,
          paisCodigo: "NI",
          ciudad: "Managua",
          zonaHoraria: "America/Managua",
          estado: "ACTIVO",
        },
      });

      // ========================================================
      // 4. BODEGA PRINCIPAL
      // ========================================================

      const bodega = await tx.bodega.upsert({
        where: {
          empresaId_sucursalId_codigo: {
            empresaId: empresa.id,
            sucursalId: sucursal.id,
            codigo: "PRINCIPAL",
          },
        },
        update: {
          nombre: "Bodega principal",
          tipo: "PRINCIPAL",
          esPrincipal: true,
          controlaExistencia: true,
          permiteEntradas: true,
          permiteSalidas: true,
          permiteVentas: true,
          estado: "ACTIVO",
          eliminadoEn: null,
        },
        create: {
          empresaId: empresa.id,
          sucursalId: sucursal.id,
          codigo: "PRINCIPAL",
          nombre: "Bodega principal",
          tipo: "PRINCIPAL",
          esPrincipal: true,
          controlaExistencia: true,
          permiteEntradas: true,
          permiteSalidas: true,
          permiteVentas: true,
          estado: "ACTIVO",
        },
      });

      // ========================================================
      // 5. PERMISOS GLOBALES
      // ========================================================

      for (const permiso of permisosBase) {
        await tx.permiso.upsert({
          where: {
            codigo: permiso.codigo,
          },
          update: {
            modulo: permiso.modulo,
            recurso: permiso.recurso,
            accion: permiso.accion,
            nombre: permiso.nombre,
            estado: "ACTIVO",
          },
          create: {
            codigo: permiso.codigo,
            modulo: permiso.modulo,
            recurso: permiso.recurso,
            accion: permiso.accion,
            nombre: permiso.nombre,
            estado: "ACTIVO",
          },
        });
      }

      // ========================================================
      // 6. ROLES INICIALES DE LA EMPRESA
      // ========================================================

      const definicionesRoles = [
        {
          codigo: "PROPIETARIO",
          nombre: "Propietario",
          descripcion: "Control total sobre la empresa.",
        },
        {
          codigo: "ADMINISTRADOR",
          nombre: "Administrador",
          descripcion: "Administra la operación general de la empresa.",
        },
        {
          codigo: "VENDEDOR",
          nombre: "Vendedor",
          descripcion: "Gestiona ventas, caja y consultas de productos.",
        },
        {
          codigo: "INVENTARIO",
          nombre: "Encargado de inventario",
          descripcion:
            "Gestiona artículos, bodegas y movimientos de inventario.",
        },
        {
          codigo: "CONTADOR",
          nombre: "Contador",
          descripcion: "Consulta y gestiona información financiera y contable.",
        },
      ] as const;

      const rolesCreados = [];

      for (const definicion of definicionesRoles) {
        const rol = await tx.rol.upsert({
          where: {
            empresaId_codigo: {
              empresaId: empresa.id,
              codigo: definicion.codigo,
            },
          },
          update: {
            nombre: definicion.nombre,
            descripcion: definicion.descripcion,
            esSistema: true,
            estado: "ACTIVO",
            eliminadoEn: null,
          },
          create: {
            empresaId: empresa.id,
            codigo: definicion.codigo,
            nombre: definicion.nombre,
            descripcion: definicion.descripcion,
            esSistema: true,
            estado: "ACTIVO",
          },
        });

        rolesCreados.push(rol);
      }

      // ========================================================
      // 7. ASIGNACIÓN DE PERMISOS A ROLES
      // ========================================================

      const permisosGuardados = await tx.permiso.findMany({
        where: {
          codigo: {
            in: permisosBase.map((permiso) => permiso.codigo),
          },
        },
        select: {
          id: true,
          codigo: true,
        },
      });

      const permisoIdPorCodigo = new Map(
        permisosGuardados.map((permiso) => [permiso.codigo, permiso.id]),
      );

      for (const rol of rolesCreados) {
        const codigosAsignados = permisosPorRol[rol.codigo] ?? [];

        /**
         * Sincronizamos únicamente los permisos de los roles
         * del sistema creados por este seed.
         */
        await tx.rolPermiso.deleteMany({
          where: {
            rolId: rol.id,
          },
        });

        const asignaciones = codigosAsignados.map((codigoPermiso) => {
          const permisoId = permisoIdPorCodigo.get(codigoPermiso);

          if (!permisoId) {
            throw new Error(`No se encontró el permiso ${codigoPermiso}.`);
          }

          return {
            rolId: rol.id,
            permisoId,
          };
        });

        if (asignaciones.length > 0) {
          await tx.rolPermiso.createMany({
            data: asignaciones,
          });
        }
      }

      return {
        empresa,
        sucursal,
        bodega,
        cantidadPermisos: permisosGuardados.length,
        cantidadRoles: rolesCreados.length,
      };
    },
    {
      maxWait: 10_000,
      timeout: 120_000,
    },
  );
  console.log("Datos iniciales creados correctamente.");
  console.log({
    empresa: resultado.empresa.nombreComercial,
    sucursal: resultado.sucursal.nombre,
    bodega: resultado.bodega.nombre,
    roles: resultado.cantidadRoles,
    permisos: resultado.cantidadPermisos,
  });
}

ejecutarSeed()
  .catch((error: unknown) => {
    console.error("Error ejecutando el seed de PinolPoint:");
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
