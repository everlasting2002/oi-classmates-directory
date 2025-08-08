import { ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Users, Trophy, GraduationCap } from 'lucide-react'
import MobileNav from '@/components/mobile-nav'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* 顶部导航栏 */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <MobileNav />
              <h1 className="text-xl md:text-2xl font-bold text-blue-600">MSANNUOI</h1>
            </div>
            
            {/* 桌面端导航 */}
            <nav className="hidden md:flex space-x-2">
              <Button
                variant={location.pathname === '/' ? 'default' : 'ghost'}
                asChild
                className="flex items-center space-x-2"
              >
                <Link to="/">
                  <Users className="w-4 h-4 mr-1" />
                  <span>同学展示</span>
                </Link>
              </Button>
              
              <Button
                variant={location.pathname === '/teachers' ? 'default' : 'ghost'}
                asChild
                className="flex items-center space-x-2"
              >
                <Link to="/teachers">
                  <GraduationCap className="w-4 h-4 mr-1" />
                  <span>老师展示</span>
                </Link>
              </Button>
              
              <Button
                variant={location.pathname === '/awards' ? 'default' : 'ghost'}
                asChild
                className="flex items-center space-x-2"
              >
                <Link to="/awards">
                  <Trophy className="w-4 h-4 mr-1" />
                  <span>获奖信息</span>
                </Link>
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* 主要内容区域 */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-8">
        {children}
      </main>

      {/* 页脚 */}
      <footer className="bg-white border-t mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="text-center text-xs md:text-sm text-gray-500">
            <p className="mb-2 md:mb-0">
              © {new Date().getFullYear()} 东北师大附中信息竞赛团队 - MSANNUOI - gzotpa!
            </p>
            <a 
              href="https://github.com/everlasting2002/oi-classmates-directory" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 underline block md:inline md:ml-2"
            >
              想要修改信息？点击这里访问GitHub仓库
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}