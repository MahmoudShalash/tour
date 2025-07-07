import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import HotelsPage from './components/HotelsPage.jsx'
import RestaurantsPage from './components/RestaurantsPage.jsx'
import BanksPage from './components/BanksPage.jsx'
import TransportationPage from './components/TransportationPage.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/hotels" element={<HotelsPage />} />
        <Route path="/restaurants" element={<RestaurantsPage />} />
        <Route path="/banks" element={<BanksPage />} />
        <Route path="/transportation" element={<TransportationPage />} />
      </Routes>
    </Router>
  </StrictMode>,
)


