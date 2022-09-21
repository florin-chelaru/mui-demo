export default function Backdrop () {
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
