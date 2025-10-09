"use client"

import { useState } from "react"
import { ItemPopup } from "./item-popup"

interface ItemRowProps {
  imageSrc: string
  imageAlt: string
  title: string
  weight: string
  price: string
  description?: string
  composition?: string
  nutrition?: {
    calories: string
    protein: string
    fat: string
    carbs: string
  }
}

export function ItemRow({
  imageSrc,
  imageAlt,
  title,
  weight,
  price,
  description,
  composition,
  nutrition,
}: ItemRowProps) {
  const [isPopupOpen, setIsPopupOpen] = useState(false)

  return (
    <>
      <div
        className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-0.5 sm:gap-0 cursor-pointer transition-opacity"
        onClick={() => description && setIsPopupOpen(true)}
      >
        <span className="text-sm font-semibold text-[#8B4513] uppercase">{title}</span>
        <span className="text-xs text-[#8B4513] sm:text-right">
          {weight} <span className="text-lg font-bold ml-2">{price} ₽</span>
        </span>
      </div>

      <ItemPopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        imageSrc={imageSrc}
        imageAlt={imageAlt}
        title={title}
        weight={weight}
        price={price}
        description={description}
        composition={composition}
        nutrition={nutrition}
      />
    </>
  )
}
