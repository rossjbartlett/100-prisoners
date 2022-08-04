export function notify(text: string, showAlert: boolean): void {
  console.log(text)
  if (showAlert) {
    alert(text)
  }
}

export function shuffle<T>(list: readonly T[]): readonly T[] {
  return [...list].sort(() => Math.random() - 0.5)
}
