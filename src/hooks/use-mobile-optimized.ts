import { useState, useEffect } from 'react'

export function useMobileOptimized() {
  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)
  const [touchDevice, setTouchDevice] = useState(false)

  useEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth
      const height = window.innerHeight
      
      // 检测移动设备
      setIsMobile(width < 768)
      
      // 检测平板设备
      setIsTablet(width >= 768 && width < 1024)
      
      // 检测触摸设备
      setTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0)
    }

    checkDevice()
    window.addEventListener('resize', checkDevice)
    
    return () => window.removeEventListener('resize', checkDevice)
  }, [])

  return {
    isMobile,
    isTablet,
    touchDevice,
    isDesktop: !isMobile && !isTablet
  }
}

// 添加触摸反馈的Hook
export function useTouchFeedback() {
  const { touchDevice } = useMobileOptimized()
  
  const addTouchClass = (element: HTMLElement) => {
    if (touchDevice) {
      element.classList.add('btn-touch', 'fast-click')
    }
  }
  
  const addCardTouchClass = (element: HTMLElement) => {
    if (touchDevice) {
      element.classList.add('card-interactive', 'fast-click')
    }
  }
  
  return {
    touchDevice,
    addTouchClass,
    addCardTouchClass
  }
}