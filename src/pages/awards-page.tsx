import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select'
import { Trophy, Medal, Award as AwardIcon, Calendar } from 'lucide-react'
import { awards, students, getAwardsByTimeline, Award } from '@/data/mock-data'

export default function AwardsPage() {
  const [selectedYear, setSelectedYear] = useState<string>('all')
  const [selectedLevel, setSelectedLevel] = useState<string>('all')
  
  // 获取年份列表
  const years = useMemo(() => {
    const yearSet = new Set(awards.map(award => award.year))
    return Array.from(yearSet).sort((a, b) => b - a)
  }, [])
  
  // 获取奖项等级列表
  const levels = useMemo(() => {
    const levelSet = new Set(awards.map(award => award.level))
    return Array.from(levelSet)
  }, [])
  
  // 获取时间轴数据
  const timelineData = useMemo(() => {
    const timeline = getAwardsByTimeline()
    
    // 筛选数据
    const filteredTimeline: { [year: number]: { [season: string]: Award[] } } = {}
    
    Object.keys(timeline).forEach(yearStr => {
      const year = parseInt(yearStr)
      if (selectedYear !== 'all' && year !== parseInt(selectedYear)) {
        return
      }
      
      filteredTimeline[year] = {}
      Object.keys(timeline[year]).forEach(season => {
        const seasonAwards = timeline[year][season].filter(award => {
          if (selectedLevel !== 'all' && award.level !== selectedLevel) {
            return false
          }
          return true
        })
        
        if (seasonAwards.length > 0) {
          filteredTimeline[year][season] = seasonAwards
        }
      })
      
      // 如果该年份没有符合条件的获奖记录，删除该年份
      if (Object.keys(filteredTimeline[year]).length === 0) {
        delete filteredTimeline[year]
      }
    })
    
    return filteredTimeline
  }, [selectedYear, selectedLevel])
  
  // 统计数据
  const stats = useMemo(() => {
    const allAwards = Object.values(timelineData).flatMap(yearData => 
      Object.values(yearData).flatMap(seasonAwards => seasonAwards)
    )
    
    const totalAwards = allAwards.length
    const totalStudents = new Set(allAwards.flatMap(award => award.students)).size
    const goldCount = allAwards.filter(award => award.level === '金牌').length
    const silverCount = allAwards.filter(award => award.level === '银牌').length
    const bronzeCount = allAwards.filter(award => award.level === '铜牌').length
    
    return { totalAwards, totalStudents, goldCount, silverCount, bronzeCount }
  }, [timelineData])
  
  // 获取学生姓名
  const getStudentName = (studentId: number) => {
    const student = students.find(s => s.id === studentId)
    return student ? student.realName : '未知'
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
  
  // 获取赛季颜色
  const getSeasonColor = (season: string) => {
    switch (season) {
      case 'NOIP': return 'bg-blue-100 text-blue-800'
      case 'APIO': return 'bg-green-100 text-green-800'
      case 'NOI': return 'bg-purple-100 text-purple-800'
      case 'IOI': return 'bg-red-100 text-red-800'
      case 'ICPC': return 'bg-orange-100 text-orange-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-6">
      {/* 页面标题和筛选 */}
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between bg-white p-4 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold text-gray-800">获奖信息时间轴</h2>
        
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          {/* 年份筛选 */}
          <Select value={selectedYear} onValueChange={setSelectedYear}>
            <SelectTrigger className="w-full sm:w-[150px]">
              <SelectValue placeholder="选择年份" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">全部年份</SelectItem>
              {years.map(year => (
                <SelectItem key={year} value={year.toString()}>
                  {year} 年
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          {/* 奖项等级筛选 */}
          <Select value={selectedLevel} onValueChange={setSelectedLevel}>
            <SelectTrigger className="w-full sm:w-[150px]">
              <SelectValue placeholder="选择等级" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">全部等级</SelectItem>
              {levels.map(level => (
                <SelectItem key={level} value={level}>
                  {level}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {/* 统计概览 */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{stats.totalAwards}</div>
            <div className="text-sm text-gray-500">总获奖数</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{stats.totalStudents}</div>
            <div className="text-sm text-gray-500">获奖人数</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-yellow-600">{stats.goldCount}</div>
            <div className="text-sm text-gray-500">金牌数</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-gray-600">{stats.silverCount}</div>
            <div className="text-sm text-gray-500">银牌数</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-amber-600">{stats.bronzeCount}</div>
            <div className="text-sm text-gray-500">铜牌数</div>
          </CardContent>
        </Card>
      </div>
      
      {/* 时间轴展示 */}
      <div className="space-y-8">
        {Object.keys(timelineData)
          .map(year => parseInt(year))
          .sort((a, b) => b - a)
          .map(year => (
            <TimelineYear 
              key={year} 
              year={year} 
              yearData={timelineData[year]} 
              getStudentName={getStudentName}
              getLevelColor={getLevelColor}
              getLevelIcon={getLevelIcon}
              getSeasonColor={getSeasonColor}
            />
          ))}
      </div>
      
      {/* 无结果提示 */}
      {Object.keys(timelineData).length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">没有找到符合条件的获奖记录</p>
        </div>
      )}
    </div>
  )
}

// 年份时间轴组件
function TimelineYear({ 
  year, 
  yearData, 
  getStudentName, 
  getLevelColor, 
  getLevelIcon,
  getSeasonColor 
}: { 
  year: number
  yearData: { [season: string]: Award[] }
  getStudentName: (id: number) => string
  getLevelColor: (level: string) => string
  getLevelIcon: (level: string) => JSX.Element
  getSeasonColor: (season: string) => string
}) {
  // 按赛季顺序排序
  const seasonOrder = ['NOIP', 'APIO', 'NOI', 'IOI', 'ICPC', '其他']
  const sortedSeasons = Object.keys(yearData).sort((a, b) => {
    const indexA = seasonOrder.indexOf(a)
    const indexB = seasonOrder.indexOf(b)
    return (indexA === -1 ? 999 : indexA) - (indexB === -1 ? 999 : indexB)
  })

  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="flex items-center space-x-2">
          <Calendar className="w-5 h-5 text-blue-600" />
          <CardTitle className="text-xl text-blue-800">{year} 年度获奖记录</CardTitle>
        </div>
      </CardHeader>
      
      <CardContent className="p-6">
        <div className="space-y-6">
          {sortedSeasons.map(season => (
            <div key={season} className="relative">
              {/* 赛季标题 */}
              <div className="flex items-center space-x-3 mb-4">
                <Badge className={`${getSeasonColor(season)} font-medium`}>
                  {season}
                </Badge>
                <div className="flex-1 h-px bg-gray-200"></div>
              </div>
              
              {/* 该赛季的获奖记录 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ml-4">
                {yearData[season].map(award => (
                  <Card key={award.id} className="border-l-4 border-l-blue-400">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-sm">{award.competition}</h4>
                        <Badge className={`text-white ${getLevelColor(award.level)}`}>
                          <span className="mr-1">{getLevelIcon(award.level)}</span>
                          {award.level}
                        </Badge>
                      </div>
                      
                      <div className="text-xs text-gray-500 mb-2">
                        {award.date && `比赛时间: ${award.date}`}
                      </div>
                      
                      <div>
                        <div className="text-xs text-gray-600 mb-1">获奖同学:</div>
                        <div className="flex flex-wrap gap-1">
                          {award.students.map(studentId => (
                            <Button
                              key={studentId}
                              variant="secondary"
                              size="sm"
                              className="h-6 px-2 text-xs hover:bg-blue-100"
                              asChild
                            >
                              <Link to={`/person/student/${studentId}`}>
                                {getStudentName(studentId)}
                              </Link>
                            </Button>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}