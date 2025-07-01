import PowiainaNum from 'powiaina_num.js'

export abstract class Upgrade {
  set status(x: boolean) {}
  get status(): boolean {
    return false
  }

  cost(): PowiainaNum {
    return PowiainaNum.POSITIVE_INFINITY.clone()
  }

  buy(): boolean {
    return false
  }

  canBuy(): boolean {
    return false
  }

  description(): string {
    return 'Upgrade description'
  }

  effect(): any {}

  effectDesc(effect: any): string {
    return ''
  }
}

export const Upgrade1 = new (class extends Upgrade {})()
