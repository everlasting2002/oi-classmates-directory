import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Trophy, 
  Medal, 
  Award as AwardIcon, 
  Globe, 
  Github, 
  Book, 
  Video,
  ExternalLink,
  RotateCcw
} from 'lucide-react'
import { Student, getAvatarUrl } from '@/data/mock-data'
import { getCurrentGrade } from '@/data/students-data'

interface FlipCardProps {
  student: Student
  awards?: {
    gold: Array<{ competition: string, year: number }>
    silver: Array<{ competition: string, year: number }>
    bronze: Array<{ competition: string, year: number }>
  }
  className?: string
  showAwards?: boolean
}

export function FlipCard({ student, awards, className = '', showAwards = false }: FlipCardProps) {
  const [isFlipped, setIsFlipped] = useState(false)

  // 获取社交链接图标
  const getSocialIcon = (icon?: string) => {
    switch (icon) {
      case 'globe': return <Globe className="w-4 h-4" />
      case 'github': return <Github className="w-4 h-4" />
      case 'book': return <Book className="w-4 h-4" />
      case 'video': return <Video className="w-4 h-4" />
      default: return <ExternalLink className="w-4 h-4" />
    }
  }

  const flipCardStyle = {
    perspective: '1000px',
    height: '200px'
  }

  const cardInnerStyle = {
    position: 'relative' as const,
    width: '100%',
    height: '100%',
    transition: 'transform 0.6s ease-in-out',
    transformStyle: 'preserve-3d' as const,
    transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
  }

  const cardFaceStyle = {
    position: 'absolute' as const,
    width: '100%',
    height: '100%',
    backfaceVisibility: 'hidden' as const,
    WebkitBackfaceVisibility: 'hidden' as const
  }

  const cardBackStyle = {
    ...cardFaceStyle,
    transform: 'rotateY(180deg)'
  }

  return (
    <div 
      className={`${className}`}
      style={flipCardStyle}
      onMouseEnter={() => window.innerWidth >= 1024 && setIsFlipped(true)}
      onMouseLeave={() => window.innerWidth >= 1024 && setIsFlipped(false)}
    >
      <div style={cardInnerStyle}>
        {/* 正面 */}
        <div style={cardFaceStyle}>
          <Card className="overflow-hidden hover:shadow-md transition-all duration-200 flex flex-col h-full card-interactive fast-click">
            <div className="pb-3 p-4">
              <div className="flex items-center space-x-3">
                <img
                  src={getAvatarUrl(student.qq)}
                  alt={student.realName}
                  className="h-12 w-12 md:h-14 md:w-14 rounded-full object-cover border-2 border-blue-100"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-sm md:text-base truncate">
                    {student.realName}
                    {student.nickname && student.nickname !== student.realName && (
                      <span className="text-xs md:text-sm text-gray-500 ml-1 block md:inline">({student.nickname})</span>
                    )}
                  </h3>
                  <Badge variant="outline" className="text-xs mt-1">
                    {getCurrentGrade(student.graduationYear) || `${student.graduationYear} 届`}
                  </Badge>
                </div>
                {/* 桌面端翻转提示图标 */}
                <div className="hidden lg:block">
                  <RotateCcw className="w-4 h-4 text-gray-400" />
                </div>
              </div>
            </div>
            
            <div className="flex-1 p-4 pt-0">
              <p className="text-sm text-gray-600 line-clamp-1 leading-relaxed">{student.signature}</p>
              {student.university && (
                <p className="text-xs text-gray-500 mt-2 truncate">
                  就读于: {student.university}
                </p>
              )}
            </div>
            
            <div className="flex justify-between items-center pt-3 border-t mt-auto p-4">
              <div className="text-xs text-gray-500 truncate flex-1 mr-2">
                QQ: {student.qq}
              </div>
              
              {/* 移动端和平板端显示详情按钮 */}
              <div className="lg:hidden">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-9 px-3 text-xs md:text-sm shrink-0 touch-manipulation"
                  asChild
                >
                  <Link 
                    to={`/person/student/${student.id}?from=students`}
                    onClick={() => {
                      setTimeout(() => {
                        window.scrollTo({ top: 0, behavior: 'smooth' })
                      }, 100)
                    }}
                  >
                    <ExternalLink className="h-3 w-3 mr-1" />
                    详情
                  </Link>
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* 背面 - 仅在桌面端显示 */}
        <div style={cardBackStyle} className="hidden lg:block">
          <Card className="h-full bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 relative overflow-hidden">
            <CardContent className="p-0 h-full flex flex-col">
              {/* 奖牌展示 - 右上角 */}
              {awards && (awards.gold?.length > 0 || awards.silver?.length > 0 || awards.bronze?.length > 0) && (
                <div className="absolute top-2 right-2 flex flex-wrap gap-1 z-10" style={{ maxWidth: '110px' }}>
                  {/* 金牌 */}
                  {awards.gold?.map((award, i) => (
                    <Badge 
                      key={`gold-${i}`} 
                      className="bg-yellow-500 text-white text-xs px-1 py-0.5 shadow-sm cursor-help"
                      title={`${award.competition} 金牌`}
                    >
                      <Trophy className="w-3 h-3" />
                    </Badge>
                  ))}
                  {/* 银牌 */}
                  {awards.silver?.map((award, i) => (
                    <Badge 
                      key={`silver-${i}`} 
                      className="bg-gray-400 text-white text-xs px-1 py-0.5 shadow-sm cursor-help"
                      title={`${award.competition} 银牌`}
                    >
                      <Medal className="w-3 h-3" />
                    </Badge>
                  ))}
                  {/* 铜牌 */}
                  {awards.bronze?.map((award, i) => (
                    <Badge 
                      key={`bronze-${i}`} 
                      className="bg-amber-600 text-white text-xs px-1 py-0.5 shadow-sm cursor-help"
                      title={`${award.competition} 铜牌`}
                    >
                      <AwardIcon className="w-3 h-3" />
                    </Badge>
                  ))}
                </div>
              )}

              {/* 主要内容区域 */}
              <div className="flex-1 p-4 pb-2 overflow-hidden">
                {/* 头部信息 */}
                <div className="flex items-center space-x-3 mb-3 pr-12">
                  <img
                    src={getAvatarUrl(student.qq)}
                    alt={student.realName}
                    className="w-9 h-9 rounded-full object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-gray-900 text-sm truncate">
                      {student.realName}
                    </h3>
                    <p className="text-xs text-gray-500 truncate">
                      {student.nickname}
                    </p>
                  </div>
                </div>

                {/* 个人简介 */}
                <div className="mb-3">
                  <h4 className="text-xs font-medium text-gray-700 mb-1">个人简介</h4>
                  <p className="text-xs text-gray-600 line-clamp-1 leading-relaxed">
                    {student.description || student.signature || '暂无简介'}
                  </p>
                </div>

                {/* 社交链接 */}
                {student.socialLinks && student.socialLinks.length > 0 && (
                  <div className="mb-2">
                    <h4 className="text-xs font-medium text-gray-700 mb-1">社交链接</h4>
                    <div className="flex flex-wrap gap-1">
                      {student.socialLinks.slice(0, 4).map((link, index) => (
                        <a
                          key={index}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center px-1.5 py-0.5 bg-white rounded text-xs text-gray-600 hover:bg-blue-100 hover:text-blue-700 transition-colors"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {getSocialIcon(link.icon)}
                          <span className="ml-1 truncate max-w-8">{link.title}</span>
                        </a>
                      ))}
                      {student.socialLinks.length > 4 && (
                        <span className="text-xs text-gray-400 px-1.5 py-0.5">
                          +{student.socialLinks.length - 4}
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* 固定底部按钮 */}
              <div className="px-3 pt-1 pb-2 bg-gradient-to-t from-blue-50 via-blue-50/80 to-transparent">
                <Button
                  size="sm"
                  className="w-full text-xs h-6 bg-blue-600 hover:bg-blue-700 shadow-sm"
                  asChild
                >
                  <Link 
                    to={`/person/student/${student.id}?from=students`}
                    onClick={() => {
                      setTimeout(() => {
                        window.scrollTo({ top: 0, behavior: 'smooth' })
                      }, 100)
                    }}
                  >
                    查看详情
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}