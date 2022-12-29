import { createTheme } from "@mui/material";
import { green } from "@mui/material/colors";

const primaryColor = green[600];
const secondaryColor = green[100];

export const appTheme = createTheme({
  palette: {
    primary: {
      main: primaryColor,
      contrastText: "white"
    },
    secondary: {
      main: secondaryColor
    }
  },
});