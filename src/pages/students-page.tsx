import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
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
import { ExternalLink, Search, Eye } from 'lucide-react'
import { 
  students, 
  getAvatarUrl, 
  getGraduationYears, 
  getUniversities, 
  Student 
} from '@/data/mock-data'

export default function StudentsPage() {
  const [selectedYear, setSelectedYear] = useState<string>('all')
  const [selectedUniversity, setSelectedUniversity] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState<string>('')
  
  const graduationYears = getGraduationYears()
  const universities = getUniversities()
  
  // 筛选学生数据
  const filteredStudents = useMemo(() => {
    return students.filter(student => {
      // 年级筛选
      if (selectedYear !== 'all' && student.graduationYear !== parseInt(selectedYear)) {
        return false
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
  }, [selectedYear, selectedUniversity, searchQuery])

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between bg-white p-4 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold text-gray-800">同学列表</h2>
        
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          {/* 年级筛选 */}
          <Select value={selectedYear} onValueChange={setSelectedYear}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="选择年级" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">全部年级</SelectItem>
              {graduationYears.map(year => (
                <SelectItem key={year} value={year.toString()}>
                  {year} 届
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          {/* 大学筛选 */}
          <Select value={selectedUniversity} onValueChange={setSelectedUniversity}>
            <SelectTrigger className="w-full sm:w-[180px]">
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
          
          {/* 搜索框 */}
          <div className="relative w-full sm:w-[200px]">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="搜索姓名、昵称或签名"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8"
            />
          </div>
        </div>
      </div>
      
      {/* 筛选结果统计 */}
      <div className="text-sm text-gray-500">
        共找到 <span className="font-medium">{filteredStudents.length}</span> 位同学
      </div>
      
      {/* 学生卡片网格 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
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
    <Card className="overflow-hidden hover:shadow-md transition-shadow flex flex-col h-full">
      <CardHeader className="pb-2">
        <div className="flex items-center space-x-4">
          <Avatar className="h-12 w-12 border-2 border-blue-100">
            <AvatarImage src={getAvatarUrl(student.qq)} alt={student.realName} />
            <AvatarFallback>{student.realName.slice(0, 2)}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-medium">
              {student.realName}
              {student.nickname && student.nickname !== student.realName && (
                <span className="text-sm text-gray-500 ml-1">({student.nickname})</span>
              )}
            </h3>
            <Badge variant="outline" className="text-xs">
              {student.graduationYear} 届
            </Badge>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="flex-1">
        <p className="text-sm text-gray-600 line-clamp-2">{student.signature}</p>
        {student.university && (
          <p className="text-xs text-gray-500 mt-2">
            就读于: {student.university}
          </p>
        )}
      </CardContent>
      
      <CardFooter className="flex justify-between items-center pt-2 border-t mt-auto">
        <div className="text-xs text-gray-500">
          QQ: {student.qq}
        </div>
        
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-8 px-2 text-xs"
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
