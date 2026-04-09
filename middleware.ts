import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const threadIndexBases = {
  moonshine: { boardKey: "anchor", baseThreadIndex: 0 },
  surface: { boardKey: "anchor", baseThreadIndex: 5360 },
  orpg: { boardKey: "orpg", baseThreadIndex: 0 },
  orpgs: { boardKey: "orpg", baseThreadIndex: 810 },
  test: { boardKey: "test", baseThreadIndex: 0 },
  tests: { boardKey: "test", baseThreadIndex: 404 },
  trans: { boardKey: "trans", baseThreadIndex: 0 },
  honor: { boardKey: "honor", baseThreadIndex: 0 },
} as const

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone()
  const path = url.pathname

  // /{board}/{num}/...
  const match = path.match(/^\/([^\/]+)\/(\d+)(\/.*)?$/)
  if (!match) return NextResponse.next()

  const [, board, indexStr, rest = ""] = match

  const mapping = (threadIndexBases as any)[board]
  if (!mapping) return NextResponse.next()

  const index = parseInt(indexStr, 10)
  const newIndex = index + mapping.baseThreadIndex

  url.pathname = `/${mapping.boardKey}/${newIndex}${rest}`

  return NextResponse.redirect(url, 301)
}

export const config = {
  matcher: '/:path*',
}
