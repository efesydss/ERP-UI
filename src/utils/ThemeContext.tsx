import { createContext, PropsWithChildren, useEffect, useState } from 'react'
import { createTheme } from '@mui/material/styles'
import { ThemeProvider, useMediaQuery } from '@mui/material'
import { trTR } from '@mui/material/locale'

declare module '@mui/material/styles' {
  interface Palette {
    muted: Palette['primary']
  }

  interface PaletteOptions {
    muted?: PaletteOptions['primary']
  }
}

interface ThemeContextProps {
  toggleTheme: () => void
  isDarkMode: boolean
}

const themeInitials: ThemeContextProps = {
  toggleTheme: () => {},
  isDarkMode: false
}

export const ThemeContext = createContext<ThemeContextProps>(themeInitials)

export const MultiThemeProvider = (props: PropsWithChildren) => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const persistedPreference = localStorage.getItem('theme')

    if (persistedPreference) {
      return persistedPreference === 'dark'
    }

    return prefersDarkMode
  })

  useEffect(() => {
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light')
  }, [isDarkMode])

  const toggleTheme = () => setIsDarkMode(!isDarkMode)

  const theme = createTheme(
    {
      typography: {
        fontFamily: 'Heebo'
      },
      palette: {
        primary: {
          main: '#122d3c'
        },
        muted: {
          main: '#e9f1ff'
        },
        secondary: {
          main: '#82A3A1'
        },
        error: {
          main: '#790000'
        },
        background: {
          default: '#FCFCFC',
          paper: '#FFFFFF'
        }
      }
    },
    trTR
  )

  return (
    <ThemeContext.Provider value={{ toggleTheme, isDarkMode }}>
      <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
    </ThemeContext.Provider>
  )
}
