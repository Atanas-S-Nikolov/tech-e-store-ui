export function sortProductsByEarlyAccess(products) {
  return [...products]?.sort((a, b) => b.earlyAccess - a.earlyAccess)
}