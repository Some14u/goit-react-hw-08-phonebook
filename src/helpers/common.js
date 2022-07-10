export function conditionalEquality(condition) {
  return condition ? undefined : () => true; // Always equal on false
}

export const randomInRange = range => Math.floor(Math.random() * range);
export const randomItem = list => list[randomInRange(list.length)];
