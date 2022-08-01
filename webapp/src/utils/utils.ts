export function notify(text: string, showAlert: boolean): void {
  console.log(text)
  if (showAlert) {
    alert(text)
  }
}
