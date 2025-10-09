"use client"

import Image from "next/image"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface ItemPopupProps {
  isOpen: boolean
  onClose: () => void
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

export function ItemPopup({
  isOpen,
  onClose,
  imageSrc,
  imageAlt,
  title,
  weight,
  price,
  description,
  composition,
  nutrition,
}: ItemPopupProps) {


  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl w-[95vw] max-h-[90vh] overflow-y-auto bg-[#f5f1e8] border-[#8B4513]/20 p-3 md:p-6">
        <DialogHeader className="pb-2 md:pb-4">
          <DialogTitle className="text-lg md:text-xl font-bold text-[#8B4513] uppercase font-title">
            {title}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-3 md:space-y-4">
          {imageSrc && (
            <div className="rounded-lg overflow-hidden">
              <Image
                src={`https://photo.vkusvill.ru/media/documents_preview_big/${imageSrc}`}
                alt={imageAlt}
                width={0}
                height={0}
                sizes="100vw"
                className="h-auto w-full"
              />
            </div>
          )}

          {/* Details Section */}
          <div className="space-y-3 md:space-y-4">
            <div className="space-y-1 md:space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs md:text-sm text-[#8B4513] font-semibold">Вес:</span>
                <span className="text-xs md:text-sm text-[#8B4513]">{weight}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs md:text-sm text-[#8B4513] font-semibold">Цена:</span>
                <span className="text-xl md:text-2xl font-bold text-[#8B4513]">{price} ₽</span>
              </div>
            </div>

            <div className="border-t border-[#8B4513]/20 pt-2 md:pt-4">
              <h4 className="text-xs md:text-sm font-semibold text-[#8B4513] mb-1 md:mb-2 uppercase">Описание</h4>
              <p className="text-xs md:text-sm text-[#8B4513] leading-relaxed">{description}</p>
            </div>
            {nutrition && (
              <div className="border-t border-[#8B4513]/20 pt-2 md:pt-4">
                <h4 className="text-xs md:text-sm font-semibold text-[#8B4513] mb-1 md:mb-2 uppercase">Пищевая ценность на 100 г</h4>
                <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs md:text-sm text-[#8B4513]">
                  <span>Калорийность:</span><span className="text-right">{nutrition.calories} ккал</span>
                  <span>Белки:</span><span className="text-right">{nutrition.protein} г</span>
                  <span>Жиры:</span><span className="text-right">{nutrition.fat} г</span>
                  <span>Углеводы:</span><span className="text-right">{nutrition.carbs} г</span>
                </div>
              </div>
            )}
            {composition && (
              <div className="border-t border-[#8B4513]/20 pt-2 md:pt-4">
                <h4 className="text-xs md:text-sm font-semibold text-[#8B4513] mb-1 md:mb-2 uppercase">Состав</h4>
                <p className="text-xs md:text-sm text-[#8B4513] leading-relaxed whitespace-pre-line">
                  {composition}
                </p>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
