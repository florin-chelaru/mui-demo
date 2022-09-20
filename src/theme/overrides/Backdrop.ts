import { alpha } from '@mui/material/styles';
import { CustomTheme } from "../index";

// ----------------------------------------------------------------------

export default function Backdrop (theme: CustomTheme) {
  const varLow = alpha(theme.palette.grey[900], 0.48);
  const varHigh = alpha(theme.palette.grey[900], 1);

  return {
    MuiBackdrop: {
      styleOverrides: {
        root: {
          background: 'transparent',
          '&.MuiBackdrop-invisible': {
            background: 'transparent',
          },
        },
      },
    },
  };
}
