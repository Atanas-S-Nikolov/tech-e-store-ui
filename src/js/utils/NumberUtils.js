import { hasWhitespace } from "./StringUtils";

export function checkIfIsNaN(number) {
  return hasWhitespace(number) || parseFloat(number) === NaN || number === '';
}
