import { hasWhitespace } from "./StringUtils";

export function checkIfIsNaN(number) {
  return hasWhitespace(number) || isNaN(number) || number === '';
}
