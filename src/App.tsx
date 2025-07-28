import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from '@/components/theme-provider'
import { FilterProvider } from '@/contexts/filter-context'
import Layout from '@/layout'
import StudentsPage from '@/pages/students-page'
import TeachersPage from '@/pages/teachers-page'
import AwardsPage from '@/pages/awards-page'
import PersonDetailPage from '@/pages/person-detail-page'
import './globals.css'

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="oi-directory-theme">
      <Router>
        <FilterProvider>
          <Layout>
            <Routes>
              <Route path="/" element={<StudentsPage />} />
              <Route path="/teachers" element={<TeachersPage />} />
              <Route path="/awards" element={<AwardsPage />} />
              <Route path="/person/:type/:id" element={<PersonDetailPage />} />
            </Routes>
          </Layout>
        </FilterProvider>
      </Router>
    </ThemeProvider>
  )
}

export default App