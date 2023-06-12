import { useEffect, useState } from "react";

import Typography from "@mui/material/Typography";

import { useSelector } from "react-redux";

import { isNotBlank } from "@/js/utils/StringUtils";
import { getUser } from "@/js/api/service/UserService";
import UsernameDto from "@/js/model/auth/UsernameDto";

export default function CartOrderInformation() {
  const { isAuthenticated, username } = useSelector(state => state.authentication);
  const { order } = useSelector(state => state.quickOrder);
  const { firstName, lastName, email, phone, address} = order;
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      getUser(new UsernameDto(username))
        .then(response => {
          setUser(response.data);
          setLoading(true);
        }).catch(error => {
          console.log(error);
          setLoading(false);
        })
    }
  }, [isAuthenticated])
  
  return (
    <>
      {isAuthenticated ? renderAuthenticatedMessage() : renderQuickOrderMessage()}
    </>
  );

  function renderQuickOrderMessage() {
    return (
      <div className="order-info">
        <Typography variant="h5" color="text.secondary" align="center">Order information</Typography>
        <div className="centered-column-container">
          <p style={{ textAlign: "center" }}>
            {`${firstName} ${lastName}`} your order will be delivered at {`"${address}"`}.<br/>{contactMessage()}
          </p>
        </div>
      </div>
    );
  }

  function renderAuthenticatedMessage() {
    return (
      <div className="order-info">
        <Typography variant="h5" color="text.secondary" align="center">Order information</Typography>
        {
          loading
            ? <div className="centered-column-container">
                <p style={{ textAlign: "center" }}>
                  {`${user.firstName} ${user.lastName}`} your order will be delivered at {`"${user.address}"`}.<br/>{contactMessage()}
                </p>
              </div>
            : null
        }
      </div>
    );
  }

  function contactMessage() {
    const emailToRender = isAuthenticated ? user.email : email;
    const phoneToRender = isAuthenticated ? user.phone : phone;

    const isEmailPresent = isNotBlank(emailToRender);
    const isPhonePresent = isNotBlank(phoneToRender);
  
    if (isEmailPresent && isPhonePresent) {
      return "We will contact you.";
    } else if (isEmailPresent) {
      return `You will receive an email about your order on: ${emailToRender}.`;
    } else if (isPhonePresent) {
      return `You will receive a call on: ${phoneToRender} about your order.`;
    }
  }
}