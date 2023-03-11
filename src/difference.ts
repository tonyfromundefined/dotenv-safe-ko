export function difference<T>(arrA: T[], arrB: T[]) {
  return arrA.filter(a => arrB.indexOf(a) < 0);
}
