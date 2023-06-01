import { useState, useLayoutEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { isBlank } from "underscore.string";
import { getCart } from "@/js/api/service/CartService";
import { updateCartReducer } from "@/js/redux/cartSlice";

export function useCart() {
  const [loading, setLoading] = useState(false);
  const { cartResponse } = useSelector(state => state.cart);
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    const { key } = cartResponse;
    if (isBlank(key)) {
      return;
    }
    getCart(key)
      .then(response => {
        dispatch(updateCartReducer(response.data));
        setLoading(true);
      })
      .catch(error => {
        console.log(error);
        setLoading(false);
      })
  }, []);

  return loading;
}
