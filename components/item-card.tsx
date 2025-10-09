"use client"

import Image from "next/image"
import { useState } from "react"

import { ItemPopup } from "./item-popup"

interface ItemCardProps {
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

export function ItemCard({
  imageSrc,
  imageAlt,
  title,
  weight,
  price,
  description,
  composition,
  nutrition,
}: ItemCardProps) {
  const [isPopupOpen, setIsPopupOpen] = useState(false)

  return (
    <>
      <div
        className="text-center cursor-pointer transition-opacity"
        onClick={() => description && setIsPopupOpen(true)}
      >
        <div className="mb-3">
          <Image
            src={`https://photo.vkusvill.ru/media/documents_preview_small/${imageSrc}` || "/placeholder.svg"}
            alt={imageAlt}
            width={270}
            height={180}
            className="mx-auto rounded-lg"
          />
        </div>
        <h3 className="text-sm font-semibold text-[#8B4513] mb-1 uppercase">{title}</h3>
        <p className="text-xs text-[#8B4513]">
          {weight} / <span className="text-lg font-bold">{price} ₽</span>
        </p>
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
