import "@/styles/pages/Contacts.css";

import { useMemo } from "react";

import { GoogleMap, MarkerF, useJsApiLoader } from "@react-google-maps/api";

import Typography from "@mui/material/Typography";
import MailOutlineIcon from '@mui/icons-material/MailOutline';

import AppFooter from "@/js/components/footer/AppFooter";
import NavigationBar from "@/js/components/header/NavigationBar";
import StyledLink from "@/js/components/styled/StyledLink";

export default function Contacts() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY
  });

  const center = useMemo(() => ({ lat: 42.620864, lng: 23.353597 }), []);

  return (
    <>
      <NavigationBar/>
      <div className="contacts centered-container">
        {
          isLoaded
            ? (
                <GoogleMap
                  mapContainerClassName="google-map-container"
                  center={center}
                  zoom={15}
                >
                  <MarkerF
                    position={center}
                    title="Tech E-Store"
                    label={{ color: "white", text: "T" }}
                  />
                </GoogleMap>
              )
            : null
        }
        <Typography variant="h5" sx={{ mt: 5 }}>How to find us</Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mt: 2 }}>Email</Typography>
        <StyledLink
          className="link"
          to="mailto:tech.e.store.bg@gmail.com"
          sx={{ gap: 2 }}
        >
          <MailOutlineIcon/>
          <Typography>tech.e.store.bg@gmail.com</Typography>
        </StyledLink>
      </div>
      <AppFooter/>
    </>
  );
}