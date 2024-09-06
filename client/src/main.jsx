import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { Login } from './Components/Login.jsx'
import { Signin } from './Components/Signin.jsx'

createRoot(document.getElementById('root')).render(
  
  <StrictMode>
    <App/>
  </StrictMode>,
)
