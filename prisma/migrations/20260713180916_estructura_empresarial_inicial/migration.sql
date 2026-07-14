-- CreateEnum
CREATE TYPE "EstadoRegistro" AS ENUM ('ACTIVO', 'INACTIVO');

-- CreateEnum
CREATE TYPE "PerfilNegocio" AS ENUM ('COMERCIO', 'SERVICIOS', 'RESTAURANTE', 'DISTRIBUCION', 'MANUFACTURA', 'MIXTO', 'OTRO');

-- CreateEnum
CREATE TYPE "TipoSucursal" AS ENUM ('CASA_MATRIZ', 'SUCURSAL', 'PUNTO_VENTA', 'OFICINA', 'OTRO');

-- CreateEnum
CREATE TYPE "TipoBodega" AS ENUM ('PRINCIPAL', 'VENTA', 'ALMACEN', 'TRANSITO', 'DEVOLUCIONES', 'PRODUCCION', 'CUARENTENA', 'OTRO');

-- CreateEnum
CREATE TYPE "FormatoHora" AS ENUM ('HORAS_12', 'HORAS_24');

-- CreateTable
CREATE TABLE "empresas" (
    "id" UUID NOT NULL,
    "slug" VARCHAR(100) NOT NULL,
    "nombre_legal" VARCHAR(180) NOT NULL,
    "nombre_comercial" VARCHAR(180),
    "identificacion_fiscal" VARCHAR(50),
    "perfil_negocio" "PerfilNegocio" NOT NULL DEFAULT 'COMERCIO',
    "pais_codigo" CHAR(2) NOT NULL DEFAULT 'NI',
    "moneda_codigo" CHAR(3) NOT NULL DEFAULT 'NIO',
    "idioma_codigo" VARCHAR(10) NOT NULL DEFAULT 'es',
    "zona_horaria" VARCHAR(100) NOT NULL DEFAULT 'America/Managua',
    "telefono" VARCHAR(30),
    "correo" VARCHAR(254),
    "sitio_web" VARCHAR(500),
    "logo_url" VARCHAR(500),
    "estado" "EstadoRegistro" NOT NULL DEFAULT 'ACTIVO',
    "creado_en" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "actualizado_en" TIMESTAMPTZ(3) NOT NULL,
    "eliminado_en" TIMESTAMPTZ(3),

    CONSTRAINT "empresas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "configuraciones_empresa" (
    "id" UUID NOT NULL,
    "empresa_id" UUID NOT NULL,
    "formato_fecha" VARCHAR(30) NOT NULL DEFAULT 'dd/MM/yyyy',
    "formato_hora" "FormatoHora" NOT NULL DEFAULT 'HORAS_24',
    "primer_dia_semana" INTEGER NOT NULL DEFAULT 1,
    "decimales_cantidad" INTEGER NOT NULL DEFAULT 3,
    "decimales_precio" INTEGER NOT NULL DEFAULT 2,
    "usa_separador_miles" BOOLEAN NOT NULL DEFAULT true,
    "configuracion_adicional" JSONB,
    "creado_en" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "actualizado_en" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "configuraciones_empresa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sucursales" (
    "id" UUID NOT NULL,
    "empresa_id" UUID NOT NULL,
    "codigo" VARCHAR(30) NOT NULL,
    "nombre" VARCHAR(150) NOT NULL,
    "tipo" "TipoSucursal" NOT NULL DEFAULT 'SUCURSAL',
    "es_principal" BOOLEAN NOT NULL DEFAULT false,
    "pais_codigo" CHAR(2) NOT NULL DEFAULT 'NI',
    "region" VARCHAR(120),
    "ciudad" VARCHAR(120),
    "direccion" VARCHAR(500),
    "codigo_postal" VARCHAR(20),
    "telefono" VARCHAR(30),
    "correo" VARCHAR(254),
    "zona_horaria" VARCHAR(100),
    "estado" "EstadoRegistro" NOT NULL DEFAULT 'ACTIVO',
    "creado_en" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "actualizado_en" TIMESTAMPTZ(3) NOT NULL,
    "eliminado_en" TIMESTAMPTZ(3),

    CONSTRAINT "sucursales_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bodegas" (
    "id" UUID NOT NULL,
    "empresa_id" UUID NOT NULL,
    "sucursal_id" UUID NOT NULL,
    "codigo" VARCHAR(30) NOT NULL,
    "nombre" VARCHAR(150) NOT NULL,
    "tipo" "TipoBodega" NOT NULL DEFAULT 'ALMACEN',
    "ubicacion_interna" VARCHAR(250),
    "es_principal" BOOLEAN NOT NULL DEFAULT false,
    "controla_existencia" BOOLEAN NOT NULL DEFAULT true,
    "permite_entradas" BOOLEAN NOT NULL DEFAULT true,
    "permite_salidas" BOOLEAN NOT NULL DEFAULT true,
    "permite_ventas" BOOLEAN NOT NULL DEFAULT false,
    "estado" "EstadoRegistro" NOT NULL DEFAULT 'ACTIVO',
    "creado_en" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "actualizado_en" TIMESTAMPTZ(3) NOT NULL,
    "eliminado_en" TIMESTAMPTZ(3),

    CONSTRAINT "bodegas_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "empresas_slug_uq" ON "empresas"("slug");

-- CreateIndex
CREATE INDEX "empresas_estado_idx" ON "empresas"("estado");

-- CreateIndex
CREATE INDEX "empresas_identificacion_fiscal_idx" ON "empresas"("pais_codigo", "identificacion_fiscal");

-- CreateIndex
CREATE UNIQUE INDEX "configuraciones_empresa_empresa_id_uq" ON "configuraciones_empresa"("empresa_id");

-- CreateIndex
CREATE INDEX "sucursales_empresa_estado_idx" ON "sucursales"("empresa_id", "estado");

-- CreateIndex
CREATE INDEX "sucursales_empresa_principal_idx" ON "sucursales"("empresa_id", "es_principal");

-- CreateIndex
CREATE UNIQUE INDEX "sucursales_empresa_codigo_uq" ON "sucursales"("empresa_id", "codigo");

-- CreateIndex
CREATE UNIQUE INDEX "sucursales_id_empresa_uq" ON "sucursales"("id", "empresa_id");

-- CreateIndex
CREATE INDEX "bodegas_empresa_estado_idx" ON "bodegas"("empresa_id", "estado");

-- CreateIndex
CREATE INDEX "bodegas_sucursal_estado_idx" ON "bodegas"("sucursal_id", "estado");

-- CreateIndex
CREATE UNIQUE INDEX "bodegas_empresa_sucursal_codigo_uq" ON "bodegas"("empresa_id", "sucursal_id", "codigo");

-- CreateIndex
CREATE UNIQUE INDEX "bodegas_id_empresa_uq" ON "bodegas"("id", "empresa_id");

-- AddForeignKey
ALTER TABLE "configuraciones_empresa" ADD CONSTRAINT "configuraciones_empresa_empresa_id_fkey" FOREIGN KEY ("empresa_id") REFERENCES "empresas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sucursales" ADD CONSTRAINT "sucursales_empresa_id_fkey" FOREIGN KEY ("empresa_id") REFERENCES "empresas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bodegas" ADD CONSTRAINT "bodegas_sucursal_id_empresa_id_fkey" FOREIGN KEY ("sucursal_id", "empresa_id") REFERENCES "sucursales"("id", "empresa_id") ON DELETE RESTRICT ON UPDATE CASCADE;
