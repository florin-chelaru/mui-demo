import { CssBaseline, PaletteMode, PaletteOptions, ThemeOptions, ThemeProvider, useMediaQuery } from '@mui/material'
import { createTheme } from '@mui/material/styles'
import React from 'react'
import { ChartsMaterialThemeProvider } from "@florin-chelaru/smart-charts";
import { GREY } from "./palette";
import shadows from './shadows';

interface CustomThemeProviderProps {
  children: JSX.Element | JSX.Element[]
  mode?: PaletteMode
}

export default function CustomThemeProvider ({ children, mode }: CustomThemeProviderProps) {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  mode = mode || (prefersDarkMode ? 'dark' : 'light')
  const palette: PaletteOptions = { mode }

  const themeOptions: ThemeOptions = {
    shape: { borderRadius: 8 }
  }
  if (mode === 'dark') {
    palette.background = { paper: '#2B2D3E', default: '#343E59' }
  } else {
    palette.background = { default: GREY[100] }
    themeOptions.shadows = shadows
  }
  themeOptions.palette = palette

  const theme = createTheme(themeOptions)

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
          boxShadow: theme.shadows[2],
          borderRadius: Number(theme.shape.borderRadius) * 2,
          // position: 'relative',
          zIndex: 0, // Fix Safari overflow: hidden with border radius
          overflow: 'visible', // To allow tooltips to go outside the card
          backgroundImage: 'none'
        }
      }
    },
    MuiPopover: {
      styleOverrides: {
        paper: {
          // backgroundImage: "none",
          boxShadow: theme.shadows[10]
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
