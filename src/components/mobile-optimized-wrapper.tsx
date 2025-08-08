import { ReactNode, useEffect } from 'react'
import { useMobileOptimized } from '@/hooks/use-mobile-optimized'
import { optimizeScrolling, preloadCriticalResources } from '@/utils/mobile-performance'

interface MobileOptimizedWrapperProps {
  children: ReactNode
  className?: string
}

export default function MobileOptimizedWrapper({ 
  children, 
  className = '' 
}: MobileOptimizedWrapperProps) {
  const { isMobile, touchDevice } = useMobileOptimized()

  useEffect(() => {
    // 初始化移动端优化
    if (isMobile || touchDevice) {
      // 优化滚动性能
      optimizeScrolling()
      
      // 预加载关键资源
      preloadCriticalResources()
      
      // 添加移动端专用类名
      document.body.classList.add('mobile-optimized')
      
      // 设置视口元标签
      const viewport = document.querySelector('meta[name="viewport"]')
      if (viewport) {
        viewport.setAttribute('content', 
          'width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes, viewport-fit=cover'
        )
      }
      
      // 优化触摸事件处理
      const handleTouchStart = (e: TouchEvent) => {
        if (e.touches && e.touches.length > 1) {
          e.preventDefault()
        }
      }
      
      const handleTouchEnd = (e: TouchEvent) => {
        // 简单的触摸结束处理
      }
      
      document.addEventListener('touchstart', handleTouchStart, { passive: false })
      document.addEventListener('touchend', handleTouchEnd, { passive: true })
      
      // 返回清理函数
      return () => {
        document.body.classList.remove('mobile-optimized')
        document.removeEventListener('touchstart', handleTouchStart)
        document.removeEventListener('touchend', handleTouchEnd)
      }
    }
    
    // 如果不是移动设备，返回空的清理函数
    return () => {
      document.body.classList.remove('mobile-optimized')
    }
  }, [isMobile, touchDevice])

  const wrapperClasses = [
    className,
    isMobile ? 'mobile-layout' : '',
    touchDevice ? 'touch-device' : '',
    'scroll-smooth'
  ].filter(Boolean).join(' ')

  return (
    <div className={wrapperClasses}>
      {children}
    </div>
  )
}