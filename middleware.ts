
export { withAuth } from "next-auth/middleware"
import { withAuth } from "next-auth/middleware"
import { NextRequest, NextResponse } from "next/server"

export default withAuth({
  pages: {
    signIn: "/",
    newUser: "/todos",
    error: "/",
    signOut: "/",
  },
  // callbacks: {
  //   authorized: ({ token }) => !!token,
  // }
})


export const config = { matcher: ["/todos"] }