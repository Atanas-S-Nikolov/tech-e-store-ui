import { isBlank } from "underscore.string";

export function isNotBlank(val) {
  return !isBlank(val);
}

export function convertEnumValueToKey(val) {
  return val?.toString().toUpperCase().replace(' ', '_');
}