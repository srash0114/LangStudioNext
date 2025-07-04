import "@/css/satoshi.css";
import "@/css/style.css";
import { UserProvider } from "@/app/UserContext";
import { Sidebar } from "@/components/Layouts/sidebar";

import "flatpickr/dist/flatpickr.min.css";
import "jsvectormap/dist/jsvectormap.css";

import { Header } from "@/components/Layouts/header";
import type { Metadata } from "next";
import NextTopLoader from "nextjs-toploader";
import type { PropsWithChildren } from "react";
import { Providers } from "@/app/providers";

export const metadata: Metadata = {
  title: {
    template: "EngLearn - English learning",
    default: "EngLearn - English learning website",
  },
  description: "EngLearn is an interactive English learning platform offering lessons, vocabulary, grammar tips, and listening practice for all levels.",
  icons: {
    icon: "/favicon.ico",
  },
};


export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en" suppressHydrationWarning>
      <UserProvider>
        <body>
          <Providers>
            
            <NextTopLoader color="#5750F1" showSpinner={false} />

            <div className="flex min-h-screen">
              <Sidebar />

              <div className="flex flex-col flex-1 bg-gray-2 dark:bg-[#020d1a] overflow-y-auto h-screen ">
                <Header />
                <main className="flex-1 w-full max-w-screen-2xl mx-auto p-4 md:p-6 2xl:p-10">
                  {children}
                </main>
              </div>

            </div>
            
          </Providers>
        </body>
      </UserProvider>
    </html>
  );
}
