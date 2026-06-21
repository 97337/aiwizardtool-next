import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

export const dynamic = 'force-dynamic'

export async function GET() {
  const results: Record<string, unknown> = {
    timestamp: new Date().toISOString(),
    env: {
      DATABASE_URL: process.env.DATABASE_URL ? process.env.DATABASE_URL.substring(0, 60) + '...' : 'NOT SET',
      SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL || 'NOT SET',
      HAS_ANON_KEY: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      HAS_SERVICE_KEY: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
    },
    db: {}
  }

  // Test 1: Direct Prisma connection
  try {
    const prisma = new PrismaClient()
    const start = Date.now()
    const count = await prisma.tool.count()
    results.db = {
      status: 'connected',
      toolCount: count,
      latencyMs: Date.now() - start
    }
    await prisma.$disconnect()
  } catch (e: any) {
    results.db = {
      status: 'error',
      message: e?.message || String(e),
      code: e?.code,
      stack: e?.stack?.substring(0, 300)
    }
  }

  return NextResponse.json(results)
}
