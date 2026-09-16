import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './i18n/i18n'
import './index.css'
import App from './App.jsx'
import { onMotionChange } from './lib/motion'

onMotionChange(() => {})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
