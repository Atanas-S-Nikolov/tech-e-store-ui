export function formatDate(dateStr, locale) {
  const date = new Date(dateStr);
  return new Intl.DateTimeFormat(locale, { dateStyle: "medium", timeStyle: "medium" }).format(date);
}
