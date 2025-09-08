import PowiainaNum, { type PowiainaNumSource } from 'powiaina_num.js'
import { myPolarize } from './xey-array'

const defaultXEYOptions = {
    reciprocate_format: false,
    UCF: true,
} as const

const format = (
    value: PowiainaNum,
    precision: number = 4,
    options: {
        reciprocate_format: boolean
        UCF: boolean
    } = defaultXEYOptions,
): string => {
    if (value.isNaN()) return `nan`
    else if (value.eq(0)) return (0).toFixed(precision)
    else if (value.isneg()) return `-${format(value.neg(), precision, options)}`
    else if (value.isInfi()) return `inf`
    else if (value.lt(10 ** -precision)) {
        if (value.gt('/ee9')) {
            const exp = value.log10()
            const mant = value.div(exp.pow10())
            const display = `${mant.toNumber().toFixed(precision)}e${formatWhole(exp)}`
            return display
        } else if (value.gt('/eeee9')) {
            return format(value.rec(), precision, {
                reciprocate_format: true,
                UCF: options.UCF,
            })
        } else {
            return `(${format(value.rec(), precision, {
                reciprocate_format: false,
                UCF: options.UCF,
            })})e-1`
        }
    } else if (value.lt(1000)) {
        return value.toNumber().toFixed(precision)
    } else if (value.lt('eeee9')) {
        const elayers = value
            .slog()
            .sub(1 + 1 / 1.0479516371446924)
            .floor()
            .max(0)
            .toNumber()
        const restval = value.iteratedlog(elayers)
        let append = ''
        if (restval.gte(1000)) {
            const exp = restval.log10().floor()
            const mant = restval.div(exp.pow10())
            append = `${mant.toNumber().toFixed(precision)}e${formatWhole(exp)}`
        } else {
            append = restval.toNumber().toString()
        }
        // console.log(elayers)
        return (
            'e'.repeat(elayers) + (options.reciprocate_format && elayers >= 1 ? '-' : '') + append
        )
    } else if (value.lt('(10^)^999998 10000000000')) {
        const pol = myPolarize(value.arr01)
        return `${pol.bottom.toFixed(precision)}F${formatWhole(pol.repeation)}`
    } else if (value.lt('10^^10^^10^^10^^9')) {
        const repeat = value.getOperator(2)
        if (repeat > 0) {
            const num2 = value.clone()
            num2.setOperator(0, 2)
            num2.normalize()
            return `F`.repeat(repeat) + format(num2, precision, options)
        }
        return `F${formatWhole(value.getOperator(1) + 2)}`
    } else if (value.lt('(10^^)^999998 10000000000')) {
        const pol = myPolarize(value.arr01)
        return `${pol.bottom.toFixed(precision)}G${formatWhole(pol.repeation)}`
    } else if (value.lt('10^^^10^^^10^^^10^^^9')) {
        const repeat = value.getOperator(3)
        if (repeat > 0) {
            const num2 = value.clone()
            num2.setOperator(0, 3)
            num2.normalize()
            return `G`.repeat(repeat) + format(num2, precision, options)
        }
        return `G${formatWhole(value.getOperator(1) + 2)}`
    } else {
        return value.toString()
    }
}

export default format

export const formatWhole = (num2: PowiainaNumSource): string => {
    const num = new PowiainaNum(num2).floor()
    if (num.gte(1e3)) return format(num, 4)
    return format(num, 0)
}
