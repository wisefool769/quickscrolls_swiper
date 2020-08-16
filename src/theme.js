import { createMuiTheme } from '@material-ui/core/styles'

const white = '#ffffff'
const dark = '#1e2f4a'

const theme = createMuiTheme({
  palette: {
    primary: {
      100: dark,
      200: dark,
      300: dark,
      400: dark,
      500: dark,
      600: dark,
      700: dark,
      800: dark,
      900: dark,
      main: dark,
    },
    secondary: {
      100: white,
      200: white,
      300: white,
      400: white,
      500: white,
      600: white,
      700: white,
      800: white,
      900: white,
      main: white,
    },
  },
})

export default theme
