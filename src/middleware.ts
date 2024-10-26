import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware();

export const config = {
  matcher: [
    // Allow access to /sign-in and /sign-up, and exclude Next.js internals and static files
    // '/((?!_next|sign-in|sign-up|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/((?!_next|api|sign-in|sign-up).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
