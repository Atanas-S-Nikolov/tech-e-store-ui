import CartDto from "./CartDto";

export default class UpdateCartDto extends CartDto {
  constructor(productsToBuy, cartKey) {
    super(productsToBuy);
    this.cartKey = cartKey;
  }
}