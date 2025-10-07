import App from './App.jsx'

import { createRoot } from 'react-dom/client'
import { CookiesProvider } from "react-cookie";

createRoot(document.getElementById('root')).render(
  <CookiesProvider>
  
    <App />
  
  </CookiesProvider>
)
