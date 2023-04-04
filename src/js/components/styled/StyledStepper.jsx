import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { styled } from '@mui/system';

export default function StyledStepper({ activeStep }) {
  const CustomStepper = styled(Stepper)(() => ({
    width: '25%',
  }));

  const StyledStep = styled(Step)(() => ({
    ".MuiSvgIcon-root": {
      fontSize: 50,
    },
    ".MuiStepConnector-root": {
      marginTop: 13,
      marginLeft: 5,
      marginRight: 5,
    },
  }));

  const steps = [
    'Cart items',
    'Checkout'
  ];

  return (
    <CustomStepper activeStep={activeStep} alternativeLabel>
      {steps.map((label) => (
        <StyledStep key={label}>
          <StepLabel>{label}</StepLabel>
        </StyledStep>
      ))}
    </CustomStepper>
  );
}