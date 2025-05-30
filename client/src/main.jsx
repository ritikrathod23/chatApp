import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { SocketProvider } from './contexAPI/useSocket.jsx'
import { ToggleProvider } from './contexAPI/useToggle.jsx'
import { ConversationProvider } from './contexAPI/useCovesation.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';


import Login from './page/Login.jsx'
import Signup from './page/Signup.jsx'
import Layout from './page/Layout.jsx'
import Profile from './page/Profile.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/signup',
    element: <Signup />,
  },
  {
    path: '/profile',
    element: <Profile />,
  },
  {
    path: 'home',
    element: <Layout />,
  },
])

createRoot(document.getElementById('root')).render(
  <SocketProvider>
    <ToggleProvider>
      <ConversationProvider>
        <RouterProvider router={router}>
          <App />
        </RouterProvider>
      </ConversationProvider>
    </ToggleProvider>
  </SocketProvider>
)
