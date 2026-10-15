import { createRootRoute, HeadContent, Outlet, Scripts } from "@tanstack/react-router";
import { AuthProvider } from "@/lib/auth/provider";
import { PreviewHostBridge } from "@/components/preview-host-bridge";
import { SiteLayout } from "@/components/shell";
import { QUIZ } from "@/data/quiz";
import { PROJECTS } from "@/data/projects";
import { STATES } from "@/data/states";
import { NATIONS } from "@/data/nations";
import { PRESIDENCY, PRESIDENTS } from "@/data/presidents";
import appCss from "../styles.css?url";

if (STATES.length !== 50) throw new Error(`Expected 50 states, got ${STATES.length}`);
if (NATIONS.length !== 12) throw new Error(`Expected 12 nations, got ${NATIONS.length}`);
if (PRESIDENTS.length !== 45) throw new Error(`Expected 45 presidents, got ${PRESIDENTS.length}`);
if (PRESIDENCY.length !== 47) throw new Error(`Expected 47 presidency numbers, got ${PRESIDENCY.length}`);
if (QUIZ.length !== 250) throw new Error(`Expected 250 questions, got ${QUIZ.length}`);
if (PROJECTS.length !== 63) throw new Error(`Expected 63 projects, got ${PROJECTS.length}`);

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Every American Ever" },
      { name: "description", content: "A bright guide to the 50 states, Native nations, and every president. For ages 5 to 12." },
      { name: "theme-color", content: "#002868" },
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,560;9..144,700&family=Nunito:wght@500;700;800&display=swap",
      },
      { rel: "stylesheet", href: appCss },
      { rel: "manifest", href: "/__grok/manifest.webmanifest" },
      { rel: "apple-touch-icon", href: "/__grok/icon-180.png" },
    ],
  }),
  component: () => (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        <PreviewHostBridge />
        <AuthProvider>
          <SiteLayout>
            <Outlet />
          </SiteLayout>
        </AuthProvider>
        <Scripts />
      </body>
    </html>
  ),
});
