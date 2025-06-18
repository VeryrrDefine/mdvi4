export function replaceQmoji(str: string) {
  return str
    .replace(/<\$bx>/g, '<img style="height: 1em; vertical-align: middle;" src="baixie.png">')
    .replace(/<\$jx>/g, '<img style="height: 1em; vertical-align: middle;" src="jingxia.gif">')
}
