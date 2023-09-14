import "@/styles/footer/Footer.css";

import Typography from "@mui/material/Typography";
import { CONTACTS_URL } from "@/js/constants/UrlConstants";
import { Link } from "react-router-dom";

const CURRENT_YEAR = new Date().getFullYear();

export default function AppFooter() {
  return(
    <footer>
      <Typography sx={{ mt: 5, mb: 3 }}>
        <Link
          className="link-default-color"
          to={CONTACTS_URL}
        >
          Contacts
        </Link>
      </Typography>
      <Typography variant="body2">© {CURRENT_YEAR} Tech E-Store. All rights reserved.</Typography>
    </footer>
  );  
}
