import PropTypes from 'prop-types';
import { useMemo } from 'react';
// material
import { CssBaseline, Theme, ThemeOptions } from '@mui/material';
import { createTheme, StyledEngineProvider, ThemeProvider as MUIThemeProvider } from '@mui/material/styles';
//
import palette from './palette';
import typography from './typography';
import componentsOverride from './overrides';
import shadows, { CustomShadow, customShadows } from './shadows';

// ----------------------------------------------------------------------

ThemeProvider.propTypes = {
  children: PropTypes.node,
};

export interface CustomTheme extends Theme {
  customShadows: CustomShadow
}

export default function ThemeProvider ({ children }: any) {
  const themeOptions = useMemo(
    (): ThemeOptions => ({
      palette,
      shape: { borderRadius: 8 },
      typography,
      shadows,
    }),
    []
  );

  const theme: CustomTheme = { ...createTheme(themeOptions), customShadows };

  theme.components = componentsOverride(theme);

  return (
    <StyledEngineProvider injectFirst>
      <MUIThemeProvider theme={theme}>
        <CssBaseline/>
        {children}
      </MUIThemeProvider>
    </StyledEngineProvider>
  );
}
