This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).
b7Zkb7HWDw4RhHCV
## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


Crear un usuario exclusivo para Prisma

Aunque Prisma esté instalado localmente en PinolPoint, necesita un usuario para conectarse a PostgreSQL. Supabase recomienda crear un usuario dedicado llamado prisma, con permisos para administrar el esquema public y crear la base temporal que Prisma utiliza durante migrate dev.

En Supabase entra a:

SQL Editor → New query

Pega lo siguiente. Cambia únicamente la contraseña:

-- Usuario exclusivo para Prisma
CREATE USER "prisma"
WITH PASSWORD 'COLOCA_AQUI_UNA_CONTRASENA_SEGURA'
BYPASSRLS
CREATEDB;

-- Permite que postgres pueda visualizar y administrar
-- los objetos creados por Prisma.
GRANT "prisma" TO "postgres";

-- Permisos sobre el esquema público.
GRANT USAGE ON SCHEMA public TO prisma;
GRANT CREATE ON SCHEMA public TO prisma;

-- Permisos sobre objetos existentes.
GRANT ALL ON ALL TABLES IN SCHEMA public TO prisma;
GRANT ALL ON ALL ROUTINES IN SCHEMA public TO prisma;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO prisma;

-- Permisos sobre objetos futuros creados por postgres.
ALTER DEFAULT PRIVILEGES FOR ROLE postgres
IN SCHEMA public
GRANT ALL ON TABLES TO prisma;

ALTER DEFAULT PRIVILEGES FOR ROLE postgres
IN SCHEMA public
GRANT ALL ON ROUTINES TO prisma;

ALTER DEFAULT PRIVILEGES FOR ROLE postgres
IN SCHEMA public
GRANT ALL ON SEQUENCES TO prisma;