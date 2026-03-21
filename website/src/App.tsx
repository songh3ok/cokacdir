import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import TutorialPage from './components/tutorial/TutorialPage'
import EC2Page from './components/ec2/EC2Page'
import MacOSPage from './components/macos/MacOSPage'
import WindowsPage from './components/windows/WindowsPage'
import WorkflowsPage from './components/workflows/WorkflowsPage'
import TelegramTutorialPage from './components/telegram-tutorial/TelegramTutorialPage'
import TipsPage from './components/tips/TipsPage'

function ScrollToTop() {
  const { pathname, search } = useLocation()
  useEffect(() => {
    const params = new URLSearchParams(search)
    if (!params.get('s')) {
      window.scrollTo(0, 0)
    }
    // When ?s= is present, individual pages handle section scrolling
  }, [pathname, search])
  return null
}

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/tutorial" element={<TutorialPage />} />
        <Route path="/telegram-tutorial" element={<TelegramTutorialPage />} />
        <Route path="/ec2" element={<EC2Page />} />
        <Route path="/macos" element={<MacOSPage />} />
        <Route path="/windows" element={<WindowsPage />} />
        <Route path="/workflows" element={<WorkflowsPage />} />
        <Route path="/tips" element={<TipsPage />} />
      </Routes>
    </>
  )
}

export default App
