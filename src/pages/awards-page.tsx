import { useMemo, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useFilter } from '@/contexts/filter-context'
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
  const { filterState, updateAwardsFilter } = useFilter()
  const { selectedYear, selectedLevel } = filterState.awards
  
  // 页面加载时恢复状态
  useEffect(() => {
    // 状态已经通过Context和URL参数自动恢复，无需额外操作
  }, [])
  
  // 获取年份列表
  const years = useMemo(() => {
    const yearSet = new Set(awards.map(award => award.year))
    return Array.from(yearSet).sort((a, b) => b - a)
  }, [])
  
  // 获取奖项等级列表
  const levels = ['金牌', '银牌', '铜牌']
  
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
          if (selectedLevel === 'all') return true
          
          // 检查该奖项是否有对应等级的获奖者
          switch (selectedLevel) {
            case '金牌':
              return award.students.gold.length > 0
            case '银牌':
              return award.students.silver.length > 0
            case '铜牌':
              return award.students.bronze.length > 0
            default:
              return true
          }
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
    const allStudents = new Set<number>()
    let goldCount = 0
    let silverCount = 0
    let bronzeCount = 0
    
    allAwards.forEach(award => {
      award.students.gold.forEach(id => allStudents.add(id))
      award.students.silver.forEach(id => allStudents.add(id))
      award.students.bronze.forEach(id => allStudents.add(id))
      
      if (award.students.gold.length > 0) goldCount++
      if (award.students.silver.length > 0) silverCount++
      if (award.students.bronze.length > 0) bronzeCount++
    })
    
    return { totalAwards, totalStudents: allStudents.size, goldCount, silverCount, bronzeCount }
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
      default: return 'bg-gray-500'
    }
  }
  
  // 获取奖项图标
  const getLevelIcon = (level: string) => {
    if (level === '金牌') return <Trophy className="w-4 h-4" />
    if (level === '银牌') return <Medal className="w-4 h-4" />
    return <AwardIcon className="w-4 h-4" />
  }
  
  // 获取赛季颜色
  const getSeasonColor = (season: string) => {
    switch (season) {
      case 'WC': return 'bg-indigo-100 text-indigo-800'
      case 'CTSC': return 'bg-cyan-100 text-cyan-800'
      case 'APIO': return 'bg-green-100 text-green-800'
      case 'NOI': return 'bg-purple-100 text-purple-800'
      case 'IOI': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-6">
      {/* 页面标题和筛选 */}
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between bg-white p-4 rounded-lg shadow-sm">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">获奖信息时间轴</h2>
          <p className="text-xs text-gray-500 mt-1">并未展示全部获奖人数，仅包含记录在此网站的同学</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          {/* 年份筛选 */}
          <Select value={selectedYear} onValueChange={(value: string) => updateAwardsFilter({ selectedYear: value })}>
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
          <Select value={selectedLevel} onValueChange={(value: string) => updateAwardsFilter({ selectedLevel: value })}>
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
            <div className="text-sm text-gray-500">总比赛数</div>
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
            <div className="text-sm text-gray-500">金牌数量</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-gray-600">{stats.silverCount}</div>
            <div className="text-sm text-gray-500">银牌数量</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-amber-600">{stats.bronzeCount}</div>
            <div className="text-sm text-gray-500">铜牌数量</div>
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
              selectedLevel={selectedLevel}
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
  getSeasonColor,
  selectedLevel
}: { 
  year: number
  yearData: { [season: string]: Award[] }
  getStudentName: (id: number) => string
  getLevelColor: (level: string) => string
  getLevelIcon: (level: string) => JSX.Element
  getSeasonColor: (season: string) => string
  selectedLevel: string
}) {
  // 按赛季顺序排序 - 使用与awards-data.ts相同的排序逻辑
  const seasonOrder = ['WC', 'CTSC', 'APIO', 'NOI', 'IOI']
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
              <div className="space-y-4 ml-4">
                {yearData[season].map(award => (
                  <Card key={award.id} className="border-l-4 border-l-blue-400">
                    <CardContent className="p-4">
                      <div className="mb-3">
                        <h4 className="font-medium text-sm mb-2">{award.competition}</h4>
                      </div>
                      
                      {/* 金银铜牌分别显示 */}
                      <div className="space-y-3">
                        {/* 金牌 */}
                        {award.students.gold.length > 0 && (selectedLevel === 'all' || selectedLevel === '金牌') && (
                          <div className="flex items-start gap-3">
                            <Badge className={`text-white ${getLevelColor('金牌')} shrink-0`}>
                              <span className="mr-1">{getLevelIcon('金牌')}</span>
                              金牌
                            </Badge>
                            <div className="flex flex-wrap gap-1">
                              {award.students.gold.map(studentId => (
                                <Button
                                  key={studentId}
                                  variant="secondary"
                                  size="sm"
                                  className="h-6 px-2 text-xs hover:bg-yellow-100"
                                  asChild
                                >
                                  <Link to={`/person/student/${studentId}?from=awards`}>
                                    {getStudentName(studentId)}
                                  </Link>
                                </Button>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        {/* 银牌 */}
                        {award.students.silver.length > 0 && (selectedLevel === 'all' || selectedLevel === '银牌') && (
                          <div className="flex items-start gap-3">
                            <Badge className={`text-white ${getLevelColor('银牌')} shrink-0`}>
                              <span className="mr-1">{getLevelIcon('银牌')}</span>
                              银牌
                            </Badge>
                            <div className="flex flex-wrap gap-1">
                              {award.students.silver.map(studentId => (
                                <Button
                                  key={studentId}
                                  variant="secondary"
                                  size="sm"
                                  className="h-6 px-2 text-xs hover:bg-gray-100"
                                  asChild
                                >
                                  <Link to={`/person/student/${studentId}?from=awards`}>
                                    {getStudentName(studentId)}
                                  </Link>
                                </Button>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        {/* 铜牌 */}
                        {award.students.bronze.length > 0 && (selectedLevel === 'all' || selectedLevel === '铜牌') && (
                          <div className="flex items-start gap-3">
                            <Badge className={`text-white ${getLevelColor('铜牌')} shrink-0`}>
                              <span className="mr-1">{getLevelIcon('铜牌')}</span>
                              铜牌
                            </Badge>
                            <div className="flex flex-wrap gap-1">
                              {award.students.bronze.map(studentId => (
                                <Button
                                  key={studentId}
                                  variant="secondary"
                                  size="sm"
                                  className="h-6 px-2 text-xs hover:bg-amber-100"
                                  asChild
                                >
                                  <Link to={`/person/student/${studentId}?from=awards`}>
                                    {getStudentName(studentId)}
                                  </Link>
                                </Button>
                              ))}
                            </div>
                          </div>
                        )}
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