import React from 'react'
import { RouterProvider } from 'react-router-dom'
import './App.css'
import router from './routes/Routes'
import styled, { ThemeContext, ThemeProvider } from 'styled-components'
import { GlobalStyles, darkTheme, lightTheme } from './helpers/theme/themeConfig'
import { useState } from 'react'
import { loadTheme, toggleTheme } from './helpers/theme/themeUtils'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
const AuthProvider = React.lazy(()=> import('./contexts/Auth/AuthContext'))

function App() {
  const [theme, setTheme] = useState(loadTheme);

  const handleToggleTheme = () => {
    const newTheme = toggleTheme(theme);
    setTheme(newTheme);
  }

  return (
    <AuthProvider>
      <ThemeContext.Provider value={{ theme, handleToggleTheme }}>
        <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
          <Wrapper>
            <GlobalStyles />
            <RouterProvider router={router} fallbackElement={<p>Initial Load...</p>} />
          </Wrapper>
          <ToastContainer />
        </ThemeProvider>
      </ThemeContext.Provider>
    </AuthProvider>
  )
}

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.body};
  color: ${({ theme }) => theme.text};
`;

export default App
