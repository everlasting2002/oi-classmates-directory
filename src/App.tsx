import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from '@/components/theme-provider'
import { FilterProvider } from '@/contexts/filter-context'
import MobileOptimizedWrapper from '@/components/mobile-optimized-wrapper'
import ErrorBoundary from '@/components/error-boundary'
import Layout from '@/layout'
import StudentsPage from '@/pages/students-page'
import TeachersPage from '@/pages/teachers-page'
import AwardsPage from '@/pages/awards-page'
import PersonDetailPage from '@/pages/person-detail-page'
import './globals.css'
import './styles/mobile-optimizations.css'

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light" storageKey="oi-directory-theme">
        <MobileOptimizedWrapper>
          <Router>
            <FilterProvider>
              <Layout>
                <ErrorBoundary>
                  <Routes>
                    <Route path="/" element={<StudentsPage />} />
                    <Route path="/teachers" element={<TeachersPage />} />
                    <Route path="/awards" element={<ErrorBoundary><AwardsPage /></ErrorBoundary>} />
                    <Route path="/person/:type/:id" element={<PersonDetailPage />} />
                  </Routes>
                </ErrorBoundary>
              </Layout>
            </FilterProvider>
          </Router>
        </MobileOptimizedWrapper>
      </ThemeProvider>
    </ErrorBoundary>
  )
}

export default App