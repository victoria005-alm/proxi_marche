import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app/App'
import './index.css'
import PwaStatus from './pwa/PwaStatus'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
    <PwaStatus />
  </React.StrictMode>,
)
