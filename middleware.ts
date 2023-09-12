import { authMiddleware } from "@clerk/nextjs";

/* The code is exporting a default middleware function called `authMiddleware` from the `@clerk/nextjs`
package. This middleware is used to protect routes and enforce authentication. */
export default authMiddleware({
    publicRoutes: ["/api/:path*"],
});

export const config = {
    matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
