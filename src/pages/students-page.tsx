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
  getAvatarUrl, 
  getUniversities 
} from '@/data/mock-data'
import { 
  students,
  getGraduationYears, 
  getCurrentGrade,
  Student 
} from '@/data/students-data'

export default function StudentsPage() {
  const { filterState, updateStudentsFilter } = useFilter()
  const { selectedYear, selectedUniversity, searchQuery } = filterState.students
  
  const graduationYears = getGraduationYears()
  const universities = getUniversities()
  
  // 页面加载时恢复状态
  useEffect(() => {
    // 状态已经通过Context和URL参数自动恢复，无需额外操作
  }, [])
  
  // 筛选和排序学生数据
  const filteredStudents = useMemo(() => {
    let filtered = students.filter(student => {
      // 年级筛选
      if (selectedYear !== 'all') {
        // 处理在校学生年级
        if (['初一', '初二', '初三', '高一', '高二', '高三'].includes(selectedYear)) {
          const currentGrade = getCurrentGrade(student.graduationYear)
          if (currentGrade !== selectedYear) {
            return false
          }
        } else {
          // 处理毕业年份
          if (student.graduationYear !== parseInt(selectedYear)) {
            return false
          }
        }
      }
      
      // 大学筛选
      if (selectedUniversity !== 'all' && student.university !== selectedUniversity) {
        return false
      }
      
      // 搜索筛选（真实姓名、昵称或签名）
      if (searchQuery && 
          !student.realName.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !student.nickname.toLowerCase().includes(searchQuery.toLowerCase()) && 
          !student.signature.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false
      }
      
      return true
    })
    
    // 排序：先按年级排序（越大越前），再按ID排序（从小到大）
    return filtered.sort((a, b) => {
      // 获取年级排序值
      const getGradeValue = (student: Student) => {
        const currentGrade = getCurrentGrade(student.graduationYear)
        if (currentGrade) {
          // 在校学生年级排序值（高三最大，初一最小）
          const gradeMap: { [key: string]: number } = {
            '高三': 1000,
            '高二': 999,
            '高一': 998,
            '初三': 997,
            '初二': 996,
            '初一': 995
          }
          return gradeMap[currentGrade] || 0
        }
        // 毕业生按毕业年份排序（年份越小年龄越大，排序值越大）
        // 使用负数让较早毕业的学生排在前面
        return student.graduationYear ? (10000 - student.graduationYear) : 0
      }
      
      const gradeA = getGradeValue(a)
      const gradeB = getGradeValue(b)
      
      // 先按年级排序（降序，年级越大越前）
      if (gradeA !== gradeB) {
        return gradeB - gradeA
      }
      
      // 年级相同时按ID排序（升序）
      return a.id - b.id
    })
  }, [selectedYear, selectedUniversity, searchQuery])

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 bg-white p-4 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold text-gray-800">同学列表</h2>
        
        <div className="flex flex-col gap-3 w-full">
          {/* 搜索框 - 移动端优先显示 */}
          <div className="relative w-full">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="搜索姓名、昵称或签名"
              value={searchQuery}
              onChange={(e) => updateStudentsFilter({ searchQuery: e.target.value })}
              className="pl-10 h-10"
            />
          </div>
          
          {/* 筛选器行 */}
          <div className="flex flex-col sm:flex-row gap-3">
            {/* 年级筛选 */}
            <Select value={selectedYear} onValueChange={(value: string) => updateStudentsFilter({ selectedYear: value })}>
              <SelectTrigger className="w-full sm:w-[180px] h-10">
                <SelectValue placeholder="选择年级" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部年级</SelectItem>
                {graduationYears.map(year => (
                  <SelectItem key={year} value={year.toString()}>
                    {typeof year === 'string' ? year : `${year} 届`}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            {/* 大学筛选 */}
            <Select value={selectedUniversity} onValueChange={(value: string) => updateStudentsFilter({ selectedUniversity: value })}>
              <SelectTrigger className="w-full sm:w-[180px] h-10">
                <SelectValue placeholder="选择大学" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部大学</SelectItem>
                {universities.map(university => (
                  <SelectItem key={university} value={university}>
                    {university}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      
      {/* 筛选结果统计 */}
      <div className="text-sm text-gray-500">
        共找到 <span className="font-medium">{filteredStudents.length}</span> 位同学
      </div>
      
      {/* 学生卡片网格 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
        {filteredStudents.map(student => (
          <StudentCard key={student.id} student={student} />
        ))}
      </div>
      
      {/* 无结果提示 */}
      {filteredStudents.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">没有找到符合条件的同学</p>
        </div>
      )}
    </div>
  )
}

// 学生卡片组件
function StudentCard({ student }: { student: Student }) {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-all duration-200 flex flex-col h-full card-interactive fast-click">
      <CardHeader className="pb-3 p-4">
        <div className="flex items-center space-x-3">
          <Avatar className="h-12 w-12 md:h-14 md:w-14 border-2 border-blue-100">
            <AvatarImage src={getAvatarUrl(student.qq)} alt={student.realName} />
            <AvatarFallback className="text-sm font-medium">{student.realName.slice(0, 2)}</AvatarFallback>
          </Avatar>
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
        </div>
      </CardHeader>
      
      <CardContent className="flex-1 p-4 pt-0">
        <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">{student.signature}</p>
        {student.university && (
          <p className="text-xs text-gray-500 mt-2 truncate">
            就读于: {student.university}
          </p>
        )}
      </CardContent>
      
      <CardFooter className="flex justify-between items-center pt-3 border-t mt-auto p-4">
        <div className="text-xs text-gray-500 truncate flex-1 mr-2">
          QQ: {student.qq}
        </div>
        
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-9 px-3 text-xs md:text-sm shrink-0 touch-manipulation"
          asChild
        >
          <Link to={`/person/student/${student.id}`}>
            <Eye className="h-3 w-3 mr-1" />
            详情
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
