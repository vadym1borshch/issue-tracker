/*import { NextRequest, NextResponse } from 'next/server'*/

/*export function middleware(req: NextRequest) {
  return NextResponse.redirect(new URL('/new-page', req.url))
}*/

export { default } from 'next-auth/middleware'

/*
export default withAuth({

  pages: {
    signIn: "/products",
  },
})
*/

export const config = {
  matcher: ['/issues/new', '/issues/edit/:id+'],
}
