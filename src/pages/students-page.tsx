import { useMemo, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useFilter } from '@/contexts/filter-context'
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Search } from 'lucide-react'
import { 
  getAvatarUrl, 
  getUniversities,
  getAwardsByStudentId
} from '@/data/mock-data'
import { 
  students,
  getGraduationYears, 
  getCurrentGrade,
  Student 
} from '@/data/students-data'
import { FlipCard } from '@/components/flip-card'

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
        {filteredStudents.map(student => {
          // 获取学生的获奖信息
          const studentAwards = getAwardsByStudentId(student.id)
          const awards = {
            gold: studentAwards
              .filter(award => award.students.gold.includes(student.id))
              .map(award => ({ competition: award.competition, year: award.year })),
            silver: studentAwards
              .filter(award => award.students.silver.includes(student.id))
              .map(award => ({ competition: award.competition, year: award.year })),
            bronze: studentAwards
              .filter(award => award.students.bronze.includes(student.id))
              .map(award => ({ competition: award.competition, year: award.year }))
          }
          
          return (
            <FlipCard 
              key={student.id} 
              student={student} 
              awards={awards.gold.length > 0 || awards.silver.length > 0 || awards.bronze.length > 0 ? awards : undefined}
            />
          )
        })}
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

