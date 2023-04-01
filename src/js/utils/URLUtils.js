export function isValidUrl(urlStr) {
  try {
    new URL(urlStr);
    return true;
  } catch(error) {
    return false;
  }
}
