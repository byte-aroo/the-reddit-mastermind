export function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min)) + min;
}

export function random<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function pad(n: number) {
  return n.toString().padStart(2, "0");
}
