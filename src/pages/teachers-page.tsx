import { useMemo, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useFilter } from '@/contexts/filter-context'
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader 
} from '@/components/ui/card'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Search, Eye } from 'lucide-react'
import { 
  teachers, 
  getAvatarUrl, 
  getSchools, 
  Teacher 
} from '@/data/mock-data'

export default function TeachersPage() {
  const { filterState, updateTeachersFilter } = useFilter()
  const { selectedSchool, searchQuery } = filterState.teachers
  
  const schools = getSchools()
  
  // 页面加载时恢复状态
  useEffect(() => {
    // 状态已经通过Context和URL参数自动恢复，无需额外操作
  }, [])
  
  // 筛选老师数据
  const filteredTeachers = useMemo(() => {
    return teachers.filter(teacher => {
      // 学校筛选
      if (selectedSchool !== 'all' && teacher.school !== selectedSchool) {
        return false
      }
      
      // 搜索筛选（姓名、昵称或签名）
      if (searchQuery && 
          !teacher.realName.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !teacher.nickname.toLowerCase().includes(searchQuery.toLowerCase()) && 
          !teacher.signature.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false
      }
      
      return true
    })
  }, [selectedSchool, searchQuery])

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 bg-white p-4 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold text-gray-800">老师列表</h2>
        
        <div className="flex flex-col gap-3 w-full">
          {/* 搜索框 - 移动端优先显示 */}
          <div className="relative w-full">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="搜索姓名或签名"
              value={searchQuery}
              onChange={(e) => updateTeachersFilter({ searchQuery: e.target.value })}
              className="pl-10 h-10"
            />
          </div>
          
          {/* 学校筛选 */}
          <Select value={selectedSchool} onValueChange={(value: string) => updateTeachersFilter({ selectedSchool: value })}>
            <SelectTrigger className="w-full sm:w-[200px] h-10">
              <SelectValue placeholder="选择学校" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">全部学校</SelectItem>
              {schools.map(school => (
                <SelectItem key={school} value={school}>
                  {school}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {/* 筛选结果统计 */}
      <div className="text-sm text-gray-500">
        共找到 <span className="font-medium">{filteredTeachers.length}</span> 位老师
      </div>
      
      {/* 老师卡片网格 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
        {filteredTeachers.map(teacher => (
          <TeacherCard key={teacher.id} teacher={teacher} />
        ))}
      </div>
      
      {/* 无结果提示 */}
      {filteredTeachers.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">没有找到符合条件的老师</p>
        </div>
      )}
    </div>
  )
}

// 老师卡片组件
function TeacherCard({ teacher }: { teacher: Teacher }) {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-all duration-200 flex flex-col h-full card-interactive fast-click">
      <CardHeader className="pb-3 p-4">
        <div className="flex items-center space-x-3">
          <Avatar className="h-12 w-12 md:h-14 md:w-14 border-2 border-green-100">
            <AvatarImage src={getAvatarUrl(teacher.qq)} alt={teacher.realName} />
            <AvatarFallback className="text-sm font-medium">{teacher.realName.slice(0, 2)}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-sm md:text-base truncate">
              {teacher.realName}
              {teacher.nickname && teacher.nickname !== teacher.realName && (
                <span className="text-xs md:text-sm text-gray-500 ml-1 block md:inline">({teacher.nickname})</span>
              )}
            </h3>
            <Badge variant="outline" className="text-xs bg-green-50 mt-1">
              {teacher.title}
            </Badge>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="flex-1 p-4 pt-0">
        <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">{teacher.signature}</p>
        <p className="text-xs text-gray-500 mt-2 truncate">
          任教于: {teacher.school}
        </p>
      </CardContent>
      
      <CardFooter className="flex justify-between items-center pt-3 border-t mt-auto p-4">
        <div className="text-xs text-gray-500 truncate flex-1 mr-2">
          QQ: {teacher.qq}
        </div>
        
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-9 px-3 text-xs md:text-sm shrink-0 touch-manipulation"
          asChild
        >
          <Link to={`/person/teacher/${teacher.id}`}>
            <Eye className="h-3 w-3 mr-1" />
            详情
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}