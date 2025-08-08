// format-powiainanum.js by VeryrrDefine
// Code snippets from [format-expantanum.js by cloudytheconqueror]
import PowiainaNum from 'powiaina_num.js'
const formatFunc = (function () {
  /// FUNCTIONSTART  DONT REMOVE THIS LINE
  'use strict'

  function arr01Sort(arr01) {
    arr01.sort(function (a, b) {
      return (function (a, b) {
        if (typeof a == 'number') {
          return
        } else if (a[3] > b[3]) {
          return -1
        } else if (a[3] < b[3]) {
          return 1
        } else if (a[2] == 'x' && b[2] != 'x') {
          return -1
        } else if (a[2] != 'x' && b[2] == 'x') {
          return 1
        } else if (a[2] == 'x' && b[2] == 'x') {
          return -1
        } else if (a[2] > b[2]) {
          return -1
        } else if (a[2] < b[2]) {
          return 1
        } else if (a[0] == 'x' && b[0] != 'x') {
          return -1
        } else if (a[0] != 'x' && b[0] == 'x') {
          return 1
        } else if (a[0] == 'x' && b[0] == 'x') {
          return -1
        } else if (a[0] > b[0]) {
          return -1
        } else if (a[0] < b[0]) {
          return 1
        } else if (a[1] > b[1]) {
          return -1
        } else if (a[1] < b[1]) {
          return 1
        }

        return -1
      })(a, b)
    })
  }
  function arr01Merge(arr01) {
    var elemOffset = 0 // a unnegative number
    for (let i = 0; i < arr01.length - 2; ++i) {
      if (
        arr01[i][0] == arr01[i + 1][0] &&
        arr01[i][2] == arr01[i + 1][2] &&
        arr01[i][3] == arr01[i + 1][3]
      ) {
        // same arr01's merge
        arr01[i][1] += arr01[i + 1][1]
        arr01.splice(i + 1, 1)
        --i
        elemOffset++
      }
    }
    return elemOffset
  }
  var debug = false
  function stopFormating() {
    format = function () {
      return 'NaN'
    }
  }
  function toggle() {
    debug = !debug
  }
  function myPolarize(
    arr01,
    hasOperationRepeat = true,
    toArrowVared = false,
    parseToArrowNum = -1,
  ) {
    !debug || console.log('input', arr01)
    if (arr01.length == 1) {
      if (arr01[0] >= 1e10) {
        return { arrows: 1, repeation: 2, bottom: Math.log10(Math.log10(arr01[0])) }
      } else if (arr01[0] >= 10) {
        return { arrows: 1, repeation: 1, bottom: Math.log10(arr01[0]) }
      } else return { arrows: 1, repeation: 0, bottom: arr01[0] }
    }
    hasOperationRepeat = toArrowVared ? 0 : hasOperationRepeat
    arr01Sort(arr01)
    arr01Merge(arr01)
    var ptr = arr01.length - 2
    var b = () => arr01[arr01.length - 1]
    var c = (x) => {
      arr01[arr01.length - 1] = x
    }
    var repeatResult = 1000001
    while (--repeatResult >= 0) {
      if (b() >= 10) {
        let a = Math.log10(b())
        arr01.push([1, 1, 1, 1])
        ptr++
        arr01Sort(arr01)

        let offset = arr01Merge(arr01)
        ptr -= offset
        c(a)
        !debug || console.log('>=10 -> <10', ptr, arr01)
      } else {
        if (
          !toArrowVared &&
          ptr == 0 &&
          typeof arr01[ptr + 1] == 'number' &&
          (hasOperationRepeat || (!hasOperationRepeat && arr01[ptr][1] == 1)) &&
          arr01[ptr][0] >= parseToArrowNum
        )
          break // arr01 [[],number]
        if (toArrowVared && ptr == 0 && typeof arr01[ptr + 1] == 'number' && arr01[ptr][0] == 'x')
          break
        if (
          (toArrowVared && ptr == 0 && arr01[ptr][1] == 1) ||
          (ptr != 0 &&
            typeof arr01[ptr + 1] == 'number' &&
            typeof arr01[ptr][0] == 'number' &&
            arr01[ptr][1] == 1 &&
            (arr01[ptr - 1][0] == 'x' ||
              arr01[ptr - 1][2] > arr01[ptr][2] ||
              arr01[ptr - 1][3] > arr01[ptr][3]) &&
            arr01[ptr][0] > 2 &&
            (ptr != 0 || arr01[ptr - 1][0] == 'x'))
        ) {
          /*convert [x,1,1,1] sth to ["x", 1, 1, 1] x+f(base)*/ let arrow_count = arr01[ptr][0]
          let base = b()
          //x|10 = arrow-1+(log_5 base)/2
          let Jx
          if (arrow_count == 3) Jx = base
          else {
            !debug || console.log(arrow_count, base)
            Jx = arrow_count - 1 + Math.log(base / 2) / Math.log(5)
          }
          arr01[ptr][0] = 'x'

          c(Jx)
          arr01Sort(arr01)
          let offset = arr01Merge(arr01)
          ptr -= offset
          !debug || console.log('arrow x to Jx conv', ptr, arr01)
        }
        if (typeof arr01[ptr + 1] == 'number' && arr01[ptr][0] == 'x' && b() < 10 && ptr != 0) {
          // conver ["x", sth, j, k] sth2 to [1, 1, j+1, k]
          let base = b()
          let JRepeation = arr01[ptr][1]
          let Kx = JRepeation + Math.log10(base)
          arr01[ptr][1] = 1
          arr01[ptr][0] = 1
          arr01[ptr][2]++
          c(Kx)

          arr01Sort(arr01)
          let offset = arr01Merge(arr01)
          ptr -= offset
          !debug || console.log('J...Jx to Kx', ptr, arr01)
        }
        if (
          ((ptr == 0 && !hasOperationRepeat && arr01[ptr][1] != 1) || ptr != 0) &&
          arr01[ptr][0] != 'x' &&
          b() < 10
        ) {
          let goal = ptr == 0 ? arr01[ptr][0] + 1 : arr01[ptr - 1][1]
          // AAAA..{x}..AAA b
          // can be x+log10 b to
          // B(x+log10 b)
          if (b() == 1 && ptr > 0 && arr01[ptr - 1][0] > arr01[ptr][0] && arr01[ptr][1] == 1) {
            !debug || console.log('operator_setgoal', goal)
            arr01[ptr][0] = arr01[ptr - 1][0]
          } else {
            let right = arr01[ptr][1] + Math.log10(b())
            arr01[ptr][0]++
            arr01[ptr][1] = 1
            c(right)
          }

          arr01Sort(arr01)
          let offset = arr01Merge(arr01)
          ptr -= offset
          !debug || console.log('operator', ptr, arr01)
        }
      }
    }
    !debug || console.log('finalresult', arr01)
    if (repeatResult <= 0) {
      console.warn(
        'warning: ' + JSON.stringify(arr01) + 'seems took long time to parsing.',
      )
    }
    return {
      bottom: b(),
      repeation: arr01[ptr][1],
      arrows: arr01[ptr][0],
      layer1: arr01[ptr][2],
      layer2: arr01[ptr][3],
      arr01: arr01,
    }
  }

  function commaFormat(num, precision) {
    if (num === null || num === undefined) return 'NaN'
    let zeroCheck = num.arr01 ? num.arr01[0][1] : num
    if (zeroCheck < 0.001) return (0).toFixed(precision)
    let init = num.toString()
    let portions = init.split('.')
    portions[0] = portions[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1' + ',')
    return portions[0]
  }

  function regularFormat(num, precision) {
    if (isNaN(num)) return 'NaN'
    let zeroCheck = num.arr01 ? num.arr01[0][1] : num
    if (zeroCheck < 0.001) return (0).toFixed(precision)
    let fmt = num.toString()
    let f = fmt.split('.')
    if (precision == 0) return commaFormat(num.floor ? num.floor() : Math.floor(num))
    else if (f.length == 1) return fmt + '.' + '0'.repeat(precision)
    else if (f[1].length < precision) return fmt + '0'.repeat(precision - f[1].length)
    else return f[0] + '.' + f[1].substring(0, precision)
  }

  // Search for the value at the requested height of an ExpantaNum arr01,
  // and set it to zero if it exists.
  // like PowiainaNum method operator(...sth, 0)
  function setToZero(arr01, height) {
    let i = 1
    for (i = 1; i < arr01.length; i++) {
      if (arr01[i][0] == height) break
    }
    if (i < arr01.length) arr01[i][1] = 0
  }

  function format(num, precision = 4, options = {}) {
    const UCF = !!(options.UCF || false)
    const replaceBeforeF = options.replaceBeforeF
    const enginnering = options.enginnering;
    if (PowiainaNum.isNaN(num)) return 'NaN'
    let precision2 = Math.max(3, precision) // for e
    let precision3 = Math.max(4, precision) // for F, G, H
    let precision4 = Math.max(6, precision) // for J, K
    num = new PowiainaNum(num).normalize()
    let arr01 = num.arr01
    if (num.small) return `/${format(num.rec(), precision)}`
    if (num.sign < 0) return '-' + format(num.neg(), precision)
    if (num.isInfi()) return 'Infinity'
    if (num.gt("-10^^5") && num.lt("10^^5") && replaceBeforeF) 
      return replaceBeforeF(num, precision)
    if (num.lt('0.001')) {
      return '(' + format(num.rec()) + ')e-1'
    } else if (num.lt(1)) {
      if (precision == 0) return '0'
      return regularFormat(num, precision + 2)
    } else if (num.lt(1000)) return regularFormat(num, precision)
    else if (num.lt(1000000000)) return commaFormat(num)
    else if (num.lt('10^10^10^10^10')) {
      // 1e9 ~ 1F5
      let bottom = num.getOperator(0)
      let rep = num.getOperator(1) - 1
      if (bottom >= 1e9) {
        bottom = Math.log10(bottom)
        rep += 1
      }
      let m = 10 ** (bottom - Math.floor(bottom))
      let e = Math.floor(bottom)
      let p
      if (bottom < 1000) {
        p = precision2
      } else {
        p = precision2 - Math.log10(bottom) + 3
      }
      p = Math.max(Math.floor(p), 0)

      if (enginnering) {
        let t;
        t = e;
        e = 3*Math.floor(e/3)
        let d = Math.round((t-e)*3);
        m = m*10**d;
      }
      return 'e'.repeat(rep) + regularFormat(m, p) + 'e' + commaFormat(e)
    } else if (num.lt('10^^1000000')) {
      // 1F5 ~ F1,000,000
      let pol = myPolarize(arr01, 1)
      //return JSON.stringify(pol);

      if (UCF) return `F${pol.repeation + Math.log10(pol.bottom)}`
      return regularFormat(pol.bottom, precision3) + 'F' + commaFormat(pol.repeation)
    } else if (num.lt('10^^^5')) {
      // F1,000,000 ~ 1G5
      let rep = num.operator(2)
      if (rep >= 1) {
        setToZero(arr01, 2)
        return 'F'.repeat(rep) + format(arr01, precision)
      }
      let n = num.getOperator(1) + 1
      if (num.gte('10^^' + (n + 1))) n += 1
      return 'F' + format(n, precision)
    } else if (num.lt('10^^^1000000')) {
      // 1G5 ~ G1,000,000
      let pol = myPolarize(arr01, 1)
      if (UCF) return `G${pol.repeation + Math.log10(pol.bottom)}`
      return regularFormat(pol.bottom, precision3) + 'G' + commaFormat(pol.repeation)
    }

    return num.toString();
  }

  format.myPolarize = myPolarize
  format.arr01Sort = arr01Sort
  format.arr01Merge = arr01Merge
  format.stopFormating = stopFormating
  format.toggle = toggle

  format.regularFormat = regularFormat
  format.commaFormat = commaFormat
  /// FUNCTION

  return format
})()

export default formatFunc

export const regularFormat = formatFunc.regularFormat

export const commaFormat = formatFunc.commaFormat
export const myPolarize = formatFunc.myPolarize
