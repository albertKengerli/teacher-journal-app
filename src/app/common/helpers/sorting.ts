export function dateStringCompare(date1: string, date2: string): number {
  const day1 = date1.slice(0,2);
  const month1 = date1.slice(3);
  const day2 = date2.slice(0,2);
  const month2 = date2.slice(3);

  if (month1 !== month2) {
    return month1 > month2 ? 1 : -1;
  } else if (day1 !== day2) {
    return day1 > day2 ? 1 : -1;
  } else {
    return 0;
  }
}