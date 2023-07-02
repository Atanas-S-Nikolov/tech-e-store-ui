import { useRouteError } from "react-router-dom";

import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

export default function ErrorBoundary() {
  const { response } = useRouteError();
  return (
    <Alert severity="error">
      <AlertTitle>{`${response.status} ${response.data.status}`}</AlertTitle>
      {response.data.messages[0]}
    </Alert>
  )
}
