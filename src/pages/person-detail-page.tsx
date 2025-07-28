import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link, useSearchParams } from 'react-router-dom'
import { useFilter } from '@/contexts/filter-context'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { 
  ArrowLeft, 
  ExternalLink, 
  Globe, 
  Book, 
  Code,
  Mail,
  MessageCircle,
  Trophy,
  Medal,
  Award as AwardIcon,
  Camera
} from 'lucide-react'
import { 
  siGithub, 
  siZhihu, 
  siCodeforces, 
  siLeetcode,
  siBilibili,
  siQq,
  siWechat
} from 'simple-icons'
import { students, teachers, awards, getAvatarUrl, Student, Teacher } from '@/data/mock-data'
import { getStudentAwardLevel } from '@/data/awards-data'

// 个人照片组件
function PersonPhoto({ photoPath, personName }: { photoPath: string; personName: string }) {
  const [hasPhoto, setHasPhoto] = useState(false)
  
  useEffect(() => {
    const img = new Image()
    img.onload = () => setHasPhoto(true)
    img.onerror = () => setHasPhoto(false)
    img.src = photoPath
  }, [photoPath])
  
  if (!hasPhoto) return null
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center space-x-2">
          <Camera className="w-5 h-5" />
          <span>个人照片</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="aspect-[3/4] bg-gray-100 rounded-lg overflow-hidden">
          <img
            src={photoPath}
            alt={`${personName}的照片`}
            className="w-full h-full object-cover"
          />
        </div>
      </CardContent>
    </Card>
  )
}

