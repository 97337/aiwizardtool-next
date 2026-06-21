// ⚠️ DATABASE DISABLED — Supabase connection failing in Vercel
// Using static mock data instead. To re-enable, replace this file with:
//   import { PrismaClient } from '@prisma/client'
//   export const prisma = new PrismaClient({ ... })
export { mockPrisma as prisma } from './mock-prisma'
