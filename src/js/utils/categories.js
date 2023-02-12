import ProductCategory from "../model/product/ProductCategory";
import { select } from "./ProductTypeSelector";

const {COMPUTERS_AND_LAPTOPS, TV_AND_MONITORS, MICE_AND_KEYBOARDS, AUDIO} = ProductCategory;

export const categoriesItems = [
  {
    id: 1,
    icon: "computer",
    text: COMPUTERS_AND_LAPTOPS.name,
    productTypes: select(COMPUTERS_AND_LAPTOPS),
  },
  { 
    id: 2, 
    icon: "monitor", 
    text: TV_AND_MONITORS.name, 
    productTypes: select(TV_AND_MONITORS),
  },
  { 
    id: 3, 
    icon: "keyboard", 
    text: MICE_AND_KEYBOARDS.name, 
    productTypes: select(MICE_AND_KEYBOARDS),
  },
  { 
    id: 4, 
    icon: "headphones", 
    text: AUDIO.name, 
    productTypes: select(AUDIO),
  }
];