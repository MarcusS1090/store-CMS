import { authMiddleware } from "@clerk/nextjs";

/* The code is exporting a default middleware function called `authMiddleware` from the `@clerk/nextjs`
package. This middleware is used to protect routes and enforce authentication. */
export default authMiddleware({
    publicRoutes: ["/api/:path*", "/fe6c08d4-79bd-461c-a995-4395c9a31242"],
});

export const config = {
    matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
