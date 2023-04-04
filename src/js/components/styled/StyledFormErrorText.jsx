import styled from "@emotion/styled";
import FormHelperText from "@mui/material/FormHelperText";

export default function StyledFormErrorText (props) {
  const FormErrorText = styled(FormHelperText)(({ theme }) => ({
    color: theme.palette.error.main,
  }));

  return (
    <FormErrorText {...props}>
      {props.children}
    </FormErrorText>
  );
}
