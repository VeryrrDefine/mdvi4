export function resetAnimation(e: HTMLElement, animation: string) {
  let bak = animation
  e.style.animation = 'none'
  void e.offsetWidth
  e.style.animation = bak
}
