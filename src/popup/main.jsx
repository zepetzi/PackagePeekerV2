import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createTheme, ThemeProvider } from '@mui/material/styles';


const theme = createTheme({
  typography: {
    h1: {
      fontFamily: 'Poppins-Black',
      fontSize: '24px',
      fontWeight: 'bold',
      color: '#E1DFDB'
    }
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: '#343434',
          fontFamily: '"Poppins-Light", sans-serif',
          fontSize: '12px',
          '& fieldset': {
            borderColor: '#606060'
          },
          '&:hover fieldset': {
            borderColor: '#606060'
          },
          '& .MuiInputBase-input': {
            color: '#E1DFDB',
            '&::placeholder': {
              color: '#E1DFDB'
            }
          }
        }
      }
    }
  }
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </StrictMode>,
)
