import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider  } from 'react-router-dom';
import App from './App.tsx'
import './index.css'
import Home from './routes/Home.tsx';

const router = createBrowserRouter([
  {
    path: "/react-test",
    element: <App />,
    children: [
      {
        path: "/react-test",
        element: <Home />,
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
