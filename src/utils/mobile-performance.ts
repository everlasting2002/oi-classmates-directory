// 移动端性能优化工具

// 防抖函数 - 用于搜索输入等场景
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null
  
  return (...args: Parameters<T>) => {
    if (timeout) {
      clearTimeout(timeout)
    }
    
    timeout = setTimeout(() => {
      func(...args)
    }, wait)
  }
}

// 节流函数 - 用于滚动事件等场景
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean = false
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => inThrottle = false, limit)
    }
  }
}

// 图片懒加载
export function lazyLoadImage(img: HTMLImageElement, src: string) {
  // 检查元素是否存在且已挂载到DOM
  if (!img || !img.parentNode) {
    return
  }
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && entry.target) {
        const target = entry.target as HTMLImageElement
        if (target && target.parentNode) {
          target.src = src
          target.classList.remove('loading-pulse')
          observer.unobserve(target)
        }
      }
    })
  }, {
    rootMargin: '50px'
  })
  
  try {
    img.classList.add('loading-pulse')
    observer.observe(img)
  } catch (error) {
    console.warn('LazyLoad observer error:', error)
    // 如果观察器失败，直接加载图片
    img.src = src
  }
}

// 检测网络状态
export function getNetworkStatus() {
  if ('connection' in navigator) {
    const connection = (navigator as any).connection
    return {
      effectiveType: connection.effectiveType,
      downlink: connection.downlink,
      rtt: connection.rtt,
      saveData: connection.saveData
    }
  }
  return null
}

// 预加载关键资源
export function preloadCriticalResources() {
  // 预加载字体 - 只有在有实际字体文件时才预加载
  // 这里暂时注释掉，因为没有具体的字体文件路径
  /*
  const fontLink = document.createElement('link')
  fontLink.rel = 'preload'
  fontLink.as = 'font'
  fontLink.type = 'font/woff2'
  fontLink.href = '/fonts/your-font.woff2' // 需要实际的字体文件路径
  fontLink.crossOrigin = 'anonymous'
  document.head.appendChild(fontLink)
  */
}

// 优化滚动性能
export function optimizeScrolling() {
  // 添加 passive 事件监听器
  let supportsPassive = false
  try {
    const opts = Object.defineProperty({}, 'passive', {
      get() {
        supportsPassive = true
        return false
      }
    })
    const testHandler = () => {}
    window.addEventListener('testPassive', testHandler, opts)
    window.removeEventListener('testPassive', testHandler, opts)
  } catch (e) {
    console.warn('Passive event listener test failed:', e)
  }
  
  return supportsPassive
}

// 内存清理
export function cleanupMemory() {
  // 清理未使用的事件监听器
  // 清理定时器
  // 清理观察者
  if ('gc' in window && typeof (window as any).gc === 'function') {
    (window as any).gc()
  }
}

// 检测设备性能
export function getDevicePerformance() {
  const memory = (performance as any).memory
  const connection = (navigator as any).connection
  
  return {
    // 内存信息
    memory: memory ? {
      used: memory.usedJSHeapSize,
      total: memory.totalJSHeapSize,
      limit: memory.jsHeapSizeLimit
    } : null,
    
    // 网络信息
    network: connection ? {
      effectiveType: connection.effectiveType,
      downlink: connection.downlink,
      rtt: connection.rtt
    } : null,
    
    // 硬件并发
    hardwareConcurrency: navigator.hardwareConcurrency || 4,
    
    // 设备内存
    deviceMemory: (navigator as any).deviceMemory || null
  }
}