import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetHeader, SheetDescription } from '@/components/ui/sheet'
import { Users, Trophy, GraduationCap, Menu, X } from 'lucide-react'

export default function MobileNav() {
  const [open, setOpen] = useState(false)
  const location = useLocation()

  const navItems = [
    {
      path: '/',
      label: '同学展示',
      icon: Users
    },
    {
      path: '/teachers',
      label: '老师展示',
      icon: GraduationCap
    },
    {
      path: '/awards',
      label: '获奖信息',
      icon: Trophy
    }
  ]

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">打开菜单</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[280px] sm:w-[350px]">
        <SheetHeader>
          <SheetTitle className="text-lg font-semibold text-blue-600">MSANNUOI</SheetTitle>
          <SheetDescription className="text-sm text-gray-600">
            导航菜单 - 选择要访问的页面
          </SheetDescription>
        </SheetHeader>
        <div className="flex flex-col h-full">
          
          <nav className="flex flex-col space-y-2 mt-6">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = location.pathname === item.path
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-blue-100 text-blue-700 font-medium'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </Link>
              )
            })}
          </nav>
          
          <div className="mt-auto pt-6 border-t">
            <p className="text-xs text-gray-500 text-center">
              © {new Date().getFullYear()} 东北师大附中信息竞赛团队
            </p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}