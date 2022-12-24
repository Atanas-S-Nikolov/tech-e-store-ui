import { createTheme } from "@mui/material";
import { green } from "@mui/material/colors";

const primaryColor = green[600];

export const appTheme = createTheme({
  palette: {
    primary: {
      main: primaryColor,
      contrastText: "white"
    }
  },
});