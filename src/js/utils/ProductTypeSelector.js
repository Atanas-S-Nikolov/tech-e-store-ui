import ProductCategory from "../model/product/ProductCategory";
import ProductType from "../model/product/ProductType";

const {COMPUTERS_AND_LAPTOPS, TV_AND_MONITORS, MICE_AND_KEYBOARDS, AUDIO} = ProductCategory;
const { HEADSET, EARPHONES, TWS, DESKTOP_PC, LAPTOP, MOUSE, KEYBOARD, TV, MONITOR } = ProductType;

export function select(productCategory) {
  switch(productCategory) {
    case AUDIO:
      return [HEADSET.plural, EARPHONES.plural, TWS.plural];
    case COMPUTERS_AND_LAPTOPS:
      return [DESKTOP_PC.plural, LAPTOP.plural];
    case MICE_AND_KEYBOARDS:
      return [MOUSE.plural, KEYBOARD.plural];
    case TV_AND_MONITORS:
      return [TV.plural, MONITOR.plural];
    default:
        return [];
  }
}