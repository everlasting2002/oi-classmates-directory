import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

// 筛选状态类型定义
export interface FilterState {
  // 学生页面筛选条件
  students: {
    selectedYear: string
    selectedUniversity: string
    searchQuery: string
  }
  // 教师页面筛选条件
  teachers: {
    selectedSchool: string
    searchQuery: string
  }
  // 奖项页面筛选条件
  awards: {
    selectedYear: string
    selectedLevel: string
  }
}

// 默认筛选状态
const defaultFilterState: FilterState = {
  students: {
    selectedYear: 'all',
    selectedUniversity: 'all',
    searchQuery: ''
  },
  teachers: {
    selectedSchool: 'all',
    searchQuery: ''
  },
  awards: {
    selectedYear: 'all',
    selectedLevel: 'all'
  }
}

// Context类型定义
interface FilterContextType {
  filterState: FilterState
  updateStudentsFilter: (filters: Partial<FilterState['students']>) => void
  updateTeachersFilter: (filters: Partial<FilterState['teachers']>) => void
  updateAwardsFilter: (filters: Partial<FilterState['awards']>) => void
  getReturnUrl: (pageType: 'students' | 'teachers' | 'awards') => string
  saveCurrentState: () => void
  restoreState: () => void
}

// 创建Context
const FilterContext = createContext<FilterContextType | undefined>(undefined)

// Hook for using the context
export const useFilter = () => {
  const context = useContext(FilterContext)
  if (context === undefined) {
    throw new Error('useFilter must be used within a FilterProvider')
  }
  return context
}

// Provider组件
export const FilterProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [filterState, setFilterState] = useState<FilterState>(defaultFilterState)
  const location = useLocation()
  const navigate = useNavigate()

  // 从URL参数解析筛选条件
  const parseUrlParams = (searchParams: URLSearchParams, pageType: string) => {
    switch (pageType) {
      case 'students':
        return {
          selectedYear: searchParams.get('year') || 'all',
          selectedUniversity: searchParams.get('university') || 'all',
          searchQuery: searchParams.get('search') || ''
        }
      case 'teachers':
        return {
          selectedSchool: searchParams.get('school') || 'all',
          searchQuery: searchParams.get('search') || ''
        }
      case 'awards':
        return {
          selectedYear: searchParams.get('year') || 'all',
          selectedLevel: searchParams.get('level') || 'all'
        }
      default:
        return {}
    }
  }

  // 将筛选条件转换为URL参数
  const filtersToUrlParams = (filters: any, pageType: string) => {
    const params = new URLSearchParams()
    
    switch (pageType) {
      case 'students':
        if (filters.selectedYear !== 'all') params.set('year', filters.selectedYear)
        if (filters.selectedUniversity !== 'all') params.set('university', filters.selectedUniversity)
        if (filters.searchQuery) params.set('search', filters.searchQuery)
        break
      case 'teachers':
        if (filters.selectedSchool !== 'all') params.set('school', filters.selectedSchool)
        if (filters.searchQuery) params.set('search', filters.searchQuery)
        break
      case 'awards':
        if (filters.selectedYear !== 'all') params.set('year', filters.selectedYear)
        if (filters.selectedLevel !== 'all') params.set('level', filters.selectedLevel)
        break
    }
    
    return params.toString()
  }

  // 页面加载时从URL恢复状态
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search)
    const pathname = location.pathname
    
    let pageType = ''
    if (pathname === '/') pageType = 'students'
    else if (pathname === '/teachers') pageType = 'teachers'
    else if (pathname === '/awards') pageType = 'awards'
    
    if (pageType) {
      const urlFilters = parseUrlParams(searchParams, pageType)
      setFilterState(prev => ({
        ...prev,
        [pageType]: { ...prev[pageType as keyof FilterState], ...urlFilters }
      }))
    }
  }, [location])

  // 从sessionStorage恢复状态
  const restoreState = () => {
    try {
      const saved = sessionStorage.getItem('oi-directory-filters')
      if (saved) {
        const parsedState = JSON.parse(saved)
        setFilterState(parsedState)
      }
    } catch (error) {
      console.error('Failed to restore filter state:', error)
    }
  }

  // 保存状态到sessionStorage
  const saveCurrentState = () => {
    try {
      sessionStorage.setItem('oi-directory-filters', JSON.stringify(filterState))
    } catch (error) {
      console.error('Failed to save filter state:', error)
    }
  }

  // 更新学生页面筛选条件
  const updateStudentsFilter = (filters: Partial<FilterState['students']>) => {
    const newFilters = { ...filterState.students, ...filters }
    setFilterState(prev => ({ ...prev, students: newFilters }))
    
    // 只在当前页面是学生页面时更新URL
    if (location.pathname === '/') {
      const params = filtersToUrlParams(newFilters, 'students')
      const newUrl = params ? `/?${params}` : '/'
      navigate(newUrl, { replace: true })
    }
    
    // 保存到sessionStorage
    try {
      sessionStorage.setItem('oi-directory-filters', JSON.stringify({ ...filterState, students: newFilters }))
    } catch (error) {
      console.error('Failed to save filter state:', error)
    }
  }

  // 更新教师页面筛选条件
  const updateTeachersFilter = (filters: Partial<FilterState['teachers']>) => {
    const newFilters = { ...filterState.teachers, ...filters }
    setFilterState(prev => ({ ...prev, teachers: newFilters }))
    
    // 只在当前页面是教师页面时更新URL
    if (location.pathname === '/teachers') {
      const params = filtersToUrlParams(newFilters, 'teachers')
      const newUrl = params ? `/teachers?${params}` : '/teachers'
      navigate(newUrl, { replace: true })
    }
    
    // 保存到sessionStorage
    try {
      sessionStorage.setItem('oi-directory-filters', JSON.stringify({ ...filterState, teachers: newFilters }))
    } catch (error) {
      console.error('Failed to save filter state:', error)
    }
  }

  // 更新奖项页面筛选条件
  const updateAwardsFilter = (filters: Partial<FilterState['awards']>) => {
    const newFilters = { ...filterState.awards, ...filters }
    setFilterState(prev => ({ ...prev, awards: newFilters }))
    
    // 只在当前页面是奖项页面时更新URL
    if (location.pathname === '/awards') {
      const params = filtersToUrlParams(newFilters, 'awards')
      const newUrl = params ? `/awards?${params}` : '/awards'
      navigate(newUrl, { replace: true })
    }
    
    // 保存到sessionStorage
    try {
      sessionStorage.setItem('oi-directory-filters', JSON.stringify({ ...filterState, awards: newFilters }))
    } catch (error) {
      console.error('Failed to save filter state:', error)
    }
  }

  // 获取返回URL（带筛选参数）
  const getReturnUrl = (pageType: 'students' | 'teachers' | 'awards') => {
    const filters = filterState[pageType]
    const params = filtersToUrlParams(filters, pageType)
    
    switch (pageType) {
      case 'students':
        return params ? `/?${params}` : '/'
      case 'teachers':
        return params ? `/teachers?${params}` : '/teachers'
      case 'awards':
        return params ? `/awards?${params}` : '/awards'
      default:
        return '/'
    }
  }

  const value: FilterContextType = {
    filterState,
    updateStudentsFilter,
    updateTeachersFilter,
    updateAwardsFilter,
    getReturnUrl,
    saveCurrentState,
    restoreState
  }

  return (
    <FilterContext.Provider value={value}>
      {children}
    </FilterContext.Provider>
  )
}