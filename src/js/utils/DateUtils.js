export function formatDate(dateStr, locale, ...options) {
  const date = new Date(dateStr);
  return new Intl.DateTimeFormat(locale, {...options}).format(date);
}
