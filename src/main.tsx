/* eslint-disable @typescript-eslint/ban-ts-comment */
import './index.css'
import Router from './Router';
import ReactDOM from 'react-dom/client';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { AuthProvider } from './contexts/AuthContext';
import { createTheme, ThemeProvider } from '@mui/material';

const theme = createTheme({
  palette: {
    error: { main: "#b10c43" },
    primary: { main: "#02031a" },
    success: { main: "#00ff00" },
    secondary: { main: "#021b2b" },
    background: { default: "#ebdfcc" },
  },
  mixins: {
    //@ts-ignore
    MuiDataGrid: {
      color: "white",
      containerBackground: '#02031a',
    },
  },
  components: {
     //@ts-ignore
    MuiDataGrid: {
      styleOverrides: {
        root: {
          '& .MuiDataGrid-columnHeaderTitle': {
            color: 'white'
          },
          
        },
      },
    },
  },
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <ThemeProvider theme={theme}>
    <AuthProvider>
      <Router />
    </AuthProvider>
    <ToastContainer />
  </ThemeProvider>
  // </React.StrictMode>
  ,
)
