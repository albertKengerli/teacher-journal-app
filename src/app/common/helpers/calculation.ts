export function div(dividend: number, divider: number): number {
  return (dividend - dividend % divider) / divider;
}
