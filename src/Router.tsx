/* eslint-disable react-hooks/exhaustive-deps */
import './App.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { useLayoutEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useAuth } from './contexts/customHooks';
import { SignedRoutes } from './routes/SignedRoutes';
import { DefaultRoutes } from './routes/DefaultRoutes';

function Router() {

  const { token, setSession } = useAuth()

  useLayoutEffect(() => {
    const session = localStorage.getItem("@session")
    if (session) {
      const sessionF = JSON.parse(session)
      setSession(sessionF)
    }
  }, [])

  return (
    <BrowserRouter>
      {
        token
          ? <SignedRoutes />
          : <DefaultRoutes />
      }
    </BrowserRouter>
  )
}

export default Router
