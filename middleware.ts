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
  const url = req.nextUrl
  const path = url.pathname

  const match = path.match(/^\/([^\/]+)\/(\d+)(\/.*)?$/)

  // 매핑 있는 경우
  if (match) {
    const [, board, indexStr, rest = ""] = match
    const mapping = (threadIndexBases as any)[board]

    if (mapping) {
      const index = parseInt(indexStr, 10)
      const newIndex = index + mapping.baseThreadIndex

      const redirectUrl = new URL(req.url)
      redirectUrl.hostname = "moonshineland2.net"
      redirectUrl.pathname = `/board/${mapping.boardKey}/${newIndex}${rest}`

      return NextResponse.redirect(redirectUrl, 301)
    }
  }

  // 매핑 없으면 그대로 뒤에 붙여서 리다이렉트
  const fallback = new URL(req.url)
  fallback.hostname = "moonshineland2.net"

  return NextResponse.redirect(fallback, 301)
}
