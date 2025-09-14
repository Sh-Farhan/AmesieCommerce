/**
 * Main Application Entry Point
 * Sets up providers, routing, and global styles for ShopEase
 */

import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { QueryProvider } from './app/providers/QueryProvider'
import App from './App'

// Import our beautiful Tailwind CSS design system
import './styles/globals.css'

// Initialize GSAP for animations
import './shared/animations/gsap'

/**
 * Root application component with all providers
 * Sets up the provider tree for state management and routing
 */
function AppProviders() {
  return (
    <BrowserRouter>
      <QueryProvider>
        <App />
      </QueryProvider>
    </BrowserRouter>
  )
}

// Render the application
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppProviders />
  </React.StrictMode>
)