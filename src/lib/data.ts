// Static data layer — no database needed
import { prisma } from './prisma'

export const getFeaturedTools = () =>
  prisma.tool.findMany({ where: { isFeatured: true, isActive: true }, include: { category: true }, orderBy: { stars: 'desc' }, take: 4 })

export const getLatestTools = () =>
  prisma.tool.findMany({ where: { isActive: true }, include: { category: true }, orderBy: { createdAt: 'desc' }, take: 4 })

export const getTotalTools = () =>
  prisma.tool.count({ where: { isActive: true } })

export const getTotalOpensource = () =>
  prisma.tool.count({ where: { isActive: true, isOpenSource: true } })

export const getTotalCategories = () =>
  prisma.category.count()

export const getCategoryCounts = () =>
  Promise.resolve([{ categoryId: 1, _count: { id: 5 } }, { categoryId: 2, _count: { id: 3 } }, { categoryId: 3, _count: { id: 5 } }, { categoryId: 4, _count: { id: 1 } }, { categoryId: 5, _count: { id: 1 } }])

export const getCategories = () =>
  prisma.category.findMany({ select: { id: true, slug: true, name: true } })

export const getLatestNews = () => Promise.resolve([])

export const getLatestShares = () => Promise.resolve([])
