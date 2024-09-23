import { useState, useEffect } from 'react'

interface ToastProps {
  message: string
  type: 'success' | 'error' | 'info'
  duration?: number // Тривалість показу в мілісекундах
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' // Позиція тостера
  customColor?: string
}

export const Toast = ({
  message,
  type,
  duration = 3000,
  position = 'bottom-right',
  customColor,
}: ToastProps) => {
  const [isVisible, setIsVisible] = useState(true)
  const [isExiting, setIsExiting] = useState(false)

  useEffect(() => {
    const hideTimer = setTimeout(() => {
      setIsExiting(true)
    }, duration - 500)

    const removeTimer = setTimeout(() => {
      setIsVisible(false)
    }, duration)

    return () => {
      clearTimeout(hideTimer)
      clearTimeout(removeTimer)
    }
  }, [duration])

  if (!isVisible) return null

  const positionStyles = {
    'top-left': 'top-4 left-4',
    'top-right': 'top-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'bottom-right': 'bottom-4 right-4',
  }

  const toastStyles = {
    success: customColor || 'bg-green-500',
    error: customColor || 'bg-red-500',
    info: customColor || 'bg-blue-500',
  }

  const isLeft = position === 'top-left' || position === 'bottom-left'

  return (
    <div
      className={`fixed transform rounded p-4 text-white shadow-lg transition-transform ${
        isExiting
          ? isLeft
            ? 'animate-toastOutLeft'
            : 'animate-toastOut'
          : isLeft
            ? 'animate-toastInLeft'
            : 'animate-toastIn'
      } ${toastStyles[type]} ${positionStyles[position]}`}
      style={{ minWidth: '200px' }}
    >
      {message}
    </div>
  )
}
