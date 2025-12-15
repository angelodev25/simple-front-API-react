import { createRoot } from 'react-dom/client'
import './styles/index.css'
import App from './App.jsx'
import { URLProviderWrapper } from './contexts/apt-url.context.jsx'
import { StrictMode } from 'react'

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <URLProviderWrapper>
      <App />
  </URLProviderWrapper>
  // </StrictMode> 
    
)
