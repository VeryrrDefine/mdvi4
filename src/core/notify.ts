export var incrementId = 0

class Notify {
  content: string
  bgcolor: string
  id: number

  constructor(content: string, bgcolor = '#00ffff80') {
    this.content = content
    this.bgcolor = bgcolor
    this.id = incrementId++
  }
}

const notifies = []

export function addNotify(notify: Notify) {}
