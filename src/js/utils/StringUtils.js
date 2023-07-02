import { isBlank } from "underscore.string";

export function isNotBlank(val) {
  return val && !isBlank(val);
}

export function hasWhitespace(str) {
  return /\s/.test(str);
}
