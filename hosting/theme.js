import { createMuiTheme } from "@material-ui/core/styles";

export default createMuiTheme({
  typography: {
    useNextVariants: true,
    fontFamily: ['"Helvetica Neue"'],
    h1: {
      fontWeight: "200",
    },
    h2: {
      fontWeight: "200",
    },
    h3: {
      fontWeight: "200",
    },
    subtitle1: {
      fontSize: 24,
      lineHeight: 1.2,
    },
    subtitle2: {
      fontSize: 18,
      fontWeight: "initial",
    },
  },
  palette: {
    background: {
      paper: "#FDFDFD",
      default: "#FDFDFD",
    },
    primary: {
      light: "#ff4774",
      main: "#FF1952",
      dark: "#b21139",
      contrastText: "#FDFDFD",
    },
    secondary: {
      dark: "#201C37",
      main: "#2E294F",
      light: "#575372",
    },
    text: {
      primary: "#2E2E2E",
      secondary: "#454545",
    },
  },
  overrides: {
    MuiAppBar: {
      colorPrimary: {
        backgroundColor: "#FDFDFD",
        color: "#2E2E2E",
      },
    },
  },
});
