"use client"

import Script from "next/script"
import { usePathname } from "next/navigation"

export function YandexMetrika() {
  const pathname = usePathname()

  // Define counter IDs for each store
  const counters = {
    "8987": "103116177",
    "9157": "105854526",
  }

  // Determine which counter to use based on the path
  let currentCounterId = counters["8987"] // Default

  if (pathname?.startsWith("/9157")) {
    currentCounterId = counters["9157"]
  } else if (pathname?.startsWith("/8987")) {
    currentCounterId = counters["8987"]
  }

  return (
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

          ym(${currentCounterId}, "init", {
                clickmap:true,
                trackLinks:true,
                accurateTrackBounce:true
          });
        `,
      }}
    />
  )
}
