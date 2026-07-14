-- CreateEnum
CREATE TYPE "EstadoMembresia" AS ENUM ('PENDIENTE', 'ACTIVA', 'SUSPENDIDA', 'REVOCADA');

-- CreateTable
CREATE TABLE "miembros_empresa" (
    "id" UUID NOT NULL,
    "usuario_id" TEXT NOT NULL,
    "empresa_id" UUID NOT NULL,
    "estado" "EstadoMembresia" NOT NULL DEFAULT 'ACTIVA',
    "es_propietario" BOOLEAN NOT NULL DEFAULT false,
    "acceso_todas_sucursales" BOOLEAN NOT NULL DEFAULT false,
    "creado_en" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "actualizado_en" TIMESTAMPTZ(3) NOT NULL,
    "eliminado_en" TIMESTAMPTZ(3),

    CONSTRAINT "miembros_empresa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "roles" (
    "id" UUID NOT NULL,
    "empresa_id" UUID NOT NULL,
    "codigo" VARCHAR(60) NOT NULL,
    "nombre" VARCHAR(120) NOT NULL,
    "descripcion" VARCHAR(500),
    "es_sistema" BOOLEAN NOT NULL DEFAULT false,
    "estado" "EstadoRegistro" NOT NULL DEFAULT 'ACTIVO',
    "creado_en" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "actualizado_en" TIMESTAMPTZ(3) NOT NULL,
    "eliminado_en" TIMESTAMPTZ(3),

    CONSTRAINT "roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "permisos" (
    "id" UUID NOT NULL,
    "codigo" VARCHAR(150) NOT NULL,
    "modulo" VARCHAR(80) NOT NULL,
    "recurso" VARCHAR(80) NOT NULL,
    "accion" VARCHAR(50) NOT NULL,
    "nombre" VARCHAR(150) NOT NULL,
    "descripcion" VARCHAR(500),
    "estado" "EstadoRegistro" NOT NULL DEFAULT 'ACTIVO',
    "creado_en" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "actualizado_en" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "permisos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "roles_permisos" (
    "rol_id" UUID NOT NULL,
    "permiso_id" UUID NOT NULL,
    "creado_en" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "roles_permisos_pkey" PRIMARY KEY ("rol_id","permiso_id")
);

-- CreateTable
CREATE TABLE "miembros_roles" (
    "miembro_empresa_id" UUID NOT NULL,
    "rol_id" UUID NOT NULL,
    "empresa_id" UUID NOT NULL,
    "asignado_en" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "miembros_roles_pkey" PRIMARY KEY ("miembro_empresa_id","rol_id")
);

-- CreateTable
CREATE TABLE "accesos_sucursal" (
    "miembro_empresa_id" UUID NOT NULL,
    "sucursal_id" UUID NOT NULL,
    "empresa_id" UUID NOT NULL,
    "creado_en" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "accesos_sucursal_pkey" PRIMARY KEY ("miembro_empresa_id","sucursal_id")
);

-- CreateIndex
CREATE INDEX "miembros_empresa_empresa_estado_idx" ON "miembros_empresa"("empresa_id", "estado");

-- CreateIndex
CREATE INDEX "miembros_empresa_usuario_estado_idx" ON "miembros_empresa"("usuario_id", "estado");

-- CreateIndex
CREATE UNIQUE INDEX "miembros_empresa_usuario_empresa_uq" ON "miembros_empresa"("usuario_id", "empresa_id");

-- CreateIndex
CREATE UNIQUE INDEX "miembros_empresa_id_empresa_uq" ON "miembros_empresa"("id", "empresa_id");

-- CreateIndex
CREATE INDEX "roles_empresa_estado_idx" ON "roles"("empresa_id", "estado");

-- CreateIndex
CREATE UNIQUE INDEX "roles_empresa_codigo_uq" ON "roles"("empresa_id", "codigo");

-- CreateIndex
CREATE UNIQUE INDEX "roles_id_empresa_uq" ON "roles"("id", "empresa_id");

-- CreateIndex
CREATE UNIQUE INDEX "permisos_codigo_uq" ON "permisos"("codigo");

-- CreateIndex
CREATE INDEX "permisos_modulo_estado_idx" ON "permisos"("modulo", "estado");

-- CreateIndex
CREATE UNIQUE INDEX "permisos_modulo_recurso_accion_uq" ON "permisos"("modulo", "recurso", "accion");

-- CreateIndex
CREATE INDEX "roles_permisos_permiso_idx" ON "roles_permisos"("permiso_id");

-- CreateIndex
CREATE INDEX "miembros_roles_empresa_idx" ON "miembros_roles"("empresa_id");

-- CreateIndex
CREATE INDEX "miembros_roles_rol_idx" ON "miembros_roles"("rol_id");

-- CreateIndex
CREATE INDEX "accesos_sucursal_empresa_sucursal_idx" ON "accesos_sucursal"("empresa_id", "sucursal_id");

-- AddForeignKey
ALTER TABLE "miembros_empresa" ADD CONSTRAINT "miembros_empresa_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "miembros_empresa" ADD CONSTRAINT "miembros_empresa_empresa_id_fkey" FOREIGN KEY ("empresa_id") REFERENCES "empresas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "roles" ADD CONSTRAINT "roles_empresa_id_fkey" FOREIGN KEY ("empresa_id") REFERENCES "empresas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "roles_permisos" ADD CONSTRAINT "roles_permisos_rol_id_fkey" FOREIGN KEY ("rol_id") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "roles_permisos" ADD CONSTRAINT "roles_permisos_permiso_id_fkey" FOREIGN KEY ("permiso_id") REFERENCES "permisos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "miembros_roles" ADD CONSTRAINT "miembros_roles_miembro_empresa_id_empresa_id_fkey" FOREIGN KEY ("miembro_empresa_id", "empresa_id") REFERENCES "miembros_empresa"("id", "empresa_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "miembros_roles" ADD CONSTRAINT "miembros_roles_rol_id_empresa_id_fkey" FOREIGN KEY ("rol_id", "empresa_id") REFERENCES "roles"("id", "empresa_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "accesos_sucursal" ADD CONSTRAINT "accesos_sucursal_miembro_empresa_id_empresa_id_fkey" FOREIGN KEY ("miembro_empresa_id", "empresa_id") REFERENCES "miembros_empresa"("id", "empresa_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "accesos_sucursal" ADD CONSTRAINT "accesos_sucursal_sucursal_id_empresa_id_fkey" FOREIGN KEY ("sucursal_id", "empresa_id") REFERENCES "sucursales"("id", "empresa_id") ON DELETE CASCADE ON UPDATE CASCADE;
