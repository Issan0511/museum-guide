import Image from "next/image";
import type { ReactNode } from "react";
import Providers from "./providers";
import "./globals.css";

export const metadata = { title: "Kyoto Museum" };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ja">
      <body className="min-h-screen bg-[#eeeeee] font-sans">
        <header className="fixed top-0 left-0 right-0 z-50 bg-[#eeeeee]/95 backdrop-blur-md border-b border-neutral-200">
          <div className="max-w-sm mx-auto flex items-center gap-3 px-4 py-3 min-h-[68px]">
            <div className="relative w-12 h-8 flex items-center justify-center">
              <Image
                src="/images/museum_logo.png"
                alt="京都伝統産業ミュージアム ロゴ"
                fill
                className="object-contain"
                sizes="48px"
                unoptimized
              />
            </div>
            <div className="flex-1">
              <div className="font-bold text-sm leading-tight tracking-wide">京都伝統産業ミュージアム</div>
              <div className="text-xs text-neutral-600 leading-tight">Kyoto Museum of Crafts and Design</div>
            </div>
          </div>
        </header>
        <Providers>
          <main className="pt-20 pb-10 px-4 max-w-sm mx-auto">{children}</main>
        </Providers>
      </body>
    </html>
  );
}

