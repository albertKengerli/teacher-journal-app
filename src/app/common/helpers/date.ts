export function getTimestampFromFormattedDate(dateAsString: string): number {
  const day: string = dateAsString.slice(0, 2);
  const month: string = dateAsString.slice(3, 5);
  const year: string = dateAsString.slice(6);

  const convertableStringDate: string = `${month}/${day}/${year}`;
  const date: Date = new Date(convertableStringDate);

  return date.getTime();
}
