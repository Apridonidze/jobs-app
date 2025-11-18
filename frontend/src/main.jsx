import App from './App.jsx'; //importing root component

import { createRoot } from 'react-dom/client'; //importing react root

import { CookiesProvider } from "react-cookie";//importing react library

createRoot(document.getElementById('root')).render(
  <CookiesProvider>
  
    <App />
  
  </CookiesProvider>
); //wrapping main component with cookies provider to provide cookies to all components