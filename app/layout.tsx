import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next"
import clsx from "clsx";

import { Providers } from "./providers";

import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";

export const metadata: Metadata = {
    title: {
        default: siteConfig.name,
        template: `%s - ${siteConfig.name}`,
    },
    description: siteConfig.description,
    icons: {
        icon: "/favicon.ico",
    },
};

export const viewport: Viewport = {
    themeColor: [
        { media: "(prefers-color-scheme: light)", color: "white" },
        { media: "(prefers-color-scheme: dark)", color: "black" },
    ],
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html suppressHydrationWarning lang="en">
            <head />
            <body
                className={clsx(
                    "text-foreground bg-background font-sans antialiased",
                    fontSans.variable,
                )}
            >
                <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
                    <div className="min-h-dvh flex items-center justify-center px-3 md:px-6 py-4 md:py-6">
                        <main
                            className="
                                    grid
                                    grid-cols-1
                                    auto-rows-auto
                                    gap-3
                                    md:grid-cols-12
                                    md:grid-rows-[repeat(3,minmax(0,1fr))]
                                    md:grid-flow-dense
                                    md:gap-3
                                "
                        >
                            {children}
                            <SpeedInsights />
                        </main>
                    </div>

                </Providers>
            </body>
        </html>
    );
}
