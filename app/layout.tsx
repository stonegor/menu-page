import Script from "next/script"
import type React from "react"
import type { Metadata } from "next"
import localFont from "next/font/local"
import { Header } from "@/components/header"
import { Suspense } from "react"
import "./globals.css"

const villula = localFont({
  src: "../public/fonts/Villula-Regular.woff2",
  variable: "--font-villula",
  display: "swap",
  preload: true,
})

const euclidRegular = localFont({
  src: "../public/fonts/EuclidCircularB-Regular-WebXL.woff2",
  variable: "--font-euclid-regular",
  display: "swap",
  preload: true,
})

const euclidBold = localFont({
  src: "../public/fonts/EuclidCircularB-Bold-WebXL.woff2",
  variable: "--font-euclid-bold",
  display: "swap",
  preload: true,
})

const euclidSemibold = localFont({
  src: "../public/fonts/EuclidCircularB-Semibold-WebXL.woff",
  variable: "--font-euclid-semibold",
  display: "swap",
  preload: true,
})

export const metadata: Metadata = {
  title: "ВВ Меню Кафе",
  description: "ВВ Меню Кафе",
  icons: {
    icon: "/logo.ico",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru">
      <body
        className={`font-sans ${villula.variable} ${euclidRegular.variable} ${euclidBold.variable} ${euclidSemibold.variable}`}
      >
        <Suspense fallback={null}>
          <Script
            id="yandex-metrika"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
                m[i].l=1*new Date();
                for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
                k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
                (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

                ym(103116177, "init", {
                      clickmap:true,
                      trackLinks:true,
                      accurateTrackBounce:true
                });
              `,
            }}
          />
        </Suspense>
        {children}
      </body>
    </html>
  )
}
