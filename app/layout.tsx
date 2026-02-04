import type React from "react"
import type { Metadata } from "next"
import localFont from "next/font/local"
import { Suspense } from "react"
import { YandexMetrika } from "@/components/yandex-metrika"
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
          <YandexMetrika />
        </Suspense>
        <div className="min-h-screen bg-[#f5f1e8] flex items-center justify-center p-4">
          <div className="text-center">
            <h1 className="text-xl md:text-2xl font-bold">
              Цифровая версия меню временно отключена
            </h1>
          </div>
        </div>
      </body>
    </html>
  )
}