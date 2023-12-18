
import { CssBaseline, ThemeProvider } from '@mui/material'
import { theme } from './Theme'
import { RouterWrapper } from './routers/RouterWrapper'
import { BrowserRouter } from 'react-router-dom'
import { NotificationProvider } from './context/Notification'

function App() {

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <NotificationProvider>
          <CssBaseline />
          <RouterWrapper/>
        </NotificationProvider>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
