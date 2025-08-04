import { AsteroidDashboard } from './components/AsteroidDashboard'
import { Toaster } from '@/components/ui/toaster'
import './App.css'

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <AsteroidDashboard />
      <Toaster />
    </div>
  )
}

export default App
