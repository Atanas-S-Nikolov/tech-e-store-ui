import ProductCategory from "../model/product/ProductCategory";
import ProductType from "../model/product/ProductType";

const { COMPUTERS_AND_LAPTOPS, TV_AND_MONITORS, MICE_AND_KEYBOARDS, AUDIO } = ProductCategory;
const { HEADSET, EARPHONES, TWS, DESKTOP_PC, LAPTOP, MOUSE, KEYBOARD, TV, MONITOR } = ProductType;

export function select(productCategory) {
  switch(productCategory) {
    case AUDIO:
      return [HEADSET, EARPHONES, TWS];
    case COMPUTERS_AND_LAPTOPS:
      return [DESKTOP_PC, LAPTOP];
    case MICE_AND_KEYBOARDS:
      return [MOUSE, KEYBOARD];
    case TV_AND_MONITORS:
      return [TV, MONITOR];
    default:
        return [];
  }
}