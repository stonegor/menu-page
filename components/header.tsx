"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import { withBasePath } from "@/lib/utils"

const sections = [
  { id: "drinks", label: "Напитки" },
  { id: "author-coffee", label: "Авторские кофейные напитки" },
  { id: "author-lemonades", label: "Авторские лимонады" },
  { id: "pancakes", label: "Блины" },
  { id: "breakfasts", label: "Завтраки" },
  { id: "lunches", label: "Обеды" },
  //{ id: "desserts", label: "Десерты" },
]

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("drinks")
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  const checkScrollCapabilities = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current
      const scrollLeft = container.scrollLeft
      const scrollWidth = container.scrollWidth
      const clientWidth = container.clientWidth

      const tolerance = 1

      setCanScrollLeft(scrollLeft > tolerance)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - tolerance)
    }
  }

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -200,
        behavior: "smooth",
      })
    }
  }

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 200,
        behavior: "smooth",
      })
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200 // Account for header + nav height

      let currentSection = "drinks" // Default to first section

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i]
        const element = document.getElementById(section.id)
        if (element) {
          const { offsetTop } = element
          if (scrollPosition >= offsetTop) {
            currentSection = section.id
            break
          }
        }
      }

      setActiveSection(currentSection)
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll() // Check initial position

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const container = scrollContainerRef.current
    if (container) {
      const handleContainerScroll = () => {
        checkScrollCapabilities()
      }

      container.addEventListener("scroll", handleContainerScroll)
      checkScrollCapabilities()

      const handleResize = () => {
        setTimeout(checkScrollCapabilities, 100)
      }
      window.addEventListener("resize", handleResize)

      return () => {
        container.removeEventListener("scroll", handleContainerScroll)
        window.removeEventListener("resize", handleResize)
      }
    }
  }, [])

  useEffect(() => {
    if (scrollContainerRef.current) {
      const activeButton = scrollContainerRef.current.querySelector(`[data-section="${activeSection}"]`) as HTMLElement
      if (activeButton) {
        const container = scrollContainerRef.current
        const containerWidth = container.offsetWidth
        const buttonLeft = activeButton.offsetLeft
        const buttonWidth = activeButton.offsetWidth

        const scrollLeft = buttonLeft - containerWidth / 2 + buttonWidth / 2

        container.scrollTo({
          left: scrollLeft,
          behavior: "smooth",
        })
      }
    }
  }, [activeSection])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const headerHeight = 68
      const navHeight = 48
      const padding = 20
      const offsetTop = element.offsetTop - headerHeight - navHeight - padding

      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      })
    }
  }

  return (
    <>
      <header className="bg-[#f5f1e8] shadow-sm sticky top-0 z-50">
        <div>
          <div className="flex justify-between items-center px-[24px] py-0">
            <div className="flex items-center gap-0">
              <Image
                src={withBasePath("/vkusvill-logo.jpg")}
                alt="VkusVill Logo"
                width={46.5}
                height={46.5}
                className=" mx-0 ml-[-10px] mix-blend-multiply"
              />
              <h1 className="text-xl font-title text-[#8B4513] mb-px">КафЕ</h1>
            </div>
            <Button variant="ghost" size="icon" onClick={toggleMenu} className="text-[#8B4513] hover:bg-[#e8dcc0]">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>

          <div className="px-0 pb-2">
            <div className="relative w-full">
              {canScrollLeft && (
                <button
                  onClick={scrollLeft}
                  className="absolute left-2 top-1/2 -translate-y-1/2 z-20 p-1.5 bg-[#f5f1e8]/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-[#e8dcc0]/90 transition-all"
                  aria-label="Scroll left"
                >
                  <ChevronLeft className="w-4 h-4 text-[#8B4513]" />
                </button>
              )}

              <div
                ref={scrollContainerRef}
                className="flex gap-2 justify-start overflow-x-auto scrollbar-hide scroll-smooth w-full px-12"
                style={{
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                  WebkitOverflowScrolling: "touch",
                }}
                onScroll={checkScrollCapabilities}
              >
                {sections.map((section) => (
                  <button
                    key={section.id}
                    data-section={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors flex-shrink-0 ${activeSection === section.id
                      ? "bg-[#8B4513] text-white"
                      : "bg-[#e8dcc0] text-[#8B4513] hover:bg-[#d4c5a0]"
                      }`}
                  >
                    {section.label}
                  </button>
                ))}
              </div>

              {canScrollRight && (
                <button
                  onClick={scrollRight}
                  className="absolute right-2 top-1/2 -translate-y-1/2 z-20 p-1.5 bg-[#f5f1e8]/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-[#e8dcc0]/90 transition-all"
                  aria-label="Scroll right"
                >
                  <ChevronRight className="w-4 h-4 text-[#8B4513]" />
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {isMenuOpen && (
        <div
          className="fixed inset-0 z-30 bg-black bg-opacity-30 transition-opacity duration-300"
          onClick={closeMenu}
        />
      )}

      <div
        className={`fixed top-0 right-0 h-full w-80 bg-[#f5f1e8] shadow-lg transform transition-transform duration-300 ease-in-out z-40 ${isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 pt-20">
          <nav className="space-y-6">
            <button
              onClick={closeMenu}
              className="block w-full text-left text-lg font-medium text-[#8B4513] hover:text-[#654321] transition-colors py-3 border-b border-[#e8dcc0]"
            >
              Меню
            </button>
            <a
              href="https://vkusvill.ru/"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-lg font-medium text-[#8B4513] hover:text-[#654321] transition-colors py-3 border-b border-[#e8dcc0]"
              onClick={closeMenu}
            >
              Официальный сайт
            </a>
            <a
              href="https://vkusvill.ru/contacts/"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-lg font-medium text-[#8B4513] hover:text-[#654321] transition-colors py-3 border-b border-[#e8dcc0]"
              onClick={closeMenu}
            >
              Горячая линия
            </a>
          </nav>
        </div>
      </div>
    </>
  )
}
