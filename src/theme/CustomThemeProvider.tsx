import { CssBaseline, PaletteMode, ThemeProvider, useMediaQuery } from '@mui/material'
import { createTheme } from '@mui/material/styles'
import React from 'react'
import { ChartsMaterialThemeProvider } from "@florin-chelaru/smart-charts";

interface CustomThemeProviderProps {
  children: JSX.Element | JSX.Element[]
  mode?: PaletteMode
}

export default function CustomThemeProvider ({ children, mode }: CustomThemeProviderProps) {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  mode = mode || (prefersDarkMode ? 'dark' : 'light')
  const palette =
    mode === 'dark' ? { mode, background: { paper: '#2B2D3E', default: '#343E59' } } : { mode }
  const theme = createTheme({
    palette
  })

  theme.components = {
    MuiCssBaseline: {
      styleOverrides: {
        '*': {
          margin: 0,
          padding: 0,
          boxSizing: 'border-box'
        },
        html: {
          width: '100%',
          height: '100%',
          WebkitOverflowScrolling: 'touch'
        },
        body: {
          width: '100%',
          height: '100%'
        },
        '#root': {
          width: '100%',
          height: '100%'
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          // boxShadow: theme.shadows[2],
          boxShadow: '0 .5rem 1rem rgba(0,0,0,.15)!important',
          borderRadius: Number(theme.shape.borderRadius) * 2,
          // position: 'relative',
          zIndex: 0, // Fix Safari overflow: hidden with border radius
          overflow: 'visible', // To allow tooltips to go outside the card
          backgroundImage: 'none'
        }
      }
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <ChartsMaterialThemeProvider theme={theme}>
        {children}
      </ChartsMaterialThemeProvider>
    </ThemeProvider>
  )
}
