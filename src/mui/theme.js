const { createTheme } = require('@mui/material');

const theme = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          paddingLeft: 8,
          paddingRight: 8,
          width: "100vw",
          overflowX: "hidden",
        },
        fieldset: {
          padding: 0,
          margin: 0,
          border: 'none',
        },
      },
    },
    MuiTooltip: {
      defaultProps: {
        enterDelay: 1000,
        enterNextDelay: 1000,
      }
    },
    MuiContainer: {
      defaultProps: {
        maxWidth: "sm",
        disableGutters: true,
      }
    },
    MuiAppBar: {
      defaultProps: {
        position: "fixed",
      }
    },
  },
});

export default theme;
