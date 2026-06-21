import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifyAdmin } from '@/lib/auth'

export const dynamic = 'force-dynamic'

// GET /api/admin/comments?page=&limit=&search=
export async function GET(request: NextRequest) {
  // 鉴权
  const auth = await verifyAdmin(request)
  if (auth instanceof NextResponse) return auth

  const { searchParams } = new URL(request.url)
  const page = Math.max(1, parseInt(searchParams.get('page') || '1'))
  const limit = Math.min(100, Math.max(1, parseInt(searchParams.get('limit') || '10')))
  const search = searchParams.get('search') || ''
  const skip = (page - 1) * limit

  try {
    // 参数化构建查询条件
    let whereClause = ''
    let searchParam: string | null = null
    let searchForCount = false

    if (search) {
      whereClause = ` AND c.content LIKE $1`
      searchParam = `%${search}%`
      searchForCount = true
    }

    // 获取工具/新闻评论（comments表）
    const toolComments = searchParam
      ? await prisma.$queryRawUnsafe(`
          SELECT 
            c.id,
            c.content,
            c."userId",
            c."toolId",
            c."createdAt",
            c.status,
            c."suspendedAt",
            c."suspendedReason",
            u.username as "userName",
            u."avatarUrl" as "userAvatarUrl",
            t.name as "toolName",
            'tool' as "sourceType"
          FROM comments c
          LEFT JOIN users u ON c."userId" = u.id
          LEFT JOIN tools t ON c."toolId" = t.id
          WHERE 1=1 ${whereClause}
        `, searchParam)
      : await prisma.$queryRawUnsafe(`
          SELECT 
            c.id,
            c.content,
            c."userId",
            c."toolId",
            c."createdAt",
            c.status,
            c."suspendedAt",
            c."suspendedReason",
            u.username as "userName",
            u."avatarUrl" as "userAvatarUrl",
            t.name as "toolName",
            'tool' as "sourceType"
          FROM comments c
          LEFT JOIN users u ON c."userId" = u.id
          LEFT JOIN tools t ON c."toolId" = t.id
        `)

    // 获取分享评论（share_comments表）
    const shareComments = searchParam
      ? await prisma.$queryRawUnsafe(`
          SELECT 
            c.id,
            c.content,
            c."userId",
            c."shareId",
            c."createdAt",
            c.status,
            c."suspendedAt",
            c."suspendedReason",
            u.username as "userName",
            u."avatarUrl" as "userAvatarUrl",
            t.name as "toolName",
            'share' as "sourceType"
          FROM share_comments c
          LEFT JOIN users u ON c."userId" = u.id
          LEFT JOIN shares s ON c."shareId" = s.id
          LEFT JOIN tools t ON s."toolId" = t.id
          WHERE 1=1 ${whereClause}
        `, searchParam)
      : await prisma.$queryRawUnsafe(`
          SELECT 
            c.id,
            c.content,
            c."userId",
            c."shareId",
            c."createdAt",
            c.status,
            c."suspendedAt",
            c."suspendedReason",
            u.username as "userName",
            u."avatarUrl" as "userAvatarUrl",
            t.name as "toolName",
            'share' as "sourceType"
          FROM share_comments c
          LEFT JOIN users u ON c."userId" = u.id
          LEFT JOIN shares s ON c."shareId" = s.id
          LEFT JOIN tools t ON s."toolId" = t.id
        `)

    // 合并所有评论并按时间排序
    const allComments = [
      ...(toolComments as any[]).map(c => ({ ...c, id: `tool_${c.id}` })),
      ...(shareComments as any[]).map(c => ({ ...c, id: `share_${c.id}` }))
    ].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

    // 分页
    const total = allComments.length
    const paginatedComments = allComments.slice(skip, skip + limit)

    return NextResponse.json({
      comments: paginatedComments,
      total,
      page,
      totalPages: Math.ceil(total / limit)
    })
  } catch (error: any) {
    console.error('获取评论列表失败:', error)
    return NextResponse.json({ error: '获取失败: ' + error.message }, { status: 500 })
  }
}

// DELETE /api/admin/comments?id=
export async function DELETE(request: NextRequest) {
  // 鉴权
  const auth = await verifyAdmin(request)
  if (auth instanceof NextResponse) return auth

  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')

  if (!id) {
    return NextResponse.json({ error: '缺少评论ID' }, { status: 400 })
  }

  try {
    // 解析ID格式：tool_123 或 share_123（已参数化，安全）
    if (id.startsWith('tool_')) {
      const realId = parseInt(id.replace('tool_', ''))
      await prisma.$executeRaw`DELETE FROM comments WHERE id = ${realId}`
    } else if (id.startsWith('share_')) {
      const realId = parseInt(id.replace('share_', ''))
      await prisma.$executeRaw`DELETE FROM share_comments WHERE id = ${realId}`
    } else {
      // 兼容旧格式，默认删除comments表
      await prisma.$executeRaw`DELETE FROM comments WHERE id = ${parseInt(id)}`
    }
    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('删除评论失败:', error)
    return NextResponse.json({ error: '删除失败: ' + error.message }, { status: 500 })
  }
}
