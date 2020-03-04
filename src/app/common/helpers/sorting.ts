export function compareDates(date1: Date, date2: Date): number {
  return date1 > date2 ? 1 : date1 < date2 ? -1 : 0;
}
