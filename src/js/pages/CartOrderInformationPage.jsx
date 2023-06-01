import "@/styles/pages/Cart.css";

import { useState } from "react";

import AppFooter from "@/js/components/footer/AppFooter";
import StyledHeader from "@/js/components/styled/StyledHeader";
import CustomFormTextInput from "@/js/components/utils/CustomFormTextInput";
import SnackbarMessage from "@/js/components/utils/SnackbarMessage";

import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import PhoneIcon from '@mui/icons-material/Phone';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import CartNavButtonsContainer from "@/js/components/utils/CartNavButtonsContainer";

import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import getSteps from "@/js/utils/CartSteps";

import {
  FIRST_NAME_PROPERTY, 
  LAST_NAME_PROPERTY, 
  EMAIL_PROPERTY, 
  ADDRESS_PROPERTY, 
  PHONE_PROPERTY 
} from "@/js/constants/PropertyConstants";
import { CART_CHECKOUT_URL } from "@/js/constants/UrlConstants";
import { validateQuickOrder } from "@/js/api/service/CartService";
import { updateQuickOrderReducer } from "@/js/redux/quickOrderSlice";
import QuickOrderDto from "@/js/model/cart/QuickOrderDto";
import StyledStepper from "@/js/components/styled/StyledStepper";
import CartTitle from "@/js/components/utils/CartTitle";
import { CART_ORDER_INFORMATION_STEP } from "@/js/utils/CartSteps";

export default function CartOrderInformationPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  // error state
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [hasFirstNameError, setHasFirstNameError] = useState(false);
  const [firstNameErrorMessage, setFirstNameErrorMessage] = useState("");
  const [hasLastNameError, setHasLastNameError] = useState(false);
  const [lastNameErrorMessage, setLastNameErrorMessage] = useState("");
  const [hasEmailError, setHasEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [hasPhoneError, setHasPhoneError] = useState(false);
  const [phoneErrorMessage, setPhoneErrorMessage] = useState("");
  const [hasAddressError, setHasAddressError] = useState(false);
  const [addressErrorMessage, setAddressErrorMessage] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { key } = useSelector(state => state.cart.cartResponse);

  return (
    <>
      <StyledHeader/>
      <div className="cart-content">
        <StyledStepper steps={getSteps()} activeStep={1}/>
        <CartTitle text={CART_ORDER_INFORMATION_STEP}/>
        <div>
          <CustomFormTextInput
            id="first-name"
            label="First name"
            required
            error={hasFirstNameError}
            errorMessage={firstNameErrorMessage}
            onChange={event => setFirstName(event.target.value)}
            sx={{ mr: 1 }}
          />
          <CustomFormTextInput
            id="last-name"
            label="Last name"
            required
            error={hasLastNameError}
            errorMessage={lastNameErrorMessage}
            onChange={event => setLastname(event.target.value)}
            sx={{ ml: 1 }}
          />
        </div>
        <div>
          <CustomFormTextInput
            id="email"
            label="Email"
            adornment={<AlternateEmailIcon/>}
            error={hasEmailError}
            errorMessage={emailErrorMessage}
            onChange={event => setEmail(event.target.value)}
            sx={{ mr: 1 }}
          />
          <CustomFormTextInput
            id="phone"
            label="Phone"
            adornment={<PhoneIcon/>}
            error={hasPhoneError}
            errorMessage={phoneErrorMessage}
            onChange={event => setPhone(event.target.value)}
            sx={{ ml: 1 }}
          />
        </div>
        <div>
          <CustomFormTextInput
            id="address"
            label="Address"
            adornment={<LocalShippingIcon/>}
            required
            error={hasAddressError}
            errorMessage={addressErrorMessage}
            onChange={event => setAddress(event.target.value)}
          />
        </div>
        <CartNavButtonsContainer nextBtnOnClick={validateOrder}/>
        {
          hasError
          ? <SnackbarMessage severity="error" message={errorMessage} afterErrorCallback={handleHasErrorFalse}/>
          : null
        }
      </div>
      <AppFooter/>
    </>
  );
  
  function handleHasErrorFalse() {
    setErrorMessage("");
    setHasError(false);
  }

  function setBackendErrorState(property, message) {
    switch(property) {
      case FIRST_NAME_PROPERTY:
        setFirstNameErrorMessage(message);
        setHasFirstNameError(true);
        break;
      case LAST_NAME_PROPERTY:
        setLastNameErrorMessage(message);
        setHasLastNameError(true);
        break;
      case EMAIL_PROPERTY:
        setEmailErrorMessage(message);
        setHasEmailError(true);
        break;
      case PHONE_PROPERTY:
        setPhoneErrorMessage(message);
        setHasPhoneError(true);
        break;
      case ADDRESS_PROPERTY:
        setAddress(message);
        setHasAddressError(true);
        break;
      default:
        console.log("No one property was recognized!");
    }
  }

  function resetBackendErrorState() {
    handleHasErrorFalse();
    setFirstNameErrorMessage("");
    setHasFirstNameError(false);
    setLastNameErrorMessage("");
    setHasLastNameError(false);
    setEmailErrorMessage("");
    setHasEmailError(false);
    setPhoneErrorMessage("");
    setHasPhoneError(false);
    setAddressErrorMessage("");
    setHasAddressError(false);
  }

  function navigateToCheckoutPage() {
    navigate(CART_CHECKOUT_URL);
  }

  function validateOrder() {
    validateQuickOrder(key, new QuickOrderDto(firstName, lastName, email, phone, address))
      .then(response => {
        resetBackendErrorState();
        dispatch(updateQuickOrderReducer(response.data));
        navigateToCheckoutPage();
      })
      .catch(error => {
        const response = error.response;
        const status = response.status;
        if (status === 400) {
          console.log(response)
          response.data.rejectedProperties.forEach(rejected => {
            const { property, message } = rejected;
            setBackendErrorState(property, message);
          });
        } else if (status === 404 | 409) {
          setErrorMessage(response.data.messages[0]);
          setHasError(true);
        }
      })
  } 
}