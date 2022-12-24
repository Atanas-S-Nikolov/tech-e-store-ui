import { isBlank } from "underscore.string";

export function isNotBlank(val) {
  return !isBlank(val);
}