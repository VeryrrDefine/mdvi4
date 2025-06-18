// 标准记数法

function t1format(x: number, mult = false, y: number) {
  let ills = ['', 'M', 'B', 'T', 'Qa', 'Qi', 'Sx', 'Sp', 'Oc', 'No']
  let t1ones = ['', 'U', 'D', 'T', 'Qa', 'Qi', 'Sx', 'Sp', 'Oc', 'No']
  if (mult && y > 0 && x < 10) t1ones = ['', '', 'D', 'T', 'Qa', 'Qi', 'Sx', 'Sp', 'Oc', 'No']
  let t1tens = ['', 'Dc', 'Vg', 'Tg', 'Qag', 'Qig', 'Sxg', 'Spg', 'Ocg', 'Nog']
  let t1hunds = ['', 'Ce', 'De', 'Te', 'Qae', 'Qie', 'Sxe', 'Spe', 'Oce', 'Noe']
  let t1f = ills[x]
  if (mult && y > 0) t1f = t1ones[x]
  if (x >= 10) t1f = t1ones[x % 10] + t1tens[Math.floor(x / 10) % 10] + t1hunds[Math.floor(x / 100)]
  return t1f
}

function tlformat(x: number, mult = false, y: number) {
  let t2ills = ['', 'Mi', 'Mc', 'Na', 'Pc', 'Fm', 'At', 'Zp', 'Yc', 'Xn']
  let t2ones = ['', 'Me', 'Du', 'Tr', 'Te', 'Pe', 'He', 'Hp', 'Ot', 'En']
  if (mult && y > 0 && x < 10) t2ones = ['', '', 'Mc', 'Na', 'Pc', 'Fm', 'At', 'Zp', 'Yc', 'Xn']
  let t2tens = ['', 'c', 'Ic', 'TCn', 'TeC', 'PCn', 'HCn', 'HpC', 'OCn', 'ECn']
  let t2hunds = ['', 'Hc', 'DHe', 'THt', 'TeH', 'PHc', 'HHe', 'HpH', 'OHt', 'EHc']
  let t2f = t2ills[x]
  if (mult && y > 0) t2f = t2ones[x]
  let t2t = t2tens[Math.floor(x / 10) % 10]
  if (x % 100 == 10) t2t = 'Vec'
  if (x >= 10) t2f = t2ones[x % 10] + t2t + t2hunds[Math.floor(x / 100)]
  return t2f
}

function t3format(x: number, mult = false, y: number, z: number) {
  let t3ills = ['', 'Kl', 'Mg', 'Gi', 'Ter', 'Pt', 'Ex', 'Zt', 'Yt', 'Xe']
  let t3ones = ['', 'eN', 'oD', 'tR', 'tE', 'pT', 'eX', 'zE', 'yO', 'xN']
  let t3tns = ['Dk', 'Hn', 'Dok', 'TrD', 'TeD', 'PeD', 'ExD', 'ZeD', 'YoD', 'NeD']
  let t3to = ['k', 'k', 'c', 'c', 'c', 'k', 'k', 'c', 'k', 'c']
  if (mult && y > 0 && x < 10) t3ones = ['', '', 'D', 'Tr', 'T', 'P', 'Ex', 'Z', 'Y', 'N']
  let t3tens = ['', '', 'I', 'Tr', 'Te', 'P', 'E', 'Z', 'Y', 'N']
  let t3hunds = ['', 'Ho', 'Do', 'Tro', 'To', 'Po', 'Exo', 'Zo', 'Yo', 'No']
  let t3f = t3ills[x]
  if ((mult && y > 0) || z >= 1e3) t3f = t3ones[x]
  let t3t = t3tens[Math.floor(x / 10) % 10]
  let t3h = t3hunds[Math.floor(x / 100)]
  if (x % 100 == 0) t3h += 'T'
  if (x % 100 < 20 && x % 100 > 9) t3t = t3tns[x % 10]
  if (x % 100 > 19) t3t += t3to[x % 10] + t3ones[x % 10]
  if (x >= 10) t3f = t3h + t3t
  if (x >= 100 && x % 100 < 10) t3f = t3h + t3ones[x % 10]
  return t3f
}

function t4format(x: number, m: number) {
  let t4ills = [
    '',
    'aL',
    'eJ',
    'iJ',
    'AsT',
    'uN',
    'rM',
    'oV',
    'oL',
    'eT',
    'O',
    'aX',
    'uP',
    'rS',
    'lT',
  ]
  let t4m = ['', 'K', 'M', 'G', '', 'L', 'F', 'J', 'S', 'B', 'Gl', 'G', 'S', 'V', 'M']
  let t4f = t4ills[x]
  if (m < 2) t4f = t4m[x] + t4f
  return t4f
}
