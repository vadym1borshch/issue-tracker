import { createContext, ReactNode, useContext, useState } from 'react'
import { Toast } from '@/components/Toast/Toast'

interface ToastMessage {
  message: string
  type: 'success' | 'error' | 'info'
  id: number
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
  customColor?: string
}

interface ToastContextProps {
  showToast: (
    message: string,
    type: 'success' | 'error' | 'info',
    position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right',
    customColor?: string
  ) => void
}

const ToastContext = createContext<ToastContextProps | undefined>(undefined)

export const useToast = () => {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context
}

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<ToastMessage[]>([])

  const showToast = (
    message: string,
    type: 'success' | 'error' | 'info',
    position:
      | 'top-left'
      | 'top-right'
      | 'bottom-left'
      | 'bottom-right' = 'bottom-right',
    customColor?: string
  ) => {
    const newToast: ToastMessage = {
      message,
      type,
      id: Date.now(),
      position,
      customColor,
    }
    setToasts((prev) => [...prev, newToast])

    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== newToast.id))
    }, 3000)
  }

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          position={toast.position}
          customColor={toast.customColor}
        />
      ))}
    </ToastContext.Provider>
  )
}
