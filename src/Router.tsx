/* eslint-disable react-hooks/exhaustive-deps */
import './App.css'
import Cookies from "cookies-js";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { useLayoutEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useAuth } from './contexts/customHooks';
import { SignedRoutes } from './routes/SignedRoutes';
import { DefaultRoutes } from './routes/DefaultRoutes';
import { TasksProvider } from './contexts/TasksContext';

function Router() {

  const { token, setSession } = useAuth()

  useLayoutEffect(() => {
    const session = Cookies.get("@session")
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
          : <TasksProvider>
            <DefaultRoutes />
          </TasksProvider>
      }
    </BrowserRouter>
  )
}

export default Router
