/**
 * Mock Prisma Client
 * Returns static data instead of connecting to a real database.
 * Implements just enough of the PrismaClient interface to make the app work.
 */
import { categories, tools, news } from './static-data'

// Simple Prisma-like query filtering
function applyWhere<T extends Record<string, any>>(items: T[], where?: Record<string, any>): T[] {
  if (!where) return items
  return items.filter(item => {
    for (const [key, value] of Object.entries(where)) {
      if (value === undefined || value === null) continue
      if (typeof value === 'object' && value !== null) {
        // Handle { equals: 'xxx' }, { contains: 'xxx' }, etc.
        if ('equals' in value && item[key] !== value.equals) return false
        if ('in' in value && !value.in.includes(item[key])) return false
        if ('contains' in value && !String(item[key] || '').toLowerCase().includes(String(value.contains).toLowerCase())) return false
        if ('gt' in value && item[key] <= value.gt) return false
        if ('gte' in value && item[key] < value.gte) return false
        if ('lt' in value && item[key] >= value.lt) return false
        if ('not' in value && item[key] === value.not) return false
      } else {
        if (item[key] !== value) return false
      }
    }
    return true
  })
}

function applyOrderBy<T extends Record<string, any>>(items: T[], orderBy?: Record<string, string> | Record<string, string>[]): T[] {
  if (!orderBy) return items
  const result = [...items]
  const orders = Array.isArray(orderBy) ? orderBy : [orderBy]
  for (const order of orders.reverse()) {
    for (const [key, dir] of Object.entries(order)) {
      result.sort((a: any, b: any) => {
        const va = a[key], vb = b[key]
        if (va < vb) return dir === 'desc' ? 1 : -1
        if (va > vb) return dir === 'desc' ? -1 : 1
        return 0
      })
    }
  }
  return result
}

function applySelect<T>(items: any[], select?: Record<string, any>): any[] {
  if (!select) return items
  return items.map(item => {
    const result: any = {}
    for (const key of Object.keys(select)) {
      if (typeof select[key] === 'object') {
        result[key] = item[key] !== undefined ? item[key] : null
      } else if (select[key]) {
        result[key] = item[key]
      }
    }
    return result
  })
}

function applyPagination<T>(items: T[], take?: number, skip?: number): T[] {
  let result = items
  if (skip) result = result.slice(skip)
  if (take) result = result.slice(0, take)
  return result
}

// Include relations (mock - just adds category object)
function applyInclude(items: any[], include?: Record<string, any>): any[] {
  if (!include) return items
  return items.map(item => {
    const result = { ...item }
    if (include.category && item.categoryId) {
      result.category = categories.find(c => c.id === item.categoryId) || null
    }
    return result
  })
}

// Create repository-like objects with chainable methods
class ToolRepository {
  async findMany(args?: any): Promise<any[]> {
    let results = applyWhere(tools, args?.where)
    results = applyOrderBy(results, args?.orderBy)
    if (args?.include) results = applyInclude(results, args?.include)
    if (args?.select) results = applySelect(results, args?.select)
    results = applyPagination(results, args?.take, args?.skip)
    return results
  }

  async findUnique(args: any): Promise<any | null> {
    let results = applyWhere(tools, args?.where)
    if (args?.include) results = applyInclude(results, args?.include)
    if (args?.select) results = applySelect(results, args?.select)
    return results[0] || null
  }

  async findFirst(args?: any): Promise<any | null> {
    let results = applyWhere(tools, args?.where)
    results = applyOrderBy(results, args?.orderBy)
    if (args?.include) results = applyInclude(results, args?.include)
    return results[0] || null
  }

  async count(args?: any): Promise<number> {
    const results = applyWhere(tools, args?.where)
    return results.length
  }

  // Stub out write operations (not needed for static site)
  async create(args: any): Promise<any> { return args.data }
  async update(args: any): Promise<any> { return { ...args.data, id: args.where.id } }
  async delete(args: any): Promise<any> { return { id: args.where.id } }
  async upsert(args: any): Promise<any> { return args.create }
}

class CategoryRepository {
  async findMany(args?: any): Promise<any[]> {
    let results = applyWhere(categories, args?.where)
    results = applyOrderBy(results, args?.orderBy)
    if (args?.select) results = applySelect(results, args?.select)
    results = applyPagination(results, args?.take, args?.skip)
    return results
  }

  async findUnique(args: any): Promise<any | null> {
    const results = applyWhere(categories, args?.where)
    return results[0] || null
  }

  async findFirst(args?: any): Promise<any | null> {
    const results = applyWhere(categories, args?.where)
    return results[0] || null
  }

  async count(args?: any): Promise<number> {
    return applyWhere(categories, args?.where).length
  }
}

class NewsRepository {
  async findMany(_args?: any): Promise<any[]> {
    return news
  }
  async findUnique(_args: any): Promise<any> { return null }
  async count(_args?: any): Promise<number> { return news.length }
}

// Generic empty repository for models we don't use
class EmptyRepository {
  async findMany(_args?: any): Promise<any[]> { return [] }
  async findUnique(_args: any): Promise<any> { return null }
  async findFirst(_args?: any): Promise<any> { return null }
  async count(_args?: any): Promise<number> { return 0 }
  async create(args: any): Promise<any> { return args.data }
  async update(args: any): Promise<any> { return { ...args.data, id: args.where?.id } }
  async delete(_args: any): Promise<any> { return {} }
  async upsert(args: any): Promise<any> { return args.create }
}

export const mockPrisma = {
  tool: new ToolRepository(),
  category: new CategoryRepository(),
  news: new NewsRepository(),
  $connect: async () => {},
  $disconnect: async () => {},
  $on: () => {},
  $use: () => {},
  $transaction: async (fn: any) => fn(mockPrisma),
  // Other models we might need - all return empty
  share: new EmptyRepository(),
  comment: new EmptyRepository(),
  user: new EmptyRepository(),
  announcement: new EmptyRepository(),
  friendLink: new EmptyRepository(),
  viewLog: new EmptyRepository(),
  toolTrendHistory: new EmptyRepository(),
  tag: new EmptyRepository(),
  achievement: new EmptyRepository(),
  notification: new EmptyRepository(),
  report: new EmptyRepository(),
  setting: new EmptyRepository(),
  subscribe: new EmptyRepository(),
  verifyLog: new EmptyRepository(),
  trendData: new EmptyRepository(),
  searchLog: new EmptyRepository(),
}