export default function PersonDetailPage() {
  const { type, id } = useParams<{ type: string; id: string }>()
  const navigate = useNavigate()
  const { getReturnUrl } = useFilter()
  const [searchParams] = useSearchParams()
  
  // 获取来源页面信息
  const fromPage = searchParams.get('from')
  const getReturnInfo = () => {
    if (fromPage === 'awards') {
      return { page: 'awards' as const, label: '获奖信息' }
    } else if (fromPage === 'teachers') {
      return { page: 'teachers' as const, label: '老师列表' }
    } else {
      // 默认根据人员类型返回
      const isStudent = type === 'student'
      if (isStudent) {
        return { page: 'students' as const, label: '同学列表' }
      } else {
        return { page: 'teachers' as const, label: '老师列表' }
      }
    }
  }
  
  const returnInfo = getReturnInfo()
  
  if (!type || !id) {
    return <div>参数错误</div>
  }
  
  const isStudent = type === 'student'
  const person = isStudent 
    ? students.find(s => s.id === parseInt(id))
    : teachers.find(t => t.id === parseInt(id))
  
  if (!person) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">未找到相关信息</p>
        <Button onClick={() => navigate(-1)} className="mt-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          返回
        </Button>
      </div>
    )
  }
  
  // 获取该人员的获奖信息（仅学生）
  const personAwards = isStudent 
    ? awards.filter(award => 
        award.students.gold.includes(parseInt(id)) ||
        award.students.silver.includes(parseInt(id)) ||
        award.students.bronze.includes(parseInt(id))
      )
    : []
  
  // 获取图标
  const getIcon = (iconName: string) => {
    // Simple Icons SVG 组件
    const SimpleIconSvg = ({ icon }: { icon: any }) => (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d={icon.path} />
      </svg>
    )

    switch (iconName) {
      case 'globe': return <Globe className="w-4 h-4" />
      case 'github': return <SimpleIconSvg icon={siGithub} />
      case 'zhihu': return <SimpleIconSvg icon={siZhihu} />
      case 'codeforces': return <SimpleIconSvg icon={siCodeforces} />
      case 'leetcode': return <SimpleIconSvg icon={siLeetcode} />
      case 'bilibili': return <SimpleIconSvg icon={siBilibili} />
      case 'qq': return <SimpleIconSvg icon={siQq} />
      case 'wechat': return <SimpleIconSvg icon={siWechat} />
      case 'book': return <Book className="w-4 h-4" />
      case 'code': return <Code className="w-4 h-4" />
      case 'mail': return <Mail className="w-4 h-4" />
      case 'message': return <MessageCircle className="w-4 h-4" />
      default: return <ExternalLink className="w-4 h-4" />
    }
  }
  
  // 获取奖项等级颜色
  const getLevelColor = (level: string) => {
    switch (level) {
      case '金牌': return 'bg-yellow-500'
      case '银牌': return 'bg-gray-400'
      case '铜牌': return 'bg-amber-600'
      case '一等奖': return 'bg-red-500'
      case '二等奖': return 'bg-blue-500'
      case '三等奖': return 'bg-green-500'
      default: return 'bg-gray-500'
    }
  }
  
  // 获取奖项图标
  const getLevelIcon = (level: string) => {
    if (level.includes('金') || level === '一等奖') return <Trophy className="w-4 h-4" />
    if (level.includes('银') || level === '二等奖') return <Medal className="w-4 h-4" />
    return <AwardIcon className="w-4 h-4" />
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* 返回按钮 */}
      <Button 
        variant="ghost" 
        asChild
        className="mb-4"
      >
        <Link to={getReturnUrl(returnInfo.page as 'students' | 'teachers' | 'awards')}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          返回{returnInfo.label}
        </Link>
      </Button>
      
      {/* 基本信息卡片 */}
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
            <Avatar className="h-24 w-24 border-4 border-blue-100">
              <AvatarImage 
                src={person.avatar || getAvatarUrl(person.qq)} 
                alt={person.realName} 
              />
              <AvatarFallback className="text-lg">
                {person.realName.slice(0, 2)}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-center gap-2 mb-2">
                <h1 className="text-2xl font-bold">{person.realName}</h1>
                {person.nickname && person.nickname !== person.realName && (
                  <Badge variant="secondary" className="text-sm">
                    {person.nickname}
                  </Badge>
                )}
              </div>
              
              <p className="text-gray-600 mb-3">{person.signature}</p>
              
              <div className="flex flex-wrap gap-2">
                {isStudent ? (
                  <>
                    <Badge variant="outline">
                      {(person as Student).graduationYear} 届
                    </Badge>
                    {(person as Student).university && (
                      <Badge variant="outline" className="bg-blue-50">
                        {(person as Student).university}
                      </Badge>
                    )}
                  </>
                ) : (
                  <>
                    <Badge variant="outline" className="bg-green-50">
                      {(person as Teacher).title}
                    </Badge>
                    <Badge variant="outline" className="bg-purple-50">
                      {(person as Teacher).school}
                    </Badge>
                  </>
                )}
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>
      
      {/* 详细信息 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 个人描述 */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>个人简介</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed">
                {person.description || '暂无个人简介'}
              </p>
            </CardContent>
          </Card>
          
          {/* 获奖信息（仅学生显示） */}
          {isStudent && personAwards.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Trophy className="w-5 h-5 text-yellow-600" />
                  <span>获奖记录</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {personAwards
                    .sort((a, b) => b.year - a.year)
                    .map(award => {
                      const level = getStudentAwardLevel(award, parseInt(id))
                      if (!level) return null
                      
                      return (
                        <div key={award.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div>
                            <h4 className="font-medium text-sm">{award.competition}</h4>
                            <p className="text-xs text-gray-500">{award.year} 年 · {award.season}</p>
                          </div>
                          <Badge className={`text-white ${getLevelColor(level)}`}>
                            <span className="mr-1">{getLevelIcon(level)}</span>
                            {level}
                          </Badge>
                        </div>
                      )
                    })}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
        
        {/* 右侧区域：照片和联系方式 */}
        <div className="space-y-4">
          {/* 个人照片 - 单张显示 */}
          <PersonPhoto 
            photoPath={`/photos/${isStudent ? 'students' : 'teachers'}/${person.id}-1.jpg`}
            personName={person.realName}
          />
          
          {/* 联系方式 */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">联系方式</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center space-x-3">
                {getIcon('qq')}
                <span className="text-sm">{person.qq}</span>
              </div>
              {person.wechat && (
                <div className="flex items-center space-x-3">
                  {getIcon('wechat')}
                  <span className="text-sm">{person.wechat}</span>
                </div>
              )}
            </CardContent>
          </Card>
          
          {/* 社交链接 */}
          {person.socialLinks && person.socialLinks.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">社交链接</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {person.socialLinks.map((link: { title: string; url: string; icon?: string }, index: number) => (
                  <div key={index}>
                    <Button
                      variant="ghost"
                      className="w-full justify-start p-2 h-auto"
                      onClick={() => window.open(link.url, '_blank')}
                    >
                      <div className="flex items-center space-x-3">
                        {getIcon(link.icon || 'globe')}
                        <div className="text-left">
                          <div className="font-medium text-sm">{link.title}</div>
                          <div className="text-xs text-gray-500 truncate max-w-[150px]">
                            {link.url}
                          </div>
                        </div>
                      </div>
                    </Button>
                    {index < person.socialLinks!.length - 1 && (
                      <Separator className="my-2" />
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}