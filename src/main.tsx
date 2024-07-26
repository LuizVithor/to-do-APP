import './index.css'
import Router from './Router';
import ReactDOM from 'react-dom/client';
import { ptBR } from '@mui/x-data-grid/locales';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { AuthProvider } from './contexts/AuthContext';
import { ptBR as coreptBR } from '@mui/material/locale';
import { TasksProvider } from './contexts/TasksContext';
import { createTheme, ThemeProvider } from '@mui/material';

const theme = createTheme({
  palette: {
    error: { main: "#b10c43" },
    primary: { main: "#02031a" },
    success: { main: "#00ff00" },
    secondary: { main: "#021b2b" },
    background: { default: "#ebdfcc" },
  }
},
  ptBR,
  coreptBR,
)

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <ThemeProvider theme={theme}>
    <AuthProvider>
      <TasksProvider>
        <Router />
        <ToastContainer />
      </TasksProvider>
    </AuthProvider>
  </ThemeProvider >
  // </React.StrictMode>
  ,
)
